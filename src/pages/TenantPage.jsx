import React, { useState } from 'react'
import '../styles/admin.css'
import CenterModal from '../components/CenterModal'

const MOCK_TENANTS = [
  { id: 1, loginName: 'zhangsan', name: '张总', phone: '138****0001', jobNumber: 'EMP001', pkg: '旗舰版', status: '启用', operator: '李四', createTime: '2026-01-01' },
  { id: 2, loginName: 'lisi', name: '李医生', phone: '139****0002', jobNumber: 'EMP002', pkg: '专业版', status: '启用', operator: '王五', createTime: '2026-01-15' },
  { id: 3, loginName: 'wangwu', name: '王老师', phone: '137****0003', jobNumber: 'EMP003', pkg: '基础版', status: '试用', operator: '李四', createTime: '2026-02-01' },
  { id: 4, loginName: 'zhaoliu', name: '赵博士', phone: '136****0004', jobNumber: 'EMP004', pkg: '旗舰版', status: '停用', operator: '张三', createTime: '2026-02-10' },
  { id: 5, loginName: 'sunqi', name: '孙经理', phone: '135****0005', jobNumber: 'EMP005', pkg: '专业版', status: '启用', operator: '王五', createTime: '2026-02-20' },
]

function TenantListTab() {
  const [tenants] = useState(MOCK_TENANTS)
  const [kw, setKw] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [editTenant, setEditTenant] = useState(undefined)
  const [delTenant, setDelTenant] = useState(null)
  const [acctTenant, setAcctTenant] = useState(null)
  const [splitTenant, setSplitTenant] = useState(null)
  const [form, setForm] = useState({ loginName: '', name: '', phone: '', jobNumber: '', contact: '', pkg: '', status: '启用', operator: '', remark: '' })
  const [selected, setSelected] = useState([])

  const filtered = tenants.filter(t => {
    if (kw && !t.name.includes(kw) && !t.loginName.includes(kw) && !t.phone.includes(kw)) return false
    if (statusFilter && t.status !== statusFilter) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)
  const allChecked = pageData.length > 0 && pageData.every(t => selected.includes(t.id))

  const toggleAll = () => {
    if (allChecked) setSelected(selected.filter(id => !pageData.find(m => m.id === id)))
    else setSelected([...new Set([...selected, ...pageData.map(m => m.id)])])
  }
  const toggleRow = (id) => {
    if (selected.includes(id)) setSelected(selected.filter(x => x !== id))
    else setSelected([...selected, id])
  }
  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changeSize = (sz) => { setPageSize(sz); setPage(1) }
  const openAdd = () => { setForm({ loginName: '', name: '', phone: '', jobNumber: '', contact: '', pkg: '', status: '启用', operator: '', remark: '' }); setEditTenant(undefined) }
  const openEdit = (t) => { setForm({ loginName: t.loginName, name: t.name, phone: t.phone, jobNumber: t.jobNumber, contact: t.name, pkg: t.pkg, status: t.status, operator: t.operator, remark: '' }); setEditTenant(t) }

  const S = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const LBL = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const RED = React.createElement('span', { style: { color: '#EF4444', marginRight: 2 } }, '*')
  const BTN = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  const mkStatusBadge = (s) => {
    const m = s === '启用' ? { bg: '#D1FAE5', color: '#059669' } : s === '试用' ? { bg: '#FEF3C7', color: '#D97706' } : { bg: '#F1F5F9', color: '#94A3B8' }
    return React.createElement('span', { style: { background: m.bg, color: m.color, fontSize: 12, padding: '2px 8px', borderRadius: 4 } }, s)
  }
  const mkBtn = (extra, onClick, children) => React.createElement('button', { style: Object.assign({}, BTN, extra), onClick }, children)
  const mkModalFooter = (cancelTxt, okTxt, okStyle, onCancel, onOk) =>
    React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
      React.createElement('button', { style: Object.assign({}, BTN, { background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }), onClick: onCancel }, cancelTxt),
      React.createElement('button', { style: Object.assign({}, BTN, { background: okStyle || '#3B82F6', color: '#fff' }), onClick: onOk }, okTxt)
    )
  const mkInput = (placeholder, value, onChange) => React.createElement('input', { style: S, placeholder, value, onChange: e => onChange(e.target.value) })
  const mkSelect = (opts, value, onChange) => React.createElement('select', { style: S, value, onChange: e => onChange(e.target.value) }, opts.map(o => React.createElement('option', { key: o, value: o }, o)))

  return React.createElement(React.Fragment, null,
    React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' } },
      React.createElement('div', { style: { display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' } },
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', minWidth: 200 } },
          React.createElement('label', { style: LBL }, '租户名称/登录名/手机号'),
          React.createElement('div', { style: { position: 'relative' } },
            React.createElement('span', { style: { position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: 13 } }, '🔍'),
            React.createElement('input', { style: { ...S, paddingLeft: 32 }, placeholder: '搜索', value: kw, onChange: e => { setKw(e.target.value); setPage(1) } })
          )
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', minWidth: 120 } },
          React.createElement('label', { style: LBL }, '状态'),
          mkSelect(['全部', '启用', '停用', '试用'], statusFilter || '全部', v => { setStatusFilter(v === '全部' ? '' : v); setPage(1) })
        )
      ),
      mkBtn({ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14 }, () => setPage(1), '查询'),
      mkBtn({ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14 }, () => { setKw(''); setStatusFilter(''); setPage(1) }, '重置'),
      mkBtn({ background: '#3B82F6', color: '#fff', flexShrink: 0 }, openAdd, '+ 新增租户')
    ),

    React.createElement('div', { style: { overflowX: 'auto' } },
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' } },
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569', width: 40 } }, React.createElement('input', { type: 'checkbox', checked: allChecked, onChange: toggleAll, style: { cursor: 'pointer' } })),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569', width: 50 } }, '序号'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '登录名称'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '姓名'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '手机号'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '工号'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '套餐'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569', width: 80 } }, '状态'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '运营人员'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '收款账户'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569' } }, '分账设置'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569', width: 140 } }, '创建时间'),
            React.createElement('th', { style: { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#475569', width: 120 } }, '操作')
          )
        ),
        React.createElement('tbody', null,
          pageData.length === 0 ? React.createElement('tr', null, React.createElement('td', { colSpan: 13, style: { textAlign: 'center', color: '#94A3B8', padding: '40px 0' } }, '暂无数据')) :
          pageData.map((t, idx) =>
            React.createElement('tr', { key: t.id, style: { background: selected.includes(t.id) ? '#EFF6FF' : '#fff', borderBottom: '1px solid #F1F5F9' } },
              React.createElement('td', { style: { padding: '12px 16px' } }, React.createElement('input', { type: 'checkbox', checked: selected.includes(t.id), onChange: () => toggleRow(t.id), style: { cursor: 'pointer' } })),
              React.createElement('td', { style: { padding: '12px 16px', color: '#94A3B8', fontSize: 12 } }, startIdx + idx + 1),
              React.createElement('td', { style: { padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#1E293B' } }, t.loginName),
              React.createElement('td', { style: { padding: '12px 16px', fontWeight: 600, color: '#1E293B' } }, t.name),
              React.createElement('td', { style: { padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#475569' } }, t.phone),
              React.createElement('td', { style: { padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#94A3B8' } }, t.jobNumber),
              React.createElement('td', { style: { padding: '12px 16px' } }, React.createElement('span', { style: { background: '#EFF6FF', color: '#3B82F6', fontSize: 12, padding: '2px 8px', borderRadius: 4 } }, t.pkg)),
              React.createElement('td', { style: { padding: '12px 16px' } }, mkStatusBadge(t.status)),
              React.createElement('td', { style: { padding: '12px 16px', color: '#64748B', fontSize: 13 } }, t.operator),
              React.createElement('td', { style: { padding: '12px 16px' } }, mkBtn({ background: '#3B82F6', color: '#fff', height: 26, padding: '0 10px', fontSize: 12 }, () => setAcctTenant(t), '收款账户')),
              React.createElement('td', { style: { padding: '12px 16px' } }, mkBtn({ background: '#fff', color: '#475569', border: '1px solid #E2E8F0', height: 26, padding: '0 10px', fontSize: 12 }, () => setSplitTenant(t), '分账设置')),
              React.createElement('td', { style: { padding: '12px 16px', color: '#94A3B8', fontSize: 12 } }, t.createTime),
              React.createElement('td', { style: { padding: '12px 16px' } },
                React.createElement('div', { style: { display: 'flex', gap: 4 } },
                  mkBtn({ background: '#3B82F6', color: '#fff', height: 28, padding: '0 10px', fontSize: 12 }, () => openEdit(t), '编辑'),
                  mkBtn({ background: 'transparent', color: '#EF4444', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }, () => setDelTenant(t), '删除')
                )
              )
            )
          )
        )
      )
    ),

    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, flexWrap: 'wrap', gap: 8 } },
      React.createElement('div', { style: { fontSize: 13, color: '#64748B' } }, '共 ', total, ' 条'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('span', { style: { fontSize: 13, color: '#9CA3AF' } }, '每页'),
        React.createElement('select', { style: { padding: '4px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', cursor: 'pointer' }, value: pageSize, onChange: e => changeSize(Number(e.target.value)) },
          [10, 20, 50].map(s => React.createElement('option', { key: s, value: s }, s + '条'))
        ),
        React.createElement('span', { style: { fontSize: 13, color: '#9CA3AF', padding: '0 6px' } }, '第 ', page, ' / ', totalPages, ' 页'),
        React.createElement('button', { style: { padding: '4px 10px', border: '1px solid #E2E8F0', borderRadius: 6, background: '#fff', color: '#475569', cursor: 'pointer', fontSize: 13, disabled: page === 1 }, onClick: () => go(1) }, '«'),
        React.createElement('button', { style: { padding: '4px 10px', border: '1px solid #E2E8F0', borderRadius: 6, background: '#fff', color: '#475569', cursor: 'pointer', fontSize: 13, disabled: page === 1 }, onClick: () => go(page - 1) }, '‹'),
        React.createElement('button', { style: { padding: '4px 10px', border: '1px solid #E2E8F0', borderRadius: 6, background: '#fff', color: '#475569', cursor: 'pointer', fontSize: 13, disabled: page >= totalPages }, onClick: () => go(page + 1) }, '›'),
        React.createElement('button', { style: { padding: '4px 10px', border: '1px solid #E2E8F0', borderRadius: 6, background: '#fff', color: '#475569', cursor: 'pointer', fontSize: 13, disabled: page >= totalPages }, onClick: () => go(totalPages) }, '»')
      )
    ),

    editTenant !== undefined && React.createElement(CenterModal, { open: true, onClose: () => setEditTenant(undefined), title: editTenant ? '编辑租户' : '新增租户', width: 560, footer: mkModalFooter('取消', '确定', '#3B82F6', () => setEditTenant(undefined), () => setEditTenant(undefined)) },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
        React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '登录名称'), mkInput('请输入登录名称', form.loginName, v => setForm(f => ({ ...f, loginName: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '姓名'), mkInput('请输入姓名', form.name, v => setForm(f => ({ ...f, name: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '手机号'), mkInput('请输入手机号', form.phone, v => setForm(f => ({ ...f, phone: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, '工号'), mkInput('请输入工号', form.jobNumber, v => setForm(f => ({ ...f, jobNumber: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, '套餐'), mkSelect(['请选择套餐', '基础版', '专业版', '旗舰版'].filter(Boolean), form.pkg, v => setForm(f => ({ ...f, pkg: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '状态'), mkSelect(['启用', '停用', '试用'], form.status, v => setForm(f => ({ ...f, status: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, '联系人'), mkInput('请输入联系人', form.contact, v => setForm(f => ({ ...f, contact: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL }, '运营人员'), mkSelect(['请选择', '李四', '王五', '张三'], form.operator, v => setForm(f => ({ ...f, operator: v })))),
        React.createElement('div', { style: { gridColumn: '1 / -1' } }, React.createElement('label', { style: LBL }, '备注'), React.createElement('textarea', { style: { ...S, resize: 'vertical', minHeight: 60 }, placeholder: '选填', value: form.remark, onChange: e => setForm(f => ({ ...f, remark: e.target.value })) }))
      )
    ),

    acctTenant !== null && React.createElement(CenterModal, { open: true, onClose: () => setAcctTenant(null), title: '收款账户', width: 480, footer: mkModalFooter('取消', '确定', '#3B82F6', () => setAcctTenant(null), () => setAcctTenant(null)) },
      React.createElement('div', null,
        React.createElement('div', { style: { background: '#F8FAFC', borderRadius: 8, padding: 12, marginBottom: 16, border: '1px solid #E2E8F0' } },
          React.createElement('div', { style: { fontSize: 12, color: '#94A3B8', marginBottom: 4 } }, '租户名称'),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: '#1E293B' } }, acctTenant.name)
        ),
        React.createElement('div', { style: { display: 'grid', gap: 16 } },
          React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '开户银行'), mkInput('请输入开户银行', '', () => {})),
          React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '银行账号'), mkInput('请输入银行账号', '', () => {})),
          React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '开户名称'), mkInput('请输入开户名称（企业/个人）', '', () => {}))
        )
      )
    ),

    splitTenant !== null && React.createElement(CenterModal, { open: true, onClose: () => setSplitTenant(null), title: '分账设置', width: 480, footer: mkModalFooter('取消', '确定', '#3B82F6', () => setSplitTenant(null), () => setSplitTenant(null)) },
      React.createElement('div', null,
        React.createElement('div', { style: { background: '#F8FAFC', borderRadius: 8, padding: 12, marginBottom: 16, border: '1px solid #E2E8F0' } },
          React.createElement('div', { style: { fontSize: 12, color: '#94A3B8', marginBottom: 4 } }, '租户名称'),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: '#1E293B' } }, splitTenant.name)
        ),
        React.createElement('div', { style: { display: 'grid', gap: 16 } },
          React.createElement('div', null,
            React.createElement('label', { style: LBL }, RED, '分账比例'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
              React.createElement('input', { style: { ...S, borderRadius: '6px 0 0 6px', borderRight: 'none' }, placeholder: '请输入比例' }),
              React.createElement('span', { style: { padding: '8px 12px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderLeft: 'none', borderRadius: '0 6px 6px 0', fontSize: 13, color: '#64748B' } }, '%')
            )
          ),
          React.createElement('div', null, React.createElement('label', { style: LBL }, RED, '分账模式'), mkSelect(['请选择', '固定比例', '阶梯分账'], '', () => {})),
          React.createElement('div', null, React.createElement('label', { style: LBL }, '备注'), React.createElement('textarea', { style: { ...S, resize: 'vertical', minHeight: 60 }, placeholder: '选填' }))
        )
      )
    ),

    delTenant !== null && React.createElement(CenterModal, { open: true, onClose: () => setDelTenant(null), title: '删除确认', width: 420, footer: mkModalFooter('取消', '确定', '#EF4444', () => setDelTenant(null), () => setDelTenant(null)) },
      React.createElement('div', { style: { textAlign: 'center', padding: '8px 0 4px' } },
        React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '⚠️'),
        React.createElement('div', { style: { fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 } }, '确认删除租户「', delTenant.name, '」吗？'),
        React.createElement('div', { style: { fontSize: 13, color: '#94A3B8' } }, '删除后不可恢复，请谨慎操作。')
      )
    )
  )
}



const MENU_TREE = [
  { label: '会员管理', value: 'member', children: [{ label: '用户信息管理', value: 'member_info' }, { label: '睡眠分析记录', value: 'member_sleep' }, { label: '会员等级权益', value: 'member_level' }] },
  { label: '小程序管理', value: 'miniprogram', children: [{ label: '社区动态', value: 'mp_community' }, { label: '专家管理', value: 'mp_expert' }, { label: '热点话题', value: 'mp_topic' }, { label: '商城管理', value: 'mp_mall' }] },
  { label: '商品管理', value: 'product', children: [{ label: '商品列表', value: 'product_list' }, { label: '商品分类', value: 'product_cat' }] },
  { label: '订单管理', value: 'order', children: [{ label: '订单列表', value: 'order_list' }, { label: '核销记录', value: 'order_verify' }] },
  { label: '系统管理', value: 'system', children: [{ label: '用户管理', value: 'sys_user' }, { label: '角色管理', value: 'sys_role' }, { label: '菜单管理', value: 'sys_menu' }, { label: '系统配置', value: 'sys_config' }] },
]

const PKGS = [
  { id: 1, name: '基础版', price: 299, period: '月', status: '启用', menuCount: 8, createTime: '2026-01-01', menus: ['member_info', 'product_list', 'order_list'] },
  { id: 2, name: '专业版', price: 799, period: '月', status: '启用', menuCount: 16, createTime: '2026-01-15', menus: ['member_info', 'member_sleep', 'product_list', 'order_list', 'sys_user'] },
  { id: 3, name: '旗舰版', price: 1999, period: '月', status: '启用', menuCount: 26, createTime: '2026-02-01', menus: [] },
]

function PackageTab() {
  const [pkgs] = useState(PKGS)
  const [editPkg, setEditPkg] = useState(undefined)
  const [delPkg, setDelPkg] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', period: '月', status: '启用', remark: '' })
  const [expanded, setExpanded] = useState({})
  const [selMenus, setSelMenus] = useState([])

  const toggleExpand = (v) => setExpanded(prev => ({ ...prev, [v]: !prev[v] }))
  const toggleItem = (v) => setSelMenus(prev => prev.includes(v) ? prev.filter(m => m !== v) : [...prev, v])
  const toggleGroup = (g, on) => { const vs = g.children.map(c => c.value); setSelMenus(prev => on ? [...new Set([...prev, ...vs])] : prev.filter(m => !vs.includes(m))) }
  const isGroupAll = (g) => g.children.every(c => selMenus.includes(c.value))
  const openAdd = () => { setForm({ name: '', price: '', period: '月', status: '启用', remark: '' }); setSelMenus([]); setEditPkg(undefined) }
  const openEdit = (pkg) => { setForm({ name: pkg.name, price: pkg.price, period: pkg.period, status: pkg.status, remark: '' }); setSelMenus(pkg.menus); setEditPkg(pkg) }

  const S2 = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const LBL2 = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const BTN2 = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }
  const mkBtn2 = (extra, onClick, children) => React.createElement('button', { style: Object.assign({}, BTN2, extra), onClick }, children)
  const mkInput2 = (placeholder, value, onChange) => React.createElement('input', { style: S2, placeholder, value, onChange: e => onChange(e.target.value) })
  const mkModalFooter2 = (cancelTxt, okTxt, onCancel, onOk) =>
    React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
      React.createElement('button', { style: Object.assign({}, BTN2, { background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }), onClick: onCancel }, cancelTxt),
      React.createElement('button', { style: Object.assign({}, BTN2, { background: '#3B82F6', color: '#fff' }), onClick: onOk }, okTxt)
    )

  return React.createElement(React.Fragment, null,
    React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' } },
      React.createElement('div', { style: { flex: 1 } }),
      mkBtn2({ background: '#3B82F6', color: '#fff', flexShrink: 0 }, openAdd, '+ 新增套餐')
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 } },
      pkgs.map(pkg =>
        React.createElement('div', { key: pkg.id, style: { border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', background: '#fff' } },
          React.createElement('div', { style: { padding: '16px 20px', background: '#EFF6FF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#1E3A5F' } }, pkg.name),
            React.createElement('span', { style: { background: '#D1FAE5', color: '#059669', fontSize: 12, padding: '2px 8px', borderRadius: 4 } }, pkg.status)
          ),
          React.createElement('div', { style: { padding: '16px 20px' } },
            React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: '#1E3A5F', marginBottom: 4 } },
              '¥', pkg.price,
              React.createElement('span', { style: { fontSize: 13, fontWeight: 400, color: '#9CA3AF' } }, '/', pkg.period)
            ),
            React.createElement('div', { style: { fontSize: 12, color: '#94A3B8', marginBottom: 12 } }, '包含 ', pkg.menuCount, ' 项菜单权限'),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 } },
              MENU_TREE.filter(g => g.children.some(c => pkg.menus.includes(c.value))).map(g =>
                React.createElement('span', { key: g.value, style: { fontSize: 11, padding: '2px 8px', background: '#F1F5F9', borderRadius: 4, color: '#64748B' } }, g.label)
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              mkBtn2({ background: '#3B82F6', color: '#fff', flex: 1, justifyContent: 'center', height: 32, fontSize: 13, padding: '0 12px' }, () => openEdit(pkg), '编辑'),
              mkBtn2({ background: 'transparent', color: '#EF4444', border: '1px solid #FEE2E2', flex: 1, justifyContent: 'center', height: 32, fontSize: 13, padding: '0 12px' }, () => setDelPkg(pkg), '删除')
            )
          )
        )
      )
    ),

    editPkg !== undefined && React.createElement(CenterModal, { open: true, onClose: () => setEditPkg(undefined), title: editPkg ? '编辑套餐' : '新增套餐', width: 640, footer: mkModalFooter2('取消', '确定', () => setEditPkg(undefined), () => setEditPkg(undefined)) },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
        React.createElement('div', null, React.createElement('label', { style: LBL2 }, React.createElement('span', { style: { color: '#EF4444', marginRight: 2 } }, '*'), '套餐名称'), mkInput2('如：旗舰版', form.name, v => setForm(f => ({ ...f, name: v })))),
        React.createElement('div', null, React.createElement('label', { style: LBL2 }, React.createElement('span', { style: { color: '#EF4444', marginRight: 2 } }, '*'), '价格（元）'), React.createElement('input', { type: 'number', style: S2, placeholder: '0', value: form.price, onChange: e => setForm(f => ({ ...f, price: e.target.value })) })),
        React.createElement('div', null, React.createElement('label', { style: LBL2 }, React.createElement('span', { style: { color: '#EF4444', marginRight: 2 } }, '*'), '计费周期'), React.createElement('select', { style: S2, value: form.period, onChange: e => setForm(f => ({ ...f, period: e.target.value })) }, ['月', '年'].map(o => React.createElement('option', { key: o, value: o }, o)))),
        React.createElement('div', null, React.createElement('label', { style: LBL2 }, React.createElement('span', { style: { color: '#EF4444', marginRight: 2 } }, '*'), '状态'), React.createElement('select', { style: S2, value: form.status, onChange: e => setForm(f => ({ ...f, status: e.target.value })) }, ['启用', '停用'].map(o => React.createElement('option', { key: o, value: o }, o)))),
        React.createElement('div', { style: { gridColumn: '1 / -1' } },
          React.createElement('label', { style: LBL2 }, React.createElement('span', { style: { color: '#EF4444', marginRight: 2 } }, '*'), '菜单权限（树形选择）'),
          React.createElement('div', { style: { border: '1px solid #E2E8F0', borderRadius: 8, maxHeight: 280, overflow: 'auto', padding: 8, background: '#F8FAFC' } },
            MENU_TREE.map(g =>
              React.createElement('div', { key: g.value, style: { marginBottom: 6 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px', borderRadius: 4, background: isGroupAll(g) ? '#EFF6FF' : 'transparent', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: '#1E293B' }, onClick: () => toggleExpand(g.value) },
                  React.createElement('input', { type: 'checkbox', checked: isGroupAll(g), onChange: () => toggleGroup(g, !isGroupAll(g)), style: { cursor: 'pointer', flexShrink: 0 }, onClick: e => e.stopPropagation() }),
                  React.createElement('span', { style: { flex: 1 } }, g.label),
                  React.createElement('span', { style: { fontSize: 11, color: '#94A3B8' } }, expanded[g.value] ? '▲' : '▼')
                ),
                expanded[g.value] && g.children.map(item =>
                  React.createElement('div', { key: item.value, style: { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 6px 36px', cursor: 'pointer', fontSize: 13, color: selMenus.includes(item.value) ? '#1E293B' : '#475569', background: selMenus.includes(item.value) ? '#EFF6FF' : 'transparent' }, onClick: () => toggleItem(item.value) },
                    React.createElement('input', { type: 'checkbox', checked: selMenus.includes(item.value), readOnly: true, style: { cursor: 'pointer', flexShrink: 0 } }),
                    React.createElement('span', null, item.label)
                  )
                )
              )
            )
          ),
          React.createElement('div', { style: { fontSize: 12, color: '#94A3B8', marginTop: 4 } }, '已选择 ', selMenus.length, ' 项菜单权限')
        )
      )
    ),

    delPkg !== null && React.createElement(CenterModal, { open: true, onClose: () => setDelPkg(null), title: '删除确认', width: 420, footer: mkModalFooter2('取消', '确定', () => setDelPkg(null), () => setDelPkg(null)) },
      React.createElement('div', { style: { textAlign: 'center', padding: '8px 0 4px' } },
        React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '⚠️'),
        React.createElement('div', { style: { fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 } }, '确认删除套餐「', delPkg.name, '」吗？'),
        React.createElement('div', { style: { fontSize: 13, color: '#94A3B8' } }, '删除后不可恢复，请谨慎操作。')
      )
    )
  )
}

export default function TenantPage() {
  const [tab, setTab] = useState('租户列表')
  const TABS = ['租户列表', '套餐管理']
  return (
    React.createElement('div', { className: 'page-container', style: { padding: '24px' } },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { style: { padding: '0 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' } },
          TABS.map(t =>
            React.createElement('button', {
              key: t,
              onClick: () => setTab(t),
              style: {
                padding: '14px 24px',
                border: 'none',
                background: 'transparent',
                fontSize: 14,
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
                cursor: 'pointer',
                borderBottom: tab === t ? '2.5px solid var(--gold)' : '2.5px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                letterSpacing: '0.3px',
              },
              onMouseOver: e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-secondary)' },
              onMouseOut: e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-muted)' },
            }, t)
          )
        ),
        React.createElement('div', { style: { padding: 0 } },
          tab === '租户列表' && React.createElement(TenantListTab),
          tab === '套餐管理' && React.createElement(PackageTab)
        )
      )
    )
  )
}
