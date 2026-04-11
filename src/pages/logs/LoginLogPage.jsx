import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 登录日志 ==================== */
const LOGIN_LOGS = [
  { id: 1, seq: 'A202604100001', terminal: 'PC', account: 'admin', ip: '192.168.1.100', location: '北京市', status: '成功', msg: '登录成功', time: '2026-04-10 14:23:15' },
  { id: 2, seq: 'A202604100002', terminal: 'PC', account: 'admin', ip: '192.168.1.101', location: '上海市', status: '成功', msg: '登录成功', time: '2026-04-10 12:05:32' },
  { id: 3, seq: 'A202604100003', terminal: 'H5', account: 'zhangsan', ip: '10.0.0.50', location: '广州市', status: '失败', msg: '密码错误', time: '2026-04-10 11:30:45' },
  { id: 4, seq: 'A202604100004', terminal: '小程序', account: 'lisi', ip: '172.16.0.88', location: '深圳市', status: '成功', msg: '登录成功', time: '2026-04-10 10:15:22' },
  { id: 5, seq: 'A202604100005', terminal: 'PC', account: 'wangwu', ip: '192.168.2.200', location: '杭州市', status: '成功', msg: '登录成功', time: '2026-04-09 22:45:10' },
  { id: 6, seq: 'A202604090006', terminal: 'H5', account: 'zhaoliu', ip: '10.0.0.60', location: '成都市', status: '失败', msg: '账号不存在', time: '2026-04-09 18:30:00' },
]

const TERMINAL_OPTIONS = ['PC', 'H5', '小程序', 'APP']
const STATUS_OPTIONS = ['成功', '失败']

export default function LoginLogPage() {
  const [logs] = useState(LOGIN_LOGS)
  const [ip, setIp] = useState('')
  const [account, setAccount] = useState('')
  const [status, setStatus] = useState('')
  const [terminal, setTerminal] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState([])

  const filtered = logs.filter(l => {
    if (ip && !l.ip.includes(ip)) return false
    if (account && !l.account.includes(account)) return false
    if (status && l.status !== status) return false
    if (terminal && l.terminal !== terminal) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  const allChecked = pageData.length > 0 && pageData.every(l => selected.includes(l.id))
  const toggleAll = () => { if (allChecked) setSelected(selected.filter(id => !pageData.find(l => l.id === id))); else setSelected([...new Set([...selected, ...pageData.map(l => l.id)])]) }
  const toggleRow = (id) => { if (selected.includes(id)) setSelected(selected.filter(x => x !== id)); else setSelected([...selected, id]) }
  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  return (
    <div>
      <div className="card">
        {/* 筛选区 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          {/* 第一行 */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: collapsed ? 0 : 12 }}>
            <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                <label style={labelStyle}>IP地址</label>
                <input style={inputStyle} placeholder="请输入IP地址" value={ip} onChange={e => { setIp(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                <label style={labelStyle}>登录账号</label>
                <input style={inputStyle} placeholder="请输入登录账号" value={account} onChange={e => { setAccount(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>登录状态</label>
                <select style={inputStyle} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>终端</label>
                <select style={inputStyle} value={terminal} onChange={e => { setTerminal(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  {TERMINAL_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>查询</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setIp(''); setAccount(''); setStatus(''); setTerminal(''); setPage(1) }}>重置</button>
              <button style={{ ...btnBase, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }} onClick={() => setCollapsed(!collapsed)}>{collapsed ? '展开' : '收起'}</button>
            </div>
          </div>

          {/* 第二行：日期范围 */}
          {!collapsed && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', paddingTop: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
                  <label style={labelStyle}>开始日期</label>
                  <input type="date" style={inputStyle} value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div style={{ color: '#94A3B8', paddingBottom: 8, fontSize: 13 }}>至</div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
                  <label style={labelStyle}>结束日期</label>
                  <input type="date" style={inputStyle} value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* 操作按钮行 */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #F1F5F9', marginTop: 12 }}>
            <button style={{ ...btnBase, background: '#fff', color: '#EC4899', border: '1px solid #FBCFE8' }}>删除</button>
            <button style={{ ...btnBase, background: '#fff', color: '#EF4444', border: '1px solid #FEE2E2' }}>清空</button>
          </div>
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 40 }}><input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} /></th>
                <th style={{ width: 50 }}>序号</th>
                <th>访问编号</th>
                <th style={{ width: 70 }}>终端</th>
                <th>登录账号</th>
                <th>IP地址</th>
                <th>登录地点</th>
                <th style={{ width: 70 }}>状态</th>
                <th>操作信息</th>
                <th style={{ width: 160 }}>登录时间</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((l, idx) => (
                <tr key={l.id} style={{ background: selected.includes(l.id) ? '#EFF6FF' : '#fff' }}>
                  <td><input type="checkbox" checked={selected.includes(l.id)} onChange={() => toggleRow(l.id)} style={{ cursor: 'pointer' }} /></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748B' }}>{l.seq}</td>
                  <td><span className="badge badge-default" style={{ fontSize: 11 }}>{l.terminal}</span></td>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{l.account}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>{l.ip}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{l.location}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: l.status === '成功' ? '#10B981' : '#EF4444', flexShrink: 0 }} />
                      {l.status}
                    </span>
                  </td>
                  <td style={{ color: l.status === '失败' ? '#EF4444' : '#64748B', fontSize: 13 }}>{l.msg}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#64748B' }}>共 <span style={{ color: '#1E293B', fontWeight: 600 }}>{total}</span> 条记录</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#64748B' }}>每页</span>
            <select style={{ padding: '4px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', cursor: 'pointer' }} value={pageSize} onChange={e => changePageSize(Number(e.target.value))}>
              {[10, 20, 50].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span style={{ fontSize: 13, color: '#64748B' }}>条</span>
            <button className="page-btn" disabled={page === 1} onClick={() => go(1)}>«</button>
            <button className="page-btn" disabled={page === 1} onClick={() => go(page - 1)}>‹</button>
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 6px' }}>第 {page} / {totalPages} 页</span>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => go(page + 1)}>›</button>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => go(totalPages)}>»</button>
          </div>
        </div>
      </div>
    </div>
  )
}
