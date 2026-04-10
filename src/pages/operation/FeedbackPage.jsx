import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const FEEDBACKS = [
  {
    id: 1, user: '张伟', phone: '13812341234', type: '功能建议', content: '希望能增加睡眠音乐播放功能，配合白噪音助眠，让用户在睡前能够通过音乐放松身心，提高入睡效率。建议增加轻柔的古典音乐和自然音效选项。', status: '待处理', time: '2026-04-10 10:30',
    images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
  },
  {
    id: 2, user: '李娜', phone: '13956785678', type: '问题反馈', content: 'APP在iOS17系统上偶尔会闪退，希望修复。使用环境：iPhone 15 Pro，系统版本iOS 17.4.1，APP版本2.1.0。闪退主要发生在打开睡眠报告详情页时。', status: '处理中', time: '2026-04-09 15:20',
    images: [],
  },
  {
    id: 3, user: '王磊', phone: '13790129012', type: '投诉', content: '客服响应速度太慢，等了2小时没人理。晚上提交的问题到第二天下午才回复，体验很差。建议增加智能客服或者明确响应时间承诺。', status: '待处理', time: '2026-04-09 09:45',
    images: ['https://picsum.photos/400/300?random=3'],
  },
  {
    id: 4, user: '刘芳', phone: '13634563456', type: '功能建议', content: '增加家庭账号功能，可以同时管理多个家庭成员的睡眠数据，方便帮父母查看他们的睡眠质量。', status: '已回复', time: '2026-04-08 14:10',
    images: [],
  },
  {
    id: 5, user: '陈明', phone: '13567896789', type: '问题反馈', content: '睡眠监测手环数据与APP同步延迟严重，经常第二天早上才看到前一天的睡眠数据。', status: '已回复', time: '2026-04-07 11:20',
    images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5'],
  },
]

const TYPE_OPTIONS = ['全部', '功能建议', '问题反馈', '投诉', '其他']
const STATUS_OPTIONS = ['全部', '待处理', '处理中', '已回复']

function statusBadge(s) {
  const map = { '待处理': 'badge-warning', '处理中': 'badge-primary', '已回复': 'badge-success' }
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s}</span>
}

function typeBadge(t) {
  return <span className="badge badge-primary">{t}</span>
}

// 详情弹窗
function DetailModal({ feedback, onClose }) {
  const [lightboxImg, setLightboxImg] = useState(null)

  return (
    <>
      <CenterModal
        open={true}
        onClose={onClose}
        title="意见建议详情"
        width={580}
        footer={<button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>关闭</button>}
      >
        {/* 状态标签 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          {statusBadge(feedback.status)}
          <span style={{ fontSize: 12, color: '#CBD5E1' }}>反馈ID：#{feedback.id}</span>
        </div>

        {/* 用户信息 */}
        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 2 }}>提交人</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>{feedback.user}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 2 }}>联系方式</div>
            <div style={{ fontSize: 14, color: '#E2E8F0', fontFamily: 'JetBrains Mono' }}>{feedback.phone}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 2 }}>反馈类型</div>
            <div style={{ fontSize: 14 }}>{typeBadge(feedback.type)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 2 }}>提交时间</div>
            <div style={{ fontSize: 14, color: '#9CA3AF' }}>{feedback.time}</div>
          </div>
        </div>

        {/* 问题描述 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>问题描述</div>
          <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#E2E8F0', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {feedback.content}
          </div>
        </div>

        {/* 附件图片 */}
        {feedback.images && feedback.images.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>附件图片（{feedback.images.length}张）</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              {feedback.images.map((img, i) => (
                <div
                  key={i}
                  style={{ borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: '1px solid #E2E8F0' }}
                  onClick={() => setLightboxImg(img)}
                >
                  <img src={img} alt={`附件${i + 1}`} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#CBD5E1' }}>💡 点击图片可放大查看</div>
          </div>
        )}

        {/* 处理状态操作 */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10 }}>
          <button
            className="btn btn-primary btn-sm"
            disabled={feedback.status === '已回复'}
            onClick={() => alert('已回复反馈：感谢您的宝贵意见，我们会认真考虑并改进！')}
          >
            {feedback.status === '已回复' ? '✓ 已回复' : '回复用户'}
          </button>
          {feedback.status !== '已回复' && (
            <button className="btn btn-ghost btn-sm">标记为已处理</button>
          )}
        </div>
      </CenterModal>

      {/* 大图浏览 */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="大图" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', top: 20, right: 20, color: '#fff', fontSize: 24, cursor: 'pointer' }}>✕</div>
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: 13 }}>点击任意处关闭</div>
        </div>
      )}
    </>
  )
}

export default function FeedbackPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('全部')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)
  const [detailTarget, setDetailTarget] = useState(null)

  const filtered = FEEDBACKS.filter(f => {
    if (search && !f.user.includes(search) && !f.phone.includes(search)) return false
    if (type !== '全部' && f.type !== type) return false
    if (status !== '全部' && f.status !== status) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '12px 12px 0 0' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F' }}>💡 意见建议</div>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>收集用户反馈、投诉和建议，持续优化产品体验</div>
        </div>

        {/* 工具栏 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          <div className="search-input-wrap" style={{ width: 200 }}>
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="姓名或手机号搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="form-select" style={{ width: 120 }} value={type} onChange={e => { setType(e.target.value); setPage(1) }}>
            {TYPE_OPTIONS.map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="form-select" style={{ width: 120 }} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13 }} onClick={() => setPage(1)}>查询</button>
          <button className="btn-reset" style={{ height: 34, padding: '0 16px', fontSize: 13 }} onClick={() => { setSearch(''); setType('全部'); setStatus('全部'); setPage(1) }}>重置</button>
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>提交人</th>
                <th>手机号</th>
                <th>类型</th>
                <th>内容摘要</th>
                <th>状态</th>
                <th>时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: '#CBD5E1', padding: '40px 0' }}>暂无数据</td></tr>
              ) : data.map(f => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 700, color: '#1E3A5F' }}>{f.user}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#9CA3AF' }}>{f.phone}</td>
                  <td>{typeBadge(f.type)}</td>
                  <td style={{ color: '#E2E8F0', fontSize: 13, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.content}</td>
                  <td>{statusBadge(f.status)}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{f.time}</td>
                  <td>
                    <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', marginRight: 6 }} onClick={() => setDetailTarget(f)}>查看详情</button>
                    <button className="btn-action btn-delete" disabled={f.status === '已回复'} style={{ opacity: f.status === '已回复' ? 0.5 : 1 }} onClick={() => { if (confirm('确定删除该反馈？')) FEEDBACKS.filter(f2 => f2.id !== f.id) }}>删除</button>
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
      {detailTarget && <DetailModal feedback={detailTarget} onClose={() => setDetailTarget(null)} />}
    </div>
  )
}
