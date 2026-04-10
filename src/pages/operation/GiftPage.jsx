import React, { useState } from 'react'
import '../../styles/admin.css'

const GIFTS = [
  { id: 1, name: '注册即送50积分', type: '积分', value: 50, threshold: 0, claimed: 3421, total: 10000, status: '进行中', time: '长期有效' },
  { id: 2, name: '新用户首单减10元', type: '满减券', value: 10, threshold: 50, claimed: 1234, total: 5000, status: '进行中', time: '长期有效' },
  { id: 3, name: '邀请好友送100积分', type: '积分', value: 100, threshold: 0, claimed: 567, total: 2000, status: '进行中', time: '2026-12-31' },
]

export default function GiftPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = GIFTS.filter(g => {
    if (search && !g.name.includes(search)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🎁 注册有礼</h3>
          <p className="card-subtitle">配置新用户注册礼品规则</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="活动名称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 添加礼品</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>活动名称</th>
                <th>类型</th>
                <th>价值</th>
                <th>使用门槛</th>
                <th>已领取</th>
                <th>总发放量</th>
                <th>有效期</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(g => (
                <tr key={g.id}>
                  <td style={{ fontWeight: 600 }}>{g.name}</td>
                  <td><span className="badge badge-primary">{g.type}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>
                    {g.type === '积分' ? `${g.value}积分` : `¥${g.value}`}
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{g.threshold === 0 ? '无门槛' : `满${g.threshold}元`}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#059669' }}>{g.claimed.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{g.total.toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: '#64748B' }}>{g.time}</td>
                  <td><span className="badge badge-success">{g.status}</span></td>
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
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
          </div>
        </div>
      </div>
    </div>
  )
}
