import React, { useState } from 'react'
import CenterModal from '../CenterModal'

export default function EditCategoryDrawer({ category, onClose, onSave }) {
  const [form, setForm] = useState({
    name: category?.name || '',
    status: category?.status || '开启',
    attrs: category?.attrs || ['', '', '', ''],
  })
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }
  function setAttr(idx, val) {
    const attrs = [...form.attrs]
    attrs[idx] = val
    set('attrs', attrs)
  }

  async function handleSave() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onSave(form)
    setLoading(false)
  }

  return (
    <CenterModal open={true} onClose={onClose} title="新增/编辑分类" width={480}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确定'}</button>
      </>}
    >
      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">分类名称</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="请输入分类名称" />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">分类状态</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {['开启', '隐藏'].map(s => (
            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="cat-status" value={s} checked={form.status === s} onChange={() => set('status', s)} />
              <span style={{ color: form.status === s ? '#1E3A5F' : '#94A3B8', fontWeight: form.status === s ? 600 : 400 }}>
                {s === '开启' ? '👁 显示' : '🙈 隐藏'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {[1, 2, 3, 4].map((n, idx) => (
        <div className="form-item" key={n} style={{ marginBottom: 12 }}>
          <label className="form-label">属性名称{n}</label>
          <input className="form-input" value={form.attrs[idx]} onChange={e => setAttr(idx, e.target.value)} placeholder={`请输入属性${n}`} />
        </div>
      ))}
    </CenterModal>
  )
}
