import React from 'react'
import '../../styles/admin.css'

const LOGS = [
  { id: 1, user: '张三', phone: '138****0001', ip: '192.168.1.101', action: '登录系统', result: '成功', time: '2026-04-10 19:30:12' },
  { id: 2, user: '李四', phone: '138****0002', ip: '192.168.1.102', action: '修改密码', result: '成功', time: '2026-04-10 18:15:33' },
  { id: 3, user: '王五', phone: '138****0003', ip: '192.168.1.103', action: '登录系统', result: '成功', time: '2026-04-10 17:40:08' },
  { id: 4, user: '张三', phone: '138****0001', ip: '192.168.1.101', action: '导出数据', result: '成功', time: '2026-04-10 16:20:45' },
  { id: 5, user: '李四', phone: '138****0002', ip: '192.168.1.102', action: '登录系统', result: '失败-密码错误', time: '2026-04-10 15:05:22' },
]

export default function LoginLogPage() {
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)

  const filtered = LOGS.filter(l => {
    if (search && !l.user.includes(search) && !l.phone.includes(search)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🔑 登录日志</h3>
          <p className="card-subtitle">记录所有用户的登录行为和结果</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="用户名/手机号搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>用户</th>
                <th>手机号</th>
                <th>IP地址</th>
                <th>操作</th>
                <th>结果</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {data.map(l => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.user}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12 }}>{l.phone}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#9CA3AF' }}>{l.ip}</td>
                  <td>{l.action}</td>
                  <td><span className={`badge ${l.result.includes('失败') ? 'badge-danger' : 'badge-success'}`}>{l.result}</span></td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{l.time}</td>
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
