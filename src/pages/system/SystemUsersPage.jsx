import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 用户列表 ==================== */
const MOCK_USERS = [
  { id: 1, account: '13800138001', name: '张三', gender: '男', phone: '138****0001', userStatus: '正常', workStatus: '在职', dept: '总部', position: '超级管理员', role: '超级管理员', createBy: '系统', createTime: '2026-03-01 10:00', updateBy: '李四', updateTime: '2026-04-10 14:30' },
  { id: 2, account: '13800138002', name: '李四', gender: '女', phone: '138****0002', userStatus: '正常', workStatus: '在职', dept: '运营部', position: '运营主管', role: '运营主管', createBy: '张三', createTime: '2026-03-05 09:20', updateBy: '张三', updateTime: '2026-04-09 11:00' },
  { id: 3, account: '13800138003', name: '王五', gender: '男', phone: '138****0003', userStatus: '正常', workStatus: '在职', dept: '数据中心', position: '数据分析师', role: '数据分析师', createBy: '李四', createTime: '2026-03-08 14:00', updateBy: '李四', updateTime: '2026-04-08 16:20' },
  { id: 4, account: '13800138004', name: '赵六', gender: '女', phone: '138****0004', userStatus: '停用', workStatus: '离职', dept: '客服部', position: '客服专员', role: '客服专员', createBy: '张三', createTime: '2026-02-20 08:30', updateBy: '张三', updateTime: '2026-04-05 10:00' },
  { id: 5, account: '13800138005', name: '孙七', gender: '男', phone: '138****0005', userStatus: '正常', workStatus: '在职', dept: '市场部', position: '市场专员', role: '市场专员', createBy: '李四', createTime: '2026-03-10 11:00', updateBy: '李四', updateTime: '2026-04-07 09:00' },
  { id: 6, account: '13800138006', name: '周八', gender: '女', phone: '138****0006', userStatus: '冻结', workStatus: '在职', dept: '财务部', position: '会计', role: '财务专员', createBy: '张三', createTime: '2026-03-12 15:00', updateBy: '张三', updateTime: '2026-04-06 14:00' },
  { id: 7, account: '13800138007', name: '吴九', gender: '男', phone: '138****0007', userStatus: '正常', workStatus: '休假', dept: '技术部', position: '后端工程师', role: '技术专员', createBy: '张三', createTime: '2026-03-15 10:00', updateBy: '李四', updateTime: '2026-04-05 11:00' },
]

const USER_STATUS_MAP = { '正常': '#10B981', '停用': '#94A3B8', '冻结': '#F59E0B' }
const WORK_STATUS_MAP = { '在职': '#10B981', '离职': '#EF4444', '休假': '#8B5CF6' }
const STATUS_OPTIONS = ['正常', '停用', '冻结']
const WORK_OPTIONS = ['在职', '离职', '休假']
const GENDER_OPTIONS = ['男', '女']

export default function SystemUsersPage() {
  const [users] = useState(MOCK_USERS)
  const [selected, setSelected] = useState([])
  const [keyword, setKeyword] = useState('')
  const [userStatus, setUserStatus] = useState('')
  const [workStatus, setWorkStatus] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [editUser, setEditUser] = useState(undefined)
  const [deleteUser, setDeleteUser] = useState(null)
  const [form, setForm] = useState({ account: '', name: '', gender: '男', phone: '', userStatus: '正常', workStatus: '在职', dept: '', position: '', role: '', remark: '' })

  const filtered = users.filter(u => {
    if (keyword && !u.name.includes(keyword) && !u.account.includes(keyword) && !u.phone.includes(keyword)) return false
    if (userStatus && u.userStatus !== userStatus) return false
    if (workStatus && u.workStatus !== workStatus) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  const allChecked = pageData.length > 0 && pageData.every(u => selected.includes(u.id))

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  const openAdd = () => { setForm({ account: '', name: '', gender: '男', phone: '', userStatus: '正常', workStatus: '在职', dept: '', position: '', role: '', remark: '' }); setEditUser(null) }
  const openEdit = (u) => { setForm({ account: u.account, name: u.name, gender: u.gender, phone: u.phone, userStatus: u.userStatus, workStatus: u.workStatus, dept: u.dept, position: u.position, role: u.role, remark: '' }); setEditUser(u) }
  const toggleAll = () => { if (allChecked) setSelected(selected.filter(id => !pageData.find(m => m.id === id))); else setSelected([...new Set([...selected, ...pageData.map(m => m.id)])]) }
  const toggleRow = (id) => { if (selected.includes(id)) setSelected(selected.filter(x => x !== id)); else setSelected([...selected, id]) }
  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }

  return (
    <div>
      <div className="card">
        {/* 筛选区 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {/* 左：筛选器 */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flex: 1, alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
                <label style={labelStyle}>用户信息</label>
                <input style={inputStyle} placeholder="账号/姓名/手机号" value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>用户状态</label>
                <select style={inputStyle} value={userStatus} onChange={e => { setUserStatus(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>在职状态</label>
                <select style={inputStyle} value={workStatus} onChange={e => { setWorkStatus(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  {WORK_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            {/* 右：按钮 */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>查询</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setKeyword(''); setUserStatus(''); setWorkStatus(''); setPage(1) }}>重置</button>
              <button style={{ ...btnBase, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }} onClick={() => setCollapsed(!collapsed)}>{collapsed ? '展开' : '收起'}</button>
            </div>
          </div>

          {!collapsed && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={openAdd}>新建</button>
              <button style={{ ...btnBase, background: selected.length > 0 ? '#EF4444' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>批量删除</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }}>导入</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }}>导出</button>
              <button style={{ ...btnBase, background: selected.length > 0 ? '#10B981' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>批量启用</button>
              <button style={{ ...btnBase, background: selected.length > 0 ? '#F59E0B' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>批量禁用</button>
              <button style={{ ...btnBase, background: selected.length > 0 ? '#8B5CF6' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>批量离职</button>
            </div>
          )}
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 40 }}><input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} /></th>
                <th style={{ width: 50 }}>序号</th>
                <th>登录账号</th>
                <th>用户姓名</th>
                <th style={{ width: 70 }}>性别</th>
                <th>用户手机号</th>
                <th style={{ width: 90 }}>用户状态</th>
                <th style={{ width: 90 }}>在职状态</th>
                <th>岗位</th>
                <th>角色</th>
                <th>创建人</th>
                <th style={{ width: 140 }}>创建时间</th>
                <th style={{ width: 140 }}>修改人</th>
                <th style={{ width: 140 }}>修改时间</th>
                <th style={{ width: 100 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={15} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((u, idx) => (
                <tr key={u.id} style={{ background: selected.includes(u.id) ? '#EFF6FF' : '#fff' }}>
                  <td><input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleRow(u.id)} style={{ cursor: 'pointer' }} /></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#1E293B' }}>{u.account}</td>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{u.name}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{u.gender}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>{u.phone}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: USER_STATUS_MAP[u.userStatus] || '#94A3B8', flexShrink: 0 }} />
                      {u.userStatus}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: WORK_STATUS_MAP[u.workStatus] || '#94A3B8', flexShrink: 0 }} />
                      {u.workStatus}
                    </span>
                  </td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{u.position}</td>
                  <td><span className="badge badge-primary" style={{ fontSize: 12 }}>{u.role}</span></td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{u.createBy}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{u.createTime}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{u.updateBy}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{u.updateTime}</td>
                  <td style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <button style={{ ...btnBase, background: '#3B82F6', color: '#fff', height: 28, padding: '0 10px', fontSize: 12 }} onClick={() => openEdit(u)}>编辑</button>
                    <button style={{ ...btnBase, background: 'transparent', color: '#EF4444', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setDeleteUser(u)}>删除</button>
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

      {/* 新建/编辑用户弹窗 */}
      {editUser !== undefined && (
        <CenterModal
          open={true}
          onClose={() => setEditUser(undefined)}
          title={editUser ? '编辑用户' : '新建用户'}
          width={560}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setEditUser(undefined)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setEditUser(undefined)}>确定</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>{redStar}登录账号</label>
              <input style={{ ...inputStyle, background: editUser ? '#F8FAFC' : '#fff' }} placeholder="请输入登录账号" value={form.account} onChange={e => setForm({ ...form, account: e.target.value })} disabled={!!editUser} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}用户姓名</label>
              <input style={inputStyle} placeholder="请输入用户姓名" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}用户性别</label>
              <select style={inputStyle} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                {GENDER_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>{redStar}用户手机号</label>
              <input style={inputStyle} placeholder="请输入手机号" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}用户状态</label>
              <select style={inputStyle} value={form.userStatus} onChange={e => setForm({ ...form, userStatus: e.target.value })}>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>{redStar}在职状态</label>
              <select style={inputStyle} value={form.workStatus} onChange={e => setForm({ ...form, workStatus: e.target.value })}>
                {WORK_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>岗位</label>
              <input style={inputStyle} placeholder="请输入岗位" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>角色</label>
              <select multiple style={{ ...inputStyle, height: 70, padding: '4px 8px' }} value={form.role ? [form.role] : []} onChange={e => setForm({ ...form, role: Array.from(e.target.selectedOptions).map(o => o.value).join(',') })}>
                {['超级管理员', '运营主管', '数据分析师', '客服专员', '财务专员', '市场专员', '技术专员'].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>按住 Ctrl/Cmd 可多选</div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>备注</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} placeholder="请输入备注信息（选填）" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            </div>
          </div>
        </CenterModal>
      )}

      {/* 删除确认弹窗 */}
      {deleteUser !== null && (
        <CenterModal
          open={true}
          onClose={() => setDeleteUser(null)}
          title="删除确认"
          width={420}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDeleteUser(null)}>取消</button>
              <button style={{ ...btnBase, background: '#EF4444', color: '#fff' }} onClick={() => setDeleteUser(null)}>确定</button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 }}>确认删除用户「{deleteUser?.name}」吗？</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>删除后不可恢复，请谨慎操作。</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
