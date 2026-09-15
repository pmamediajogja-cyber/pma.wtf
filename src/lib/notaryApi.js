const API_BASE = (import.meta.env.VITE_NOTARY_API_URL || "/notary-api/").replace(/\/$/, "");

let csrfToken = null;

function endpoint(path) {
  return `${API_BASE}/${path.replace(/^\//, "")}`;
}

async function request(path, options = {}) {
  const response = await fetch(endpoint(path), {
    credentials: "include",
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }),
      ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
      ...(options.headers || {}),
    },
  });
  let payload = null;
  try { payload = await response.json(); } catch { throw new Error(`Server mengembalikan respons tidak valid (${response.status}).`); }
  if (payload?.csrf_token) csrfToken = payload.csrf_token;
  if (!response.ok || payload?.status === "error") {
    const error = new Error(payload?.pesan || `Permintaan gagal (${response.status}).`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function formBody(values) {
  const body = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => { if (value !== undefined && value !== null) body.set(key, String(value)); });
  return body;
}

export async function getAuth() { return request("auth.php", { method: "GET" }); }
export async function login(email, password) { return request("auth.php", { method: "POST", body: formBody({ action: "login", email, password }) }); }
export async function logout() { try { return await request("auth.php", { method: "POST", body: formBody({ action: "logout" }) }); } finally { csrfToken = null; } }
export async function listUsers() { return request("api_users.php?action=list", { method: "GET" }); }
export async function createUser({ name, email, role, password }) { return request("api_users.php?action=create", { method: "POST", body: formBody({ name, email, role, password }) }); }
export async function updateUser({ userId, name, email, role }) { return request("api_users.php?action=update", { method: "POST", body: formBody({ user_id: userId, name, email, role }) }); }
export async function setUserActive(userId, isActive) { return request("api_users.php?action=set_active", { method: "POST", body: formBody({ user_id: userId, is_active: isActive ? "true" : "false" }) }); }
export async function resetUserPassword(userId, password) { return request("api_users.php?action=reset_password", { method: "POST", body: formBody({ user_id: userId, password }) }); }
export async function listMatters() {
  const payload = await request("api_matters.php?action=list", { method: "GET" });
  return { data: Array.isArray(payload) ? payload : (payload.data || []) };
}
export async function createDocumentReceipt({ matter_id, direction, counterparty_name, receipt_date, staff_name, items }) {
  return request("api_document_receipts.php?action=create", { method: "POST", body: formBody({ matter_id, direction, counterparty_name, receipt_date, staff_name, items: JSON.stringify(items) }) });
}
export async function listDocumentReceipts() { return request("api_document_receipts.php?action=list", { method: "GET" }); }
export async function getDocumentReceipt(receiptId) { return request(`api_document_receipts.php?action=detail&id=${encodeURIComponent(receiptId)}`, { method: "GET" }); }
export function clearNotaryApiSession() { csrfToken = null; }
export function getNotaryApiBase() { return API_BASE; }
