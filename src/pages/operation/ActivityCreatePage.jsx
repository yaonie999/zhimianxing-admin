import React, { useState } from 'react'
import '../../styles/admin.css'

export default function ActivityCreatePage() {
  const [form, setForm] = useState({
    name: '', type: '满减活动', startDate: '', endDate: '',
    threshold: '', discount: '', desc: ''
  })

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>➕ 创建活动</h3>
          <p className="card-subtitle">创建新的营销活动</p>
        </div>
        <div className="card-body" style={{ maxWidth: 640 }}>
          <div className="form-item" style={{ marginBottom: 20 }}>
            <label className="form-label">活动名称</label>
            <input className="form-input" placeholder="如：春季睡眠改善计划" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div className="form-item" style={{ marginBottom: 20 }}>
            <label className="form-label">活动类型</label>
            <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
              <option>满减活动</option>
              <option>折扣活动</option>
              <option>赠品活动</option>
              <option>积分加倍</option>
              <option>抽奖活动</option>
            </select>
          </div>
          <div className="form-row" style={{ marginBottom: 20 }}>
            <div className="form-item" style={{ flex: 1 }}>
              <label className="form-label">开始日期</label>
              <input className="form-input" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
            </div>
            <div className="form-item" style={{ flex: 1 }}>
              <label className="form-label">结束日期</label>
              <input className="form-input" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} />
            </div>
          </div>
          <div className="form-row" style={{ marginBottom: 20 }}>
            <div className="form-item" style={{ flex: 1 }}>
              <label className="form-label">门槛（如：消费满X元）</label>
              <input className="form-input" type="number" placeholder="0" value={form.threshold} onChange={e => set('threshold', e.target.value)} />
            </div>
            <div className="form-item" style={{ flex: 1 }}>
              <label className="form-label">优惠值（如：减X元）</label>
              <input className="form-input" type="number" placeholder="0" value={form.discount} onChange={e => set('discount', e.target.value)} />
            </div>
          </div>
          <div className="form-item" style={{ marginBottom: 20 }}>
            <label className="form-label">活动描述</label>
            <textarea className="form-input" rows={4} placeholder="描述活动规则和说明" value={form.desc} onChange={e => set('desc', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-primary">保存活动</button>
            <button className="btn btn-ghost">取消</button>
          </div>
        </div>
      </div>
    </div>
  )
}
