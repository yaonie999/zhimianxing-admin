import React, { useState } from 'react'
import CenterModal from '../CenterModal'

const TAGS = ['失眠', '焦虑', '睡眠呼吸', '嗜睡', '中医调理', '情绪管理', '神经内科', '健康科普']

export default function EditTopicDrawer({ topic, onClose, onSave }) {
  const [form, setForm] = useState({
    name: topic?.name || '',
    tags: topic?.tags || [],
    sort: topic?.sort || 1,
    status: topic?.status || '显示',
  })
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  async function handleSave() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onSave(form)
    setLoading(false)
  }

  return (
    <CenterModal open={true} onClose={onClose} title="新增/编辑话题" width={500}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确定'}</button>
      </>}
    >
      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">话题名称</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="如：#睡眠改善#" />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">标签</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TAGS.map(tag => (
            <span key={tag} onClick={() => {
              const cur = form.tags
              if (cur.includes(tag)) set('tags', cur.filter(t => t !== tag))
              else set('tags', [...cur, tag])
            }}
              style={{
                padding: '4px 12px', borderRadius: 16, fontSize: 13, cursor: 'pointer',
                background: form.tags.includes(tag) ? '#EFF6FF' : '#F1F5F9',
                border: form.tags.includes(tag) ? '1.5px solid #1E3A5F' : '1.5px solid #E2E8F0',
                color: form.tags.includes(tag) ? '#1E3A5F' : '#9CA3AF',
                fontWeight: form.tags.includes(tag) ? 600 : 400,
              }}
            >{tag}</span>
          ))}
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">排序</label>
        <input className="form-input" type="number" value={form.sort} onChange={e => set('sort', parseInt(e.target.value))} placeholder="1" min={1} />
        <p style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}>💡 数字越小排序越靠前</p>
      </div>

      <div className="form-item">
        <label className="form-label">状态</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {['显示', '隐藏'].map(s => (
            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="topic-status" value={s} checked={form.status === s} onChange={() => set('status', s)} />
              <span style={{ color: form.status === s ? '#1E3A5F' : '#CBD5E1', fontWeight: form.status === s ? 600 : 400 }}>
                {s === '显示' ? '👁 显示' : '🙈 隐藏'}
              </span>
            </label>
          ))}
        </div>
      </div>
    </CenterModal>
  )
}
