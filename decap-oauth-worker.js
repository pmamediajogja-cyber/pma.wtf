/**
 * Decap CMS — GitHub OAuth proxy (Cloudflare Worker, zero dependencies).
 *
 * Decap's `github` backend needs a small server to complete GitHub's OAuth
 * flow (GitHub requires a client_secret, which can never live in the browser).
 * This worker does exactly that:
 *
 *   1. CMS popup opens  <worker>/auth      -> 302 redirect to GitHub
 *   2. GitHub redirects to <worker>/callback?code=...
 *   3. Worker exchanges `code` for an access token (server-side)
 *   4. Worker postMessages the token back to the Decap popup, which closes.
 *
 * The popup-to-CMS handoff follows Decap's two-step handshake
 * (see decap-cms-lib-auth/src/netlify-auth.js):
 *   a. popup posts "authorizing:github"            -> CMS arms the authorize listener
 *   b. popup posts "authorization:github:success:{token,provider}" -> CMS logs in
 *
 * Deploy (free Cloudflare account):
 *   1. dash.cloudflare.com -> Workers & Pages -> Create Worker -> Deploy,
 *      then "Edit code" and paste this file.
 *   2. Worker Settings -> Variables -> Add secrets:
 *        GITHUB_CLIENT_ID     = <from your GitHub OAuth App>
 *        GITHUB_CLIENT_SECRET = <from your GitHub OAuth App>
 *   3. Copy the worker URL, e.g. https://pma-cms-auth.<you>.workers.dev
 *   4. Put it as `base_url` in public/admin/config.yml and redeploy the site.
 *
 * The matching GitHub OAuth App is created in step 1 of CMS_SETUP.md, with
 * Authorization callback URL = <worker-url>/callback
 */

const GH_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GH_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Step 1 — start login: redirect the popup to GitHub.
    if (url.pathname === "/auth") {
      if (!env.GITHUB_CLIENT_ID) {
        return new Response("Worker misconfigured: GITHUB_CLIENT_ID secret missing", {
          status: 500,
        });
      }
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: "repo",
      });
      return Response.redirect(`${GH_AUTHORIZE_URL}?${params.toString()}`, 302);
    }

    // Step 2 — GitHub sent us back with ?code=: trade it for a token,
    // then hand the token to the Decap CMS popup via postMessage.
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing ?code= parameter", { status: 400 });

      const tokenRes = await fetch(GH_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await tokenRes.json();
      if (!data.access_token) {
        return new Response(`GitHub OAuth failed: ${data.error || "unknown error"}`, {
          status: 500,
        });
      }

      // Decap handshake: first "authorizing:github", then the success payload.
      // The CMS echoes the handshake back; we send the token on the echo,
      // with a timed fallback so login never hangs silently.
      const payload = JSON.stringify({ token: data.access_token, provider: "github" });
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Authorized</title></head><body><p>Login berhasil. Jendela ini akan tertutup otomatis.</p><script>
(function () {
  var successMessage = "authorization:github:success:" + ${JSON.stringify(payload)};
  var sent = false;
  function sendSuccess() {
    if (sent) return;
    sent = true;
    if (window.opener) window.opener.postMessage(successMessage, "*");
    setTimeout(function () { window.close(); }, 500);
  }
  window.addEventListener("message", function (e) {
    if (e.data === "authorizing:github") sendSuccess();
  });
  if (window.opener) window.opener.postMessage("authorizing:github", "*");
  setTimeout(sendSuccess, 800);
})();
</script></body></html>`;
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("pma.wtf Decap OAuth proxy — ok", { status: 200 });
  },
};
