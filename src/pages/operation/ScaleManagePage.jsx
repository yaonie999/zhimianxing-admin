import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const STATUS_MAP = {
  开启: { bg: '#D1FAE5', color: '#065F46' },
  关闭: { bg: '#FEE2E2', color: '#991B1B' },
}

function StatusBadge({ s }) {
  const st = STATUS_MAP[s] || { bg: '#F1F5F9', color: '#9CA3AF' }
  return (
    <span style={{ background: st.bg, color: st.color, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: st.color, marginRight: 6 }} />
      {s}
    </span>
  )
}

const mockData = [
  { id: 1, name: '匹斯堡睡眠质量指数 - PSQI', category: '睡眠监测', status: '开启', creator: '赵医生', createTime: '2016-09-21 08:50:08', updater: '赵医生', updateTime: '2016-09-21 08:50:08' },
  { id: 2, name: '宗氏焦虑自评量表 - SAS', category: '情绪量表', status: '开启', creator: '李医生', createTime: '2016-09-21 08:50:08', updater: '李医生', updateTime: '2016-09-21 08:50:08' },
  { id: 3, name: '失眠障碍主观评估技术', category: '失眠障碍主观评估技术', status: '关闭', creator: '王医生', createTime: '2016-09-21 08:50:08', updater: '王医生', updateTime: '2016-09-21 08:50:08' },
  { id: 4, name: 'PHQ-9抑郁症筛查量表', category: '情绪量表', status: '开启', creator: '赵医生', createTime: '2016-09-21 08:50:08', updater: '赵医生', updateTime: '2016-09-21 08:50:08' },
  { id: 5, name: 'GAD-7焦虑量表', category: '情绪量表', status: '开启', creator: '李医生', createTime: '2016-09-21 08:50:08', updater: '李医生', updateTime: '2016-09-21 08:50:08' },
  { id: 6, name: '睡眠日志', category: '睡眠监测', status: '关闭', creator: '王医生', createTime: '2016-09-21 08:50:08', updater: '王医生', updateTime: '2016-09-21 08:50:08' },
  { id: 7, name: 'Epworth嗜睡量表', category: '睡眠监测', status: '开启', creator: '赵医生', createTime: '2016-09-21 08:50:08', updater: '赵医生', updateTime: '2016-09-21 08:50:08' },
  { id: 8, name: 'SF-36生活质量量表', category: '基础量表', status: '开启', creator: '李医生', createTime: '2016-09-21 08:50:08', updater: '李医生', updateTime: '2016-09-21 08:50:08' },
]

const CATEGORIES = ['基础量表', '情绪量表', '失眠障碍主观评估技术', '睡眠监测']
const STATUSES = ['开启', '关闭']

export default function ScaleManagePage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState(mockData)
  const [showAdd, setShowAdd] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [delTarget, setDelTarget] = useState(null)

  const [addName, setAddName] = useState('')
  const [addCat, setAddCat] = useState('')
  const [addStatus, setAddStatus] = useState('开启')
  const [editLoading, setEditLoading] = useState(false)
  const [importLoading, setImportLoading] = useState(false)
  const [importName, setImportName] = useState('')
  const [importCat, setImportCat] = useState('')
  const [importStatus, setImportStatus] = useState('开启')

  function resetFilters() {
    setSearch(''); setFilterStatus(''); setFilterCat(''); setPage(1)
  }

  const filtered = data.filter(item => {
    if (search && !item.name.includes(search)) return false
    if (filterStatus && item.status !== filterStatus) return false
    if (filterCat && item.category !== filterCat) return false
    return true
  })
  const total = filtered.length
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(total / pageSize) || 1

  function openAdd(item) {
    if (item) {
      setEditTarget(item)
      setAddName(item.name)
      setAddCat(item.category)
      setAddStatus(item.status)
    } else {
      setEditTarget(null)
      setAddName('')
      setAddCat('')
      setAddStatus('开启')
    }
    setShowAdd(true)
  }

  async function handleSave() {
    if (!addName) { alert('请填写量表名称'); return }
    setEditLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (editTarget) {
      setData(prev => prev.map(it => it.id === editTarget.id ? { ...it, name: addName, category: addCat, status: addStatus, updateTime: '2016-09-21 08:50:08', updater: '当前用户' } : it))
    } else {
      setData(prev => [{ id: Date.now(), name: addName, category: addCat, status: addStatus, creator: '当前用户', createTime: '2016-09-21 08:50:08', updater: '当前用户', updateTime: '2016-09-21 08:50:08' }, ...prev])
    }
    setEditLoading(false)
    setShowAdd(false)
  }

  async function handleImport() {
    if (!importName) { alert('请填写量表名称'); return }
    if (!importCat) { alert('请选择量表分类'); return }
    setImportLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setData(prev => [{ id: Date.now(), name: importName, category: importCat, status: importStatus, creator: '当前用户', createTime: '2016-09-21 08:50:08', updater: '当前用户', updateTime: '2016-09-21 08:50:08' }, ...prev])
    setImportLoading(false)
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
          <h3>📋 量表管理</h3>
          <p className="card-subtitle">管理睡眠健康相关量表配置</p>
        </div>

        {/* 筛选 */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="请输入量表名称" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <select className="filter-select" style={{ width: 180 }} value={filterCat}
              onChange={e => { setFilterCat(e.target.value); setPage(1) }}>
              <option value="">请选择量表分类</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" style={{ width: 160 }} value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
              <option value="">请选择量表状态</option>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
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
                <th>量表名称</th>
                <th>量表分类</th>
                <th>量表状态</th>
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
                  <td style={{ fontWeight: 600, color: '#1E3A5F', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.name}>{item.name}</td>
                  <td>{item.category}</td>
                  <td><StatusBadge s={item.status} /></td>
                  <td>{item.creator}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{item.createTime}</td>
                  <td>{item.updater}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{item.updateTime}</td>
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
            <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 8px' }}>第 {page}/{totalPages} 页</span>
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
        title={editTarget ? '编辑量表' : '新增量表'}
        width={560}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }} onClick={() => setShowAdd(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14 }} onClick={handleSave} disabled={editLoading}>
              {editLoading ? '保存中...' : '确定'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 量表名称</div>
            <input className="form-input" placeholder="请输入量表名称" value={addName} onChange={e => setAddName(e.target.value)} />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 量表分类</div>
            <select className="form-input" value={addCat} onChange={e => setAddCat(e.target.value)}>
              <option value="">请选择量表分类，字典维护</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 量表状态</div>
            <div style={{ display: 'flex', gap: 20 }}>
              {STATUSES.map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                  <input type="radio" name="scaleStatus" value={s} checked={addStatus === s} onChange={() => setAddStatus(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>
      </CenterModal>

      {/* 导入弹窗 */}
      <CenterModal
        open={showImport}
        onClose={() => setShowImport(false)}
        title="导入量表"
        width={560}
        footer={
          <>
            <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }} onClick={() => setShowImport(false)}>取消</button>
            <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14, background: '#3B82F6' }} onClick={handleImport} disabled={importLoading}>
              {importLoading ? '导入中...' : '确定'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 量表名称</div>
            <input className="form-input" placeholder="请输入量表名称" value={importName} onChange={e => setImportName(e.target.value)} />
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 量表分类</div>
            <select className="form-input" value={importCat} onChange={e => setImportCat(e.target.value)}>
              <option value="">请选择量表分类，字典维护</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-item">
            <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 量表状态</div>
            <div style={{ display: 'flex', gap: 20 }}>
              {STATUSES.map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                  <input type="radio" name="importStatus" value={s} checked={importStatus === s} onChange={() => setImportStatus(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">文件上传</div>
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: 8, padding: '32px', textAlign: 'center', cursor: 'pointer', background: '#F8FAFC' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 4 }}>点击或将文件拖拽到这里上传</div>
              <div style={{ fontSize: 12, color: '#CBD5E1' }}>支持扩展名：.xls .xlsx</div>
            </div>
          </div>
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
          <div style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.8 }}>
            删除 <strong>{delTarget?.name}</strong>，删除后不能恢复，是否继续？
          </div>
        </div>
      </CenterModal>
    </div>
  )
}
