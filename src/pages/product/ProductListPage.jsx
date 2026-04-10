import React, { useState } from 'react'
import '../../styles/admin.css'
import EditProductDrawer from '../../components/drawers/EditProductDrawer'

const GOODS = [
  { id: 1, name: '7天睡眠改善计划', category: '服务类', price: 599, stock: 128, sales: 342, status: '上架', rating: 4.8, imagePreview: null, description: '专业睡眠顾问一对一指导，7天改善您的睡眠质量', creator: '管理员', createTime: '2026-01-15' },
  { id: 2, name: '薰衣草助眠精油', category: '实物类', price: 89, stock: 256, sales: 1203, status: '上架', rating: 4.6, imagePreview: null, description: '天然薰衣草精油，缓解焦虑，帮助入睡', creator: '管理员', createTime: '2026-01-20' },
  { id: 3, name: '深度睡眠音频课程', category: '虚拟类', price: 199, stock: 9999, sales: 567, status: '上架', rating: 4.7, imagePreview: null, description: '专业录制的睡眠引导音频，每晚收听快速入睡', creator: '运营部', createTime: '2026-02-01' },
  { id: 4, name: '智能睡眠监测手环Pro', category: '实物类', price: 899, stock: 0, sales: 876, status: '下架', rating: 4.5, imagePreview: null, description: '新一代睡眠监测手环，支持HRV、呼吸监测', creator: '管理员', createTime: '2026-02-15' },
  { id: 5, name: '30天失眠调理计划', category: '服务类', price: 1299, stock: 50, sales: 234, status: '上架', rating: 4.9, imagePreview: null, description: '专业医生全程跟进，30天解决失眠困扰', creator: '运营部', createTime: '2026-03-01' },
  { id: 6, name: '足浴包（30包装）', category: '实物类', price: 59, stock: 320, sales: 2103, status: '上架', rating: 4.4, imagePreview: null, description: '中药足浴包，每晚泡脚助眠', creator: '管理员', createTime: '2026-01-10' },
]

export default function ProductListPage() {
  const [goods, setGoods] = useState(GOODS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('全部')
  const [categoryFilter, setCategoryFilter] = useState('全部')
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)

  const filtered = goods.filter(g => {
    if (search && !g.name.includes(search)) return false
    if (statusFilter !== '全部' && g.status !== statusFilter) return false
    if (categoryFilter !== '全部' && g.category !== categoryFilter) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  function handleSave(updated) {
    if (updated.id) {
      setGoods(prev => prev.map(g => g.id === updated.id ? updated : g))
    } else {
      setGoods(prev => [...prev, { ...updated, id: Date.now(), sales: 0, rating: 5.0, creator: '管理员', createTime: new Date().toLocaleDateString('zh-CN') }])
    }
    setEditTarget(null)
  }

  function handleToggleStatus(id) {
    setGoods(prev => prev.map(g => g.id === id ? { ...g, status: g.status === '上架' ? '下架' : '上架' } : g))
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>📋 商品列表</h3>
          <p className="card-subtitle">管理商品，支持服务类、实物类、虚拟类商品</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <div className="search-input-wrap" style={{ width: 140 }}>
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="商品名称" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="form-select" style={{ width: 110 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
            <option value="全部">全部状态</option>
            <option value="上架">上架</option>
            <option value="下架">下架</option>
          </select>
          <select className="form-select" style={{ width: 110 }} value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}>
            <option value="全部">全部分类</option>
            <option value="服务类">服务类</option>
            <option value="实物类">实物类</option>
            <option value="虚拟类">虚拟类</option>
          </select>
          <button className="btn-query" style={{ width: 60 }} onClick={() => setPage(1)}>查询</button>
          <button className="btn-reset" style={{ width: 60 }} onClick={() => { setSearch(''); setStatusFilter('全部'); setCategoryFilter('全部'); setPage(1) }}>重置</button>
          <div style={{ flex: 1 }} />
          <button className="btn btn-primary btn-sm" onClick={() => setEditTarget({ name: '', category: '服务类', status: '上架', price: 0, stock: 0, imagePreview: null, description: '' })}>+ 添加商品</button>
          <button className="btn btn-secondary btn-sm">💾 保存排序</button>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 50 }}>序号</th>
                <th>商品图片</th>
                <th>商品名称</th>
                <th>分类</th>
                <th>库存</th>
                <th>销量</th>
                <th>状态</th>
                <th>价格（元）</th>
                <th>排序</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map((g, idx) => (
                <tr key={g.id}>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td>
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, overflow: 'hidden' }}>
                      {g.imagePreview ? <img src={g.imagePreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: 180 }}>{g.name}</td>
                  <td><span className="badge badge-primary">{g.category}</span></td>
                  <td>
                    <span style={{ fontFamily: 'JetBrains Mono', color: g.stock === 0 ? '#EF4444' : '#059669' }}>
                      {g.stock === 0 ? '缺货' : g.stock}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{g.sales.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${g.status === '上架' ? 'badge-success' : 'badge-danger'}`}
                      style={{ background: g.status === '上架' ? '#D1FAE5' : '#FEE2E2', color: g.status === '上架' ? '#059669' : '#EF4444' }}>
                      {g.status}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>¥{g.price}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{g.creator}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{g.createTime}</td>
                  <td>
                    <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', marginRight: 6 }} onClick={() => setEditTarget({ ...g })}>详情</button>
                    <button className="btn-action btn-edit" style={{ marginRight: 6 }} onClick={() => setEditTarget({ ...g })}>编辑</button>
                    <button className="btn-action" style={{ marginRight: 6, borderColor: '#10B981', color: '#059669' }} onClick={() => handleToggleStatus(g.id)}>
                      {g.status === '上架' ? '下架' : '上架'}
                    </button>
                    <button className="btn-action btn-delete" onClick={() => { if (confirm('确定删除？')) setGoods(prev => prev.filter(g2 => g2.id !== g.id)) }}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">共 {filtered.length} 条</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled={page === 1} onClick={() => setPage(1)}>«</button>
            <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
          </div>
        </div>
      </div>

      {editTarget && (
        <EditProductDrawer
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
