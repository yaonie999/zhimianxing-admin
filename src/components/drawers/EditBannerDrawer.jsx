import React, { useState } from 'react'
import CenterModal from '../CenterModal'

const POSITIONS = ['启动页', '首页Banner', '首页中部', '社区Banner', '活动Banner']
const JUMP_TYPES = ['无跳转', '链接地址', '窜文本']

export default function EditBannerDrawer({ banner, onClose, onSave }) {
  const [form, setForm] = useState({
    name: banner?.name || '',
    imagePreview: banner?.imagePreview || null,
    status: banner?.status || '启用',
    position: banner?.position || '首页Banner',
    jumpType: banner?.jumpType || '无跳转',
    jumpValue: banner?.jumpValue || '',
    content: banner?.content || '',
  })
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      set('imagePreview', URL.createObjectURL(file))
      set('imageFile', file)
    }
  }

  async function handleSave() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onSave(form)
    setLoading(false)
  }

  return (
    <CenterModal open={true} onClose={onClose} title="编辑内容" width={540}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确定'}</button>
      </>}
    >
      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">广告名称</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="请输入广告名称" />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">广告图片</label>
        <div
          style={{ width: '100%', height: 140, border: '2px dashed #E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#FAFBFC', overflow: 'hidden' }}
          onClick={() => document.getElementById('banner-img-input').click()}
        >
          {form.imagePreview ? (
            <img src={form.imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
          ) : (
            <div style={{ textAlign: 'center', color: '#CBD5E1' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 13 }}>点击上传广告图片</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>建议尺寸 750×400</div>
            </div>
          )}
          <input id="banner-img-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
        {form.imagePreview && (
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => { set('imagePreview', null) }}>移除图片</button>
        )}
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">状态</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {['启用', '停用'].map(s => (
            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="banner-status" value={s} checked={form.status === s} onChange={() => set('status', s)} />
              <span style={{ color: s === '启用' ? '#059669' : '#EF4444', fontWeight: form.status === s ? 600 : 400 }}>{s === '启用' ? '✅ 启用' : '⛔ 停用'}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">广告位置</label>
        <select className="form-select" value={form.position} onChange={e => set('position', e.target.value)}>
          {POSITIONS.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">点击跳转事件</label>
        <select className="form-select" value={form.jumpType} onChange={e => set('jumpType', e.target.value)}>
          {JUMP_TYPES.map(j => <option key={j}>{j}</option>)}
        </select>
      </div>

      {form.jumpType !== '无跳转' && (
        <div className="form-item" style={{ marginBottom: 16 }}>
          <label className="form-label">{form.jumpType === '链接地址' ? '链接地址' : '文本内容'}</label>
          <input className="form-input" value={form.jumpValue} onChange={e => set('jumpValue', e.target.value)} placeholder={form.jumpType === '链接地址' ? 'https://...' : '请输入文本内容'} />
        </div>
      )}

      <div className="form-item">
        <label className="form-label">广告内容</label>
        <textarea className="form-input" rows={4} value={form.content} onChange={e => set('content', e.target.value)} placeholder="请输入广告描述" style={{ resize: 'vertical' }} />
      </div>
    </CenterModal>
  )
}
