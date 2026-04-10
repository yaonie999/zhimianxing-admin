import React, { useState } from 'react'
import '../../styles/admin.css'
import EditCategoryDrawer from '../../components/drawers/EditCategoryDrawer'

const CATEGORIES = [
  { id: 1, name: '服务类', icon: '🛁', desc: '睡眠改善计划、专家咨询等服务', productCount: 12, sort: 1, status: '开启', attrs: ['7天计划', '30天计划', '年度会员', '单次咨询'], creator: '管理员', createTime: '2026-01-01' },
  { id: 2, name: '实物类', icon: '📦', desc: '助眠产品实物', productCount: 28, sort: 2, status: '开启', attrs: ['足浴包', '精油', '枕头', '眼罩'], creator: '管理员', createTime: '2026-01-01' },
  { id: 3, name: '虚拟类', icon: '💎', desc: '音频、课程等虚拟商品', productCount: 8, sort: 3, status: '开启', attrs: ['音频课程', '会员卡', '积分包', ''], creator: '运营部', createTime: '2026-02-01' },
  { id: 4, name: '智能硬件', icon: '📱', desc: '智能睡眠监测设备', productCount: 6, sort: 4, status: '隐藏', attrs: ['手环', '床垫', '枕头', '闹钟'], creator: '管理员', createTime: '2026-02-15' },
]

export default function ProductCategoryPage() {
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
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🏷 商品分类</h3>
          <p className="card-subtitle">管理商品分类，支持服务类/实物类/虚拟类</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <div className="search-input-wrap" style={{ width: 140 }}>
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="分类名称" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-select" style={{ width: 110 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="全部">全部状态</option>
            <option value="开启">开启</option>
            <option value="隐藏">隐藏</option>
          </select>
          <button className="btn-query" style={{ width: 60 }} onClick={() => setSearch(search)}>查询</button>
          <button className="btn-reset" style={{ width: 60 }} onClick={() => { setSearch(''); setStatusFilter('全部') }}>重置</button>
          <div style={{ flex: 1 }} />
          <button className="btn btn-primary btn-sm" onClick={() => setEditTarget({ name: '', status: '开启', attrs: ['', '', '', ''] })}>+ 添加分类</button>
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
      </div>

      {editTarget && (
        <EditCategoryDrawer
          category={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
