import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const C = {
  line: "#f1e6da",
  text: "#1c1c1c",
  textMuted: "#6b6b6b",
  brandGradient: "linear-gradient(90deg, #FF7F49 30%, #FFBC6A 63%, #9CE3DC 100%)",
  danger: "#ef4444",
  dangerDark: "#dc2626",
  focus: "#FF8B59",
};

const Card = styled.div`
  background:#fff; border:1px solid ${C.line}; border-radius:12px; box-shadow:0 3px 8px rgba(0,0,0,.03);
  padding:20px; display:grid; gap:12px;
`;
const Button = styled.button`
  padding:10px 14px; border-radius:10px; border:1px solid ${C.line}; font-weight:700; cursor:pointer;
  background:${p=>p.variant==="primary"?C.brandGradient:"#fff"};
  color:${p=>p.variant==="primary"?"#000":C.text};
  transition:all .15s ease;
  &:hover{ transform: translateY(-1px); box-shadow:0 4px 10px rgba(0,0,0,.08); }
  &.danger{ color:${C.danger}; border-color:${C.danger}; }
  &.danger:hover{ background:${C.dangerDark}; color:#fff; }
`;
const Label = styled.label`
  font-size:12px; color:${C.textMuted}; margin-bottom:6px; display:block;
`;
const Input = styled.input`
  padding:10px 12px; border-radius:8px; border:1px solid ${C.line}; width:100%;
  &:focus{ border-color:${C.focus}; box-shadow:0 0 0 3px rgba(255,139,89,.15); outline:none; }
`;
const Textarea = styled.textarea`
  padding:10px 12px; border-radius:8px; border:1px solid ${C.line}; width:100%; min-height:84px; resize:vertical;
  &:focus{ border-color:${C.focus}; box-shadow:0 0 0 3px rgba(255,139,89,.15); outline:none; }
`;
const Row = styled.div`
  display:grid; grid-template-columns:1fr 1fr; gap:10px;
  @media(max-width:720px){ grid-template-columns:1fr; }
`;
const PriceList = styled.div` display:grid; gap:8px; `;
const PriceRow = styled.div`
  display:grid; grid-template-columns:1fr 140px 84px; gap:8px; align-items:center;
  @media(max-width:600px){ grid-template-columns:1fr 110px 72px; }
`;

export default function EditEventForm({ item, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    name:"", date:"", time:"", location:"",
    prices:[],
    image:"", venueImage:"", Banner:"",
    description:[{ main:"", ticket:"", condition:"" }],
    Category:"",
  });

  useEffect(()=>{
    if(!item) return;
    setForm({
      name: item.name ?? "",
      date: item.date ?? "",
      time: item.time ?? "",
      location: item.location ?? "",
      prices: Array.isArray(item.prices) ? item.prices : [],
      image: item.image ?? "",
      venueImage: item.venueImage ?? "",
      description: Array.isArray(item.description) && item.description[0]
        ? item.description
        : [{ main:"", ticket:"", condition:"" }],
      Category: item.Category ?? "",
      Banner: item.Banner ?? "",
    });
  },[item]);

  const setField = (k,v)=>setForm(f=>({...f,[k]:v}));
  const desc = useMemo(()=> form.description?.[0] ?? {main:"",ticket:"",condition:""}, [form]);
  const setDesc = (k,v)=>setField("description", [{...desc,[k]:v}]);

  const addPrice = ()=> setField("prices", [...(form.prices||[]), {option:"", amount:0}]);
  const updatePrice = (i,k,v)=> setField("prices",
    form.prices.map((p,idx)=> idx===i ? {...p,[k]:v} : p)
  );
  const removePrice = (i)=> setField("prices", form.prices.filter((_,idx)=> idx!==i));

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!item) return;
    const payload = {
      ...form,
      prices: Array.isArray(form.prices)? form.prices : [],
      description: Array.isArray(form.description)&&form.description[0]? form.description : [desc],
    };
    onUpdate?.(item.id, payload);
  };

  if(!item) return null;

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <h3 style={{marginTop:0}}>แก้ไข #{item.id}</h3>

      <Row>
        <div>
          <Label>ชื่ออีเวนต์</Label>
          <Input value={form.name} onChange={(e)=>setField("name", e.target.value)} />
        </div>
        <div>
          <Label>หมวดหมู่ (Category)</Label>
          <Input value={form.Category} onChange={(e)=>setField("Category", e.target.value)} />
        </div>
      </Row>

      <Row>
        <div>
          <Label>วันที่</Label>
          <Input value={form.date} onChange={(e)=>setField("date", e.target.value)} />
        </div>
        <div>
          <Label>เวลา</Label>
          <Input value={form.time} onChange={(e)=>setField("time", e.target.value)} />
        </div>
      </Row>

      <Row>
        <div>
          <Label>สถานที่</Label>
          <Input value={form.location} onChange={(e)=>setField("location", e.target.value)} />
        </div>
        <div>
          <Label>รูปภาพหลัก (image)</Label>
          <Input value={form.image} onChange={(e)=>setField("image", e.target.value)} />
        </div>
      </Row>

      <Row>
        <div>
          <Label>รูปภาพสถานที่ (venueImage)</Label>
          <Input value={form.venueImage} onChange={(e)=>setField("venueImage", e.target.value)} />
        </div>
        <div>
          <Label>รูปแบนเนอร์ (Banner)</Label>
          <Input value={form.Banner} onChange={(e)=>setField("Banner", e.target.value)} />
        </div>
      </Row>

      <div>
        <Label>ราคาบัตร (prices)</Label>
        <PriceList>
          {(form.prices||[]).map((p,i)=>(
            <PriceRow key={i}>
              <Input placeholder="option เช่น VIP Album / A / B"
                     value={p.option}
                     onChange={(e)=>updatePrice(i,"option", e.target.value)} />
              <Input type="number" placeholder="amount"
                     value={p.amount}
                     onChange={(e)=>updatePrice(i,"amount", Number(e.target.value))} />
              <Button type="button" onClick={()=>removePrice(i)}>ลบ</Button>
            </PriceRow>
          ))}
          <Button type="button" onClick={addPrice}>+ เพิ่มราคา</Button>
        </PriceList>
      </div>

      <div>
        <Label>รายละเอียด (description.main)</Label>
        <Textarea value={desc.main} onChange={(e)=>setDesc("main", e.target.value)} />
      </div>
      <Row>
        <div>
          <Label>สรุปราคา (description.ticket)</Label>
          <Input value={desc.ticket} onChange={(e)=>setDesc("ticket", e.target.value)} />
        </div>
        <div>
          <Label>เงื่อนไข (description.condition)</Label>
          <Input value={desc.condition} onChange={(e)=>setDesc("condition", e.target.value)} />
        </div>
      </Row>

      <div style={{display:"flex", gap:8}}>
        <Button variant="primary" type="submit">บันทึกการแก้ไข</Button>
        <Button type="button" onClick={onCancel}>ยกเลิก</Button>
      </div>
    </Card>
  );
}
