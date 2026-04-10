import React, { useState } from 'react'
import CenterModal from '../CenterModal'

const TAGS = ['失眠', '焦虑', '睡眠呼吸暂停', '嗜睡症', 'REM睡眠障碍', '中医调理', '情绪管理', '神经内科']
const TITLE_OPTIONS = ['睡眠医学专家', '心理咨询师', '中医睡眠专家', '神经内科专家', '精神科医生']

export default function EditExpertDrawer({ expert, onClose, onSave }) {
  const [form, setForm] = useState({ ...expert })
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(expert?.avatarUrl || null)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarPreview(url)
      set('avatarFile', file)
    }
  }

  async function handleSave() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onSave(form)
    setLoading(false)
  }

  return (
    <CenterModal open={true} onClose={onClose} title="编辑专家" width={520}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确定'}</button>
      </>}
    >
      <div className="form-item" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: avatarPreview ? `url(${avatarPreview}) center/cover` : '#E2E8F0',
          border: '2px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, color: '#94A3B8', overflow: 'hidden', flexShrink: 0
        }}>
          {!avatarPreview && (form.name?.charAt(0) || '👤')}
        </div>
        <div>
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-block' }}>
            上传头像
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </label>
          {avatarPreview && (
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: 8 }} onClick={() => { setAvatarPreview(null); set('avatarFile', null) }}>移除</button>
          )}
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">姓名</label>
        <input className="form-input" value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="请输入专家姓名" />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">职称</label>
        <select className="form-select" value={form.title || ''} onChange={e => set('title', e.target.value)}>
          {TITLE_OPTIONS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">所属医院</label>
        <input className="form-input" value={form.hospital || ''} onChange={e => set('hospital', e.target.value)} placeholder="请输入所属医院" />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">擅长领域</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TAGS.map(tag => (
            <span key={tag} onClick={() => {
              const cur = form.expertise || []
              if (cur.includes(tag)) set('expertise', cur.filter(t => t !== tag))
              else set('expertise', [...cur, tag])
            }}
              style={{
                padding: '4px 12px', borderRadius: 16, fontSize: 13, cursor: 'pointer',
                background: (form.expertise || []).includes(tag) ? '#EFF6FF' : '#F1F5F9',
                border: (form.expertise || []).includes(tag) ? '1.5px solid #1E3A5F' : '1.5px solid #E2E8F0',
                color: (form.expertise || []).includes(tag) ? '#1E3A5F' : '#64748B',
                fontWeight: (form.expertise || []).includes(tag) ? 600 : 400,
              }}
            >{tag}</span>
          ))}
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">咨询费用（元/次）</label>
        <input className="form-input" type="number" value={form.price || 0} onChange={e => set('price', parseInt(e.target.value))} placeholder="0" />
      </div>

      <div className="form-item">
        <label className="form-label">在线状态</label>
        <select className="form-select" value={form.status || '离线'} onChange={e => set('status', e.target.value)}>
          <option value="在线">在线</option>
          <option value="忙碌">忙碌</option>
          <option value="离线">离线</option>
        </select>
      </div>
    </CenterModal>
  )
}
