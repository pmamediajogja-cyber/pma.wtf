import { useMemo, useState } from "react";

const seedUsers = [
  { id: 1, name: "Imam Falahi", email: "admin@kantor-demo.id", role: "OWNER", active: true, lastLogin: "Hari ini, 08:41" },
  { id: 2, name: "Siti Rahma", email: "siti@kantor-demo.id", role: "NOTARIS", active: true, lastLogin: "Hari ini, 08:12" },
  { id: 3, name: "Dimas Pratama", email: "dimas@kantor-demo.id", role: "ADMIN", active: true, lastLogin: "Kemarin, 16:28" },
  { id: 4, name: "Rina Lestari", email: "rina@kantor-demo.id", role: "STAFF", active: true, lastLogin: "Kemarin, 15:04" },
];

const roleLabel = { OWNER: "Owner", NOTARIS: "Notaris", ADMIN: "Administrator", STAFF: "Staff" };
const roleTone = { OWNER: "owner", NOTARIS: "notaris", ADMIN: "admin", STAFF: "staff" };

export default function UserManagement() {
  const [users, setUsers] = useState(seedUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("ALL");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "STAFF" });

  const filtered = useMemo(() => users.filter(u => {
    const hit = `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase());
    return hit && (role === "ALL" || u.role === role);
  }), [users, query, role]);

  const createUser = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setUsers([...users, { id: Date.now(), ...form, name: form.name.trim(), email: form.email.trim().toLowerCase(), active: true, lastLogin: "Belum pernah masuk" }]);
    setForm({ name: "", email: "", role: "STAFF" });
    setModal(false);
  };

  const toggle = id => setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));

  return <section className="user-management module-page">
    <div className="user-toolbar">
      <div><span className="user-kicker">AKSES & PERSONEL KANTOR</span><h2>Pengguna & Staff</h2><p>Kelola akun, role, dan status akses pengguna dalam kantor.</p></div>
      <button className="user-primary" onClick={() => setModal(true)}>+ Tambah Pengguna</button>
    </div>
    <div className="user-summary">
      <div><span>Total pengguna</span><strong>{users.length}</strong></div>
      <div><span>Aktif</span><strong>{users.filter(u => u.active).length}</strong></div>
      <div><span>Notaris / Owner</span><strong>{users.filter(u => ["OWNER", "NOTARIS"].includes(u.role)).length}</strong></div>
      <div><span>Staff</span><strong>{users.filter(u => u.role === "STAFF").length}</strong></div>
    </div>
    <div className="user-panel">
      <div className="user-filters"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama atau email..."/><select value={role} onChange={e => setRole(e.target.value)}><option value="ALL">Semua role</option><option value="OWNER">Owner</option><option value="NOTARIS">Notaris</option><option value="ADMIN">Administrator</option><option value="STAFF">Staff</option></select></div>
      <div className="user-table-wrap"><table className="user-table"><thead><tr><th>PENGGUNA</th><th>ROLE</th><th>STATUS</th><th>LOGIN TERAKHIR</th><th></th></tr></thead><tbody>{filtered.map(u => <tr key={u.id}><td><div className="user-person"><i>{u.name.split(" ").map(x => x[0]).slice(0,2).join("")}</i><div><strong>{u.name}</strong><small>{u.email}</small></div></div></td><td><span className={`role-badge ${roleTone[u.role]}`}>{roleLabel[u.role]}</span></td><td><span className={`user-status ${u.active ? "active" : "inactive"}`}><b/> {u.active ? "Aktif" : "Nonaktif"}</span></td><td className="user-login">{u.lastLogin}</td><td><button className="user-action" onClick={() => toggle(u.id)}>{u.active ? "Nonaktifkan" : "Aktifkan"}</button></td></tr>)}</tbody></table></div>
      <div className="user-security-note"><strong>Kontrol akses</strong><span>Role menentukan kewenangan. Pengguna hanya dapat dikelola sesuai hierarki akses kantor.</span></div>
    </div>
    {modal && <div className="user-modal-backdrop"><div className="user-modal"><div className="user-modal-head"><div><span>TAMBAH AKUN</span><h3>Pengguna baru</h3></div><button onClick={() => setModal(false)}>×</button></div><form onSubmit={createUser}><label>Nama lengkap<input autoFocus value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nama pengguna"/></label><label>Email kantor<input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="nama@kantor.id"/></label><label>Role<select value={form.role} onChange={e => setForm({...form,role:e.target.value})}><option value="STAFF">Staff</option><option value="ADMIN">Administrator</option><option value="NOTARIS">Notaris</option><option value="OWNER">Owner</option></select></label><div className="user-modal-actions"><button type="button" onClick={() => setModal(false)}>Batal</button><button type="submit">Buat Pengguna</button></div></form></div></div>}
  </section>;
}
