import React, { useState } from 'react'
import '../../styles/admin.css'

const ACTIVITIES = [
  { id: 1, name: '春季睡眠改善计划', type: '满减活动', startDate: '2026-04-01', endDate: '2026-04-30', threshold: 200, discount: 30, participants: 1243, status: '进行中' },
  { id: 2, name: '会员双倍积分周', type: '积分加倍', startDate: '2026-04-05', endDate: '2026-04-12', threshold: 0, discount: 2, participants: 3421, status: '已结束' },
  { id: 3, name: '新品首发8折', type: '折扣活动', startDate: '2026-04-15', endDate: '2026-04-22', threshold: 0, discount: 80, participants: 0, status: '未开始' },
]

export default function ActivityManagePage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)

  const filtered = ACTIVITIES.filter(a => {
    if (search && !a.name.includes(search)) return false
    if (status !== '全部' && a.status !== status) return false
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
          <h3>📋 管理活动</h3>
          <p className="card-subtitle">查看和管理所有营销活动</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="活动名称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
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
            <button className="btn btn-primary btn-sm">+ 创建活动</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>活动名称</th>
                <th>类型</th>
                <th>时间</th>
                <th>规则</th>
                <th>参与人数</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td><span className="badge badge-primary">{a.type}</span></td>
                  <td style={{ fontSize: 12, color: '#64748B' }}>{a.startDate} ~ {a.endDate}</td>
                  <td style={{ fontSize: 13, color: '#374151' }}>
                    {a.type === '积分加倍' ? `双倍积分` : `满${a.threshold}元减${a.discount}元`}
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{a.participants.toLocaleString()}</td>
                  <td>{statusBadge(a.status)}</td>
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
