import React from 'react'
import '../../styles/admin.css'

const ITEMS = [
  { id: 1, user: '张三', module: '会员管理', action: '编辑会员信息', detail: '修改会员张伟的成长值：850→900', ip: '192.168.1.101', time: '2026-04-10 19:00:12' },
  { id: 2, user: '李四', module: '商品管理', action: '上架商品', detail: '上架商品：智能睡眠监测手环 Pro', ip: '192.168.1.102', time: '2026-04-10 18:30:45' },
  { id: 3, user: '王五', module: '系统管理', action: '修改配置', detail: '修改系统配置：积分有效期 12→18个月', ip: '192.168.1.103', time: '2026-04-10 17:15:33' },
  { id: 4, user: '张三', module: '订单管理', action: '核销订单', detail: '核销订单 DD20260410001', ip: '192.168.1.101', time: '2026-04-10 16:45:08' },
]

export default function OperationLogPage() {
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)

  const filtered = ITEMS.filter(l => {
    if (search && !l.user.includes(search) && !l.module.includes(search)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>📋 操作日志</h3>
          <p className="card-subtitle">记录关键业务操作，方便审计追踪</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="操作人/模块搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>操作人</th>
                <th>模块</th>
                <th>操作类型</th>
                <th>操作详情</th>
                <th>IP地址</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {data.map(l => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.user}</td>
                  <td><span className="badge badge-primary">{l.module}</span></td>
                  <td>{l.action}</td>
                  <td style={{ color: '#64748B', fontSize: 13, maxWidth: 280 }}>{l.detail}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#64748B' }}>{l.ip}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{l.time}</td>
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
