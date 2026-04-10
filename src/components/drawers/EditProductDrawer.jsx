import React, { useState } from 'react'
import CenterModal from '../CenterModal'

const CATEGORIES = ['服务类', '实物类', '虚拟类']
const STATUS_OPTIONS = ['上架', '下架']

export default function EditProductDrawer({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || '服务类',
    status: product?.status || '上架',
    price: product?.price || 0,
    stock: product?.stock || 0,
    imagePreview: product?.imagePreview || null,
    description: product?.description || '',
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
    <CenterModal
      open={true}
      onClose={onClose}
      title="新增/编辑商品"
      width={540}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>
            {loading ? '保存中...' : '确定'}
          </button>
        </>
      }
    >
      {/* 商品图片 */}
      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">商品图片</label>
        <div
          style={{
            width: '100%', height: 140, border: '2px dashed #E2E8F0', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', background: '#FAFBFC', overflow: 'hidden'
          }}
          onClick={() => document.getElementById('product-img-input').click()}
        >
          {form.imagePreview ? (
            <img src={form.imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
          ) : (
            <div style={{ textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 13 }}>点击上传商品图片</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>建议尺寸 400×400</div>
            </div>
          )}
          <input id="product-img-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
        {form.imagePreview && (
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => { set('imagePreview', null) }}>移除</button>
        )}
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">商品名称</label>
        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="请输入商品名称" />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">商品分类</label>
        <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">商品状态</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {STATUS_OPTIONS.map(s => (
            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="product-status" value={s} checked={form.status === s} onChange={() => set('status', s)} />
              <span style={{ color: form.status === s ? (s === '上架' ? '#059669' : '#EF4444') : '#94A3B8', fontWeight: form.status === s ? 600 : 400 }}>
                {s === '上架' ? '✅ 上架' : '⛔ 下架'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">价格（元）</label>
          <input className="form-input" type="number" value={form.price} onChange={e => set('price', parseFloat(e.target.value))} placeholder="0.00" min={0} step={0.01} />
        </div>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">库存</label>
          <input className="form-input" type="number" value={form.stock} onChange={e => set('stock', parseInt(e.target.value))} placeholder="0" min={0} />
        </div>
      </div>

      <div className="form-item">
        <label className="form-label">产品介绍</label>
        <textarea className="form-input" rows={4} value={form.description} onChange={e => set('description', e.target.value)} placeholder="请输入商品详细描述" style={{ resize: 'vertical' }} />
      </div>
    </CenterModal>
  )
}
