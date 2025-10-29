// src/features/admin/AdminProductsListPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchConcerts, addConcert, updateConcert, deleteConcert } from "../Product/actions";


import AddEventForm from "./CreateConcertForm";
import EditEventForm from "./EditConcertForm";

/* ------------------- UI Tokens ------------------- */
const C = {
  line: "#f1e6da",
  text: "#1c1c1c",
  textMuted: "#6b6b6b",
  brandGradient: "linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%)",
  danger: "#ef4444",
  dangerDark: "#dc2626",
  focus: "#FF8B59",
};

/* ------------------- Styled Components ------------------- */
const Page = styled.div`
  /* ถ้ามี navbar fixed ให้ชดเชยด้านบนด้วย */
  --nav-height: 112px;            /* ปรับตามความสูงจริงของ Navbar คุณ */
  padding-top: var(--nav-height); /* กันถูกทับ */
  min-height: 100vh;
  background: #fffdf8;
  color: ${C.text};
`;

const Shell = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 16px 80px;
  display: grid;
  gap: 24px;
`;

const HeaderBar = styled.div`
  display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
  h1{
    font-size: 26px;
    background: ${C.brandGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 10px 14px; border-radius: 10px; border: 1px solid ${C.line}; font-weight: 700; cursor: pointer;
  background: ${(p) => (p.variant === "primary" ? C.brandGradient : "#fff")};
  color: ${(p) => (p.variant === "primary" ? "#000" : C.text)};
  transition: all .15s ease;
  &:hover{ transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,.08); }
  &.danger{ color: ${C.danger}; border-color: ${C.danger}; }
  &.danger:hover{ background: ${C.dangerDark}; color: #fff; }
`;

const SearchBar = styled.input`
  padding: 12px 14px; border: 1px solid ${C.line}; border-radius: 12px; width: 100%; max-width: 320px; background: #fff;
  ::placeholder{ color: ${C.textMuted}; }
`;

const Table = styled.table`
  width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,.04);
  thead th{ background: #fff7f3; color: #9a7d6a; font-size: 13px; text-align: left; padding: 14px 16px; border-bottom: 1px solid ${C.line}; }
  tbody td{ padding: 14px 16px; border-bottom: 1px solid ${C.line}; font-size: 14px; vertical-align: middle; }
  tbody tr:hover{ background: #fffaf6; }
`;

const Actions = styled.div` display:flex; gap:8px; flex-wrap:wrap; `;
const Empty = styled.div` text-align:center; padding:28px; color:${C.textMuted}; `;

/* ------------------- Config ------------------- */
const API_BASE = "http://localhost:4000";

/* =================== Page Component =================== */
export default function AdminProductsListPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.concerts || []);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // โหมดฟอร์ม + ไอเท็มที่แก้ไข
  const [formMode, setFormMode] = useState("none"); // 'none' | 'add' | 'edit'
  const [editingItem, setEditingItem] = useState(null);

  /* ─ Load ─ */
  const load = async () => {
    try {
      setErr(""); setLoading(true);
      const res = await axios.get(`${API_BASE}/products`);
      dispatch(fetchConcerts(Array.isArray(res.data) ? res.data : []));
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  /* ─ Search Filter ─ */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) =>
      [p.name, p.location, p.Category].some((v) =>
        String(v || "").toLowerCase().includes(q)
      )
    );
  }, [items, search]);

  /* ─ CRUD ─ */
  const onDelete = async (id) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ที่จะลบรายการนี้?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      dispatch(deleteConcert({ id }));
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleCreate = async (payload) => {
    try {
      const res = await axios.post(`${API_BASE}/products`, payload);
      dispatch(addConcert(res.data));
      alert("เพิ่มข้อมูลสำเร็จ");
      setFormMode("none");
      setEditingItem(null);
      load();
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      const res = await axios.put(`${API_BASE}/products/${id}`, payload);
      dispatch(updateConcert(res.data));
      alert("อัปเดตข้อมูลสำเร็จ");
      setFormMode("none");
      setEditingItem(null);
      load();
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
    }
  };

  const handleCancel = () => {
    setFormMode("none");
    setEditingItem(null);
  };

  /* ─ UI ─ */
  return (
    <Page>
      <Shell>
        <HeaderBar>
          <h1>จัดการอีเวนต์</h1>
          <div style={{ display: "flex", gap: 8 }}>
            {formMode === "none" ? (
              <Button variant="primary" onClick={() => { setFormMode("add"); setEditingItem(null); }}>
                + เพิ่มอีเวนต์
              </Button>
            ) : (
              <Button onClick={handleCancel}>ยกเลิก</Button>
            )}
            <Button onClick={load}>รีเฟรช</Button>
          </div>
        </HeaderBar>

        {/* ฟอร์ม เพิ่ม / แก้ไข */}
        {formMode === "add" && (
          <AddEventForm onCreate={handleCreate} onCancel={handleCancel} />
        )}

        {formMode === "edit" && editingItem && (
          <EditEventForm item={editingItem} onUpdate={handleUpdate} onCancel={handleCancel} />
        )}

        {/* แผงค้นหา */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <SearchBar
            placeholder="🔍 ค้นหา (ชื่อ / สถานที่ / หมวดหมู่)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {err && <div style={{ color: C.danger }}>{err}</div>}
        </div>

        {/* ตาราง */}
        <div>
          {loading ? (
            <div style={{ padding: 16, color: C.textMuted }}>กำลังโหลดข้อมูล...</div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th style={{ width: 60 }}>ID</th>
                  <th>ชื่อ</th>
                  <th>วันที่</th>
                  <th>เวลา</th>
                  <th>สถานที่</th>
                  <th>หมวดหมู่</th>
                  <th style={{ width: 220 }}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7}><Empty>ไม่พบข้อมูล</Empty></td></tr>
                ) : (
                  filtered.map((it) => (
                    <tr key={it.id}>
                      <td>{it.id}</td>
                      <td>{it.name}</td>
                      <td>{it.date}</td>
                      <td>{it.time}</td>
                      <td>{it.location}</td>
                      <td>{it.Category}</td>
                      <td>
                        <Actions>
                          <Button onClick={() => { setFormMode("edit"); setEditingItem(it); }}>
                            แก้ไข
                          </Button>
                          <Button className="danger" onClick={() => onDelete(it.id)}>
                            ลบ
                          </Button>
                        </Actions>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </div>

        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 12 }}>
          • ข้อมูลทั้งหมด {filtered.length} รายการ • API: {API_BASE}
        </div>
      </Shell>
    </Page>
  );
}
