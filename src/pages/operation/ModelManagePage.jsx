import React, { useState } from 'react'
import '../../styles/admin.css'

const MODELS = [
  { id: 1, name: '睡眠质量预测模型', type: '预测模型', version: 'v2.1', accuracy: 92.5, status: '上线中', updateTime: '2026-03-15' },
  { id: 2, name: '失眠风险评估模型', type: '评估模型', version: 'v1.8', accuracy: 88.3, status: '上线中', updateTime: '2026-02-20' },
  { id: 3, name: '睡眠呼吸暂停检测', type: '检测模型', version: 'v3.0', accuracy: 95.1, status: '测试中', updateTime: '2026-04-01' },
  { id: 4, name: '个性化睡眠建议生成', type: '生成模型', version: 'v1.0', accuracy: 85.0, status: '停用', updateTime: '2026-01-30' },
]

export default function ModelManagePage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = MODELS.filter(m => {
    if (search && !m.name.includes(search)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🧠 分类模型</h3>
          <p className="card-subtitle">管理AI睡眠分类和预测模型</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="模型名称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 上传模型</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>模型名称</th>
                <th>类型</th>
                <th>版本</th>
                <th>准确率</th>
                <th>状态</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td><span className="badge badge-primary">{m.type}</span></td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono' }}>{m.version}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ background: '#E2E8F0', borderRadius: 4, height: 8, width: 60 }}>
                        <div style={{ background: m.accuracy > 90 ? '#059669' : '#F59E0B', borderRadius: 4, height: 8, width: `${m.accuracy}%` }} />
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#64748B' }}>{m.accuracy}%</span>
                    </div>
                  </td>
                  <td><span className={`badge ${m.status === '上线中' ? 'badge-success' : m.status === '测试中' ? 'badge-warning' : 'badge-default'}`}>{m.status}</span></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{m.updateTime}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: 4 }}>详情</button>
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
