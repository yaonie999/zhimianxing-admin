import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/admin.css'
import EditMemberDrawer from '../components/EditMemberDrawer'
import MemberConsentModal from '../components/MemberConsentModal'
import EditLevelDrawer from '../components/EditLevelDrawer'

/* ==================== 会员列表 ==================== */
const STUDIOS = ['全部工作室', '朝阳睡眠工作室', '海淀健康中心', '浦东睡眠医学中心', '天河睡眠驿站']

const MOCK_MEMBERS = [
  { id: 1, name: '张伟', phone: '138****1234', gender: '男', age: 45, job: '企业高管', marriage: '已婚', studio: '朝阳睡眠工作室', advisor: '李医生', points: 8500, level: '黄金会员', growth: 850, avatar: null, createdAt: '2024-03-12' },
  { id: 2, name: '李娜', phone: '139****5678', gender: '女', age: 32, job: '教师', marriage: '已婚', studio: '海淀健康中心', advisor: '王健康师', points: 3200, level: '白银会员', growth: 320, avatar: null, createdAt: '2024-05-20' },
  { id: 3, name: '王磊', phone: '137****9012', gender: '男', age: 28, job: 'IT工程师', marriage: '未婚', studio: '浦东睡眠医学中心', advisor: '张睡眠师', points: 12000, level: '钻石会员', growth: 1200, avatar: null, createdAt: '2023-11-08' },
  { id: 4, name: '刘芳', phone: '136****3456', gender: '女', age: 38, job: '医生', marriage: '已婚', studio: '天河睡眠驿站', advisor: '随机分配', points: 5600, level: '黄金会员', growth: 560, avatar: null, createdAt: '2024-01-25' },
  { id: 5, name: '陈明', phone: '135****7890', gender: '男', age: 52, job: '公务员', marriage: '已婚', studio: '朝阳睡眠工作室', advisor: '李医生', points: 2100, level: '青铜会员', growth: 210, avatar: null, createdAt: '2024-07-15' },
  { id: 6, name: '周静', phone: '133****2345', gender: '女', age: 29, job: '设计师', marriage: '未婚', studio: '海淀健康中心', advisor: '王健康师', points: 7800, level: '铂金会员', growth: 780, avatar: null, createdAt: '2024-02-18' },
]

function MemberListTab() {
  const navigate = useNavigate()
  const [members, setMembers] = useState(MOCK_MEMBERS)
  const [studio, setStudio] = useState('全部工作室')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [page, setPage] = useState(1)
  const [editTarget, setEditTarget] = useState(null)
  const [detailTarget, setDetailTarget] = useState(null)

  const filtered = members.filter(m => {
    if (studio !== '全部工作室' && m.studio !== studio) return false
    if (name && !m.name.includes(name)) return false
    if (phone && !m.phone.includes(phone)) return false
    if (date && !m.createdAt.includes(date)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  function handleSave(updated) {
    setMembers(prev => prev.map(m => m.id === updated.id ? updated : m))
    setEditTarget(null)
  }

  return (
    <>
      {detailTarget && (
        <MemberConsentModal member={detailTarget} onClose={() => setDetailTarget(null)} />
      )}
      {/* 一横排：姓名/手机号 + 年月日 + 工作室 + 查询 + 重置 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <div className="search-input-wrap" style={{ width: 200 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="输入姓名或手机号" value={name} onChange={e => { setName(e.target.value); setPhone(e.target.value); setPage(1) }} />
        </div>
        <input className="search-input" type="date" value={date} onChange={e => { setDate(e.target.value); setPage(1) }} style={{ width: 150 }} />
        <select className="form-select" style={{ width: 160 }} value={studio} onChange={e => { setStudio(e.target.value); setPage(1) }}>
          {STUDIOS.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn-query" style={{ width: 80, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => setPage(1)}>查询</button>
        <button className="btn-reset" style={{ width: 80, height: 34, lineHeight: '34px', padding: 0, fontSize: 14, flexShrink: 0 }} onClick={() => { setStudio('全部工作室'); setName(''); setPhone(''); setDate(''); setPage(1) }}>重置</button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 16px', fontSize: 14, flexShrink: 0 }} onClick={() => setEditTarget({ name: '', phone: '', gender: '男', age: 30, job: '', marriage: '未婚', studio: '朝阳睡眠工作室', advisor: '随机分配', points: 0, level: '青铜会员', growth: 0 })}>+ 添加会员</button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>头像</th>
              <th>姓名</th>
              <th>手机号</th>
              <th>性别</th>
              <th>年龄</th>
              <th>职业</th>
              <th>婚姻</th>
              <th>所属工作室</th>
              <th>健康师</th>
              <th>等级</th>
              <th>积分</th>
              <th>成长值</th>
              <th>注册日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map(m => (
              <tr key={m.id}>
                <td><div className="table-avatar">{m.name.charAt(0)}</div></td>
                <td style={{ fontWeight: 600 }}>{m.name}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12 }}>{m.phone}</td>
                <td>{m.gender}</td>
                <td>{m.age}</td>
                <td style={{ fontSize: 13, color: '#64748B' }}>{m.job}</td>
                <td>{m.marriage}</td>
                <td style={{ fontSize: 13 }}>{m.studio}</td>
                <td style={{ fontSize: 13 }}>{m.advisor}</td>
                <td><span className="badge badge-warning">{m.level}</span></td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F', fontWeight: 700 }}>{m.points.toLocaleString()}</td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#059669' }}>+{m.growth}</td>
                <td style={{ color: '#94A3B8', fontSize: 12 }}>{m.createdAt}</td>
                <td>
                  <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', marginRight: 6 }} onClick={() => setDetailTarget(m)}>查看详情</button>
                  <button className="btn-action btn-edit" style={{ marginRight: 6 }} onClick={() => setEditTarget({ ...m })}>编辑</button>
                  <button className="btn-action btn-delete" onClick={() => { if (confirm('确定删除该会员？')) setMembers(prev => prev.filter(m2 => m2.id !== m.id)) }}>删除</button>
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
          <span style={{ fontSize: 13, color: '#64748B', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>

      {editTarget && <EditMemberDrawer member={editTarget} onClose={() => setEditTarget(null)} onSave={handleSave} />}
    </>
  )
}

/* ==================== 积分查询 ==================== */
const POINTS_DATA = [
  { id: 1, name: '张伟', phone: '138****1234', level: '黄金会员', points: 8500, growth: 850, sourceDetail: '+850 签到奖励', source: '消费返积分', sourceTime: '2026-04-08' },
  { id: 2, name: '李娜', phone: '139****5678', level: '白银会员', points: 3200, growth: 320, sourceDetail: '+320 任务奖励', source: '消费返积分', sourceTime: '2026-04-07' },
  { id: 3, name: '王磊', phone: '137****9012', level: '钻石会员', points: 12000, growth: 1200, sourceDetail: '+1200 活动奖励', source: '消费返积分', sourceTime: '2026-04-09' },
  { id: 4, name: '刘芳', phone: '136****3456', level: '黄金会员', points: 5600, growth: 560, sourceDetail: '+560 签到奖励', source: '消费返积分', sourceTime: '2026-04-06' },
]

function PointsQueryTab() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [page, setPage] = useState(1)

  const filtered = POINTS_DATA.filter(m => {
    if (name && !m.name.includes(name)) return false
    if (phone && !m.phone.includes(phone)) return false
    return true
  })

  const PAGE_SIZE = 8
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1

  return (
    <>
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="姓名搜索" value={name} onChange={e => { setName(e.target.value); setPage(1) }} />
          </div>
          <div className="search-input-wrap">
            <span className="search-icon">📱</span>
            <input className="search-input" placeholder="手机号搜索" value={phone} onChange={e => { setPhone(e.target.value); setPage(1) }} />
          </div>
          <button className="btn-query" style={{ width: 60 }} onClick={() => setPage(1)}>查询</button>
          <button className="btn-reset" style={{ width: 60 }} onClick={() => { setName(''); setPhone(''); setPage(1) }}>重置</button>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>手机号</th>
              <th>当前积分</th>
              <th>会员等级</th>
              <th>成长值</th>
              <th>积分变动明细</th>
              <th>最近变动</th>
              <th>变动时间</th>
            </tr>
          </thead>
          <tbody>
            {data.map(m => (
              <tr key={m.id}>
                <td style={{ fontWeight: 600 }}>{m.name}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12 }}>{m.phone}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: '#1E3A5F', fontWeight: 700 }}>{m.points.toLocaleString()}</td>
                <td><span className="badge badge-warning">{m.level}</span></td>
                <td style={{ color: '#64748B', fontSize: 13 }}>{m.growth}</td>
                <td><span className="badge badge-success">{m.sourceDetail}</span></td>
                <td><span className="badge badge-primary">{m.source}</span></td>
                <td style={{ color: '#94A3B8', fontSize: 12 }}>{m.sourceTime}</td>
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
          <span style={{ fontSize: 13, color: '#64748B', padding: '0 8px' }}>第 {page} / {totalPages} 页</span>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>
    </>
  )
}

/* ==================== 会员等级 ==================== */
const LEVELS = [
  { id: 1, name: '青铜会员', min: 0, max: 999, color: '#CD7F32', icon: '🥉', discount: '98', rights: ['消费9.8折', '双倍积分'] },
  { id: 2, name: '白银会员', min: 1000, max: 2999, color: '#C0C0C0', icon: '🥈', discount: '95', rights: ['消费9.5折', '双倍积分'] },
  { id: 3, name: '黄金会员', min: 3000, max: 5999, color: '#FFD700', icon: '🥇', discount: '90', rights: ['消费9折', '双倍积分'] },
  { id: 4, name: '铂金会员', min: 6000, max: 9999, color: '#94A3B8', icon: '💎', discount: '85', rights: ['消费8.5折', '双倍积分'] },
  { id: 5, name: '钻石会员', min: 10000, max: 999999, color: '#9370DB', icon: '💠', discount: '80', rights: ['消费8折', '双倍积分'] },
]

function MemberLevelsTab() {
  const [editLevel, setEditLevel] = useState(null)

  function handleSaveLevel(updated) {
    // just close for now (would update state in real app)
    setEditLevel(null)
  }

  return (
    <>
      <div className="level-grid" style={{ marginBottom: 24 }}>
        {LEVELS.map(level => {
          const count = MOCK_MEMBERS.filter(m => m.growth >= level.min && m.growth <= level.max).length
          return (
            <div key={level.id} className="level-card" style={{ borderTop: `4px solid ${level.color}` }}>
              <div className="level-icon">{level.icon}</div>
              <div className="level-name" style={{ color: level.color }}>{level.name}</div>
              <div className="level-range">成长值 {level.min.toLocaleString()} ~ {level.max >= 999999 ? '无上限' : level.max.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>折扣: {level.discount}折</div>
              <div className="level-count">{count} 名会员</div>
              <div style={{ marginTop: 10, display: 'flex', gap: 6, justifyContent: 'center' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditLevel({ ...level })}>编辑</button>
              </div>
            </div>
          )
        })}
      </div>

      {editLevel && <EditLevelDrawer level={editLevel} onClose={() => setEditLevel(null)} onSave={handleSaveLevel} />}
    </>
  )
}

/* ==================== 积分设置 ==================== */
function PointsSettingsTab() {
  const [settings, setSettings] = useState({
    expiryEnabled: true, expiryType: 'year', expiryMonths: 12,
    deductionEnabled: true, deductionRules: [{ points: 100, money: 1 }],
    pointsPerMoney: 1, maxPointsPerDay: 500,
  })
  const [saved, setSaved] = useState(false)

  function set(k, v) { setSettings(p => ({ ...p, [k]: v })); setSaved(false) }
  function setRule(idx, key, val) {
    setSettings(p => {
      const rules = [...p.deductionRules]
      rules[idx] = { ...rules[idx], [key]: val }
      return { ...p, deductionRules: rules }
    })
    setSaved(false)
  }
  function addRule() { setSettings(p => ({ ...p, deductionRules: [...p.deductionRules, { points: 100, money: 1 }] })) }
  function deleteRule(idx) { setSettings(p => ({ ...p, deductionRules: p.deductionRules.filter((_, i) => i !== idx) })); setSaved(false) }
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <>
      {/* 有效期 */}
      <div className="settings-section">
        <div className="settings-header">⏰ 积分有效期</div>
        <div className="settings-body">
          <div className="switch-row">
            <div>
              <div className="switch-label">积分到期失效</div>
              <div className="switch-desc">开启后，积分将在到期后自动失效</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={settings.expiryEnabled} onChange={e => set('expiryEnabled', e.target.checked)} />
              <span className="switch-slider" />
            </label>
          </div>
          {settings.expiryEnabled && (
            <div style={{ padding: '12px 0' }}>
              <div className="form-item" style={{ maxWidth: 280 }}>
                <label className="form-label">有效期计算方式</label>
                <select className="form-select" value={settings.expiryType || 'year'} onChange={e => set('expiryType', e.target.value)}>
                  <option value="year">按年计算（获取后N个月到期）</option>
                  <option value="fixed">固定日期（每年固定日期到期）</option>
                </select>
              </div>
              {settings.expiryType === 'year' ? (
                <div className="form-item" style={{ maxWidth: 280, marginTop: 12 }}>
                  <label className="form-label">积分有效期（月）</label>
                  <select className="form-select" value={settings.expiryMonths || 12} onChange={e => set('expiryMonths', parseInt(e.target.value))}>
                    {[6, 12, 18, 24, 36].map(m => <option key={m}>{m} 个月</option>)}
                  </select>
                </div>
              ) : (
                <div className="form-item" style={{ maxWidth: 280, marginTop: 12 }}>
                  <label className="form-label">每年到期日</label>
                  <input className="form-input" type="date" value={settings.expiryDate || ''} onChange={e => set('expiryDate', e.target.value)} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 抵扣 */}
      <div className="settings-section">
        <div className="settings-header">🛒 积分抵扣</div>
        <div className="settings-body">
          <div className="switch-row">
            <div>
              <div className="switch-label">积分抵扣启用</div>
              <div className="switch-desc">开启后，用户下单时可使用积分抵扣部分金额</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={settings.deductionEnabled} onChange={e => set('deductionEnabled', e.target.checked)} />
              <span className="switch-slider" />
            </label>
          </div>
          {settings.deductionEnabled && (
            <div style={{ padding: '12px 0' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>抵扣规则</p>
              <div className="rules-list">
                {settings.deductionRules.map((rule, idx) => (
                  <div key={idx} className="rule-item">
                    <span className="rule-text"><span style={{ color: '#1E3A5F', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{rule.points}</span> 积分</span>
                    <span style={{ color: '#64748B' }}>可抵扣</span>
                    <input className="points-rule-input" type="number" value={rule.money} onChange={e => setRule(idx, 'money', parseFloat(e.target.value))} style={{ width: 80 }} min={0.01} step={0.01} />
                    <span className="rule-text">元</span>
                    <button className="rule-delete" onClick={() => deleteRule(idx)}>✕</button>
                  </div>
                ))}
              </div>
              <button className="add-rule-btn" onClick={addRule}>+ 添加抵扣规则</button>
            </div>
          )}
        </div>
      </div>

      {/* 获取规则 */}
      <div className="settings-section">
        <div className="settings-header">🎁 积分获取</div>
        <div className="settings-body">
          <div className="form-row">
            <div className="form-item">
              <label className="form-label">每消费多少元获取 1 积分</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#64748B' }}>每消费</span>
                <input className="form-input" type="number" value={settings.pointsPerMoney || 1} onChange={e => set('pointsPerMoney', parseFloat(e.target.value))} style={{ width: 100, textAlign: 'center' }} min={0.1} step={0.1} />
                <span style={{ color: '#64748B' }}>元获取 1 积分</span>
              </div>
            </div>
            <div className="form-item">
              <label className="form-label">每天最多获取积分上限</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input className="form-input" type="number" value={settings.maxPointsPerDay || 500} onChange={e => set('maxPointsPerDay', parseInt(e.target.value))} style={{ width: 120, textAlign: 'center' }} min={0} />
                <span style={{ color: '#64748B' }}>积分/天</span>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>设置0表示不设上限</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
        <button className="btn-reset" onClick={() => setSettings({ expiryEnabled: true, expiryType: 'year', expiryMonths: 12, deductionEnabled: true, deductionRules: [{ points: 100, money: 1 }], pointsPerMoney: 1, maxPointsPerDay: 500 })}>重置</button>
        <button className="btn btn-primary" onClick={handleSave}>{saved ? '✓ 已保存' : '保存设置'}</button>
      </div>
    </>
  )
}

/* ==================== 主页面 ==================== */
export default function MembersPage() {
  const [tab, setTab] = useState('会员列表')

  const TABS = ['会员列表', '积分查询', '会员等级', '积分设置']

  return (
    <div className="page-container" style={{ padding: '24px' }}>
      <div className="card">
        {/* Tab横向导航 */}
        <div style={{
          padding: '0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', gap: 0,
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

        <div style={{ padding: '20px' }}>
          {tab === '会员列表' && <MemberListTab />}
          {tab === '积分查询' && <PointsQueryTab />}
          {tab === '会员等级' && <MemberLevelsTab />}
          {tab === '积分设置' && <PointsSettingsTab />}
        </div>
      </div>
    </div>
  )
}
