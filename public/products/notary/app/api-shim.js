/* PMA.WTF /notary — pengganti API PHP (api_*.php) dengan localStorage.
 * File asli: api_agenda.php, api_invoice.php, api_pelacakan.php,
 * api_pelacakan_dian.php. Kontrak request/response dipertahankan 1:1
 * supaya halaman HTML tidak perlu diubah.
 * Data tersimpan per-browser (localStorage), bukan server.
 */
(function () {
  var PREFIX = "pma_notary_";

  function get(ns) {
    try {
      var v = JSON.parse(localStorage.getItem(PREFIX + ns));
      return v === null || v === undefined ? null : v;
    } catch (e) {
      return null;
    }
  }
  function set(ns, v) {
    try {
      localStorage.setItem(PREFIX + ns, JSON.stringify(v));
    } catch (e) {}
  }
  function nextId(rows) {
    var m = 0;
    for (var i = 0; i < rows.length; i++) m = Math.max(m, rows[i].id || 0);
    return m + 1;
  }
  function json(data) {
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
  }
  var LOCK_TTL = 15 * 60 * 1000; // 15 menit, sama seperti PHP

  // ---- pelacakan & pelacakan_dian ----
  function pelacakan(ns, action, params, body) {
    var rows = get(ns) || [];
    if (action === "ping") return json({ status: "online" });
    if (action === "load") {
      var sorted = rows.slice().sort(function (a, b) {
        return (b._updated || 0) - (a._updated || 0);
      });
      return json(sorted);
    }
    if (action === "delete") {
      var delId = parseInt(params.get("id"), 10);
      set(
        ns,
        rows.filter(function (r) {
          return r.id !== delId;
        })
      );
      return json({ status: "success" });
    }
    if (action === "save") {
      var d = body || {};
      if (!d) return json({ status: "error" });
      d._updated = Date.now();
      if (d.id) {
        rows = rows.map(function (r) {
          if (r.id === d.id) {
            var merged = {};
            for (var k in d) merged[k] = d[k];
            merged.locked_by = null;
            merged.locked_time = null;
            return merged;
          }
          return r;
        });
      } else {
        d.id = nextId(rows);
        d.locked_by = null;
        d.locked_time = null;
        rows.unshift(d);
      }
      set(ns, rows);
      return json({ status: "success" });
    }
    if (action === "check_lock") {
      var id = parseInt((body || {}).id, 10);
      var clientId = (body || {}).client_id;
      var rec = null;
      for (var i = 0; i < rows.length; i++) if (rows[i].id === id) rec = rows[i];
      if (
        rec &&
        rec.locked_by &&
        rec.locked_by !== clientId &&
        Date.now() - new Date(rec.locked_time).getTime() < LOCK_TTL
      ) {
        return json({
          status: "locked",
          pesan:
            "Berkas ini sedang dikerjakan/dibuka oleh Staf lain. Silakan tunggu beberapa saat.",
        });
      }
      rows = rows.map(function (r) {
        if (r.id === id) {
          r.locked_by = clientId;
          r.locked_time = new Date().toISOString();
        }
        return r;
      });
      set(ns, rows);
      return json({ status: "available" });
    }
    if (action === "release_lock") {
      var rid = parseInt((body || {}).id, 10);
      var rcid = (body || {}).client_id;
      rows = rows.map(function (r) {
        if (r.id === rid && r.locked_by === rcid) {
          r.locked_by = null;
          r.locked_time = null;
        }
        return r;
      });
      set(ns, rows);
      return json({ status: "released" });
    }
    return json({ status: "error" });
  }

  // ---- invoice ----
  function invoice(action, params, body) {
    var rows = get("invoice") || [];
    if (action === "load") {
      var sorted = rows.slice().sort(function (a, b) {
        return b.id - a.id;
      });
      return json(sorted);
    }
    if (action === "delete") {
      var delId = parseInt(params.get("id"), 10);
      set(
        "invoice",
        rows.filter(function (r) {
          return r.id !== delId;
        })
      );
      return json({ status: "success" });
    }
    if (action === "save") {
      var d = body || {};
      if (!d) return json({ status: "error", pesan: "Tidak ada data yang dikirim" });
      var p1 = (d.penjual || "").trim();
      var p2 = (d.pembeli || "").trim();
      var namaPihak = p2 ? p1 + " & " + p2 : p1;
      var nid;
      if (d.id) {
        nid = d.id;
        rows = rows.map(function (r) {
          return r.id === nid
            ? { id: r.id, no_invoice: d.no_invoice, nama_pihak: namaPihak, data_json: d }
            : r;
        });
      } else {
        nid = nextId(rows);
        rows.unshift({ id: nid, no_invoice: d.no_invoice, nama_pihak: namaPihak, data_json: d });
      }
      set("invoice", rows);
      return json({ status: "success", id: nid });
    }
    return json({ status: "error" });
  }

  // ---- agenda ----
  function agenda(action, body) {
    if (action === "load") return json(get("agenda") || {});
    if (action === "save") {
      set("agenda", body || {});
      return json({ status: "success" });
    }
    return json({ status: "error" });
  }

  // ---- intercept fetch ----
  var origFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : input.url;
    var m = /api_(agenda|invoice|pelacakan_dian|pelacakan)\.php/.exec(url);
    if (!m) return origFetch(input, init);
    var full;
    try {
      full = new URL(url, location.href);
    } catch (e) {
      return origFetch(input, init);
    }
    var action = full.searchParams.get("action") || "";
    var body = null;
    try {
      body = init && init.body ? JSON.parse(init.body) : null;
    } catch (e) {}
    var name = m[1];
    if (name === "agenda") return Promise.resolve(agenda(action, body));
    if (name === "invoice") return Promise.resolve(invoice(action, full.searchParams, body));
    return Promise.resolve(
      pelacakan(name === "pelacakan_dian" ? "pelacakan_dian" : "pelacakan", action, full.searchParams, body)
    );
  };
})();
