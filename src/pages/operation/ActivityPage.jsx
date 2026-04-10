import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const ACTIVITIES = [
  { id: 1, name: '春季睡眠改善计划', type: '满减活动', startDate: '2026-04-01', endDate: '2026-04-30', price: 0, points: 0, city: '北京市', address: '朝阳区建国路88号', participants: 1243, status: '进行中', image: null },
  { id: 2, name: '会员双倍积分周', type: '积分加倍', startDate: '2026-04-05', endDate: '2026-04-12', price: 0, points: 200, city: '上海市', address: '浦东新区世纪大道100号', participants: 3421, status: '已结束', image: null },
  { id: 3, name: '新品首发8折优惠', type: '折扣活动', startDate: '2026-04-15', endDate: '2026-04-22', price: 99, points: 0, city: '广州市', address: '天河区珠江新城花城大道', participants: 0, status: '未开始', image: null },
  { id: 4, name: '睡眠音乐疗愈体验课', type: '线下活动', startDate: '2026-04-20', endDate: '2026-04-20', price: 199, points: 0, city: '深圳市', address: '南山区科技园南区深南大道', participants: 86, status: '未开始', image: null },
]

const TYPES = ['满减活动', '折扣活动', '积分加倍', '赠品活动', '抽奖活动', '线下活动']
const CITIES = ['北京市', '上海市', '广州市', '深圳市', '杭州市', '成都市', '武汉市', '西安市']
const STATUS_OPTIONS = ['全部', '进行中', '未开始', '已结束']

function statusBadge(s) {
  const map = { '进行中': 'badge-success', '已结束': 'badge-default', '未开始': 'badge-warning' }
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s}</span>
}

function typeBadge(t) {
  return <span className="badge badge-primary">{t}</span>
}

function DetailModal({ activity, onClose }) {
  return (
    <CenterModal
      open={true}
      onClose={onClose}
      title="活动详情"
      width={560}
      footer={<button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>关闭</button>}
    >
      {/* 活动图片 */}
      {activity.image ? (
        <img src={activity.image} alt="活动封面" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
      ) : (
        <div style={{ width: '100%', height: 160, background: 'linear-gradient(135deg, #1E3A5F, #3B82F6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 48, marginBottom: 16 }}>
          🎯
        </div>
      )}

      {/* 基本信息 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <InfoItem label="活动名称" value={activity.name} />
        <InfoItem label="活动分类" value={<span className="badge badge-primary">{activity.type}</span>} />
        <InfoItem label="活动城市" value={activity.city} />
        <InfoItem label="活动状态" value={statusBadge(activity.status)} />
        <InfoItem label="报名费用" value={activity.price === 0 ? '免费' : `¥${activity.price}`} />
        <InfoItem label="参与人数" value={activity.participants.toLocaleString()} />
        <InfoItem label="报名时间" value={`${activity.regStartDate || activity.startDate} ~ ${activity.regEndDate || activity.startDate}`} />
        <InfoItem label="活动时间" value={`${activity.startDate} ~ ${activity.endDate}`} />
      </div>

      {/* 详细地址 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 4 }}>详细地址</div>
        <div style={{ fontSize: 14, color: '#E2E8F0' }}>{activity.address}</div>
      </div>

      {/* 活动介绍 */}
      <div>
        <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 6 }}>活动介绍</div>
        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#E2E8F0', lineHeight: 1.8 }}>
          {activity.type === '满减活动' && '本活动为满减优惠活动，用户购买指定商品可享受满减优惠，详询客服。'}
          {activity.type === '折扣活动' && '新品首发期间享受限时折扣优惠，折扣力度大，不容错过。'}
          {activity.type === '积分加倍' && '活动期间用户消费可获得双倍积分，积分可兑换精美礼品。'}
          {activity.type === '线下活动' && '线下睡眠疗愈体验课程，由专业睡眠医学专家面对面指导，限额报名。'}
          {!['满减活动', '折扣活动', '积分加倍', '线下活动'].includes(activity.type) && '活动详情请查看具体规则。'}
        </div>
      </div>
    </CenterModal>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#1E3A5F', fontWeight: 600 }}>{value}</div>
    </div>
  )
}

export default function ActivityPage() {
  const [list, setList] = useState(ACTIVITIES)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)
  const [detailTarget, setDetailTarget] = useState(null)

  // Create form state
  const [form, setForm] = useState({
    name: '', type: '满减活动',
    regStartDate: '', regEndDate: '',
    startDate: '', endDate: '',
    city: '北京市', address: '',
    price: '', points: '',
    desc: '',
    imagePreview: null,
  })

  const filtered = list.filter(a => {
    if (search && !a.name.includes(search)) return false
    if (status !== '全部' && a.status !== status) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) set('imagePreview', URL.createObjectURL(file))
  }

  function handleCreate() {
    if (!form.name) { alert('请填写活动名称'); return }
    const newActivity = {
      id: Date.now(),
      name: form.name,
      type: form.type,
      city: form.city,
      address: form.address,
      price: form.price ? parseFloat(form.price) : 0,
      points: form.points ? parseInt(form.points) : 0,
      startDate: form.startDate || new Date().toISOString().slice(0, 10),
      endDate: form.endDate || new Date().toISOString().slice(0, 10),
      participants: 0,
      status: '未开始',
      image: form.imagePreview,
    }
    setList([newActivity, ...list])
    alert('活动创建成功！')
    setForm({ name: '', type: '满减活动', regStartDate: '', regEndDate: '', startDate: '', endDate: '', city: '北京市', address: '', price: '', points: '', desc: '', imagePreview: null })
  }

  function handleDelete(id) {
    if (confirm('确定删除该活动？')) setList(list.filter(a => a.id !== id))
  }

  return (
    <div>
      {/* ====== 创建活动表单 ====== */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '12px 12px 0 0' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F' }}>➕ 创建活动</div>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>填写活动基本信息，创建新的营销活动</div>
        </div>
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>

          {/* 左列 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* 活动图片 */}
            <div className="form-item" style={{ marginBottom: 16 }}>
              <label className="form-label">活动封面图</label>
              <div
                style={{
                  width: '100%', height: 160, border: '2px dashed #E2E8F0', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', background: '#FAFBFC', overflow: 'hidden', position: 'relative'
                }}
                onClick={() => document.getElementById('activity-img-input').click()}
              >
                {form.imagePreview ? (
                  <img src={form.imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
                ) : (
                  <div style={{ textAlign: 'center', color: '#CBD5E1' }}>
                    <div style={{ fontSize: 36, marginBottom: 6 }}>📷</div>
                    <div style={{ fontSize: 13 }}>点击上传活动封面</div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>建议尺寸 750×400</div>
                  </div>
                )}
                <input id="activity-img-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </div>
              {form.imagePreview && (
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => set('imagePreview', null)}>移除图片</button>
              )}
            </div>

            {/* 活动名称 */}
            <div className="form-item" style={{ marginBottom: 16 }}>
              <label className="form-label">
                <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>活动名称
              </label>
              <input className="form-input" placeholder="如：春季睡眠改善计划" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>

            {/* 活动时间范围 */}
            <div className="form-item" style={{ marginBottom: 16 }}>
              <label className="form-label">报名时间</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input className="form-input" type="date" style={{ flex: 1 }} value={form.regStartDate} onChange={e => set('regStartDate', e.target.value)} />
                <span style={{ color: '#CBD5E1', flexShrink: 0 }}>至</span>
                <input className="form-input" type="date" style={{ flex: 1 }} value={form.regEndDate} onChange={e => set('regEndDate', e.target.value)} />
              </div>
            </div>

            <div className="form-item" style={{ marginBottom: 16 }}>
              <label className="form-label">活动时间</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input className="form-input" type="date" style={{ flex: 1 }} value={form.startDate} onChange={e => set('startDate', e.target.value)} />
                <span style={{ color: '#CBD5E1', flexShrink: 0 }}>至</span>
                <input className="form-input" type="date" style={{ flex: 1 }} value={form.endDate} onChange={e => set('endDate', e.target.value)} />
              </div>
            </div>
          </div>

          {/* 右列 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* 活动分类 + 城市 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="form-item" style={{ marginBottom: 0 }}>
                <label className="form-label">活动分类</label>
                <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-item" style={{ marginBottom: 0 }}>
                <label className="form-label">活动城市</label>
                <select className="form-select" value={form.city} onChange={e => set('city', e.target.value)}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* 活动价格 */}
            <div className="form-item" style={{ marginBottom: 16 }}>
              <label className="form-label">活动价格</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 4 }}>金额（元）</div>
                  <input className="form-input" type="number" placeholder="填0表示免费" value={form.price} onChange={e => set('price', e.target.value)} style={{ textAlign: 'right' }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 4 }}>积分（选填）</div>
                  <input className="form-input" type="number" placeholder="可抵用积分" value={form.points} onChange={e => set('points', e.target.value)} style={{ textAlign: 'right' }} />
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}>💡 价格为0或空时表示免费参与活动</div>
            </div>

            {/* 详细地址 */}
            <div className="form-item" style={{ marginBottom: 16 }}>
              <label className="form-label">详细地址</label>
              <input className="form-input" placeholder="请输入详细地址（街道、门牌号等）" value={form.address} onChange={e => set('address', e.target.value)} />
            </div>

            {/* 活动介绍 */}
            <div className="form-item" style={{ marginBottom: 0 }}>
              <label className="form-label">活动介绍</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="请输入活动详细介绍、规则说明..."
                value={form.desc}
                onChange={e => set('desc', e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div style={{ display: 'flex', gap: 12, padding: '0 24px 24px', alignItems: 'center' }}>
          <button className="btn-query" style={{ height: 38, padding: '0 28px', fontSize: 14 }} onClick={handleCreate}>发布活动</button>
          <button className="btn-reset" style={{ height: 38, padding: '0 20px', fontSize: 14 }} onClick={() => setForm({ name: '', type: '满减活动', regStartDate: '', regEndDate: '', startDate: '', endDate: '', city: '北京市', address: '', price: '', points: '', desc: '', imagePreview: null })}>重置表单</button>
        </div>
      </div>

      {/* ====== 管理活动列表 ====== */}
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '12px 12px 0 0' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F' }}>📋 活动列表</div>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>管理所有营销活动，支持编辑、删除、查看详情</div>
        </div>

        {/* 工具栏 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          <div className="search-input-wrap" style={{ width: 200 }}>
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="活动名称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="form-select" style={{ width: 120 }} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13 }} onClick={() => setPage(1)}>查询</button>
          <button className="btn-reset" style={{ height: 34, padding: '0 16px', fontSize: 13 }} onClick={() => { setSearch(''); setStatus('全部'); setPage(1) }}>重置</button>
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>活动名称</th>
                <th>分类</th>
                <th>活动时间</th>
                <th>费用</th>
                <th>参与人数</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: '#CBD5E1', padding: '40px 0' }}>暂无活动数据</td></tr>
              ) : data.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 700, color: '#1E3A5F', maxWidth: 200 }}>{a.name}</td>
                  <td>{typeBadge(a.type)}</td>
                  <td style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap' }}>{a.startDate}<br />~ {a.endDate}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: a.price === 0 ? '#059669' : '#D97706', fontWeight: 600 }}>
                    {a.price === 0 ? '免费' : `¥${a.price}`}
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{a.participants.toLocaleString()}</td>
                  <td>{statusBadge(a.status)}</td>
                  <td>
                    <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', marginRight: 6 }} onClick={() => setDetailTarget(a)}>查看详情</button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(a.id)}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="pagination">
          <div className="pagination-info">共 {filtered.length} 条</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled={page === 1} onClick={() => setPage(1)}>«</button>
            <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            <span style={{ fontSize: 13, color: '#9CA3AF', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      {detailTarget && <DetailModal activity={detailTarget} onClose={() => setDetailTarget(null)} />}
    </div>
  )
}
