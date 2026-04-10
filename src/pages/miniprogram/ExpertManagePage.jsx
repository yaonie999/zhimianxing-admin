import React, { useState } from 'react'
import '../../styles/admin.css'
import EditExpertDrawer from '../../components/drawers/EditExpertDrawer'

const EXPERTS = [
  { id: 1, name: '张仲景', title: '睡眠医学专家', hospital: '北京协和医院', expertise: ['失眠', '睡眠呼吸暂停'], status: '在线', avatarUrl: null, patients: 328, rating: 4.9, price: 299 },
  { id: 2, name: '李时珍', title: '心理咨询师', hospital: '上海精神卫生中心', expertise: ['焦虑性失眠', '情绪管理'], status: '在线', avatarUrl: null, patients: 256, rating: 4.8, price: 199 },
  { id: 3, name: '孙思邈', title: '中医睡眠专家', hospital: '广安门医院', expertise: ['中医调理', '慢性失眠'], status: '离线', avatarUrl: null, patients: 412, rating: 4.7, price: 150 },
  { id: 4, name: '华佗', title: '神经内科专家', hospital: '宣武医院', expertise: ['REM睡眠障碍', '嗜睡症'], status: '忙碌', avatarUrl: null, patients: 189, rating: 4.6, price: 399 },
]

export default function ExpertManagePage() {
  const [experts, setExperts] = useState(EXPERTS)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)

  const filtered = experts.filter(e => {
    if (search && !e.name.includes(search) && !e.title.includes(search)) return false
    if (status !== '全部' && e.status !== status) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  function handleSave(updated) {
    setExperts(prev => prev.map(e => e.id === updated.id ? updated : e))
    setEditTarget(null)
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>👨‍⚕️ 专家管理</h3>
          <p className="card-subtitle">管理睡眠医学专家信息、状态和咨询服务</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="姓名/职称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <select className="form-select" style={{ width: 120 }} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
              <option value="全部">全部状态</option>
              <option value="在线">在线</option>
              <option value="忙碌">忙碌</option>
              <option value="离线">离线</option>
            </select>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 添加专家</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>专家</th>
                <th>职称</th>
                <th>所属医院</th>
                <th>擅长领域</th>
                <th>状态</th>
                <th>咨询费用</th>
                <th>服务患者</th>
                <th>评分</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="table-avatar">{e.name.charAt(0)}</div>
                      <div style={{ fontWeight: 600 }}>{e.name}</div>
                    </div>
                  </td>
                  <td>{e.title}</td>
                  <td style={{ color: '#9CA3AF', fontSize: 13 }}>{e.hospital}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {e.expertise.map(s => <span key={s} className="badge badge-primary" style={{ fontSize: 11 }}>{s}</span>)}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${e.status === '在线' ? 'badge-success' : e.status === '忙碌' ? 'badge-warning' : 'badge-default'}`}>
                      {e.status === '在线' ? '🟢 在线' : e.status === '忙碌' ? '🟡 忙碌' : '⚫ 离线'}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>¥{e.price}/次</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{e.patients}</td>
                  <td><span style={{ color: '#F39C12' }}>★</span> {e.rating}</td>
                  <td>
                    <button className="btn-action btn-edit" style={{ marginRight: 6 }} onClick={() => setEditTarget({ ...e })}>编辑</button>
                    <button className="btn-action btn-delete">删除</button>
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

      {editTarget && (
        <EditExpertDrawer
          expert={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
