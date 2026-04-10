import React, { useState } from 'react'
import '../styles/admin.css'

const MOCK = [
  { id: 1, name: '张伟', phone: '138****1234', level: '黄金会员', points: 8500, growth: 850, source: '消费返积分', sourceDetail: '+850 签到奖励', sourceTime: '2026-04-08' },
  { id: 2, name: '李娜', phone: '139****5678', level: '白银会员', points: 3200, growth: 320, source: '消费返积分', sourceDetail: '+320 任务奖励', sourceTime: '2026-04-07' },
  { id: 3, name: '王磊', phone: '137****9012', level: '钻石会员', points: 12000, growth: 1200, source: '消费返积分', sourceDetail: '+1200 活动奖励', sourceTime: '2026-04-09' },
  { id: 4, name: '刘芳', phone: '136****3456', level: '黄金会员', points: 5600, growth: 560, source: '消费返积分', sourceDetail: '+560 签到奖励', sourceTime: '2026-04-06' },
  { id: 5, name: '陈明', phone: '135****7890', level: '青铜会员', points: 2100, growth: 210, source: '消费返积分', sourceDetail: '+210 任务奖励', sourceTime: '2026-04-05' },
  { id: 6, name: '周静', phone: '133****2345', level: '铂金会员', points: 7800, growth: 780, source: '消费返积分', sourceDetail: '+780 签到奖励', sourceTime: '2026-04-08' },
  { id: 7, name: '吴强', phone: '131****6789', level: '白银会员', points: 4300, growth: 430, source: '消费返积分', sourceDetail: '+430 活动奖励', sourceTime: '2026-04-07' },
  { id: 8, name: '郑丽', phone: '130****0123', level: '黄金会员', points: 9500, growth: 950, source: '消费返积分', sourceDetail: '+950 签到奖励', sourceTime: '2026-04-09' },
]

export default function PointsQueryPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [page, setPage] = useState(1)

  const filtered = MOCK.filter(m => {
    if (name && !m.name.includes(name)) return false
    if (phone && !m.phone.includes(phone)) return false
    return true
  })

  const PAGE_SIZE = 8
  const total = filtered.length
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>积分查询</h3>
          <p className="card-subtitle">查询会员积分余额、积分来源和变动记录</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="姓名搜索" value={name} onChange={e => { setName(e.target.value); setPage(1) }} />
            </div>
            <div className="search-input-wrap">
              <span className="search-icon">📱</span>
              <input className="search-input" placeholder="手机号搜索" value={phone} onChange={e => { setPhone(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}>查询</button>
            <button className="btn-reset" onClick={() => { setName(''); setPhone(''); setPage(1) }}>重置</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>手机号</th>
                <th>当前积分</th>
                <th>会员等级</th>
                <th>成长值</th>
                <th>积分变动明细</th>
                <th>最近变动</th>
                <th>变动时间</th>
              </tr>
            </thead>
            <tbody>
              {data.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{m.phone}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#1E3A5F', fontWeight: 700 }}>
                    {m.points.toLocaleString()}
                  </td>
                  <td><span className="badge badge-warning">{m.level}</span></td>
                  <td style={{ color: '#9CA3AF', fontSize: 13 }}>{m.growth}</td>
                  <td><span className="badge badge-success">{m.sourceDetail}</span></td>
                  <td><span className="badge badge-primary">{m.source}</span></td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{m.sourceTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">共 {total} 条</div>
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
