import React, { useState } from 'react'
import '../../styles/admin.css'

const COUPONS = [
  { id: 1, name: '新人10元券', type: '满减券', faceValue: 10, threshold: 50, stock: 5000, used: 1234, validFrom: '2026-04-01', validTo: '2026-04-30', status: '进行中' },
  { id: 2, name: '会员专属20元券', type: '满减券', faceValue: 20, threshold: 100, stock: 2000, used: 876, validFrom: '2026-04-01', validTo: '2026-06-30', status: '进行中' },
  { id: 3, name: '限时5折券', type: '折扣券', faceValue: 50, threshold: 200, stock: 500, used: 321, validFrom: '2026-03-01', validTo: '2026-03-31', status: '已结束' },
]

export default function CouponPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)

  const filtered = COUPONS.filter(c => {
    if (search && !c.name.includes(search)) return false
    if (status !== '全部' && c.status !== status) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  const statusBadge = s => {
    const map = { '进行中': 'badge-success', '已结束': 'badge-default', '未开始': 'badge-warning' }
    return <span className={`badge ${map[s]}`}>{s}</span>
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🎟 优惠券管理</h3>
          <p className="card-subtitle">创建和管理优惠券</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="优惠券名称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <select className="form-select" style={{ width: 120 }} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
              <option value="全部">全部</option>
              <option value="进行中">进行中</option>
              <option value="未开始">未开始</option>
              <option value="已结束">已结束</option>
            </select>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 创建优惠券</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>优惠券名称</th>
                <th>类型</th>
                <th>面值</th>
                <th>门槛</th>
                <th>发放数量</th>
                <th>已使用</th>
                <th>有效期</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td><span className="badge badge-primary">{c.type}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>
                    {c.type === '折扣券' ? `${c.faceValue}% OFF` : `¥${c.faceValue}`}
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>满{c.threshold}元</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{c.stock.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#059669' }}>{c.used.toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: '#9CA3AF' }}>{c.validFrom} ~ {c.validTo}</td>
                  <td>{statusBadge(c.status)}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: 4 }}>编辑</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}>删除</button>
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
      </div>
    </div>
  )
}
