import React, { useState } from 'react'
import '../styles/admin.css'
import CenterModal from '../components/CenterModal'

/* ==================== 订单列表 ==================== */
const STATUS_LIST = ['全部', '待支付', '已支付', '已完成', '已取消', '已退款']
const STATUS_COLORS = {
  '待支付': { bg: '#EDE9FE', color: '#7C3AED' },
  '已支付': { bg: '#D1FAE5', color: '#059669' },
  '已完成': { bg: '#DBEAFE', color: '#2563EB' },
  '已取消': { bg: '#F1F5F9', color: '#9CA3AF' },
  '已退款': { bg: '#FEE2E2', color: '#EF4444' },
}

const ORDERS = [
  { id: 1, orderNo: 'DD20260410001', member: '张伟', phone: '138****1234', product: '7天睡眠改善计划', productInfo: '服务类 | 1次', orderAmount: 599.00, paidAmount: 599.00, platformFee: 59.90, tenantFee: 539.10, status: '已完成', studio: '朝阳睡眠工作室', payMethod: '微信支付', time: '2026-04-10 14:23' },
  { id: 2, orderNo: 'DD20260409002', member: '李娜', phone: '139****5678', product: '薰衣草助眠精油', productInfo: '实物类 | 1份', orderAmount: 89.00, paidAmount: 89.00, platformFee: 8.90, tenantFee: 80.10, status: '已完成', studio: '海淀健康中心', payMethod: '微信支付', time: '2026-04-09 18:45' },
  { id: 3, orderNo: 'DD20260409003', member: '王磊', phone: '137****9012', product: '深度睡眠音频课程', productInfo: '虚拟类 | 年度会员', orderAmount: 199.00, paidAmount: 0.00, platformFee: 0.00, tenantFee: 0.00, status: '待支付', studio: '浦东睡眠医学中心', payMethod: '微信支付', time: '2026-04-09 09:12' },
  { id: 4, orderNo: 'DD20260408004', member: '刘芳', phone: '136****3456', product: '智能睡眠监测手环Pro', productInfo: '实物类 | 标准版', orderAmount: 899.00, paidAmount: 899.00, platformFee: 89.90, tenantFee: 809.10, status: '已完成', studio: '天河睡眠驿站', payMethod: '支付宝', time: '2026-04-08 21:30' },
  { id: 5, orderNo: 'DD20260408005', member: '陈明', phone: '135****7890', product: '30天失眠调理计划', productInfo: '服务类 | 1次', orderAmount: 1299.00, paidAmount: 1299.00, platformFee: 129.90, tenantFee: 1169.10, status: '已支付', studio: '朝阳睡眠工作室', payMethod: '微信支付', time: '2026-04-08 16:05' },
  { id: 6, orderNo: 'DD20260407006', member: '周静', phone: '133****2345', product: '足浴包（30包装）', productInfo: '实物类 | 2份', orderAmount: 118.00, paidAmount: 118.00, platformFee: 11.80, tenantFee: 106.20, status: '已取消', studio: '海淀健康中心', payMethod: '支付宝', time: '2026-04-07 11:22' },
  { id: 7, orderNo: 'DD20260406007', member: '吴强', phone: '131****6789', product: '薰衣草助眠精油', productInfo: '实物类 | 3份', orderAmount: 267.00, paidAmount: 267.00, platformFee: 26.70, tenantFee: 240.30, status: '已退款', studio: '浦东睡眠医学中心', payMethod: '微信支付', time: '2026-04-06 15:30' },
  { id: 8, orderNo: 'DD20260406008', member: '赵敏', phone: '130****3456', product: '智能睡眠监测手环Pro', productInfo: '实物类 | 专业版', orderAmount: 1299.00, paidAmount: 0.00, platformFee: 0.00, tenantFee: 0.00, status: '待支付', studio: '天河睡眠驿站', payMethod: '支付宝', time: '2026-04-06 10:00' },
]

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: '#F1F5F9', color: '#9CA3AF' }
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color }}>
      {status}
    </span>
  )
}

function fmt(v) {
  return '¥' + (v || 0).toFixed(2)
}

function OrderListTab() {
  const [activeStatus, setActiveStatus] = useState('全部')
  const [searchNo, setSearchNo] = useState('')
  const [searchUser, setSearchUser] = useState('')
  const [searchStatus, setSearchStatus] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [detailTarget, setDetailTarget] = useState(null)

  const counts = {}
  STATUS_LIST.forEach(s => {
    if (s === '全部') { counts[s] = ORDERS.length; return }
    counts[s] = ORDERS.filter(o => o.status === s).length
  })

  const filtered = ORDERS.filter(o => {
    if (activeStatus !== '全部' && o.status !== activeStatus) return false
    if (searchNo && !o.orderNo.toLowerCase().includes(searchNo.toLowerCase()) && !o.product.toLowerCase().includes(searchNo.toLowerCase())) return false
    if (searchUser && !o.member.includes(searchUser) && !o.phone.includes(searchUser)) return false
    if (searchStatus && o.status !== searchStatus) return false
    if (dateStart && o.time < dateStart) return false
    if (dateEnd && o.time > dateEnd + ' 23:59:59') return false
    return true
  })

  const totalCount = filtered.length
  const totalPages = Math.ceil(totalCount / pageSize) || 1
  const data = filtered.slice((page - 1) * pageSize, page * pageSize)

  function handleSearch() { setPage(1) }
  function handleReset() {
    setSearchNo(''); setSearchUser(''); setSearchStatus(''); setDateStart(''); setDateEnd(''); setPage(1)
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.min(totalPages, 9); i++) pageNumbers.push(i)

  return (
    <>
      {/* 状态标签栏 */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-subtle)', marginBottom: 0 }}>
        {STATUS_LIST.map(s => (
          <button
            key={s}
            onClick={() => { setActiveStatus(s); setPage(1) }}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'transparent',
              fontSize: 13,
              fontWeight: activeStatus === s ? 700 : 500,
              color: activeStatus === s ? 'var(--blue-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              borderBottom: activeStatus === s ? '2.5px solid var(--blue-primary)' : '2.5px solid transparent',
              marginBottom: -1,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {s}
            <span style={{
              fontSize: 11,
              fontWeight: activeStatus === s ? 700 : 400,
              background: activeStatus === s ? 'var(--blue-bg)' : 'var(--bg-elevated)',
              color: activeStatus === s ? 'var(--blue-primary)' : 'var(--text-muted)',
              padding: '1px 6px',
              borderRadius: 10,
              minWidth: 20,
              textAlign: 'center',
            }}>
              {counts[s] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* 筛选区 */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 220 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="订单号 / 商品名称" value={searchNo}
            onChange={e => { setSearchNo(e.target.value); handleSearch() }} />
        </div>
        <div className="search-input-wrap" style={{ width: 180 }}>
          <span className="search-icon">👤</span>
          <input className="search-input" placeholder="请输入姓名 / 手机号" value={searchUser}
            onChange={e => { setSearchUser(e.target.value); handleSearch() }} />
        </div>
        <select className="form-select" style={{ width: 160 }} value={searchStatus}
          onChange={e => { setSearchStatus(e.target.value); handleSearch() }}>
          <option value="">请选择订单状态</option>
          {STATUS_LIST.filter(s => s !== '全部').map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="search-input-wrap" style={{ width: 140 }}>
          <span className="search-icon">📅</span>
          <input className="search-input" type="date" placeholder="开始日期" value={dateStart}
            onChange={e => { setDateStart(e.target.value); handleSearch() }} style={{ width: '100%' }} />
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>
        <div className="search-input-wrap" style={{ width: 140 }}>
          <input className="search-input" type="date" placeholder="结束日期" value={dateEnd}
            onChange={e => { setDateEnd(e.target.value); handleSearch() }} style={{ width: '100%' }} />
        </div>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={handleSearch}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={handleReset}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }}>💾 导出</button>
      </div>

      {/* 表格 */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>订单号</th>
              <th>商品信息</th>
              <th>订单金额（元）</th>
              <th>实付金额（元）</th>
              <th>平台分账（元）</th>
              <th>租户分账（元）</th>
              <th>下单时间</th>
              <th>订单状态</th>
              <th>所属工作室</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={11} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>暂无数据</td></tr>
            ) : data.map((o, idx) => (
              <tr key={o.id}>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{(page - 1) * pageSize + idx + 1}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#1E3A5F' }}>{o.orderNo}</td>
                <td>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{o.product}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{o.productInfo}</div>
                  <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 2 }}>{o.member} {o.phone}</div>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF', textDecoration: o.paidAmount === 0 ? 'line-through' : 'none' }}>{fmt(o.orderAmount)}</td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>{o.paidAmount === 0 ? '—' : fmt(o.paidAmount)}</td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{o.platformFee === 0 ? '—' : fmt(o.platformFee)}</td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#059669' }}>{o.tenantFee === 0 ? '—' : fmt(o.tenantFee)}</td>
                <td style={{ color: '#CBD5E1', fontSize: 12 }}>{o.time}</td>
                <td><StatusBadge status={o.status} /></td>
                <td style={{ color: '#9CA3AF', fontSize: 12 }}>{o.studio}</td>
                <td>
                  <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F' }} onClick={() => setDetailTarget(o)}>查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="pagination" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          共 <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{totalCount}</span> 条记录
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>第 {page}/{totalPages} 页</span>
          <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {pageNumbers.map(n => (
            <button key={n} className={`page-btn ${n === page ? 'active' : ''}`}
              onClick={() => setPage(n)}
              style={n === page ? { background: 'var(--blue-primary)', color: '#fff', border: '1px solid var(--blue-primary)' } : {}}>
              {n}
            </button>
          ))}
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <select className="form-select" style={{ width: 90, height: 32, fontSize: 12 }} value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
            <option value={10}>10 条/页</option>
            <option value={20}>20 条/页</option>
            <option value={50}>50 条/页</option>
          </select>
        </div>
      </div>

      {/* 订单详情弹窗 */}
      {detailTarget && (
        <CenterModal
          open={true}
          onClose={() => setDetailTarget(null)}
          title="订单详情"
          width={560}
          footer={<button className="btn btn-ghost" onClick={() => setDetailTarget(null)} style={{ minWidth: 80 }}>关闭</button>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">订单号</label>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F', fontWeight: 600 }}>{detailTarget.orderNo}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">订单状态</label>
              <div style={{ marginTop: 2 }}><StatusBadge status={detailTarget.status} /></div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">用户姓名</label>
              <div style={{ color: '#1E3A5F', fontWeight: 600 }}>{detailTarget.member}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">手机号</label>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{detailTarget.phone}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">所属工作室</label>
              <div style={{ color: '#1E3A5F' }}>{detailTarget.studio}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">支付方式</label>
              <div style={{ color: '#1E3A5F' }}>{detailTarget.payMethod}</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, marginTop: 4 }}>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">商品信息</label>
              <div style={{ color: '#1E3A5F', fontWeight: 600, marginBottom: 4 }}>{detailTarget.product}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{detailTarget.productInfo}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 24px' }}>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">订单金额</label>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF', textDecoration: detailTarget.paidAmount === 0 ? 'line-through' : 'none' }}>{fmt(detailTarget.orderAmount)}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">实付金额</label>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>{detailTarget.paidAmount === 0 ? '—' : fmt(detailTarget.paidAmount)}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">下单时间</label>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{detailTarget.time}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">平台分账</label>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{detailTarget.platformFee === 0 ? '—' : fmt(detailTarget.platformFee)}</div>
            </div>
            <div className="form-item" style={{ marginBottom: 14 }}>
              <label className="form-label">租户分账</label>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#059669' }}>{detailTarget.tenantFee === 0 ? '—' : fmt(detailTarget.tenantFee)}</div>
            </div>
          </div>
        </CenterModal>
      )}
    </>
  )
}

/* ==================== 核销记录 ==================== */
const RECORDS = [
  { id: 1, verifyId: 'VF20260410001', orderNo: 'DD20260410001', member: '张伟', phone: '138****1234', product: '7天睡眠改善计划', applyTime: '2026-04-10 14:00', operator: '李医生', confirmTime: '2026-04-10 15:30', studio: '朝阳睡眠工作室', status: '已核销' },
  { id: 2, verifyId: 'VF20260409002', orderNo: 'DD20260409002', member: '李娜', phone: '139****5678', product: '薰衣草助眠精油', applyTime: '2026-04-09 10:00', operator: '王健康师', confirmTime: '2026-04-09 10:15', studio: '海淀健康中心', status: '已核销' },
  { id: 3, verifyId: 'VF20260408003', orderNo: 'DD20260408003', member: '王磊', phone: '137****9012', product: '深度睡眠音频课程', applyTime: '2026-04-08 09:00', operator: '张睡眠师', confirmTime: '', studio: '浦东睡眠医学中心', status: '待确认' },
  { id: 4, verifyId: 'VF20260407004', orderNo: 'DD20260407004', member: '刘芳', phone: '136****3456', product: '智能睡眠监测手环Pro', applyTime: '2026-04-07 08:30', operator: '随机分配', confirmTime: '2026-04-07 09:00', studio: '天河睡眠驿站', status: '已核销' },
  { id: 5, verifyId: 'VF20260406005', orderNo: 'DD20260406005', member: '陈明', phone: '135****7890', product: '30天失眠调理计划', applyTime: '2026-04-06 11:00', operator: '李医生', confirmTime: '', studio: '朝阳睡眠工作室', status: '已取消' },
]

function VerifyStatusBadge({ status }) {
  const map = {
    '待确认': { bg: '#FEF3C7', color: '#D97706' },
    '已核销': { bg: '#D1FAE5', color: '#059669' },
    '已取消': { bg: '#F1F5F9', color: '#9CA3AF' },
  }
  const c = map[status] || { bg: '#F1F5F9', color: '#9CA3AF' }
  return <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color }}>{status}</span>
}

function VerifyTab() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('全部')
  const [page, setPage] = useState(1)
  const [detailTarget, setDetailTarget] = useState(null)

  const TABS = ['全部', '待确认', '已核销', '已取消']
  const TAB_COLORS = { '全部': '#1E3A5F', '待确认': '#D97706', '已核销': '#059669', '已取消': '#9CA3AF' }

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

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {TABS.map(t => (
          <div
            key={t}
            onClick={() => { setTab(t); setPage(1) }}
            style={{
              flex: 1, padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
              border: `1.5px solid ${tab === t ? TAB_COLORS[t] : '#E2E8F0'}`,
              background: tab === t ? `${TAB_COLORS[t]}11` : '#FAFBFC',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>{t}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: tab === t ? TAB_COLORS[t] : '#1E3A5F' }}>
              {t === '全部' ? RECORDS.length : counts[t] || 0}
              <span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4 }}>笔</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 200 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="核销ID/会员搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setPage(1)}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setSearch(''); setPage(1) }}>重置</button>
        <div style={{ flex: 1 }} />
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
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#1E3A5F' }}>{r.verifyId}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#9CA3AF' }}>{r.orderNo}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{r.member}</div>
                  <div style={{ fontSize: 11, color: '#CBD5E1', fontFamily: 'JetBrains Mono' }}>{r.phone}</div>
                </td>
                <td style={{ fontSize: 13 }}>{r.product}</td>
                <td style={{ color: '#CBD5E1', fontSize: 12 }}>{r.applyTime}</td>
                <td style={{ color: '#9CA3AF', fontSize: 13 }}>{r.operator}</td>
                <td style={{ color: '#CBD5E1', fontSize: 12 }}>{r.confirmTime || '—'}</td>
                <td style={{ color: '#9CA3AF', fontSize: 13 }}>{r.studio}</td>
                <td><VerifyStatusBadge status={r.status} /></td>
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
          <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>

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
            <div style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{detailTarget.orderNo}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">用户信息</label>
            <div>{detailTarget.member} <span style={{ color: '#CBD5E1' }}>{detailTarget.phone}</span></div>
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
            <div style={{ color: '#9CA3AF' }}>{detailTarget.applyTime}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">确认核销时间</label>
            <div style={{ color: '#9CA3AF' }}>{detailTarget.confirmTime || '—'}</div>
          </div>
          <div className="form-item">
            <label className="form-label">核销状态</label>
            <div style={{ marginTop: 2 }}><VerifyStatusBadge status={detailTarget.status} /></div>
          </div>
        </CenterModal>
      )}
    </>
  )
}

/* ==================== 主页面 ==================== */
export default function OrderPage() {
  const [tab, setTab] = useState('订单列表')
  const TABS = ['订单列表', '核销记录']

  return (
    <div className="page-container" style={{ padding: '24px' }}>
      <div className="card">
        <div style={{
          padding: '0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 0,
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '14px 24px',
                border: 'none',
                background: tab === t ? '#fff' : 'transparent',
                fontSize: 14,
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? 'var(--blue-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                borderBottom: tab === t ? '2.5px solid var(--blue-primary)' : '2.5px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                letterSpacing: '0.3px',
              }}
              onMouseOver={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseOut={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px' }}>
          {tab === '订单列表' && <OrderListTab />}
          {tab === '核销记录' && <VerifyTab />}
        </div>
      </div>
    </div>
  )
}
