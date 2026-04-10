import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const DEVICE_TYPES = ['血压计', '血糖仪', '体脂秤', '心电仪', '血氧仪', '体温计']

const mockData = [
  { id: 1, deviceType: '血压计', param: 'Systolic Blood Pressure', paramName: '收缩压', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 2, deviceType: '血压计', param: 'Diastolic Blood Pressure', paramName: '舒张压', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 3, deviceType: '心电仪', param: 'Heart Rate', paramName: '心率', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 4, deviceType: '体脂秤', param: 'Body Fat Percentage', paramName: '体脂率', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 5, deviceType: '血糖仪', param: 'Blood Glucose', paramName: '血糖', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 6, deviceType: '血氧仪', param: 'SpO2', paramName: '血氧饱和度', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 7, deviceType: '体温计', param: 'Body Temperature', paramName: '体温', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
  { id: 8, deviceType: '血压计', param: 'Mean Arterial Pressure', paramName: '平均动脉压', creator: '管理员', createTime: '2016-09-21 08:50:08', updater: '管理员', updateTime: '2016-09-21 08:50:08' },
]

export default function DeviceManagePage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState(mockData)
  const [showAdd, setShowAdd] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [delTarget, setDelTarget] = useState(null)
  const [formType, setFormType] = useState('')
  const [formParam, setFormParam] = useState('')
  const [formName, setFormName] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  function resetFilters() { setSearch(''); setFilterType(''); setPage(1) }

  const filtered = data.filter(item => {
    if (search && !item.param.includes(search) && !item.paramName.includes(search)) return false
    if (filterType && item.deviceType !== filterType) return false
    return true
  })
  const total = filtered.length
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(total / pageSize) || 1

  function openAdd(item) {
    if (item) {
      setEditTarget(item)
      setFormType(item.deviceType)
      setFormParam(item.param)
      setFormName(item.paramName)
    } else {
      setEditTarget(null)
      setFormType('')
      setFormParam('')
      setFormName('')
    }
    setShowAdd(true)
  }

  async function handleSave() {
    if (!formType) { alert('请选择设备类型'); return }
    if (!formParam) { alert('请输入参数'); return }
    if (!formName) { alert('请输入参数名称'); return }
    setFormLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (editTarget) {
      setData(prev => prev.map(it => it.id === editTarget.id ? { ...it, deviceType: formType, param: formParam, paramName: formName, updateTime: '2016-09-21 08:50:08', updater: '当前用户' } : it))
    } else {
      setData(prev => [{ id: Date.now(), deviceType: formType, param: formParam, paramName: formName, creator: '当前用户', createTime: '2016-09-21 08:50:08', updater: '当前用户', updateTime: '2016-09-21 08:50:08' }, ...prev])
    }
    setFormLoading(false)
    setShowAdd(false)
  }

  async function handleImport() {
    setFormLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setFormLoading(false)
    setShowImport(false)
  }

  function confirmDelete() {
    if (!delTarget) return
    setData(prev => prev.filter(it => it.id !== delTarget.id))
    setDelTarget(null)
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.min(totalPages, 9); i++) pageNumbers.push(i)

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <h3>🔧 设备参数管理</h3>
          <p className="card-subtitle">配置设备型号与参数映射关系</p>
        </div>

        {/* 筛选 */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="请输入参数信息模糊搜索"
                value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <select className="filter-select" style={{ width: 180 }} value={filterType}
              onChange={e => { setFilterType(e.target.value); setPage(1) }}>
              <option value="">请选择设备类型</option>
              {DEVICE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="toolbar-right">
            <button className="btn-query" onClick={() => setPage(1)}>查询</button>
            <button className="btn-reset" onClick={resetFilters}>重置</button>
          </div>
        </div>

        {/* 操作 */}
        <div className="toolbar" style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, paddingBottom: 12 }}>
          <div className="toolbar-left" />
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm" onClick={() => openAdd(null)}>+ 新增</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowImport(true)}>导入</button>
          </div>
        </div>

        {/* 列表 */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>设备类型</th>
                <th>参数</th>
                <th>参数名称</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>修改人</th>
                <th>修改时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, idx) => (
                <tr key={item.id}>
                  <td>{(page - 1) * pageSize + idx + 1}</td>
                  <td>{item.deviceType}</td>
                  <td style={{ fontFamily: 'monospace', color: '#64748B', fontSize: 12 }}>{item.param}</td>
                  <td style={{ fontWeight: 600, color: '#1E3A5F' }}>{item.paramName}</td>
                  <td>{item.creator}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{item.createTime}</td>
                  <td>{item.updater}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{item.updateTime}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-action btn-edit" onClick={() => openAdd(item)}>编辑</button>
                      <button className="btn-action btn-delete" onClick={() => setDelTarget(item)}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="pagination">
          <div className="pagination-info">共 {total} 条记录</div>
          <div className="pagination-controls">
            {pageNumbers.map(n => (
              <button key={n} className={`page-btn ${n === page ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
            ))}
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 8px' }}>第 {page}/{totalPages} 页</span>
            <select className="filter-select" style={{ width: 90, fontSize: 12 }}
              value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
              {[10, 20, 50].map(n => <option key={n}>{n} 条/页</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 新增/编辑弹窗 */}
      <CenterModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title={editTarget ? '编辑参数' : '新增参数'}
        width={560}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }} onClick={() => setShowAdd(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14, background: '#3B82F6' }} onClick={handleSave} disabled={formLoading}>
              {formLoading ? '保存中...' : '确定'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 设备类型</div>
            <select className="form-input" value={formType} onChange={e => setFormType(e.target.value)}>
              <option value="">请选择设备类型，字典维护</option>
              {DEVICE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 参数</div>
            <input className="form-input" placeholder="请输入参数" value={formParam} onChange={e => setFormParam(e.target.value)} />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 参数名称</div>
            <input className="form-input" placeholder="请输入参数名称" value={formName} onChange={e => setFormName(e.target.value)} />
          </div>
        </div>
      </CenterModal>

      {/* 导入弹窗 */}
      <CenterModal
        open={showImport}
        onClose={() => setShowImport(false)}
        title="导入参数"
        width={560}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }} onClick={() => setShowImport(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14, background: '#3B82F6' }} onClick={handleImport} disabled={formLoading}>
              {formLoading ? '导入中...' : '确定'}
            </button>
          </>
        }
      >
        <div style={{ border: '2px dashed #CBD5E1', borderRadius: 8, padding: '40px', textAlign: 'center', cursor: 'pointer', background: '#F8FAFC' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📁</div>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 6 }}>点击或将文件拖拽到这里上传</div>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>支持扩展名：.xls .xlsx</div>
        </div>
      </CenterModal>

      {/* 删除确认弹窗 */}
      <CenterModal
        open={!!delTarget}
        onClose={() => setDelTarget(null)}
        title="删除确认"
        width={420}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }} onClick={() => setDelTarget(null)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14, background: '#EF4444' }} onClick={confirmDelete}>确定</button>
          </>
        }
      >
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
            删除 <strong>{delTarget?.paramName}</strong>，删除后不能恢复，是否继续？
          </div>
        </div>
      </CenterModal>
    </div>
  )
}
