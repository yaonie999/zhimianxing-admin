import React, { useState } from 'react'
import '../../styles/admin.css'

const ORDERS = [
  { id: 1, orderNo: 'DD20260410001', member: '张伟', phone: '138****1234', product: '7天睡眠改善计划', productInfo: '服务类 | 1次', orderAmount: 599, paidAmount: 599, platformFee: 59.9, tenantFee: 539.1, status: '已完成', payMethod: '微信支付', time: '2026-04-10 14:23' },
  { id: 2, orderNo: 'DD20260409002', member: '李娜', phone: '139****5678', product: '薰衣草助眠精油', productInfo: '实物类 | 1份', orderAmount: 89, paidAmount: 89, platformFee: 8.9, tenantFee: 80.1, status: '已完成', payMethod: '微信支付', time: '2026-04-09 18:45' },
  { id: 3, orderNo: 'DD20260409003', member: '王磊', phone: '137****9012', product: '深度睡眠音频课程', productInfo: '虚拟类 | 年度会员', orderAmount: 199, paidAmount: 0, platformFee: 0, tenantFee: 0, status: '待支付', payMethod: '微信支付', time: '2026-04-09 09:12' },
  { id: 4, orderNo: 'DD20260408004', member: '刘芳', phone: '136****3456', product: '智能睡眠监测手环Pro', productInfo: '实物类 | 标准版', orderAmount: 899, paidAmount: 899, platformFee: 89.9, tenantFee: 809.1, status: '已发货', payMethod: '支付宝', time: '2026-04-08 21:30' },
  { id: 5, orderNo: 'DD20260408005', member: '陈明', phone: '135****7890', product: '30天失眠调理计划', productInfo: '服务类 | 1次', orderAmount: 1299, paidAmount: 1299, platformFee: 129.9, tenantFee: 1169.1, status: '待发货', payMethod: '微信支付', time: '2026-04-08 16:05' },
  { id: 6, orderNo: 'DD20260407006', member: '周静', phone: '133****2345', product: '足浴包（30包装）', productInfo: '实物类 | 2份', orderAmount: 118, paidAmount: 118, platformFee: 11.8, tenantFee: 106.2, status: '已取消', payMethod: '支付宝', time: '2026-04-07 11:22' },
  { id: 7, orderNo: 'DD20260406007', member: '吴强', phone: '131****6789', product: '薰衣草助眠精油', productInfo: '实物类 | 3份', orderAmount: 267, paidAmount: 267, platformFee: 26.7, tenantFee: 240.3, status: '已退款', payMethod: '微信支付', time: '2026-04-06 15:30' },
]

export default function OrderListPage() {
  const [tab, setTab] = useState('全部')
  const [searchNo, setSearchNo] = useState('')
  const [searchUser, setSearchUser] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [page, setPage] = useState(1)

  const TABS = ['全部', '待支付', '已支付', '已完成', '已取消', '已退款']

  const filtered = ORDERS.filter(o => {
    if (tab !== '全部' && o.status !== tab) return false
    if (searchNo && !o.orderNo.includes(searchNo)) return false
    if (searchUser && !o.member.includes(searchUser) && !o.phone.includes(searchUser)) return false
    if (searchDate && !o.time.startsWith(searchDate)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  const statusBadge = s => {
    const map = {
      '已完成': { bg: '#D1FAE5', color: '#059669' },
      '已支付': { bg: '#DBEAFE', color: '#1D4ED8' },
      '待支付': { bg: '#FEF3C7', color: '#D97706' },
      '待发货': { bg: '#FEE2E2', color: '#DC2626' },
      '已发货': { bg: '#E0E7FF', color: '#4338CA' },
      '已取消': { bg: '#F1F5F9', color: '#9CA3AF' },
      '已退款': { bg: '#FEF3C7', color: '#B45309' },
    }
    const s_ = map[s] || { bg: '#F1F5F9', color: '#9CA3AF' }
    return <span className="badge" style={{ background: s_.bg, color: s_.color }}>{s}</span>
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🧾 订单管理</h3>
          <p className="card-subtitle">查看和管理所有订单，支持订单状态筛选</p>
        </div>

        {/* 状态Tab */}
        <div style={{ padding: '0 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1) }}
              style={{
                padding: '12px 20px', border: 'none', background: 'transparent',
                fontSize: 14, fontWeight: tab === t ? 700 : 400,
                color: tab === t ? '#1E3A5F' : '#9CA3AF',
                cursor: 'pointer', borderBottom: tab === t ? '2px solid #1E3A5F' : '2px solid transparent',
                marginBottom: -1, whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="订单号" value={searchNo} onChange={e => { setSearchNo(e.target.value); setPage(1) }} />
            </div>
            <div className="search-input-wrap">
              <span className="search-icon">👤</span>
              <input className="search-input" placeholder="用户信息" value={searchUser} onChange={e => { setSearchUser(e.target.value); setPage(1) }} />
            </div>
            <input className="search-input" type="date" value={searchDate} onChange={e => { setSearchDate(e.target.value); setPage(1) }} style={{ width: 150 }} />
            <button className="btn-query" onClick={() => setPage(1)}style={{ width: 60 }}>查询</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>订单号</th>
                <th>用户</th>
                <th>商品名称</th>
                <th>商品信息</th>
                <th>订单金额（元）</th>
                <th>实付金额（元）</th>
                <th>平台分账（元）</th>
                <th>租户分账（元）</th>
                <th>下单时间</th>
              </tr>
            </thead>
            <tbody>
              {data.map((o, idx) => (
                <tr key={o.id}>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#1E3A5F' }}>{o.orderNo}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{o.member}</div>
                    <div style={{ fontSize: 11, color: '#CBD5E1', fontFamily: 'JetBrains Mono' }}>{o.phone}</div>
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: 160 }}>{o.product}</td>
                  <td style={{ fontSize: 12, color: '#9CA3AF' }}>{o.productInfo}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', textDecoration: o.paidAmount === 0 ? 'line-through' : 'none', color: '#CBD5E1' }}>¥{o.orderAmount}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>¥{o.paidAmount}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF', fontSize: 12 }}>¥{o.platformFee}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#059669', fontSize: 12 }}>¥{o.tenantFee}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{o.time}</td>
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
