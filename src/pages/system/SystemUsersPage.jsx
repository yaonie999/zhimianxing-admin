import React, { useState } from 'react'
import '../../styles/admin.css'

const USERS = [
  { id: 1, name: '张三', phone: '138****0001', role: '超级管理员', status: '正常', lastLogin: '2026-04-10 19:30', dept: '总部' },
  { id: 2, name: '李四', phone: '138****0002', role: '运营主管', status: '正常', lastLogin: '2026-04-10 18:15', dept: '运营部' },
  { id: 3, name: '王五', phone: '138****0003', role: '数据分析师', status: '正常', lastLogin: '2026-04-09 17:40', dept: '数据中心' },
  { id: 4, name: '赵六', phone: '138****0004', role: '客服专员', status: '停用', lastLogin: '2026-04-05 10:20', dept: '客服部' },
]

export default function SystemUsersPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = USERS.filter(u => {
    if (search && !u.name.includes(search) && !u.phone.includes(search)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>👤 用户列表</h3>
          <p className="card-subtitle">管理系统用户账号、角色和状态</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="姓名/手机号搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 新增用户</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>手机号</th>
                <th>部门</th>
                <th>角色</th>
                <th>状态</th>
                <th>最后登录</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12 }}>{u.phone}</td>
                  <td style={{ color: '#64748B' }}>{u.dept}</td>
                  <td><span className="badge badge-primary">{u.role}</span></td>
                  <td><span className={`badge ${u.status === '正常' ? 'badge-success' : 'badge-default'}`}>{u.status}</span></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{u.lastLogin}</td>
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
