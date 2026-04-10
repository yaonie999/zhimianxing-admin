import React, { useState } from 'react'
import '../../styles/admin.css'
import EditTopicDrawer from '../../components/drawers/EditTopicDrawer'

const HOT_TOPICS = [
  { id: 1, name: '#睡眠改善计划#', tags: ['失眠', '健康科普'], sort: 1, heat: 99, posts: 2341, status: '显示', type: '热议榜' },
  { id: 2, name: '#褪黑素能不能吃#', tags: ['用药安全'], sort: 2, heat: 95, posts: 1890, status: '显示', type: '热议榜' },
  { id: 3, name: '#打呼噜怎么办#', tags: ['睡眠呼吸'], sort: 3, heat: 88, posts: 1234, status: '显示', type: '热议榜' },
  { id: 4, name: '最近总是凌晨3点醒来？', tags: ['失眠'], sort: 1, heat: 92, answers: 23, status: '显示', type: '热点提问' },
  { id: 5, name: '智能手环测睡眠准确吗？', tags: ['睡眠监测'], sort: 2, heat: 85, answers: 18, status: '隐藏', type: '热点提问' },
  { id: 6, name: '午睡最佳时长是多少？', tags: ['睡眠习惯'], sort: 3, heat: 78, answers: 12, status: '显示', type: '热点提问' },
]

export default function HotTopicsPage() {
  const [tab, setTab] = useState('热议榜')
  const [topics, setTopics] = useState(HOT_TOPICS)
  const [searchTopic, setSearchTopic] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [editTarget, setEditTarget] = useState(null)
  const [isNew, setIsNew] = useState(false)

  const filtered = topics.filter(t => {
    if (t.type !== tab) return false
    if (searchTopic && !t.name.includes(searchTopic)) return false
    if (searchTag && !(t.tags || []).some(tag => tag.includes(searchTag))) return false
    return true
  })

  function handleSave(updated) {
    if (isNew) {
      setTopics(prev => [...prev, { ...updated, id: Date.now(), type: tab }])
    } else {
      setTopics(prev => prev.map(t => t.id === updated.id ? { ...updated, type: tab } : t))
    }
    setEditTarget(null)
    setIsNew(false)
  }

  function handleToggleStatus(id) {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, status: t.status === '显示' ? '隐藏' : '显示' } : t))
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🔥 热点 / 提问</h3>
          <p className="card-subtitle">管理热议话题和用户热点提问</p>
        </div>

        {/* Tab切换 */}
        <div style={{ padding: '0 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 0 }}>
          {['热议榜', '热点提问'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '12px 24px', border: 'none', background: 'transparent',
                fontSize: 14, fontWeight: tab === t ? 700 : 400,
                color: tab === t ? '#1E3A5F' : '#64748B',
                cursor: 'pointer', borderBottom: tab === t ? '2px solid #1E3A5F' : '2px solid transparent',
                marginBottom: -1, transition: 'all 0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 筛选工具栏 */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="话题搜索" value={searchTopic} onChange={e => setSearchTopic(e.target.value)} />
            </div>
            <div className="search-input-wrap">
              <span className="search-icon"> 🏷</span>
              <input className="search-input" placeholder="标签搜索" value={searchTag} onChange={e => setSearchTag(e.target.value)} />
            </div>
            <button className="btn-query" onClick={() => {}} style={{ width: 60 }}>查询</button>
            <button className="btn-reset" onClick={() => { setSearchTopic(''); setSearchTag('') }} style={{ width: 60 }}>重置</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm" onClick={() => { setIsNew(true); setEditTarget({ name: '', tags: [], sort: 1, status: '显示' }) }}>
              + 添加话题
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>排序</th>
                <th>话题</th>
                <th>标签</th>
                <th>热度</th>
                <th>{tab === '热议榜' ? '参与帖子' : '回答数'}</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>{t.sort}</td>
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
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#64748B' }}>
                    {tab === '热议榜' ? t.posts?.toLocaleString() : t.answers}
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
      </div>

      {editTarget && (
        <EditTopicDrawer
          topic={editTarget}
          onClose={() => { setEditTarget(null); setIsNew(false) }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
