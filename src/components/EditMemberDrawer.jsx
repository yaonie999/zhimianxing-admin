import React, { useState } from 'react'
import CenterModal from './CenterModal'

const STUDIOS = ['朝阳睡眠工作室', '海淀健康中心', '浦东睡眠医学中心', '天河睡眠驿站']
const ADVISORS = ['李医生', '王健康师', '张睡眠师', '随机分配']
const LEVELS = ['青铜会员', '白银会员', '黄金会员', '铂金会员', '钻石会员']

export default function EditMemberDrawer({ member, onClose, onSave }) {
  const [form, setForm] = useState({ ...member })
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(member?.avatarUrl || null)

  function set(k, val) { setForm(prev => ({ ...prev, [k]: val })) }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
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
    <CenterModal open={true} onClose={onClose} title="编辑会员" width={560}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确认保存'}</button>
      </>}
    >
      {/* 头像 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: avatarPreview ? `url(${avatarPreview}) center/cover` : '#E2E8F0',
          border: '2px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, color: '#CBD5E1', overflow: 'hidden', flexShrink: 0
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
        <label className="form-label">患者姓名</label>
        <input className="form-input" value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="请输入姓名" />
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">手机号</label>
          <input className="form-input" value={form.phone || ''} disabled style={{ opacity: 0.6 }} />
        </div>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">性别</label>
          <select className="form-select" value={form.gender || '男'} onChange={e => set('gender', e.target.value)}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">年龄</label>
          <input className="form-input" type="number" value={form.age || ''} onChange={e => set('age', parseInt(e.target.value))} placeholder="年龄" />
        </div>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">职业</label>
          <input className="form-input" value={form.job || ''} onChange={e => set('job', e.target.value)} placeholder="职业" />
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">婚姻状况</label>
        <select className="form-select" value={form.marriage || '已婚'} onChange={e => set('marriage', e.target.value)}>
          <option value="已婚">已婚</option>
          <option value="未婚">未婚</option>
          <option value="离异">离异</option>
          <option value="丧偶">丧偶</option>
        </select>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">所属工作室</label>
        <select className="form-select" value={form.studio || ''} onChange={e => set('studio', e.target.value)}>
          <option value="">请选择工作室</option>
          {STUDIOS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">所属健康师</label>
        <select className="form-select" value={form.advisor || ''} onChange={e => set('advisor', e.target.value)}>
          <option value="">请选择健康师</option>
          {ADVISORS.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">会员等级</label>
        <select className="form-select" value={form.level || '青铜会员'} onChange={e => set('level', e.target.value)}>
          {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">当前积分</label>
          <input className="form-input" value={form.points?.toLocaleString() || 0} disabled style={{ opacity: 0.6 }} />
        </div>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">成长值</label>
          <input className="form-input" type="number" value={form.growth || 0} onChange={e => set('growth', parseInt(e.target.value))} />
        </div>
      </div>
    </CenterModal>
  )
}
