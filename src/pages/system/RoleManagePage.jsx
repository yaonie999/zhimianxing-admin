import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 角色管理 ==================== */
const ROLES = [
  { id: 1, code: 'ROLE001', name: '超级管理员', permKey: 'SUPER_ADMIN', dataScope: '全部', sort: 1, status: '正常', createTime: '2024-01-01 10:00' },
  { id: 2, code: 'ROLE002', name: '运营主管', permKey: 'OPERATION_MANAGER', dataScope: '本部门及以下', sort: 2, status: '正常', createTime: '2024-01-15 10:00' },
  { id: 3, code: 'ROLE003', name: '数据分析师', permKey: 'DATA_ANALYST', dataScope: '本部门', sort: 3, status: '正常', createTime: '2024-02-01 10:00' },
  { id: 4, code: 'ROLE004', name: '客服专员', permKey: 'CUSTOMER_SERVICE', dataScope: '本部门', sort: 4, status: '停用', createTime: '2024-03-10 10:00' },
  { id: 5, code: 'ROLE005', name: '财务专员', permKey: 'FINANCE', dataScope: '本部门', sort: 5, status: '正常', createTime: '2024-03-15 10:00' },
]

const DATA_SCOPE_OPTIONS = ['全部', '本部门及以下', '本部门', '仅本人', '自定义']
const STATUS_OPTIONS = ['正常', '停用']

function MoreMenu({ role, onClose }) {
  const [visible, setVisible] = useState(false)
  const [dataPerm, setDataPerm] = useState(null)
  const [assignUser, setAssignUser] = useState(null)

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          style={{ ...btnBase, background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', height: 28, padding: '0 8px', fontSize: 12 }}
          onClick={() => setVisible(!visible)}
        >更多 ▼</button>
        {visible && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => { setVisible(false); onClose() }} />
            <div style={{
              position: 'absolute', right: 0, top: '100%', zIndex: 100, background: '#fff',
              border: '1px solid #E2E8F0', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: 120, marginTop: 4, overflow: 'hidden'
            }}>
              <button style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: 'transparent', color: '#374151', fontSize: 13, textAlign: 'left', cursor: 'pointer' }}
                onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => { setDataPerm(role); setVisible(false) }}>数据权限</button>
              <button style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: 'transparent', color: '#374151', fontSize: 13, textAlign: 'left', cursor: 'pointer' }}
                onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => { setAssignUser(role); setVisible(false) }}>分配用户</button>
            </div>
          </>
        )}
      </div>

      {/* 数据权限分配弹窗 */}
      {dataPerm !== null && (
        <CenterModal
          open={true}
          onClose={() => setDataPerm(null)}
          title="数据权限分配"
          width={500}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDataPerm(null)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setDataPerm(null)}>确定</button>
            </>
          }
        >
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', marginBottom: 12 }}>角色：{dataPerm?.name}</div>
            <label style={labelStyle}>数据权限</label>
            <select style={inputStyle}>
              {DATA_SCOPE_OPTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>
              <span style={{ color: '#F59E0B', marginRight: 4 }}>ℹ</span>
              全部：可见所有数据｜本部门及以下：可见本部门及下属部门数据｜本部门：仅可见本部门数据｜仅本人：仅可见本人数据
            </div>
          </div>
          <div>
            <label style={labelStyle}>自定义数据范围（部门）</label>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 6, padding: 12, maxHeight: 200, overflow: 'auto', background: '#F8FAFC' }}>
              {['总部', '运营部', '技术部', '财务部', '市场部'].map(d => (
                <div key={d} style={{ marginBottom: 6 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} /> {d}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CenterModal>
      )}

      {/* 分配用户弹窗 */}
      {assignUser !== null && (
        <CenterModal
          open={true}
          onClose={() => setAssignUser(null)}
          title="分配用户"
          width={700}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setAssignUser(null)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setAssignUser(null)}>确定</button>
            </>
          }
        >
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>角色：{assignUser?.name}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input style={{ ...inputStyle, flex: 1 }} placeholder="搜索用户名/手机号" />
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }}>搜索</button>
            </div>
          </div>
          <div style={{ border: '1px solid #E2E8F0', borderRadius: 6, maxHeight: 280, overflow: 'auto' }}>
            {[
              { name: '张三', account: '138****0001', checked: true },
              { name: '李四', account: '138****0002', checked: false },
              { name: '王五', account: '138****0003', checked: true },
              { name: '赵六', account: '138****0004', checked: false },
              { name: '孙七', account: '138****0005', checked: false },
            ].map(u => (
              <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid #F1F5F9' }}>
                <input type="checkbox" checked={u.checked} style={{ cursor: 'pointer' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{u.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{u.account}</div>
                </div>
                <span className={`badge ${u.checked ? 'badge-success' : 'badge-default'}`}>{u.checked ? '已关联' : '未关联'}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>已选择 <span style={{ color: '#1E293B', fontWeight: 600 }}>2</span> 个用户</div>
        </CenterModal>
      )}
    </>
  )
}

export default function RoleManagePage() {
  const [roles] = useState(ROLES)
  const [selected, setSelected] = useState([])
  const [keyword, setKeyword] = useState('')
  const [permKey, setPermKey] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [editRole, setEditRole] = useState(undefined)
  const [deleteRole, setDeleteRole] = useState(null)
  const [form, setForm] = useState({ name: '', permKey: '', sort: 0, status: '正常', remark: '' })

  const filtered = roles.filter(r => {
    if (keyword && !r.name.includes(keyword)) return false
    if (permKey && !r.permKey.includes(permKey)) return false
    if (status && r.status !== status) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  const allChecked = pageData.length > 0 && pageData.every(r => selected.includes(r.id))
  const toggleAll = () => { if (allChecked) setSelected(selected.filter(id => !pageData.find(r => r.id === id))); else setSelected([...new Set([...selected, ...pageData.map(r => r.id)])]) }
  const toggleRow = (id) => { if (selected.includes(id)) setSelected(selected.filter(x => x !== id)); else setSelected([...selected, id]) }
  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }
  const openAdd = () => { setForm({ name: '', permKey: '', sort: 0, status: '正常', remark: '' }); setEditRole(null) }
  const openEdit = (r) => { setForm({ name: r.name, permKey: r.permKey, sort: r.sort, status: r.status, remark: '' }); setEditRole(r) }

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  return (
    <div>
      <div className="card">
        {/* 筛选区 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: selected.length > 0 ? 0 : 0 }}>
            <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
                <label style={labelStyle}>角色名称</label>
                <input style={inputStyle} placeholder="请输入角色名称" value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
                <label style={labelStyle}>权限字符</label>
                <input style={inputStyle} placeholder="请输入权限字符" value={permKey} onChange={e => { setPermKey(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>角色状态</label>
                <select style={inputStyle} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>查询</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setKeyword(''); setPermKey(''); setStatus(''); setPage(1) }}>重置</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
            <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={openAdd}>新增</button>
            <button style={{ ...btnBase, background: selected.length > 0 ? '#8B5CF6' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length !== 1}>修改</button>
            <button style={{ ...btnBase, background: selected.length > 0 ? '#EF4444' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>删除</button>
            <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }}>导出</button>
          </div>
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 40 }}><input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} /></th>
                <th style={{ width: 50 }}>序号</th>
                <th>角色编号</th>
                <th>角色名称</th>
                <th>权限字符</th>
                <th>数据权限</th>
                <th style={{ width: 80 }}>显示顺序</th>
                <th style={{ width: 90 }}>角色状态</th>
                <th style={{ width: 140 }}>创建时间</th>
                <th style={{ width: 200 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((r, idx) => (
                <tr key={r.id} style={{ background: selected.includes(r.id) ? '#EFF6FF' : '#fff' }}>
                  <td><input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleRow(r.id)} style={{ cursor: 'pointer' }} /></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>{r.code}</td>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{r.name}</td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{r.permKey}</span></td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{r.dataScope}</td>
                  <td style={{ fontFamily: 'monospace', color: '#64748B', textAlign: 'center' }}>{r.sort}</td>
                  <td>
                    <span className={`badge ${r.status === '正常' ? 'badge-success' : 'badge-default'}`}
                      style={{ background: r.status === '正常' ? '#D1FAE5' : '#F1F5F9', color: r.status === '正常' ? '#059669' : '#94A3B8' }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{r.createTime}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <button style={{ ...btnBase, background: '#3B82F6', color: '#fff', height: 28, padding: '0 10px', fontSize: 12 }} onClick={() => openEdit(r)}>编辑</button>
                      <button style={{ ...btnBase, background: 'transparent', color: '#EF4444', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setDeleteRole(r)}>删除</button>
                      <MoreMenu role={r} onClose={() => {}} />
                    </div>
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

      {/* 新建/编辑角色弹窗 */}
      {editRole !== undefined && (
        <CenterModal
          open={true}
          onClose={() => setEditRole(undefined)}
          title={editRole ? '编辑角色' : '新增角色'}
          width={500}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setEditRole(undefined)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setEditRole(undefined)}>确定</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>{redStar}角色名称</label>
              <input style={inputStyle} placeholder="请输入角色名称" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}权限字符</label>
              <input style={inputStyle} placeholder="请输入权限字符" value={form.permKey} onChange={e => setForm({ ...form, permKey: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
                <span style={{ color: '#F59E0B', marginRight: 4 }}>ℹ</span>
                特殊字符不支持权限字符，如: @#$%^&amp;*()_+
              </div>
            </div>
            <div>
              <label style={labelStyle}>{redStar}角色顺序</label>
              <input type="number" style={inputStyle} placeholder="0" value={form.sort} onChange={e => setForm({ ...form, sort: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}状态</label>
              <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>备注</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} placeholder="请输入备注信息（选填）" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            </div>
          </div>
        </CenterModal>
      )}

      {/* 删除确认弹窗 */}
      {deleteRole !== null && (
        <CenterModal
          open={true}
          onClose={() => setDeleteRole(null)}
          title="删除确认"
          width={420}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDeleteRole(null)}>取消</button>
              <button style={{ ...btnBase, background: '#EF4444', color: '#fff' }} onClick={() => setDeleteRole(null)}>确定</button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 }}>确认删除角色「{deleteRole?.name}」吗？</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>删除后不可恢复，请谨慎操作。</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
