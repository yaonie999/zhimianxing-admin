import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 字典数据子页面 ==================== */
function DictDataPage({ dict, onClose }) {
  const [tag, setTag] = useState('')
  const [label, setLabel] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [editItem, setEditItem] = useState(undefined)
  const [deleteItem, setDeleteItem] = useState(null)
  const [form, setForm] = useState({ label: '', key: '', value: '', sort: 0, status: '正常', remark: '' })

  const DATA_ITEMS = [
    { id: 1, label: '青铜', key: 'BRONZE', value: '1', sort: 1, status: '正常', remark: '', createTime: '2026-01-01' },
    { id: 2, label: '白银', key: 'SILVER', value: '2', sort: 2, status: '正常', remark: '', createTime: '2026-01-01' },
    { id: 3, label: '黄金', key: 'GOLD', value: '3', sort: 3, status: '正常', remark: '', createTime: '2026-01-01' },
    { id: 4, label: '铂金', key: 'PLATINUM', value: '4', sort: 4, status: '正常', remark: '', createTime: '2026-01-01' },
    { id: 5, label: '钻石', key: 'DIAMOND', value: '5', sort: 5, status: '停用', remark: '', createTime: '2026-01-01' },
  ]

  const filtered = DATA_ITEMS.filter(d => {
    if (label && !d.label.includes(label)) return false
    if (status && d.status !== status) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)
  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }
  const openAdd = () => { setForm({ label: '', key: '', value: '', sort: 0, status: '正常', remark: '' }); setEditItem(null) }
  const openEdit = (d) => { setForm({ label: d.label, key: d.key, value: d.value, sort: d.sort, status: d.status, remark: d.remark }); setEditItem(d) }

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  return (
    <div style={{ background: '#fff', borderRadius: 8 }}>
      {/* 筛选区 */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
              <label style={labelStyle}>字典标签</label>
              <input style={inputStyle} placeholder="请输入字典标签" value={label} onChange={e => { setLabel(e.target.value); setPage(1) }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
              <label style={labelStyle}>状态</label>
              <select style={inputStyle} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                <option value="">全部</option>
                <option value="正常">正常</option>
                <option value="停用">停用</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>搜索</button>
            <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setLabel(''); setStatus(''); setPage(1) }}>重置</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={openAdd}>新增</button>
          <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }}>修改</button>
          <button style={{ ...btnBase, background: '#fff', color: '#EF4444', border: '1px solid #FEE2E2' }}>删除</button>
          <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }}>导出</button>
          <button style={{ ...btnBase, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }} onClick={onClose}>关闭</button>
        </div>
      </div>

      {/* 表格 */}
      <div className="table-wrapper">
        <table className="table" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 50 }}>序号</th>
              <th>字典标签</th>
              <th>字典键值</th>
              <th style={{ width: 80 }}>字典排序</th>
              <th style={{ width: 90 }}>状态</th>
              <th>备注</th>
              <th style={{ width: 140 }}>创建时间</th>
              <th style={{ width: 120 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((d, idx) => (
              <tr key={d.id}>
                <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                <td style={{ fontWeight: 600, color: '#1E293B' }}>{d.label}</td>
                <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{d.key}</span></td>
                <td style={{ fontFamily: 'monospace', color: '#64748B', textAlign: 'center' }}>{d.sort}</td>
                <td>
                  <span className={`badge ${d.status === '正常' ? 'badge-success' : 'badge-default'}`}
                    style={{ background: d.status === '正常' ? '#D1FAE5' : '#F1F5F9', color: d.status === '正常' ? '#059669' : '#94A3B8' }}>
                    {d.status}
                  </span>
                </td>
                <td style={{ color: '#94A3B8', fontSize: 13 }}>{d.remark || '—'}</td>
                <td style={{ color: '#94A3B8', fontSize: 12 }}>{d.createTime}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <button style={{ ...btnBase, background: '#3B82F6', color: '#fff', height: 28, padding: '0 10px', fontSize: 12 }} onClick={() => openEdit(d)}>编辑</button>
                    <button style={{ ...btnBase, background: 'transparent', color: '#EF4444', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setDeleteItem(d)}>删除</button>
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

      {/* 新建/编辑字典数据 */}
      {editItem !== undefined && (
        <CenterModal
          open={true}
          onClose={() => setEditItem(undefined)}
          title={editItem ? '编辑字典数据' : '新增字典数据'}
          width={500}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setEditItem(undefined)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setEditItem(undefined)}>确定</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>{redStar}字典标签</label>
              <input style={inputStyle} placeholder="请输入字典标签" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}字典键值</label>
              <input style={inputStyle} placeholder="请输入字典键值" value={form.key} onChange={e => setForm({ ...form, key: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}字典排序</label>
              <input type="number" style={inputStyle} placeholder="0" value={form.sort} onChange={e => setForm({ ...form, sort: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}状态</label>
              <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="正常">正常</option>
                <option value="停用">停用</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>备注</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} placeholder="选填" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            </div>
          </div>
        </CenterModal>
      )}

      {/* 删除确认 */}
      {deleteItem !== null && (
        <CenterModal
          open={true}
          onClose={() => setDeleteItem(null)}
          title="删除确认"
          width={420}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDeleteItem(null)}>取消</button>
              <button style={{ ...btnBase, background: '#EF4444', color: '#fff' }} onClick={() => setDeleteItem(null)}>确定</button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 }}>确认删除字典数据「{deleteItem?.label}」吗？</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>删除后不可恢复，请谨慎操作。</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}

/* ==================== 字典管理 ==================== */
const DICTS = [
  { id: 1, name: '会员等级', code: 'member_level', type: '系统', status: '正常', createBy: '系统', createTime: '2026-01-10 10:00', updateBy: '系统', updateTime: '2026-01-10 10:00' },
  { id: 2, name: '订单状态', code: 'order_status', type: '业务', status: '正常', createBy: '张三', createTime: '2026-01-15 10:00', updateBy: '李四', updateTime: '2026-04-01 09:00' },
  { id: 3, name: '性别', code: 'gender', type: '系统', status: '正常', createBy: '系统', createTime: '2026-01-01 10:00', updateBy: '系统', updateTime: '2026-01-01 10:00' },
  { id: 4, name: '婚姻状况', code: 'marriage', type: '业务', status: '正常', createBy: '张三', createTime: '2026-01-01 10:00', updateBy: '张三', updateTime: '2026-01-01 10:00' },
  { id: 5, name: '设备状态', code: 'device_status', type: '业务', status: '停用', createBy: '李四', createTime: '2026-02-01 10:00', updateBy: '李四', updateTime: '2026-03-01 10:00' },
  { id: 6, name: '支付方式', code: 'pay_method', type: '业务', status: '正常', createBy: '张三', createTime: '2026-01-20 10:00', updateBy: '张三', updateTime: '2026-01-20 10:00' },
]

export default function DictManagePage() {
  const [dicts] = useState(DICTS)
  const [keyword, setKeyword] = useState('')
  const [dictType, setDictType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [expanded, setExpanded] = useState({})
  const [editDict, setEditDict] = useState(undefined)
  const [deleteDict, setDeleteDict] = useState(null)
  const [addChildDict, setAddChildDict] = useState(null)
  const [dictData, setDictData] = useState(null)
  const [form, setForm] = useState({ name: '', code: '', type: '系统', sort: 0, status: '正常', remark: '' })

  const filtered = dicts.filter(d => {
    if (keyword && !d.name.includes(keyword) && !d.code.includes(keyword)) return false
    if (dictType && d.type !== dictType) return false
    if (status && d.status !== status) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }
  const openAdd = () => { setForm({ name: '', code: '', type: '系统', sort: 0, status: '正常', remark: '' }); setEditDict(null) }
  const openEdit = (d) => { setForm({ name: d.name, code: d.code, type: d.type, sort: 0, status: d.status, remark: '' }); setEditDict(d) }
  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  if (dictData !== null) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>📋</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>字典数据 - {dictData.name}</span>
        </div>
        <DictDataPage dict={dictData} onClose={() => setDictData(null)} />
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        {/* 筛选区 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
                <label style={labelStyle}>字典名称</label>
                <input style={inputStyle} placeholder="请输入字典名称" value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
                <label style={labelStyle}>字典类型</label>
                <input style={inputStyle} placeholder="请输入字典类型" value={dictType} onChange={e => { setDictType(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <label style={labelStyle}>字典状态</label>
                <select style={inputStyle} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
                  <option value="">全部</option>
                  <option value="正常">正常</option>
                  <option value="停用">停用</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>搜索</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setKeyword(''); setDictType(''); setStatus(''); setPage(1) }}>重置</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
            <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={openAdd}>新增</button>
            <button style={{ ...btnBase, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }}>刷新缓存</button>
          </div>
        </div>

        {/* 树形表格 */}
        <div className="table-wrapper">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 50 }}>序号</th>
                <th>字典名称</th>
                <th>字典编码</th>
                <th style={{ width: 90 }}>字典状态</th>
                <th>创建人</th>
                <th style={{ width: 140 }}>创建时间</th>
                <th style={{ width: 140 }}>修改人</th>
                <th style={{ width: 140 }}>修改时间</th>
                <th style={{ width: 220 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((d, idx) => (
                <tr key={d.id}>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span
                        style={{ cursor: 'pointer', color: '#94A3B8', fontSize: 12, width: 16, textAlign: 'center', userSelect: 'none' }}
                        onClick={() => toggleExpand(d.id)}
                      >
                        {expanded[d.id] ? '▼' : '▶'}
                      </span>
                      <span style={{ fontWeight: 600, color: '#1E293B' }}>{d.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{d.code}</span></td>
                  <td>
                    <span className={`badge ${d.status === '正常' ? 'badge-success' : 'badge-default'}`}
                      style={{ background: d.status === '正常' ? '#D1FAE5' : '#F1F5F9', color: d.status === '正常' ? '#059669' : '#94A3B8' }}>
                      {d.status}
                    </span>
                  </td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{d.createBy}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{d.createTime}</td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{d.updateBy}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{d.updateTime}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <button style={{ ...btnBase, background: 'transparent', color: '#3B82F6', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setAddChildDict(d)}>+ 新增下级</button>
                      <button style={{ ...btnBase, background: 'transparent', color: '#10B981', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setDictData(d)}>字典数据</button>
                      <button style={{ ...btnBase, background: '#3B82F6', color: '#fff', height: 28, padding: '0 10px', fontSize: 12 }} onClick={() => openEdit(d)}>编辑</button>
                      <button style={{ ...btnBase, background: 'transparent', color: '#EF4444', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setDeleteDict(d)}>删除</button>
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

      {/* 新建/编辑字典 */}
      {editDict !== undefined && (
        <CenterModal
          open={true}
          onClose={() => setEditDict(undefined)}
          title={editDict ? '编辑字典' : '新增字典'}
          width={520}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setEditDict(undefined)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setEditDict(undefined)}>确定</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>上级字典</label>
              <select style={inputStyle}>
                <option value="">作为一级字典</option>
                {dicts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>{redStar}字典名称</label>
              <input style={inputStyle} placeholder="请输入字典名称" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}字典类型</label>
              <input style={inputStyle} placeholder="请输入字典类型" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}显示排序</label>
              <input type="number" style={inputStyle} placeholder="0" value={form.sort} onChange={e => setForm({ ...form, sort: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>{redStar}字典状态</label>
              <select style={inputStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="正常">正常</option>
                <option value="停用">停用</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>备注</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} placeholder="选填" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            </div>
          </div>
        </CenterModal>
      )}

      {/* 删除确认 */}
      {deleteDict !== null && (
        <CenterModal
          open={true}
          onClose={() => setDeleteDict(null)}
          title="删除确认"
          width={420}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDeleteDict(null)}>取消</button>
              <button style={{ ...btnBase, background: '#EF4444', color: '#fff' }} onClick={() => setDeleteDict(null)}>确定</button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 }}>确认删除字典「{deleteDict?.name}」吗？</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>删除后不可恢复，请谨慎操作。</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
