import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 操作日志 ==================== */
const OP_LOGS = [
  { id: 1, seq: 'LOG20260410001', account: 'admin', name: '张三', module: '会员管理', action: '编辑', ip: '192.168.1.100', location: '北京市', status: '成功', duration: '1.2s', detail: '修改会员张伟的成长值：850→900', time: '2026-04-10 19:00:12' },
  { id: 2, seq: 'LOG20260410002', account: 'admin', name: '李四', module: '商品管理', action: '上架', ip: '192.168.1.101', location: '上海市', status: '成功', duration: '0.8s', detail: '上架商品：智能睡眠监测手环 Pro', time: '2026-04-10 18:30:45' },
  { id: 3, seq: 'LOG20260410003', account: 'zhangsan', name: '王五', module: '系统管理', action: '修改配置', ip: '10.0.0.50', location: '广州市', status: '成功', duration: '2.1s', detail: '修改系统配置：积分有效期 12→18个月', time: '2026-04-10 17:15:33' },
  { id: 4, seq: 'LOG20260410004', account: 'admin', name: '赵六', module: '订单管理', action: '核销', ip: '192.168.1.102', location: '深圳市', status: '成功', duration: '0.5s', detail: '核销订单 DD20260410001', time: '2026-04-10 16:45:08' },
  { id: 5, seq: 'LOG20260410005', account: 'lisi', name: '孙七', module: '商品管理', action: '删除', ip: '172.16.0.88', location: '杭州市', status: '失败', duration: '0.2s', detail: '删除商品：睡眠喷雾（库存不为0，无法删除）', time: '2026-04-10 15:20:00' },
  { id: 6, seq: 'LOG20260409006', account: 'wangwu', name: '吴九', module: '系统管理', action: '导出', ip: '192.168.2.200', location: '成都市', status: '成功', duration: '15.3s', detail: '导出用户数据 Excel（共计 1,520 条）', time: '2026-04-09 22:00:00' },
]

const STATUS_OPTIONS = ['成功', '失败']

export default function OperationLogPage() {
  const [logs] = useState(OP_LOGS)
  const [ip, setIp] = useState('')
  const [module, setModule] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState([])
  const [viewLog, setViewLog] = useState(null)

  const filtered = logs.filter(l => {
    if (ip && !l.ip.includes(ip)) return false
    if (module && !l.module.includes(module)) return false
    if (status && l.status !== status) return false
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
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                <label style={labelStyle}>IP地址</label>
                <input style={inputStyle} placeholder="请输入IP地址" value={ip} onChange={e => { setIp(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                <label style={labelStyle}>操作模块</label>
                <input style={inputStyle} placeholder="请输入操作模块" value={module} onChange={e => { setModule(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                  <label style={labelStyle}>开始日期</label>
                  <input type="date" style={inputStyle} value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div style={{ color: '#94A3B8', paddingBottom: 8, fontSize: 13 }}>至</div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                  <label style={labelStyle}>结束日期</label>
                  <input type="date" style={inputStyle} value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>状态</label>
                <select style={inputStyle} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>查询</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setIp(''); setModule(''); setStatus(''); setStartDate(''); setEndDate(''); setPage(1) }}>重置</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
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
                <th>日志编号</th>
                <th>登录账号</th>
                <th>姓名</th>
                <th>业务模块</th>
                <th>操作类型</th>
                <th>IP地址</th>
                <th style={{ width: 70 }}>状态</th>
                <th style={{ width: 160 }}>操作时间</th>
                <th style={{ width: 90 }}>消耗时间</th>
                <th style={{ width: 80 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={12} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((l, idx) => (
                <tr key={l.id} style={{ background: selected.includes(l.id) ? '#EFF6FF' : '#fff' }}>
                  <td><input type="checkbox" checked={selected.includes(l.id)} onChange={() => toggleRow(l.id)} style={{ cursor: 'pointer' }} /></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748B' }}>{l.seq}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>{l.account}</td>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{l.name}</td>
                  <td><span className="badge badge-primary" style={{ fontSize: 11 }}>{l.module}</span></td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{l.action}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>{l.ip}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: l.status === '成功' ? '#10B981' : '#EF4444', flexShrink: 0 }} />
                      {l.status}
                    </span>
                  </td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{l.time}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>{l.duration}</td>
                  <td>
                    <button style={{ ...btnBase, background: 'transparent', color: '#3B82F6', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setViewLog(l)}>详情</button>
                  </td>
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

      {/* 详情弹窗 */}
      {viewLog !== null && (
        <CenterModal
          open={true}
          onClose={() => setViewLog(null)}
          title="操作日志详情"
          width={600}
          footer={
            <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setViewLog(null)}>关闭</button>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>日志编号</label>
              <div style={{ fontSize: 13, color: '#1E293B', fontFamily: 'JetBrains Mono' }}>{viewLog.seq}</div>
            </div>
            <div>
              <label style={labelStyle}>登录账号</label>
              <div style={{ fontSize: 13, color: '#1E293B', fontFamily: 'JetBrains Mono' }}>{viewLog.account}</div>
            </div>
            <div>
              <label style={labelStyle}>用户姓名</label>
              <div style={{ fontSize: 13, color: '#1E293B', fontWeight: 600 }}>{viewLog.name}</div>
            </div>
            <div>
              <label style={labelStyle}>业务模块</label>
              <span className="badge badge-primary">{viewLog.module}</span>
            </div>
            <div>
              <label style={labelStyle}>操作类型</label>
              <div style={{ fontSize: 13, color: '#64748B' }}>{viewLog.action}</div>
            </div>
            <div>
              <label style={labelStyle}>IP地址</label>
              <div style={{ fontSize: 13, color: '#1E293B', fontFamily: 'JetBrains Mono' }}>{viewLog.ip}</div>
            </div>
            <div>
              <label style={labelStyle}>操作地点</label>
              <div style={{ fontSize: 13, color: '#64748B' }}>{viewLog.location}</div>
            </div>
            <div>
              <label style={labelStyle}>状态</label>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: viewLog.status === '成功' ? '#10B981' : '#EF4444' }} />
                {viewLog.status}
              </span>
            </div>
            <div>
              <label style={labelStyle}>消耗时间</label>
              <div style={{ fontSize: 13, color: '#64748B', fontFamily: 'JetBrains Mono' }}>{viewLog.duration}</div>
            </div>
            <div>
              <label style={labelStyle}>操作时间</label>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>{viewLog.time}</div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>操作详情</label>
              <div style={{ fontSize: 13, color: '#475569', background: '#F8FAFC', padding: 12, borderRadius: 6, border: '1px solid #E2E8F0', lineHeight: 1.7 }}>
                {viewLog.detail}
              </div>
            </div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
