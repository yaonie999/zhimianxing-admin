import React, { useState } from 'react'
import '../styles/admin.css'
import EditCategoryDrawer from '../components/drawers/EditCategoryDrawer'
import EditProductDrawer from '../components/drawers/EditProductDrawer'

/* ==================== 商品分类 ==================== */
const CATEGORIES = [
  { id: 1, name: '服务类', icon: '🛁', desc: '睡眠改善计划、专家咨询等服务', productCount: 12, sort: 1, status: '开启', attrs: ['7天计划', '30天计划', '年度会员', '单次咨询'], creator: '管理员', createTime: '2026-01-01' },
  { id: 2, name: '实物类', icon: '📦', desc: '助眠产品实物', productCount: 28, sort: 2, status: '开启', attrs: ['足浴包', '精油', '枕头', '眼罩'], creator: '管理员', createTime: '2026-01-01' },
  { id: 3, name: '虚拟类', icon: '💎', desc: '音频、课程等虚拟商品', productCount: 8, sort: 3, status: '开启', attrs: ['音频课程', '会员卡', '积分包', ''], creator: '运营部', createTime: '2026-02-01' },
  { id: 4, name: '智能硬件', icon: '📱', desc: '智能睡眠监测设备', productCount: 6, sort: 4, status: '隐藏', attrs: ['手环', '床垫', '枕头', '闹钟'], creator: '管理员', createTime: '2026-02-15' },
]

function CategoryTab() {
  const [categories, setCategories] = useState(CATEGORIES)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('全部')
  const [editTarget, setEditTarget] = useState(null)

  const filtered = categories.filter(c => {
    if (search && !c.name.includes(search)) return false
    if (statusFilter !== '全部' && c.status !== statusFilter) return false
    return true
  })

  function handleSave(updated) {
    if (updated.id) {
      setCategories(prev => prev.map(c => c.id === updated.id ? { ...c, ...updated } : c))
    } else {
      setCategories(prev => [...prev, { ...updated, id: Date.now(), productCount: 0, sort: prev.length + 1, creator: '管理员', createTime: new Date().toLocaleDateString('zh-CN') }])
    }
    setEditTarget(null)
  }

  function handleToggleStatus(id) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, status: c.status === '开启' ? '隐藏' : '开启' } : c))
  }

  return (
    <>
      {/* 筛选区 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 160 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="分类名称" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" style={{ width: 110, marginLeft: 32 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="全部">全部状态</option>
          <option value="开启">开启</option>
          <option value="隐藏">隐藏</option>
        </select>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => {}}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setSearch(''); setStatusFilter('全部') }}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }} onClick={() => setEditTarget({ name: '', status: '开启', attrs: ['', '', '', ''] })}>+ 添加分类</button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>分类名称</th>
              <th>分类状态</th>
              <th>属性名称</th>
              <th>商品数</th>
              <th>创建人</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, idx) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{idx + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${c.status === '开启' ? 'badge-success' : 'badge-default'}`}
                    style={{ background: c.status === '开启' ? '#D1FAE5' : '#F1F5F9', color: c.status === '开启' ? '#059669' : '#CBD5E1' }}>
                    {c.status === '开启' ? '✅ 开启' : '🙈 隐藏'}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: '#9CA3AF' }}>
                  {c.attrs.filter(a => a).join(' / ')}
                </td>
                <td style={{ fontFamily: 'JetBrains Mono' }}>{c.productCount}</td>
                <td style={{ color: '#9CA3AF', fontSize: 13 }}>{c.creator}</td>
                <td style={{ color: '#CBD5E1', fontSize: 12 }}>{c.createTime}</td>
                <td>
                  <button className="btn-action btn-edit" style={{ marginRight: 6 }} onClick={() => setEditTarget({ ...c })}>编辑</button>
                  <button className="btn-action" style={{ marginRight: 6, borderColor: '#10B981', color: '#059669' }} onClick={() => handleToggleStatus(c.id)}>
                    {c.status === '开启' ? '隐藏' : '开启'}
                  </button>
                  <button className="btn-action btn-delete" onClick={() => { if (confirm('确定删除该分类？')) setCategories(prev => prev.filter(c2 => c2.id !== c.id)) }}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editTarget && (
        <EditCategoryDrawer
          category={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

/* ==================== 商品列表 ==================== */
const GOODS = [
  { id: 1, name: '7天睡眠改善计划', category: '服务类', price: 599, stock: 128, sales: 342, status: '上架', rating: 4.8, imagePreview: null, description: '专业睡眠顾问一对一指导，7天改善您的睡眠质量', creator: '管理员', createTime: '2026-01-15' },
  { id: 2, name: '薰衣草助眠精油', category: '实物类', price: 89, stock: 256, sales: 1203, status: '上架', rating: 4.6, imagePreview: null, description: '天然薰衣草精油，缓解焦虑，帮助入睡', creator: '管理员', createTime: '2026-01-20' },
  { id: 3, name: '深度睡眠音频课程', category: '虚拟类', price: 199, stock: 9999, sales: 567, status: '上架', rating: 4.7, imagePreview: null, description: '专业录制的睡眠引导音频，每晚收听快速入睡', creator: '运营部', createTime: '2026-02-01' },
  { id: 4, name: '智能睡眠监测手环Pro', category: '实物类', price: 899, stock: 0, sales: 876, status: '下架', rating: 4.5, imagePreview: null, description: '新一代睡眠监测手环，支持HRV，呼吸监测', creator: '管理员', createTime: '2026-02-15' },
  { id: 5, name: '30天失眠调理计划', category: '服务类', price: 1299, stock: 50, sales: 234, status: '上架', rating: 4.9, imagePreview: null, description: '专业医生全程跟进，30天解决失眠困扰', creator: '运营部', createTime: '2026-03-01' },
  { id: 6, name: '足浴包（30包装）', category: '实物类', price: 59, stock: 320, sales: 2103, status: '上架', rating: 4.4, imagePreview: null, description: '中药足浴包，每晚泡脚助眠', creator: '管理员', createTime: '2026-01-10' },
]

function ProductListTab() {
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
    <>
      {/* 筛选区 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 160 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="商品名称" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="form-select" style={{ width: 110, marginLeft: 32 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
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
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setPage(1)}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setSearch(''); setStatusFilter('全部'); setCategoryFilter('全部'); setPage(1) }}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }} onClick={() => setEditTarget({ name: '', category: '服务类', status: '上架', price: 0, stock: 0, imagePreview: null, description: '' })}>+ 添加商品</button>
        <button className="btn btn-secondary btn-sm" style={{ height: 34, lineHeight: '34px', padding: '0 12px', fontSize: 14 }}>💾 保存排序</button>
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
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
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
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{g.sales.toLocaleString()}</td>
                <td>
                  <span className={`badge ${g.status === '上架' ? 'badge-success' : 'badge-danger'}`}
                    style={{ background: g.status === '上架' ? '#D1FAE5' : '#FEE2E2', color: g.status === '上架' ? '#059669' : '#EF4444' }}>
                    {g.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>¥{g.price}</td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                <td style={{ color: '#9CA3AF', fontSize: 13 }}>{g.creator}</td>
                <td style={{ color: '#CBD5E1', fontSize: 12 }}>{g.createTime}</td>
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
          <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>

      {editTarget && (
        <EditProductDrawer
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

/* ==================== 主页面 ==================== */
export default function ProductPage() {
  const [tab, setTab] = useState('商品列表')

  const TABS = ['商品列表', '商品分类']

  return (
    <div className="page-container" style={{ padding: '24px' }}>
      <div className="card">
        {/* 横向Tab导航 - 1:1复刻会员管理样式 */}
        <div style={{
          padding: '0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 0,
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '14px 24px',
                border: 'none',
                background: tab === t ? '#fff' : 'transparent',
                fontSize: 14,
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? 'var(--blue-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                borderBottom: tab === t ? '2.5px solid var(--blue-primary)' : '2.5px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                letterSpacing: '0.3px',
              }}
              onmouseover={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-secondary)' }}
              onmouseout={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px' }}>
          {tab === '商品列表' && <ProductListTab />}
          {tab === '商品分类' && <CategoryTab />}
        </div>
      </div>
    </div>
  )
}
