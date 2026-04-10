import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const NOTIFY_TYPES = ['系统通知', '订单通知', '营销通知', '活动通知', '用户通知']
const STATUS_MAP = {
  '待发送': { bg: '#FEF3C7', color: '#92400E' },
  '已发送': { bg: '#D1FAE5', color: '#065F46' },
  '发送失败': { bg: '#FEE2E2', color: '#991B1B' },
}

function makeData() {
  return [
    { id: 1, title: '系统维护通知', type: '系统通知', status: '已发送', sendTime: '2016-09-21 08:50:08', creator: '王运营', createTime: '2016-09-21 08:50:08' },
    { id: 2, title: '新品上市通知', type: '营销通知', status: '待发送', sendTime: '2016-09-22 10:00:00', creator: '李市场', createTime: '2016-09-21 08:50:08' },
    { id: 3, title: '积分即将过期提醒', type: '用户通知', status: '已发送', sendTime: '2016-09-20 09:00:00', creator: '王运营', createTime: '2016-09-21 08:50:08' },
    { id: 4, title: '会员日活动通知', type: '活动通知', status: '已发送', sendTime: '2016-09-19 18:00:00', creator: '张活动', createTime: '2016-09-21 08:50:08' },
    { id: 5, title: '订单发货通知', type: '订单通知', status: '发送失败', sendTime: '2016-09-18 10:00:00', creator: '王运营', createTime: '2016-09-21 08:50:08' },
    { id: 6, title: 'APP新版本上线通知', type: '系统通知', status: '已发送', sendTime: '2016-09-17 12:00:00', creator: '李技术', createTime: '2016-09-21 08:50:08' },
    { id: 7, title: '限时折扣活动开始', type: '营销通知', status: '待发送', sendTime: '2016-09-25 00:00:00', creator: '李市场', createTime: '2016-09-21 08:50:08' },
    { id: 8, title: '睡眠质量周报', type: '用户通知', status: '已发送', sendTime: '2016-09-15 08:00:00', creator: '王运营', createTime: '2016-09-21 08:50:08' },
    { id: 9, title: '健康讲座报名通知', type: '活动通知', status: '已发送', sendTime: '2016-09-14 09:00:00', creator: '张活动', createTime: '2016-09-21 08:50:08' },
    { id: 10, title: '积分兑换优惠券到账', type: '用户通知', status: '已发送', sendTime: '2016-09-13 10:30:00', creator: '王运营', createTime: '2016-09-21 08:50:08' },
  ]
}

function StatusBadge({ s }) {
  const st = STATUS_MAP[s] || { bg: '#F1F5F9', color: '#9CA3AF' }
  return (
    <span style={{ background: st.bg, color: st.color, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
      {s}
    </span>
  )
}

/* 富文本工具栏 */
const toolbarItems = [
  '加粗', '斜体', '下划线', '|', '字体', '字号', '文字颜色', '背景色', '|',
  '左对齐', '居中', '右对齐', '|', '项目符号', '编号', '缩进', '|',
  '插入链接', '插入图片', '插入表格', '表情', '|', '源码', '插入',
]

/* 新增/编辑弹窗 */
function NotifyModal({ editTarget, onClose, onSave }) {
  const [form, setForm] = useState({
    title: editTarget?.title || '',
    type: editTarget?.type || '',
    target: '全体用户',
    content: editTarget?.content || '',
  })
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  async function handleSave() {
    if (!form.title) { alert('请填写消息标题'); return }
    if (!form.type) { alert('请选择通知类型'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    onSave({ ...editTarget, ...form })
    setLoading(false)
  }

  const isEdit = !!(editTarget && editTarget.title)

  return (
    <CenterModal
      open={true}
      onClose={onClose}
      title={isEdit ? '编辑通知' : '新增通知'}
      width={680}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 90, height: 38, fontSize: 14, padding: '8px 20px', borderRadius: 8 }}>取消</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ height: 38, padding: '8px 24px', borderRadius: 8, fontSize: 14 }}>
            {loading ? '保存中...' : '确定'}
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 消息标题 */}
        <div className="form-item">
          <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 消息标题</div>
          <input className="form-input" placeholder="请输入消息标题" value={form.title} onChange={e => set('title', e.target.value)} />
        </div>
        {/* 通知类型 */}
        <div className="form-item">
          <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 通知类型</div>
          <select className="form-input" value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="">请选择通知类型，字典维护，单选</option>
            {NOTIFY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        {/* 接收对象 */}
        <div className="form-item">
          <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 接收对象</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['全体用户', '特定用户', '用户组'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                <input type="radio" name="target" value={opt} checked={form.target === opt} onChange={() => set('target', opt)} />
                {opt}
              </label>
            ))}
          </div>
        </div>
        {/* 通知内容 */}
        <div className="form-item">
          <div className="form-label"><span style={{ color: '#DC2626' }}>*</span> 通知内容</div>
          <div style={{ border: '1.5px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
            {/* 工具栏 */}
            <div style={{ display: 'flex', gap: 2, padding: '6px 8px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
              {toolbarItems.map((tool, i) => tool === '|'
                ? <span key={i} style={{ width: 1, height: 18, background: '#E2E8F0', margin: '0 4px', alignSelf: 'center' }} />
                : <button key={i} style={{ padding: '3px 8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#E2E8F0', borderRadius: 4 }}>{tool}</button>
              )}
            </div>
            <textarea className="form-input" rows={8} value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="在此输入通知内容详情，支持富文本编辑。"
              style={{ border: 'none', borderRadius: 0, resize: 'vertical', minHeight: 160, fontFamily: 'inherit', fontSize: 13 }} />
          </div>
        </div>
      </div>
    </CenterModal>
  )
}

/* 详情弹窗 */
function DetailModal({ item, onClose }) {
  return (
    <CenterModal
      open={true}
      onClose={onClose}
      title="通知详情"
      width={580}
      footer={<button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80, padding: '8px 20px', borderRadius: 8, fontSize: 14 }}>关闭</button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StatusBadge s={item.status} />
          <span style={{ fontSize: 12, color: '#CBD5E1' }}>ID：#{item.id}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, background: '#F8FAFC', borderRadius: 8, padding: '12px 16px' }}>
          {[
            { label: '消息标题', value: item.title, wide: true },
            { label: '通知类型', value: item.type },
            { label: '发送时间', value: item.sendTime },
            { label: '创建人', value: item.creator },
            { label: '创建时间', value: item.createTime },
            { label: '状态', value: item.status },
          ].map(row => (
            <div key={row.label} style={row.wide ? { gridColumn: '1 / -1' } : {}}>
              <div style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 2 }}>{row.label}</div>
              <div style={{ fontSize: 14, color: '#E2E8F0', fontWeight: row.wide ? 700 : 400 }}>{row.value}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>通知内容</div>
          <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#E2E8F0', lineHeight: 1.8, minHeight: 80 }}>
            {item.title}，平台在此通知您相关事项，请注意查收并及时处理。如有疑问请联系客服。
          </div>
        </div>
      </div>
    </CenterModal>
  )
}

/* 主组件 */
export default function NotificationPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [editTarget, setEditTarget] = useState(null)   // null=新增，有值=编辑
  const [detailTarget, setDetailTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [data, setData] = useState(makeData)

  const filtered = data.filter(item => {
    if (search && !item.title.includes(search)) return false
    if (filterType && item.type !== filterType) return false
    return true
  })

  const total = filtered.length
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(total / pageSize) || 1

  function resetFilters() {
    setSearch(''); setFilterType(''); setPage(1)
  }

  function toggleSelect(id) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === pageData.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(pageData.map(d => d.id)))
  }

  function handleSave(item) {
    if (editTarget && editTarget.title) {
      setData(prev => prev.map(it => it.id === item.id ? { ...it, ...item } : it))
    } else {
      setData(prev => [{
        ...item, id: Date.now(), status: '待发送', sendTime: '-',
        creator: '当前用户', createTime: '2016-09-21 08:50:08'
      }, ...prev])
    }
    setEditTarget(null)
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return
    setData(prev => prev.filter(it => it.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  function handleBatchDelete() {
    if (selectedIds.size === 0) { alert('请先选择要删除的通知'); return }
    setData(prev => prev.filter(it => !selectedIds.has(it.id)))
    setSelectedIds(new Set())
  }

  function handleSend(item) {
    setData(prev => prev.map(it => it.id === item.id ? { ...it, status: '已发送', sendTime: '2016-09-21 08:50:08' } : it))
  }

  function handleRecall(item) {
    if (item.status !== '已发送') return
    setData(prev => prev.map(it => it.id === item.id ? { ...it, status: '待发送' } : it))
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.min(totalPages, 9); i++) pageNumbers.push(i)

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <h3>🔔 消息通知</h3>
          <p className="card-subtitle">向用户发送系统通知、营销消息、活动公告</p>
        </div>

        {/* 黄色需求说明栏 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 20px', background: '#FFFBEB', borderBottom: '1px solid #FDE68A' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#92400E', whiteSpace: 'nowrap' }}>需求说明</span>
          <span style={{ fontSize: 13, color: '#92400E' }}>已发送的通知删除后，运营端和用户端不可以查看该消息；</span>
        </div>

        {/* 筛选区 */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="请输入消息标题"
                value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <select className="filter-select" style={{ width: 180 }} value={filterType}
              onChange={e => { setFilterType(e.target.value); setPage(1) }}>
              <option value="">请选择通知类型</option>
              {NOTIFY_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="toolbar-right">
            <button className="btn-query" onClick={() => setPage(1)}>查询</button>
            <button className="btn-reset" onClick={resetFilters}>重置</button>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="toolbar" style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, paddingBottom: 12 }}>
          <div className="toolbar-left" />
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm" onClick={() => setEditTarget({})}>+ 新增</button>
            <button className="btn btn-ghost btn-sm" onClick={handleBatchDelete}>批量删除</button>
          </div>
        </div>

        {/* 列表 */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 40 }}><input type="checkbox" checked={selectedIds.size === pageData.length && pageData.length > 0} onChange={toggleSelectAll} /></th>
                <th>序号</th>
                <th>消息标题</th>
                <th>通知类型</th>
                <th>状态</th>
                <th>发送时间</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, idx) => (
                <tr key={item.id}>
                  <td><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} /></td>
                  <td>{(page - 1) * pageSize + idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1E3A5F', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.title}>{item.title}</td>
                  <td><span className="badge badge-primary">{item.type}</span></td>
                  <td><StatusBadge s={item.status} /></td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{item.sendTime}</td>
                  <td>{item.creator}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{item.createTime}</td>
                  <td>
                    <div className="action-btns">
                      {item.status === '待发送' && (
                        <button className="btn-action btn-edit" onClick={() => handleSend(item)}>发送</button>
                      )}
                      {item.status === '已发送' && (
                        <button className="btn-action btn-edit" onClick={() => handleRecall(item)}>撤回</button>
                      )}
                      <button className="btn-action btn-edit" onClick={() => setDetailTarget(item)}>详情</button>
                      <button className="btn-action btn-edit" onClick={() => setEditTarget(item)}>编辑</button>
                      <button className="btn-action btn-delete" onClick={() => setDeleteTarget(item)}>删除</button>
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
      {editTarget !== null && (
        <NotifyModal
          editTarget={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}

      {/* 详情弹窗 */}
      {detailTarget && (
        <DetailModal item={detailTarget} onClose={() => setDetailTarget(null)} />
      )}

      {/* 删除确认弹窗 */}
      {deleteTarget && (
        <CenterModal
          open={true}
          onClose={() => setDeleteTarget(null)}
          title="删除确认"
          width={420}
          footer={
            <>
              <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14 }} onClick={() => setDeleteTarget(null)}>取消</button>
              <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14, background: '#EF4444' }} onClick={handleDeleteConfirm}>确定</button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.8 }}>
              确定删除通知 <strong>{deleteTarget.title}</strong> 吗？
            </div>
            <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 8 }}>删除后该消息将无法恢复</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
