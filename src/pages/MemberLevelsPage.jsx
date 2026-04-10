import React, { useState } from 'react'
import '../styles/admin.css'
import EditLevelDrawer from '../components/EditLevelDrawer'

const LEVEL_COLORS = ['#CBD5E1', '#C0C0C0', '#FFD700', '#00CED1', '#9370DB', '#FF69B4']

const LEVELS = [
  { id: 1, name: '青铜会员', min: 0, max: 999, color: '#CD7F32', icon: '🥉', rights: ['消费9.8折', '双倍积分'], discount: '98', discountType: '打折', pointsMultiple: 2, bgImage: '' },
  { id: 2, name: '白银会员', min: 1000, max: 2999, color: '#C0C0C0', icon: '🥈', rights: ['消费9.5折', '双倍积分'], discount: '95', discountType: '打折', pointsMultiple: 2, bgImage: '' },
  { id: 3, name: '黄金会员', min: 3000, max: 5999, color: '#FFD700', icon: '🥇', rights: ['消费9折', '双倍积分'], discount: '90', discountType: '打折', pointsMultiple: 2, bgImage: '' },
  { id: 4, name: '铂金会员', min: 6000, max: 9999, color: '#E5E4E2', icon: '💎', rights: ['消费8.5折', '双倍积分'], discount: '85', discountType: '打折', pointsMultiple: 2, bgImage: '' },
  { id: 5, name: '钻石会员', min: 10000, max: 999999, color: '#9370DB', icon: '💠', rights: ['消费8折', '双倍积分'], discount: '80', discountType: '打折', pointsMultiple: 2, bgImage: '' },
]

const MEMBERS = [
  { id: 1, name: '张伟', phone: '138****1234', levelId: 3, growth: 850 },
  { id: 2, name: '李娜', phone: '139****5678', levelId: 2, growth: 320 },
  { id: 3, name: '王磊', phone: '137****9012', levelId: 5, growth: 1200 },
  { id: 4, name: '刘芳', phone: '136****3456', levelId: 3, growth: 560 },
  { id: 5, name: '陈明', phone: '135****7890', levelId: 1, growth: 210 },
  { id: 6, name: '周静', phone: '133****2345', levelId: 4, growth: 780 },
]

export default function MemberLevelsPage() {
  const [levels, setLevels] = useState(LEVELS)
  const [editLevel, setEditLevel] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = MEMBERS.filter(m => {
    if (!search) return true
    return m.name.includes(search) || m.phone.includes(search)
  })

  function getLevelById(id) {
    return levels.find(l => l.id === id) || levels[0]
  }

  function handleSaveLevel(updated) {
    setLevels(prev => prev.map(l => l.id === updated.id ? updated : l))
    setEditLevel(null)
  }

  function handleDeleteLevel(id) {
    if (!confirm('删除该等级？')) return
    setLevels(prev => prev.filter(l => l.id !== id))
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>会员等级体系</h3>
          <p className="card-subtitle">配置各会员等级成长值范围、权益和折扣</p>
        </div>
        <div className="card-body">
          <div className="level-grid">
            {levels.map(level => {
              const count = MEMBERS.filter(m => m.levelId === level.id).length
              return (
                <div
                  key={level.id}
                  className="level-card"
                  style={{ borderTop: `4px solid ${level.color}` }}
                  onClick={() => setEditLevel({ ...level })}
                >
                  <div className="level-icon">{level.icon}</div>
                  <div className="level-name" style={{ color: level.color }}>{level.name}</div>
                  <div className="level-range">成长值 {level.min.toLocaleString()} ~ {level.max >= 999999 ? '无上限' : level.max.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>折扣: {level.discount}折</div>
                  <div className="level-count">{count} 名会员</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, justifyContent: 'center' }}>
                    <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); setEditLevel({ ...level }) }}>编辑</button>
                    <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); handleDeleteLevel(level.id) }}>删除</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 会员列表 */}
      <div className="card">
        <div className="card-header">
          <h3>会员等级分布</h3>
          <p className="card-subtitle">查看所有会员及其对应等级</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="姓名/手机号搜索" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>头像</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>当前等级</th>
                <th>成长值</th>
                <th>成长值范围</th>
                <th>当前折扣</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const lv = getLevelById(m.levelId)
                return (
                  <tr key={m.id}>
                    <td><div className="table-avatar">{m.name.charAt(0)}</div></td>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12 }}>{m.phone}</td>
                    <td>
                      <span className="badge badge-primary" style={{ background: lv.color + '22', color: lv.color }}>
                        {lv.icon} {lv.name}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F', fontWeight: 700 }}>{m.growth.toLocaleString()}</td>
                    <td style={{ color: '#9CA3AF', fontSize: 12 }}>{lv.min.toLocaleString()} ~ {lv.max >= 999999 ? '无上限' : lv.max.toLocaleString()}</td>
                    <td>{lv.discount}折</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditLevel({ ...lv })}>编辑</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editLevel && (
        <EditLevelDrawer
          level={editLevel}
          levels={levels}
          onClose={() => setEditLevel(null)}
          onSave={handleSaveLevel}
        />
      )}
    </div>
  )
}
