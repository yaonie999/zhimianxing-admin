import React, { useState } from 'react'
import CenterModal from './CenterModal'

export default function EditLevelDrawer({ level, onClose, onSave }) {
  const [form, setForm] = useState({ ...level })
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  async function handleSave() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onSave(form)
    setLoading(false)
  }

  const discounts = ['100', '98', '95', '90', '88', '85', '80', '75', '70', '60', '50']

  return (
    <CenterModal open={true} onClose={onClose} title={`编辑等级：${level.name}`} width={560}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确定保存'}</button>
      </>}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0', marginBottom: 12 }}>等级信息</div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">等级名称</label>
        <input className="form-input" value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="如：黄金会员" />
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">成长值起始</label>
          <input className="form-input" type="number" value={form.min || 0} onChange={e => set('min', parseInt(e.target.value))} />
        </div>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">成长值上限</label>
          <input className="form-input" type="number" value={form.max || 999999} onChange={e => set('max', parseInt(e.target.value))} />
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">等级图标</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['🥉', '🥈', '🥇', '💎', '💠', '🏆', '⭐', '🌟', '👑'].map(icon => (
            <div key={icon} onClick={() => set('icon', icon)}
              style={{
                width: 44, height: 44, borderRadius: 8,
                background: form.icon === icon ? '#EFF6FF' : '#F8FAFC',
                border: form.icon === icon ? '2px solid #1E3A5F' : '1.5px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, cursor: 'pointer',
              }}
            >{icon}</div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0', marginBottom: 12, marginTop: 8 }}>等级权益</div>

      <div className="form-item" style={{ marginBottom: 12 }}>
        <label className="form-label">折扣类型</label>
        <select className="form-select" value={form.discountType || '打折'} onChange={e => set('discountType', e.target.value)}>
          <option value="打折">消费打折</option>
          <option value="积分倍数">消费双倍积分</option>
        </select>
      </div>

      {form.discountType === '打折' && (
        <div className="form-item" style={{ marginBottom: 12 }}>
          <label className="form-label">折扣比例</label>
          <select className="form-select" value={form.discount || '90'} onChange={e => set('discount', e.target.value)}>
            {discounts.map(d => <option key={d} value={d}>{d === '100' ? '无折扣（100%）' : `${d}折`}</option>)}
          </select>
        </div>
      )}

      {form.discountType === '积分倍数' && (
        <div className="form-item" style={{ marginBottom: 12 }}>
          <label className="form-label">积分倍数</label>
          <select className="form-select" value={form.pointsMultiple || 2} onChange={e => set('pointsMultiple', parseInt(e.target.value))}>
            <option value={1}>无倍数</option>
            <option value={2}>双倍积分</option>
            <option value={3}>三倍积分</option>
            <option value={5}>五倍积分</option>
          </select>
        </div>
      )}
    </CenterModal>
  )
}
