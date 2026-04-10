import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const RECORDS = [
  { id: 1, verifyId: 'VF20260410001', orderNo: 'DD20260410001', member: '张伟', phone: '138****1234', product: '7天睡眠改善计划', applyTime: '2026-04-10 14:00', operator: '李医生', confirmTime: '2026-04-10 15:30', studio: '朝阳睡眠工作室', status: '已核销' },
  { id: 2, verifyId: 'VF20260409002', orderNo: 'DD20260409002', member: '李娜', phone: '139****5678', product: '薰衣草助眠精油', applyTime: '2026-04-09 10:00', operator: '王健康师', confirmTime: '2026-04-09 10:15', studio: '海淀健康中心', status: '已核销' },
  { id: 3, verifyId: 'VF20260408003', orderNo: 'DD20260408003', member: '王磊', phone: '137****9012', product: '深度睡眠音频课程', applyTime: '2026-04-08 09:00', operator: '张睡眠师', confirmTime: '', studio: '浦东睡眠医学中心', status: '待确认' },
  { id: 4, verifyId: 'VF20260407004', orderNo: 'DD20260407004', member: '刘芳', phone: '136****3456', product: '智能睡眠监测手环Pro', applyTime: '2026-04-07 08:30', operator: '随机分配', confirmTime: '2026-04-07 09:00', studio: '天河睡眠驿站', status: '已核销' },
  { id: 5, verifyId: 'VF20260406005', orderNo: 'DD20260406005', member: '陈明', phone: '135****7890', product: '30天失眠调理计划', applyTime: '2026-04-06 11:00', operator: '李医生', confirmTime: '', studio: '朝阳睡眠工作室', status: '已取消' },
]

export default function VerifyRecordPage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('全部')
  const [page, setPage] = useState(1)
  const [detailTarget, setDetailTarget] = useState(null)

  const TABS = ['全部', '待确认', '已核销', '已取消']
  const TAB_COLORS = { '全部': '#1E3A5F', '待确认': '#D97706', '已核销': '#059669', '已取消': '#64748B' }

  const counts = {
    '待确认': RECORDS.filter(r => r.status === '待确认').length,
    '已核销': RECORDS.filter(r => r.status === '已核销').length,
    '已取消': RECORDS.filter(r => r.status === '已取消').length,
  }

  const filtered = RECORDS.filter(r => {
    if (tab !== '全部' && r.status !== tab) return false
    if (search && !r.verifyId.includes(search) && !r.member.includes(search)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  const statusBadge = s => {
    const map = {
      '待确认': { bg: '#FEF3C7', color: '#D97706' },
      '已核销': { bg: '#D1FAE5', color: '#059669' },
      '已取消': { bg: '#F1F5F9', color: '#64748B' },
      '使用中': { bg: '#DBEAFE', color: '#1D4ED8' },
    }
    const s_ = map[s] || { bg: '#F1F5F9', color: '#64748B' }
    return <span className="badge" style={{ background: s_.bg, color: s_.color }}>{s}</span>
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>✔ 核销记录</h3>
          <p className="card-subtitle">查看和管理商品核销记录</p>
        </div>

        {/* 汇总框 */}
        <div style={{ display: 'flex', gap: 16, padding: '0 20px 16px' }}>
          {TABS.map(t => (
            <div
              key={t}
              onClick={() => { setTab(t); setPage(1) }}
              style={{
                flex: 1, padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
                border: `1.5px solid ${tab === t ? TAB_COLORS[t] : '#E2E8F0'}`,
                background: tab === t ? `${TAB_COLORS[t]}11` : '#FAFBFC',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{t}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: tab === t ? TAB_COLORS[t] : '#1E3A5F' }}>
                {t === '全部' ? RECORDS.length : counts[t] || 0}
                <span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4 }}>笔</span>
              </div>
            </div>
          ))}
        </div>

        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="核销ID/会员搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>核销ID</th>
                <th>订单号</th>
                <th>用户信息</th>
                <th>服务内容</th>
                <th>申请核销时间</th>
                <th>操作人</th>
                <th>确认核销时间</th>
                <th>所属工作室</th>
                <th>核销状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, idx) => (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#1E3A5F' }}>{r.verifyId}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#64748B' }}>{r.orderNo}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{r.member}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'JetBrains Mono' }}>{r.phone}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{r.product}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{r.applyTime}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{r.operator}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{r.confirmTime || '—'}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{r.studio}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td>
                    <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F' }} onClick={() => setDetailTarget(r)}>查看详情</button>
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

      {/* 详情抽屉 */}
      {detailTarget && (
        <CenterModal
          open={true}
          onClose={() => setDetailTarget(null)}
          title="核销详情"
          width={500}
          footer={<button className="btn btn-ghost" onClick={() => setDetailTarget(null)} style={{ minWidth: 80 }}>关闭</button>}
        >
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">核销ID</label>
            <div style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F', fontWeight: 600 }}>{detailTarget.verifyId}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">关联订单号</label>
            <div style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{detailTarget.orderNo}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">用户信息</label>
            <div>{detailTarget.member} <span style={{ color: '#94A3B8' }}>{detailTarget.phone}</span></div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">服务内容</label>
            <div>{detailTarget.product}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">所属工作室</label>
            <div>{detailTarget.studio}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">操作人</label>
            <div>{detailTarget.operator}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">申请核销时间</label>
            <div style={{ color: '#64748B' }}>{detailTarget.applyTime}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">确认核销时间</label>
            <div style={{ color: '#64748B' }}>{detailTarget.confirmTime || '—'}</div>
          </div>
          <div className="form-item">
            <label className="form-label">核销状态</label>
            <div>{statusBadge(detailTarget.status)}</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
