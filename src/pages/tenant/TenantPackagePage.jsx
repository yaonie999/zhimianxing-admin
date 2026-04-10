import React, { useState } from 'react'
import CenterModal from '../../components/CenterModal'
import '../../styles/admin.css'

/* ============ 模拟数据 ============ */
const PACKAGES = [
  { id: 1, code: 'PKG001', name: '系统租户', status: '开启', remark: '系统内置', creator: 'admin', createTime: '2016-09-21 08:50:08', updater: 'admin', updateTime: '2016-09-21 08:50:08' },
  { id: 2, code: 'PKG002', name: '普通套餐', status: '开启', remark: '标准套餐', creator: 'admin', createTime: '2016-09-22 10:20:15', updater: 'admin', updateTime: '2016-09-22 10:20:15' },
  { id: 3, code: 'PKG003', name: '高级套餐', status: '关闭', remark: '增值服务', creator: 'admin', createTime: '2016-09-23 14:35:42', updater: 'admin', updateTime: '2016-09-23 14:35:42' },
  { id: 4, code: 'PKG004', name: '旗舰套餐', status: '开启', remark: '', creator: 'admin', createTime: '2016-09-24 09:10:33', updater: 'admin', updateTime: '2016-09-24 09:10:33' },
  { id: 5, code: 'PKG005', name: '试用套餐', status: '关闭', remark: '体验版', creator: 'admin', createTime: '2016-09-25 16:45:00', updater: 'admin', updateTime: '2016-09-25 16:45:00' },
]

const PAGE_SIZE = 10
const TOTAL = 400

/* ============ 树形菜单数据 ============ */
const MENU_TREE = [
  {
    label: '一级菜单',
    value: 'lv1_1',
    children: [
      { label: '二级菜单 A', value: 'lv2_1a' },
      { label: '二级菜单 B', value: 'lv2_1b' },
      { label: '二级菜单 C', value: 'lv2_1c' },
    ]
  },
  {
    label: '一级菜单 2',
    value: 'lv1_2',
    children: [
      { label: '二级菜单 D', value: 'lv2_2d' },
      { label: '二级菜单 E', value: 'lv2_2e' },
    ]
  },
  {
    label: '系统配置',
    value: 'lv1_3',
    children: [
      { label: '用户管理', value: 'lv2_3f' },
      { label: '角色管理', value: 'lv2_3g' },
    ]
  },
]

function TreeNode({ node, checked, onToggle, depth = 0 }) {
  const hasChildren = node.children && node.children.length > 0
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', paddingLeft: depth * 20 }}>
        {hasChildren && (
          <span style={{ color: '#CBD5E1', fontSize: 10, cursor: 'pointer' }}
            onClick={() => onToggle(node.value)}>
            {checked[node.value] ? '▼' : '▶'}
          </span>
        )}
        {!hasChildren && <span style={{ width: 10 }} />}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input type="checkbox"
            checked={!!checked[node.value]}
            onChange={() => onToggle(node.value)}
          />
          <span style={{ fontSize: 13 }}>{node.label}</span>
        </label>
      </div>
      {hasChildren && checked[node.value] && node.children.map(child => (
        <TreeNode key={child.value} node={child} checked={checked} onToggle={onToggle} depth={depth + 1} />
      ))}
    </div>
  )
}

/* ============ 主体组件 ============ */
export default function TenantPackagePage() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState([])

  // 新增/编辑弹窗
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState(null) // null=新增，有值=编辑
  // 表单
  const [pkgName, setPkgName] = useState('')
  const [pkgStatus, setPkgStatus] = useState('开启')
  const [pkgRemark, setPkgRemark] = useState('')
  const [treeChecked, setTreeChecked] = useState({})

  // 删除确认弹窗
  const [delOpen, setDelOpen] = useState(false)
  const [delName, setDelName] = useState('')
  const [delId, setDelId] = useState(null)

  /* 筛选 */
  const filtered = PACKAGES.filter(p => {
    if (name && !p.name.includes(name)) return false
    if (status && p.status !== status) return false
    return true
  })

  const totalPages = Math.ceil(TOTAL / pageSize)
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  /* 树形勾选 */
  function toggleTreeNode(value) {
    setTreeChecked(prev => {
      const next = { ...prev, [value]: !prev[value] }
      // 勾选父级时自动勾选所有子级
      const node = findNode(MENU_TREE, value)
      if (node && node.children) {
        node.children.forEach(c => { next[c.value] = next[value] })
      }
      return next
    })
  }

  function findNode(nodes, value) {
    for (const n of nodes) {
      if (n.value === value) return n
      if (n.children) {
        const f = findNode(n.children, value)
        if (f) return f
      }
    }
    return null
  }

  /* 打开新增 */
  function openAdd() {
    setEditData(null)
    setPkgName('')
    setPkgStatus('开启')
    setPkgRemark('')
    setTreeChecked({})
    setEditOpen(true)
  }

  /* 打开编辑 */
  function openEdit(pkg) {
    setEditData(pkg)
    setPkgName(pkg.name)
    setPkgStatus(pkg.status)
    setPkgRemark(pkg.remark || '')
    setTreeChecked({})
    setEditOpen(true)
  }

  /* 打开删除 */
  function openDelete(pkg) {
    setDelId(pkg.id)
    setDelName(pkg.name)
    setDelOpen(true)
  }

  /* 全选 */
  function toggleAll(idx) {
    setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])
  }

  /* 页码 */
  const pageNumbers = []
  for (let i = 1; i <= Math.min(totalPages, 9); i++) pageNumbers.push(i)

  return (
    <div className="page-container">
      {/* 卡片 */}
      <div className="card">
        {/* 顶部标题 */}
        <div className="card-header">
          <h3>📦 租户套餐</h3>
          <p className="card-subtitle">配置租户套餐及功能权益</p>
        </div>

        {/* 筛选区 */}
        {!collapsed && (
          <div className="toolbar">
            <div className="toolbar-left">
              {/* 套餐名称 */}
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  style={{ width: 200 }}
                  placeholder="请输入套餐名称模糊搜索"
                  value={name}
                  onChange={e => { setName(e.target.value); setPage(1) }}
                />
              </div>
              {/* 状态下拉 */}
              <select className="filter-select" style={{ width: 160 }}
                value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                <option value="">请选择状态，字典维护</option>
                <option value="开启">开启</option>
                <option value="关闭">关闭</option>
              </select>
            </div>
            <div className="toolbar-right">
              <button className="btn-query" onClick={() => setPage(1)}>查询</button>
              <button className="btn-reset" onClick={() => { setName(''); setStatus(''); setPage(1) }}>重置</button>
              <button className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => setCollapsed(true)}>
                收起 <span style={{ fontSize: 10 }}>▲</span>
              </button>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="toolbar">
            <div className="toolbar-left" />
            <div className="toolbar-right">
              <button className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => setCollapsed(false)}>
                展开 <span style={{ fontSize: 10 }}>▼</span>
              </button>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="toolbar" style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, paddingBottom: 12 }}>
          <div className="toolbar-left" />
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm" onClick={openAdd}>+ 新增</button>
          </div>
        </div>

        {/* 列表 */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 48 }}>
                  <input type="checkbox" onChange={e => {
                    if (e.target.checked) setSelected(pageData.map(p => p.id))
                    else setSelected([])
                  }} />
                </th>
                <th>序号</th>
                <th>套餐编号</th>
                <th>套餐名称</th>
                <th>状态</th>
                <th>备注</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>修改人</th>
                <th>修改时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((p, idx) => (
                <tr key={p.id}>
                  <td><input type="checkbox" checked={selected.includes(p.id)}
                    onChange={() => toggleAll(p.id)} /></td>
                  <td>{(page - 1) * pageSize + idx + 1}</td>
                  <td style={{ fontFamily: 'monospace', color: '#9CA3AF', fontSize: 12 }}>{p.code}</td>
                  <td><span style={{ fontWeight: 600 }}>{p.name}</span></td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.status === '开启' ? '#00CC88' : '#EF4444', display: 'inline-block' }} />
                      <span style={{ color: p.status === '开启' ? '#059669' : '#DC2626', fontSize: 13 }}>{p.status}</span>
                    </span>
                  </td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{p.remark || '-'}</td>
                  <td>{p.creator}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{p.createTime}</td>
                  <td>{p.updater}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{p.updateTime}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-action btn-edit" style={{ fontSize: 12, padding: '0 8px', height: 26, minWidth: 0 }} onClick={() => openEdit(p)}>编辑</button>
                      <button className="btn-action btn-delete" style={{ fontSize: 12, padding: '0 8px', height: 26, minWidth: 0 }} onClick={() => openDelete(p)}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="pagination">
          <div className="pagination-info">共 {TOTAL} 条记录</div>
          <div className="pagination-controls">
            {pageNumbers.map(n => (
              <button key={n} className={`page-btn ${n === page ? 'active' : ''}`}
                onClick={() => setPage(n)}>{n}</button>
            ))}
            <span style={{ fontSize: 12, color: '#9CA3AF', padding: '0 6px' }}>...</span>
            <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 8px' }}>第 {page}/{totalPages} 页</span>
            <select className="filter-select" style={{ width: 90, fontSize: 12 }}
              value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
              <option value="10">10 条/页</option>
              <option value="20">20 条/页</option>
              <option value="50">50 条/页</option>
            </select>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>跳至</span>
              <input
                style={{ width: 48, padding: '4px 8px', border: '1.5px solid #E2E8F0', borderRadius: 6, fontSize: 12, outline: 'none' }}
                defaultValue={5}
                onKeyDown={e => { if (e.key === 'Enter') setPage(Number(e.target.value)) }}
              />
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>页</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========== 新增/编辑弹窗 ========== */}
      <CenterModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={editData ? '编辑套餐' : '新增套餐'}
        width={560}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setEditOpen(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setEditOpen(false)}>确定</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* 套餐名称 */}
          <div className="form-item">
            <div className="form-label">
              <span style={{ color: '#DC2626' }}>*</span> 套餐名称
            </div>
            <input className="form-input" placeholder="请输入套餐名称"
              value={pkgName} onChange={e => setPkgName(e.target.value)} />
          </div>

          {/* 菜单权限 */}
          <div className="form-item">
            <div className="form-label">
              <span style={{ color: '#DC2626' }}>*</span> 菜单权限
            </div>
            <div style={{ border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', maxHeight: 220, overflowY: 'auto', background: '#FAFBFC' }}>
              {MENU_TREE.map(node => (
                <TreeNode key={node.value} node={node} checked={treeChecked} onToggle={toggleTreeNode} />
              ))}
            </div>
          </div>

          {/* 状态 */}
          <div className="form-item">
            <div className="form-label">
              <span style={{ color: '#DC2626' }}>*</span> 状态
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {['开启', '关闭'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                  <input type="radio" name="pkgStatus" value={opt}
                    checked={pkgStatus === opt}
                    onChange={() => setPkgStatus(opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* 备注 */}
          <div className="form-item">
            <div className="form-label">备注</div>
            <textarea className="form-input" rows={3} placeholder="请输入备注"
              value={pkgRemark} onChange={e => setPkgRemark(e.target.value)}
              style={{ resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
        </div>
      </CenterModal>

      {/* ========== 删除确认弹窗 ========== */}
      <CenterModal
        open={delOpen}
        onClose={() => setDelOpen(false)}
        title="删除确认"
        width={420}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setDelOpen(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setDelOpen(false)}>确定</button>
          </>
        }
      >
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.8 }}>
            删除 <strong>{delName}</strong>，删除后不能恢复，是否继续？
          </div>
        </div>
      </CenterModal>
    </div>
  )
}
