import React, { useState } from 'react'
import '../styles/admin.css'
import CenterModal from '../components/CenterModal'
import EditExpertDrawer from '../components/drawers/EditExpertDrawer'
import EditTopicDrawer from '../components/drawers/EditTopicDrawer'
import EditBannerDrawer from '../components/drawers/EditBannerDrawer'

/* ==================== 社区动态 ==================== */
const POSTS = [
  { id: 1, author: '睡眠达人小王', content: '坚持使用睡眠监测手环一个月后，入睡时间从2小时缩短到20分钟，分享一下我的经验...', likes: 2341, comments: 189, shares: 67, type: '经验分享', status: '已发布', time: '2026-04-09' },
  { id: 2, author: '健康顾问刘老师', content: '今晚8点直播主题：如何通过饮食改善睡眠质量，欢迎大家提问！#睡眠直播', likes: 1876, comments: 234, shares: 123, type: '直播预告', status: '已发布', time: '2026-04-09' },
  { id: 3, author: '用户张女士', content: '用了三个月智眠星的产品，终于告别了失眠，推荐给同样有睡眠问题的朋友们', likes: 987, comments: 45, shares: 23, type: '用户好评', status: '待审核', time: '2026-04-10' },
  { id: 4, author: '睡眠研究员陈博', content: '最新研究：深度睡眠占总睡眠时间的20%是最佳比例。如何提高深度睡眠？今晚直播告诉你...', likes: 3421, comments: 456, shares: 234, type: '科普文章', status: '已发布', time: '2026-04-08' },
  { id: 5, author: '匿名用户', content: '一些关于睡眠的误区，看看你中了几个？1. 喝牛奶助眠 2. 睡够8小时就够...', likes: 543, comments: 78, shares: 34, type: '辟谣科普', status: '已发布', time: '2026-04-07' },
]

function CommunityTab() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('全部')
  const [page, setPage] = useState(1)
  const [detailTarget, setDetailTarget] = useState(null)
  const [publishTarget, setPublishTarget] = useState(null)

  const filtered = POSTS.filter(p => {
    if (search && !p.author.includes(search) && !p.content.includes(search)) return false
    if (type !== '全部' && p.type !== type) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <>
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

      {/* 发布动态弹窗 */}
      {publishTarget && (
        <CenterModal
          open={true}
          onClose={() => setPublishTarget(null)}
          title="发布动态"
          width={560}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setPublishTarget(null)} style={{ minWidth: 80 }}>取消</button>
              <button className="btn btn-primary" style={{ minWidth: 100 }} onClick={() => { setPublishTarget(null); setPage(1) }}>发布</button>
            </>
          }
        >
          <div className="form-item" style={{ marginBottom: 16 }}>
            <label className="form-label">发布类型</label>
            <select className="form-select" value={publishTarget.type} onChange={e => setPublishTarget(p => ({ ...p, type: e.target.value }))}>
              <option>经验分享</option>
              <option>直播预告</option>
              <option>用户好评</option>
              <option>科普文章</option>
              <option>辟谣科普</option>
            </select>
          </div>
          <div className="form-item">
            <label className="form-label">动态内容</label>
            <textarea
              className="form-input"
              rows={5}
              value={publishTarget.content}
              onChange={e => setPublishTarget(p => ({ ...p, content: e.target.value }))}
              placeholder="请输入动态内容..."
              style={{ resize: 'vertical', lineHeight: 1.7 }}
            />
          </div>
        </CenterModal>
      )}

      {/* 筛选区 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 200 }}>
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
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setPage(1)}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setSearch(''); setType('全部'); setPage(1) }}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }} onClick={() => setPublishTarget({ type: '经验分享', content: '' })}>+ 发布动态</button>
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
                  <button className="btn-action btn-delete" onClick={() => { if (confirm('确定删除该动态？')) {} }}>删除</button>
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
    </>
  )
}

/* ==================== 专家管理 ==================== */
const EXPERTS = [
  { id: 1, name: '张仲景', title: '睡眠医学专家', hospital: '北京协和医院', expertise: ['失眠', '睡眠呼吸暂停'], status: '在线', avatarUrl: null, patients: 328, rating: 4.9, price: 299 },
  { id: 2, name: '李时珍', title: '心理咨询师', hospital: '上海精神卫生中心', expertise: ['焦虑性失眠', '情绪管理'], status: '在线', avatarUrl: null, patients: 256, rating: 4.8, price: 199 },
  { id: 3, name: '孙思邈', title: '中医睡眠专家', hospital: '广安门医院', expertise: ['中医调理', '慢性失眠'], status: '离线', avatarUrl: null, patients: 412, rating: 4.7, price: 150 },
  { id: 4, name: '华佗', title: '神经内科专家', hospital: '宣武医院', expertise: ['REM睡眠障碍', '嗜睡症'], status: '忙碌', avatarUrl: null, patients: 189, rating: 4.6, price: 399 },
]

function ExpertTab() {
  const [experts, setExperts] = useState(EXPERTS)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('全部')
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)

  const filtered = experts.filter(e => {
    if (search && !e.name.includes(search) && !e.title.includes(search)) return false
    if (status !== '全部' && e.status !== status) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  function handleSave(updated) {
    setExperts(prev => prev.map(e => e.id === updated.id ? updated : e))
    setEditTarget(null)
  }

  return (
    <>
      {/* 筛选区 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 200 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="姓名/职称搜索" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="form-select" style={{ width: 120 }} value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
          <option value="全部">全部状态</option>
          <option value="在线">在线</option>
          <option value="忙碌">忙碌</option>
          <option value="离线">离线</option>
        </select>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setPage(1)}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setSearch(''); setStatus('全部'); setPage(1) }}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }} onClick={() => setEditTarget({ id: null, name: '', title: '睡眠医学专家', hospital: '', expertise: [], status: '离线', avatarUrl: null, patients: 0, rating: 5.0, price: 0 })}>+ 添加专家</button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>专家</th>
              <th>职称</th>
              <th>所属医院</th>
              <th>擅长领域</th>
              <th>状态</th>
              <th>咨询费用</th>
              <th>服务患者</th>
              <th>评分</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map(e => (
              <tr key={e.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="table-avatar">{e.name.charAt(0)}</div>
                    <div style={{ fontWeight: 600 }}>{e.name}</div>
                  </div>
                </td>
                <td>{e.title}</td>
                <td style={{ color: '#9CA3AF', fontSize: 13 }}>{e.hospital}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {e.expertise.map(s => <span key={s} className="badge badge-primary" style={{ fontSize: 11 }}>{s}</span>)}
                  </div>
                </td>
                <td>
                  <span className={`badge ${e.status === '在线' ? 'badge-success' : e.status === '忙碌' ? 'badge-warning' : 'badge-default'}`}>
                    {e.status === '在线' ? '🟢 在线' : e.status === '忙碌' ? '🟡 忙碌' : '⚫ 离线'}
                  </span>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#E67E22', fontWeight: 700 }}>¥{e.price}/次</td>
                <td style={{ fontFamily: 'JetBrains Mono' }}>{e.patients}</td>
                <td><span style={{ color: '#F39C12' }}>★</span> {e.rating}</td>
                <td>
                  <button className="btn-action btn-edit" style={{ marginRight: 6 }} onClick={() => setEditTarget({ ...e })}>编辑</button>
                  <button className="btn-action btn-delete">删除</button>
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

      {editTarget && (
        <EditExpertDrawer
          expert={editTarget}
          isNew={editTarget.id === null}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

/* ==================== 热点话题 ==================== */
const HOT_TOPICS = [
  { id: 1, name: '#睡眠改善计划#', tags: ['失眠', '健康科普'], sort: 1, heat: 99, posts: 2341, status: '显示', type: '热议榜' },
  { id: 2, name: '#褪黑素能不能吃#', tags: ['用药安全'], sort: 2, heat: 95, posts: 1890, status: '显示', type: '热议榜' },
  { id: 3, name: '#打呼噜怎么办#', tags: ['睡眠呼吸'], sort: 3, heat: 88, posts: 1234, status: '显示', type: '热议榜' },
  { id: 4, name: '最近总是凌晨3点醒来？', tags: ['失眠'], sort: 1, heat: 92, answers: 23, status: '显示', type: '热点提问' },
  { id: 5, name: '智能手环测睡眠准确吗？', tags: ['睡眠监测'], sort: 2, heat: 85, answers: 18, status: '隐藏', type: '热点提问' },
  { id: 6, name: '午睡最佳时长是多少？', tags: ['睡眠习惯'], sort: 3, heat: 78, answers: 12, status: '显示', type: '热点提问' },
]

function HotTopicsTab({ innerTab }) {
  const [topics, setTopics] = useState(HOT_TOPICS)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [editTarget, setEditTarget] = useState(null)
  const [isNew, setIsNew] = useState(false)

  const filtered = topics.filter(t => {
    if (t.type !== innerTab) return false
    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase()
      const matchName = t.name.toLowerCase().includes(kw)
      const matchTag = (t.tags || []).some(tag => tag.toLowerCase().includes(kw))
      if (!matchName && !matchTag) return false
    }
    return true
  })

  function handleSave(updated) {
    if (isNew) {
      setTopics(prev => [...prev, { ...updated, id: Date.now(), type: innerTab }])
    } else {
      setTopics(prev => prev.map(t => t.id === updated.id ? { ...updated, type: innerTab } : t))
    }
    setEditTarget(null)
    setIsNew(false)
  }

  function handleToggleStatus(id) {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, status: t.status === '显示' ? '隐藏' : '显示' } : t))
  }

  return (
    <>
      {/* 筛选区 - 放在 Tab 下方，有分割线隔开 */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 240 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="搜索话题或标签" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
        </div>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => {}}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setSearchKeyword('')}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }} onClick={() => { setIsNew(true); setEditTarget({ name: '', tags: [], sort: 1, status: '显示' }) }}>
          + 添加话题
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>排序</th>
              <th>话题</th>
              <th>标签</th>
              <th>热度</th>
              <th>{innerTab === '热议榜' ? '参与帖子' : '回答数'}</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>{t.sort}</td>
                <td style={{ fontWeight: 600, maxWidth: 280 }}>{t.name}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(t.tags || []).map(tag => <span key={tag} className="badge badge-primary" style={{ fontSize: 11 }}>{tag}</span>)}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#EF4444', fontWeight: 700 }}>🔥</span>
                    <span style={{ fontFamily: 'JetBrains Mono', color: '#EF4444', fontWeight: 700 }}>{t.heat}</span>
                  </div>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#9CA3AF' }}>
                  {innerTab === '热议榜' ? t.posts?.toLocaleString() : t.answers}
                </td>
                <td>
                  <span className={`badge ${t.status === '显示' ? 'badge-success' : 'badge-default'}`}>
                    {t.status === '显示' ? '👁 显示' : '🙈 隐藏'}
                  </span>
                </td>
                <td>
                  <button className="btn-action btn-edit" style={{ marginRight: 6 }} onClick={() => { setIsNew(false); setEditTarget({ ...t }) }}>编辑</button>
                  <button className="btn-action" style={{ borderColor: '#10B981', color: '#059669' }} onClick={() => handleToggleStatus(t.id)}>
                    {t.status === '显示' ? '隐藏' : '显示'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editTarget && (
        <EditTopicDrawer
          topic={editTarget}
          onClose={() => { setEditTarget(null); setIsNew(false) }}
          onSave={handleSave}
        />
      )}
    </>
  )
}

/* ==================== 商城管理 ==================== */
const BANNERS = [
  { id: 1, name: '春季睡眠改善计划', position: '首页Banner', status: '启用', jumpType: '链接地址', jumpValue: 'https://zhimianxing.com/spring', imagePreview: null, content: '春季特惠，睡眠改善计划8折起' },
  { id: 2, name: '新品首发通知', position: '启动页', status: '启用', jumpType: '无跳转', jumpValue: '', imagePreview: null, content: '智能睡眠监测手环Pro正式发布' },
  { id: 3, name: '会员专享活动', position: '首页中部', status: '停用', jumpType: '窜文本', jumpValue: '', imagePreview: null, content: '黄金及以上会员专享双倍积分' },
  { id: 4, name: '618大促Banner', position: '活动Banner', status: '启用', jumpType: '链接地址', jumpValue: 'https://zhimianxing.com/618', imagePreview: null, content: '618年中大促，全场低至5折' },
]

function MallTab() {
  const [banners, setBanners] = useState(BANNERS)
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('全部')
  const [editTarget, setEditTarget] = useState(null)

  const filtered = banners.filter(b => {
    if (search && !b.name.includes(search)) return false
    if (position !== '全部' && b.position !== position) return false
    return true
  })

  function handleSave(updated) {
    setBanners(prev => prev.map(b => b.id === updated.id ? updated : b))
    setEditTarget(null)
  }

  return (
    <>
      {/* 筛选区 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 200 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="广告名称搜索" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" style={{ width: 160 }} value={position} onChange={e => setPosition(e.target.value)}>
          <option value="全部">全部位置</option>
          <option value="启动页">启动页</option>
          <option value="首页Banner">首页Banner</option>
          <option value="首页中部">首页中部</option>
          <option value="社区Banner">社区Banner</option>
          <option value="活动Banner">活动Banner</option>
        </select>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setSearch(search)}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setSearch(''); setPosition('全部') }}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }}>+ 新增内容</button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>广告名称</th>
              <th>广告位置</th>
              <th>跳转方式</th>
              <th>状态</th>
              <th>广告内容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td><span className="badge badge-primary">{b.position}</span></td>
                <td>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                    {b.jumpType === '无跳转' ? '—' : b.jumpType === '链接地址' ? `🔗 链接` : '📝 文本'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${b.status === '启用' ? 'badge-success' : 'badge-default'}`}>
                    {b.status === '启用' ? '✅ 启用' : '⛔ 停用'}
                  </span>
                </td>
                <td style={{ color: '#9CA3AF', fontSize: 13, maxWidth: 250 }}>{b.content}</td>
                <td>
                  <button className="btn btn-secondary btn-sm" style={{ marginRight: 4 }} onClick={() => setEditTarget({ ...b })}>编辑</button>
                  <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editTarget && (
        <EditBannerDrawer
          banner={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

/* ==================== 主页面 ==================== */
export default function MiniprogramPage() {
  const [tab, setTab] = useState('社区动态')
  const [innerTab, setInnerTab] = useState('热议榜')

  const TABS = ['社区动态', '专家管理', '热点话题', '商城管理']

  return (
    <div className="page-container" style={{ padding: '24px' }}>
      <div className="card">
        {/* 横向Tab导航 - 1:1复刻会员管理样式 */}
        <div style={{
          padding: '0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 0,
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
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
              }}
              onmouseover={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-secondary)' }}
              onmouseout={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 热点话题有二级Tab */}
        {tab === '热点话题' && (
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 0 }}>
            {['热议榜', '热点提问'].map(t => (
              <button
                key={t}
                onClick={() => setInnerTab(t)}
                style={{
                  padding: '8px 20px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: 13,
                  fontWeight: innerTab === t ? 700 : 500,
                  color: innerTab === t ? 'var(--gold)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  borderBottom: innerTab === t ? '2px solid var(--gold)' : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: '20px' }}>
          {tab === '社区动态' && <CommunityTab />}
          {tab === '专家管理' && <ExpertTab />}
          {tab === '热点话题' && <HotTopicsTab key={innerTab} innerTab={innerTab} />}
          {tab === '商城管理' && <MallTab />}
        </div>
      </div>
    </div>
  )
}
