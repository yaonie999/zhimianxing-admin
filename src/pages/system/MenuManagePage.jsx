import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const MOCK_MENUS = [
  { id: 1, name: '系统配置', terminal: 'PC', sort: 1, path: '-', type: '目录', visible: '显示', perm: '-', createBy: '系统', createTime: '2026-01-01 00:00', updateBy: '-', updateTime: '-' },
  { id: 2, name: '系统管理', terminal: 'PC', sort: 1, path: '/system', type: '菜单', visible: '显示', perm: 'system:manage', createBy: '系统', createTime: '2026-01-01 00:00', updateBy: '-', updateTime: '-' },
  { id: 3, name: '用户列表', terminal: 'PC', sort: 1, path: '/system/users', type: '菜单', visible: '显示', perm: 'system:users:list', createBy: '张三', createTime: '2026-01-15 10:00', updateBy: '李四', updateTime: '2026-04-01 09:00' },
  { id: 4, name: '菜单管理', terminal: 'PC', sort: 2, path: '/system/menus', type: '菜单', visible: '显示', perm: 'system:menus:list', createBy: '张三', createTime: '2026-01-15 10:00', updateBy: '-', updateTime: '-' },
  { id: 5, name: '角色管理', terminal: 'PC', sort: 3, path: '/system/roles', type: '菜单', visible: '显示', perm: 'system:roles:list', createBy: '张三', createTime: '2026-01-15 10:00', updateBy: '-', updateTime: '-' },
  { id: 6, name: '租户管理', terminal: 'PC', sort: 4, path: '/system/tenants', type: '菜单', visible: '显示', perm: 'system:tenants:list', createBy: '张三', createTime: '2026-01-15 10:00', updateBy: '-', updateTime: '-' },
  { id: 7, name: '会员管理', terminal: 'PC', sort: 2, path: '/members', type: '菜单', visible: '显示', perm: 'member:list', createBy: '系统', createTime: '2026-01-01 00:00', updateBy: '-', updateTime: '-' },
  { id: 8, name: '会员列表', terminal: 'PC', sort: 1, path: '/members/list', type: '菜单', visible: '显示', perm: 'member:list:list', createBy: '李四', createTime: '2026-02-01 10:00', updateBy: '-', updateTime: '-' },
]

const TYPE_MAP = { '目录': '#8B5CF6', '菜单': '#3B82F6', '按钮': '#10B981' }
const VISIBLE_MAP = { '显示': '#10B981', '隐藏': '#94A3B8' }
const TERMINAL_MAP = { 'PC': '#3B82F6', '小程序': '#10B981', 'H5': '#F59E0B' }

export default function MenuManagePage() {
  const [menus] = useState(MOCK_MENUS)
  const [selected, setSelected] = useState([])
  const [keyword, setKeyword] = useState('')
  const [menuStatus, setMenuStatus] = useState('')
  const [terminal, setTerminal] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [expanded, setExpanded] = useState(true)
  // 弹窗
  const [editMenu, setEditMenu] = useState(undefined)
  const [deleteMenu, setDeleteMenu] = useState(null)
  const [form, setForm] = useState({ name: '', parentId: '', terminal: 'PC', sort: 0, path: '', type: '菜单', visible: '显示', perm: '' })

  const filtered = menus.filter(m => {
    if (keyword && !m.name.includes(keyword)) return false
    if (menuStatus && m.visible !== menuStatus) return false
    if (terminal && m.terminal !== terminal) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }

  const allChecked = pageData.length > 0 && pageData.every(m => selected.includes(m.id))
  const toggleAll = () => {
    if (allChecked) setSelected(selected.filter(id => !pageData.find(m => m.id === id)))
    else setSelected([...new Set([...selected, ...pageData.map(m => m.id)])])
  }
  const toggleRow = (id) => {
    if (selected.includes(id)) setSelected(selected.filter(x => x !== id))
    else setSelected([...selected, id])
  }

  const openAdd = () => { setForm({ name: '', parentId: '', terminal: 'PC', sort: 0, path: '', type: '菜单', visible: '显示', perm: '' }); setEditMenu(null) }
  const openEdit = (m) => { setForm({ name: m.name, parentId: '', terminal: m.terminal, sort: m.sort, path: m.path, type: m.type, visible: m.visible, perm: m.perm }); setEditMenu(m) }
  const handleSave = () => { setEditMenu(undefined) }
  const handleDelete = () => { setDeleteMenu(null) }

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box' }

  const FilterArea = () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'nowrap' }}>
      <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
          <label style={labelStyle}>菜单名称</label>
          <input style={inputStyle} placeholder="请输入菜单名称" value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1) }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
          <label style={labelStyle}>菜单状态</label>
          <select style={inputStyle} value={menuStatus} onChange={e => { setMenuStatus(e.target.value); setPage(1) }}>
            <option value="">全部</option>
            <option value="显示">显示</option>
            <option value="隐藏">隐藏</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
          <label style={labelStyle}>终端</label>
          <select style={inputStyle} value={terminal} onChange={e => { setTerminal(e.target.value); setPage(1) }}>
            <option value="">全部</option>
            <option value="PC">PC</option>
            <option value="小程序">小程序</option>
            <option value="H5">H5</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>搜索</button>
        <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setKeyword(''); setMenuStatus(''); setTerminal(''); setPage(1) }}>重置</button>
      </div>
    </div>
  )

  const ActionButtons = () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={openAdd}>新增</button>
      <button style={{ ...btnBase, background: selected.length > 0 ? '#8B5CF6' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>修改</button>
      <button style={{ ...btnBase, background: selected.length > 0 ? '#10B981' : '#fff', color: selected.length > 0 ? '#fff' : '#94A3B8', border: selected.length > 0 ? 'none' : '1px solid #E2E8F0' }} disabled={selected.length === 0}>保存排序</button>
      <button style={{ ...btnBase, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }} onClick={() => setExpanded(!expanded)}>{expanded ? '折叠' : '展开'}</button>
    </div>
  )

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🔐 菜单管理</h3>
          <p className="card-subtitle">管理系统左侧菜单权限配置</p>
        </div>

        {/* 筛选区 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <FilterArea />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: selected.length > 0 ? 'none' : '1px solid #F1F5F9', borderTopColor: '#F1F5F9' }}>
            <ActionButtons />
          </div>
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                </th>
                <th style={{ width: 50 }}>序号</th>
                <th>菜单名称</th>
                <th style={{ width: 70 }}>终端</th>
                <th style={{ width: 70 }}>排序</th>
                <th>请求地址</th>
                <th style={{ width: 70 }}>类型</th>
                <th style={{ width: 70 }}>可见</th>
                <th>权限标识</th>
                <th style={{ width: 100 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((m, idx) => (
                <tr key={m.id} style={{ background: selected.includes(m.id) ? '#EFF6FF' : '#fff' }}>
                  <td><input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggleRow(m.id)} style={{ cursor: 'pointer' }} /></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{m.name}</td>
                  <td><span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: `${TERMINAL_MAP[m.terminal]}15`, color: TERMINAL_MAP[m.terminal] }}>{m.terminal}</span></td>
                  <td><input type="number" defaultValue={m.sort} style={{ width: 50, padding: '4px 8px', border: '1px solid #E2E8F0', borderRadius: 4, fontSize: 12, textAlign: 'center', color: '#1E293B' }} /></td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>{m.path}</td>
                  <td><span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: `${TYPE_MAP[m.type]}15`, color: TYPE_MAP[m.type] }}>{m.type}</span></td>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: VISIBLE_MAP[m.visible] }} />{m.visible}</span></td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>{m.perm}</td>
                  <td style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => openEdit(m)}>编辑</button>
                    <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0, background: '#10B981', color: '#fff' }} onClick={() => { openAdd() }}>新增</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444', flexShrink: 0 }} onClick={() => setDeleteMenu(m)}>删除</button>
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
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 6px' }}>第 <input type="text" defaultValue={page} onKeyDown={e => { if (e.key === 'Enter') { const v = parseInt(e.target.value); if (v >= 1 && v <= totalPages) go(v) } }} style={{ width: 36, textAlign: 'center', padding: '2px 6px', border: '1px solid #E2E8F0', borderRadius: 4, fontSize: 13 }} /> / {totalPages} 页</span>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => go(page + 1)}>›</button>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => go(totalPages)}>»</button>
          </div>
        </div>
      </div>

      {/* 新建/编辑菜单弹窗 */}
      <CenterModal
        open={editMenu != null}
        onClose={() => setEditMenu(undefined)}
        title={editMenu ? '编辑菜单' : '新增菜单'}
        width={520}
        footer={
          <>
            <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setEditMenu(undefined)}>取消</button>
            <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={handleSave}>确定</button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>{redStar}菜单名称</label>
            <input style={inputStyle} placeholder="请输入菜单名称" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>上级菜单</label>
            <select style={inputStyle} value={form.parentId} onChange={e => setForm({ ...form, parentId: e.target.value })}>
              <option value="">作为一级菜单</option>
              {menus.filter(m => m.type === '目录').map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>{redStar}终端</label>
            <select style={inputStyle} value={form.terminal} onChange={e => setForm({ ...form, terminal: e.target.value })}>
              <option value="PC">PC</option>
              <option value="小程序">小程序</option>
              <option value="H5">H5</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>{redStar}排序</label>
            <input type="number" style={inputStyle} placeholder="0" value={form.sort} onChange={e => setForm({ ...form, sort: Number(e.target.value) })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>请求地址</label>
            <input style={inputStyle} placeholder="/system/users" value={form.path} onChange={e => setForm({ ...form, path: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>{redStar}类型</label>
            <select style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="目录">目录</option>
              <option value="菜单">菜单</option>
              <option value="按钮">按钮</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>{redStar}可见</label>
            <select style={inputStyle} value={form.visible} onChange={e => setForm({ ...form, visible: e.target.value })}>
              <option value="显示">显示</option>
              <option value="隐藏">隐藏</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>权限标识</label>
            <input style={inputStyle} placeholder="system:users:list" value={form.perm} onChange={e => setForm({ ...form, perm: e.target.value })} />
          </div>
        </div>
      </CenterModal>

      {/* 删除确认弹窗 */}
      <CenterModal
        open={deleteMenu !== null}
        onClose={() => setDeleteMenu(null)}
        title="删除确认"
        width={420}
        footer={
          <>
            <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDeleteMenu(null)}>取消</button>
            <button style={{ ...btnBase, background: '#EF4444', color: '#fff' }} onClick={handleDelete}>确定</button>
          </>
        }
      >
        <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 }}>确认删除菜单「{deleteMenu?.name}」吗？</div>
          <div style={{ fontSize: 13, color: '#94A3B8' }}>删除后不可恢复，请谨慎操作。</div>
        </div>
      </CenterModal>
    </div>
  )
}
