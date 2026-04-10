import React, { useState } from 'react'
import CenterModal from '../../components/CenterModal'
import '../../styles/admin.css'

/* ============ 模拟数据 ============ */
const TENANTS = [
  { id: 1, code: 'TNT001', name: '智眠星', package: '系统租户', contact: '张上', phone: '151****2508', status: '开启', operator: '李四', creator: 'admin', createTime: '2016-09-21 08:50:08', updater: 'admin', updateTime: '2016-09-21 10:20:00' },
  { id: 2, code: 'TNT002', name: '测试租户', package: '普通套餐', contact: 'SS', phone: '138****1234', status: '关闭', operator: '王五', creator: 'admin', createTime: '2016-09-22 09:15:30', updater: 'admin', updateTime: '2016-09-22 11:00:00' },
  { id: 3, code: 'TNT003', name: '健康中心', package: '旗舰套餐', contact: '李四', phone: '139****5678', status: '开启', operator: '张上', creator: 'admin', createTime: '2016-09-23 14:22:00', updater: 'admin', updateTime: '2016-09-23 15:30:00' },
  { id: 4, code: 'TNT004', name: '医学科技', package: '普通套餐', contact: '王五', phone: '137****9012', status: '开启', operator: '李四', creator: 'admin', createTime: '2016-09-24 08:45:10', updater: 'admin', updateTime: '2016-09-24 09:00:00' },
  { id: 5, code: 'TNT005', name: '睡眠研究', package: '系统租户', contact: '赵六', phone: '136****3456', status: '关闭', operator: '王五', creator: 'admin', createTime: '2016-09-25 10:10:00', updater: 'admin', updateTime: '2016-09-25 12:00:00' },
]

const PAGE_SIZE = 10
const TOTAL = 400

/* ============ 主体组件 ============ */
export default function TenantListPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState([])

  // 新增/编辑弹窗
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [pkgName, setPkgName] = useState('')
  const [pkgPackage, setPkgPackage] = useState('')
  const [pkgContact, setPkgContact] = useState('')
  const [pkgPhone, setPkgPhone] = useState('')
  const [pkgStatus, setPkgStatus] = useState('开启')
  const [pkgOperator, setPkgOperator] = useState('')

  // 收款账户弹窗
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountTenant, setAccountTenant] = useState(null)

  // 分账设置弹窗
  const [splitOpen, setSplitOpen] = useState(false)
  const [splitTenant, setSplitTenant] = useState(null)

  // 删除确认弹窗
  const [delOpen, setDelOpen] = useState(false)
  const [delName, setDelName] = useState('')
  const [delId, setDelId] = useState(null)

  /* 筛选 */
  const filtered = TENANTS.filter(t => {
    if (name && !t.name.includes(name)) return false
    if (contact && !t.contact.includes(contact)) return false
    if (status && t.status !== status) return false
    return true
  })

  const totalPages = Math.ceil(TOTAL / pageSize)
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  /* 打开新增 */
  function openAdd() {
    setEditData(null)
    setPkgName('')
    setPkgPackage('')
    setPkgContact('')
    setPkgPhone('')
    setPkgStatus('开启')
    setPkgOperator('')
    setEditOpen(true)
  }

  /* 打开编辑 */
  function openEdit(t) {
    setEditData(t)
    setPkgName(t.name)
    setPkgPackage(t.package)
    setPkgContact(t.contact)
    setPkgPhone(t.phone)
    setPkgStatus(t.status)
    setPkgOperator(t.operator)
    setEditOpen(true)
  }

  /* 打开收款账户 */
  function openAccount(t) {
    setAccountTenant(t)
    setAccountOpen(true)
  }

  /* 打开分账设置 */
  function openSplit(t) {
    setSplitTenant(t)
    setSplitOpen(true)
  }

  /* 打开删除 */
  function openDelete(t) {
    setDelId(t.id)
    setDelName(t.name)
    setDelOpen(true)
  }

  /* 全选 */
  function toggleAll() {
    if (selected.length === pageData.length) setSelected([])
    else setSelected(pageData.map(p => p.id))
  }

  /* 导出 */
  function handleExport() {
    alert('导出功能开发中...')
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.min(totalPages, 9); i++) pageNumbers.push(i)

  return (
    <div className="page-container">
      <div className="card">
        {/* 顶部标题 */}
        <div className="card-header">
          <h3>🏢 租户列表</h3>
          <p className="card-subtitle">管理所有入驻的租户及其资源</p>
        </div>

        {/* 筛选区 */}
        {!collapsed && (
          <div className="toolbar">
            <div className="toolbar-left">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input className="search-input" style={{ width: 200 }}
                  placeholder="请输入租户名称模糊搜索"
                  value={name} onChange={e => { setName(e.target.value); setPage(1) }} />
              </div>
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input className="search-input" style={{ width: 200 }}
                  placeholder="请输入联系人模糊搜索"
                  value={contact} onChange={e => { setContact(e.target.value); setPage(1) }} />
              </div>
              <select className="filter-select" style={{ width: 170 }}
                value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                <option value="">请选择租户状态，字典维护</option>
                <option value="开启">开启</option>
                <option value="关闭">关闭</option>
              </select>
              {/* 创建日期 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input type="date" className="form-input" style={{ width: 140, padding: '6px 10px', fontSize: 13 }}
                  value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span style={{ color: '#94A3B8', fontSize: 12 }}>~</span>
                <input type="date" className="form-input" style={{ width: 140, padding: '6px 10px', fontSize: 13 }}
                  value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="toolbar-right">
              <button className="btn-query" onClick={() => setPage(1)}>查询</button>
              <button className="btn-reset" onClick={() => { setName(''); setContact(''); setStatus(''); setStartDate(''); setEndDate(''); setPage(1) }}>重置</button>
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
            <button className="btn btn-ghost btn-sm" onClick={handleExport}>导出</button>
          </div>
        </div>

        {/* 列表 */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 48 }}><input type="checkbox" checked={selected.length === pageData.length && pageData.length > 0}
                  onChange={toggleAll} /></th>
                <th>序号</th>
                <th>租户编号</th>
                <th>租户名称</th>
                <th>租户套餐</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>租户状态</th>
                <th>运营人员</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>修改人</th>
                <th>修改时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((t, idx) => (
                <tr key={t.id}>
                  <td><input type="checkbox" checked={selected.includes(t.id)}
                    onChange={() => {
                      setSelected(prev => prev.includes(t.id) ? prev.filter(i => i !== t.id) : [...prev, t.id])
                    }} /></td>
                  <td>{(page - 1) * pageSize + idx + 1}</td>
                  <td style={{ fontFamily: 'monospace', color: '#64748B', fontSize: 12 }}>{t.code}</td>
                  <td><span style={{ fontWeight: 600 }}>{t.name}</span></td>
                  <td><span className="badge badge-primary">{t.package}</span></td>
                  <td>{t.contact}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>{t.phone}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.status === '开启' ? '#00CC88' : '#EF4444', display: 'inline-block' }} />
                      <span style={{ color: t.status === '开启' ? '#059669' : '#DC2626', fontSize: 13 }}>{t.status}</span>
                    </span>
                  </td>
                  <td>{t.operator}</td>
                  <td>{t.creator}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{t.createTime}</td>
                  <td>{t.updater}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{t.updateTime}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-action btn-edit" style={{ fontSize: 12, padding: '0 8px', height: 26, minWidth: 0 }} onClick={() => openEdit(t)}>编辑</button>
                      <button className="btn-action btn-edit" style={{ fontSize: 12, padding: '0 8px', height: 26, minWidth: 0 }} onClick={() => openAccount(t)}>收款账户</button>
                      <button className="btn-action btn-edit" style={{ fontSize: 12, padding: '0 8px', height: 26, minWidth: 0 }} onClick={() => openSplit(t)}>分账设置</button>
                      <button className="btn-action btn-delete" style={{ fontSize: 12, padding: '0 8px', height: 26, minWidth: 0 }} onClick={() => openDelete(t)}>删除</button>
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
            <span style={{ fontSize: 12, color: '#64748B', padding: '0 6px' }}>...</span>
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 8px' }}>第 {page}/{totalPages} 页</span>
            <select className="filter-select" style={{ width: 90, fontSize: 12 }}
              value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
              <option value="10">10 条/页</option>
              <option value="20">20 条/页</option>
              <option value="50">50 条/页</option>
            </select>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 12, color: '#64748B' }}>跳至</span>
              <input style={{ width: 48, padding: '4px 8px', border: '1.5px solid #E2E8F0', borderRadius: 6, fontSize: 12, outline: 'none' }}
                defaultValue={5}
                onKeyDown={e => { if (e.key === 'Enter') setPage(Number(e.target.value)) }} />
              <span style={{ fontSize: 12, color: '#64748B' }}>页</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========== 新增/编辑弹窗 ========== */}
      <CenterModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={editData ? '编辑租户' : '新增租户'}
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
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 租户名称</div>
            <input className="form-input" placeholder="请输入租户名称" value={pkgName} onChange={e => setPkgName(e.target.value)} />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 租户套餐</div>
            <select className="form-input" value={pkgPackage} onChange={e => setPkgPackage(e.target.value)}>
              <option value="">请选择租户套餐，单选</option>
              <option value="系统租户">系统租户</option>
              <option value="普通套餐">普通套餐</option>
              <option value="旗舰套餐">旗舰套餐</option>
            </select>
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 联系人</div>
            <input className="form-input" placeholder="请输入联系人" value={pkgContact} onChange={e => setPkgContact(e.target.value)} />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 联系电话</div>
            <input className="form-input" placeholder="请输入联系电话" value={pkgPhone} onChange={e => setPkgPhone(e.target.value)} />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 租户状态</div>
            <div style={{ display: 'flex', gap: 24 }}>
              {['开启', '关闭'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                  <input type="radio" name="tenantStatus" value={opt}
                    checked={pkgStatus === opt} onChange={() => setPkgStatus(opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">运营人员</div>
            <select className="form-input" value={pkgOperator} onChange={e => setPkgOperator(e.target.value)}>
              <option value="">请选择运营人员，是否需要多派？数据来源系统租户</option>
              <option value="李四">李四</option>
              <option value="王五">王五</option>
              <option value="张上">张上</option>
            </select>
            <p className="form-hint">运营人员可查看该租户全部数据，新增该人员在用户管理配置岗位</p>
          </div>
        </div>
      </CenterModal>

      {/* ========== 收款账户弹窗 ========== */}
      <CenterModal
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        title="收款账户"
        width={480}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setAccountOpen(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setAccountOpen(false)}>确定</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>租户名称</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{accountTenant?.name}</div>
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 开户银行</div>
            <input className="form-input" placeholder="请输入开户银行" />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 银行账号</div>
            <input className="form-input" placeholder="请输入银行账号" />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 开户名称</div>
            <input className="form-input" placeholder="请输入开户名称" />
          </div>
        </div>
      </CenterModal>

      {/* ========== 分账设置弹窗 ========== */}
      <CenterModal
        open={splitOpen}
        onClose={() => setSplitOpen(false)}
        title="分账设置"
        width={480}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setSplitOpen(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14 }}
              onClick={() => setSplitOpen(false)}>确定</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>租户名称</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{splitTenant?.name}</div>
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 分账比例</div>
            <input className="form-input" placeholder="请输入分账比例，如：30%" />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 分账模式</div>
            <select className="form-input">
              <option value="">请选择分账模式</option>
              <option value="固定比例">固定比例</option>
              <option value="阶梯分账">阶梯分账</option>
            </select>
          </div>
          <div className="form-item">
            <div className="form-label">备注</div>
            <textarea className="form-input" rows={2} placeholder="请输入备注" style={{ resize: 'vertical', fontFamily: 'inherit' }} />
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
          <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
            删除 <strong>{delName}</strong>，删除后不能恢复，是否继续？
          </div>
        </div>
      </CenterModal>
    </div>
  )
}
