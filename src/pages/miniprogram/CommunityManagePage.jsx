import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

const POSTS = [
  { id: 1, author: '睡眠达人小王', content: '坚持使用睡眠监测手环一个月后，入睡时间从2小时缩短到20分钟，分享一下我的经验...', likes: 2341, comments: 189, shares: 67, type: '经验分享', status: '已发布', time: '2026-04-09' },
  { id: 2, author: '健康顾问刘老师', content: '今晚8点直播主题：如何通过饮食改善睡眠质量，欢迎大家提问！#睡眠直播', likes: 1876, comments: 234, shares: 123, type: '直播预告', status: '已发布', time: '2026-04-09' },
  { id: 3, author: '用户张女士', content: '用了三个月智眠星的产品，终于告别了失眠，推荐给同样有睡眠问题的朋友们', likes: 987, comments: 45, shares: 23, type: '用户好评', status: '待审核', time: '2026-04-10' },
  { id: 4, author: '睡眠研究员陈博', content: '最新研究：深度睡眠占总睡眠时间的20%是最佳比例。如何提高深度睡眠？今晚直播告诉你...', likes: 3421, comments: 456, shares: 234, type: '科普文章', status: '已发布', time: '2026-04-08' },
  { id: 5, author: '匿名用户', content: '一些关于睡眠的误区，看看你中了几个？1. 喝牛奶助眠 2. 睡够8小时就够...', likes: 543, comments: 78, shares: 34, type: '辟谣科普', status: '已发布', time: '2026-04-07' },
]

export default function CommunityManagePage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('全部')
  const [page, setPage] = useState(1)
  const [detailTarget, setDetailTarget] = useState(null)

  const filtered = POSTS.filter(p => {
    if (search && !p.author.includes(search) && !p.content.includes(search)) return false
    if (type !== '全部' && p.type !== type) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>💬 社区动态</h3>
          <p className="card-subtitle">管理用户动态、直播内容、科普文章的发布和审核</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="作者/内容搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <select className="form-select" style={{ width: 140 }} value={type} onChange={e => { setType(e.target.value); setPage(1) }}>
              <option value="全部">全部类型</option>
              <option value="经验分享">经验分享</option>
              <option value="直播预告">直播预告</option>
              <option value="用户好评">用户好评</option>
              <option value="科普文章">科普文章</option>
              <option value="辟谣科普">辟谣科普</option>
            </select>
            <button className="btn-query" onClick={() => setPage(1)} style={{ width: 60 }}>查询</button>
            <button className="btn-reset" onClick={() => { setSearch(''); setType('全部'); setPage(1) }} style={{ width: 60 }}>重置</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 发布动态</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>作者</th>
                <th>内容摘要</th>
                <th>类型</th>
                <th>点赞</th>
                <th>评论</th>
                <th>转发</th>
                <th>状态</th>
                <th>时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {data.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.author}</td>
                  <td style={{ maxWidth: 280, color: '#E2E8F0', fontSize: 13 }}>{p.content.slice(0, 40)}...</td>
                  <td><span className="badge badge-primary">{p.type}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#E74C3C' }}>❤️ {p.likes}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#3498DB' }}>💬 {p.comments}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{p.shares}</td>
                  <td><span className={`badge ${p.status === '已发布' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{p.time}</td>
                  <td>
                    <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', marginRight: 6 }} onClick={() => setDetailTarget(p)}>查看详情</button>
                    <button className="btn-action btn-delete" onClick={() => { if (confirm('确定删除该动态？')) setPage(page) }}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      {/* 详情抽屉 */}
      {detailTarget && (
        <CenterModal
          open={true}
          onClose={() => setDetailTarget(null)}
          title="动态详情"
          width={520}
          footer={<button className="btn btn-ghost" onClick={() => setDetailTarget(null)} style={{ minWidth: 80 }}>关闭</button>}
        >
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">作者</label>
            <div style={{ color: '#1E3A5F', fontWeight: 600 }}>{detailTarget.author}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">类型</label>
            <span className="badge badge-primary">{detailTarget.type}</span>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">发布时间</label>
            <div style={{ color: '#9CA3AF' }}>{detailTarget.time}</div>
          </div>
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">互动数据</label>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>❤️ {detailTarget.likes}</span>
              <span>💬 {detailTarget.comments}</span>
              <span>↗ {detailTarget.shares}</span>
            </div>
          </div>
          <div className="form-item">
            <label className="form-label">正文内容</label>
            <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 12, color: '#E2E8F0', fontSize: 14, lineHeight: 1.7 }}>
              {detailTarget.content}
            </div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
