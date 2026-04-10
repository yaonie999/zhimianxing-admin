import React, { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart
} from 'recharts'
import '../../styles/admin.css'

// 时间筛选快捷选项
const QUICK_RANGES = ['7日', '30日', '60天']

// 4个核心卡片
const STAT_CARDS = [
  {
    label: '总用户数',
    value: '8,432',
    unit: '人',
    change: '+3.2',
    changeUnit: '%',
    up: true,
    compare: '较上月',
    icon: '👥',
    color: '#1E3A5F',
    trend: [7800, 7950, 8100, 8230, 8350, 8400, 8432],
    miniType: 'bar',
  },
  {
    label: '7日活跃用户',
    value: '3,218',
    unit: '人',
    change: '+5.1',
    changeUnit: '%',
    up: true,
    compare: '较上周',
    icon: '🔥',
    color: '#059669',
    trend: [2900, 2950, 3020, 3080, 3120, 3180, 3218],
    miniType: 'area',
  },
  {
    label: '7日新增用户',
    value: '28',
    unit: '人',
    change: '+12',
    changeUnit: '%',
    up: true,
    compare: '较上周',
    icon: '✨',
    color: '#D97706',
    trend: [22, 24, 25, 23, 26, 27, 28],
    miniType: 'area',
  },
  {
    label: '7日新增留存率',
    value: '68.5',
    unit: '%',
    change: '-2.3',
    changeUnit: '%',
    up: false,
    compare: '较上月',
    icon: '📊',
    color: '#7C3AED',
    trend: [72, 71, 70, 69, 70, 69, 68.5],
    miniType: 'bar',
    progress: 68.5,
  },
]

// 活跃用户趋势数据
const ACTIVE_TREND = [
  { date: '04-04', users: 2850, sessions: 4210, avgDuration: 32 },
  { date: '04-05', users: 2910, sessions: 4380, avgDuration: 35 },
  { date: '04-06', users: 2780, sessions: 4050, avgDuration: 28 },
  { date: '04-07', users: 3020, sessions: 4620, avgDuration: 38 },
  { date: '04-08', users: 3180, sessions: 4890, avgDuration: 41 },
  { date: '04-09', users: 3240, sessions: 5010, avgDuration: 44 },
  { date: '04-10', users: 3218, sessions: 4920, avgDuration: 42 },
]

// 会员等级分布
const LEVEL_DATA = [
  { level: '青铜会员', count: 3201, pct: 38, color: '#CD7F32' },
  { level: '白银会员', count: 2415, pct: 29, color: '#C0C0C0' },
  { level: '黄金会员', count: 1820, pct: 22, color: '#FFD700' },
  { level: '铂金会员', count: 756, pct: 9, color: '#94A3B8' },
  { level: '钻石会员', count: 240, pct: 3, color: '#9370DB' },
]

// 启动次数数据
const SESSION_DATA = [
  { date: '04-04', sessions: 4210 },
  { date: '04-05', sessions: 4380 },
  { date: '04-06', sessions: 4050 },
  { date: '04-07', sessions: 4620 },
  { date: '04-08', sessions: 4890 },
  { date: '04-09', sessions: 5010 },
  { date: '04-10', sessions: 4920 },
]

// 迷你柱状图
function MiniBar({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
      {data.map((v, i) => {
        const h = Math.max(4, ((v - min) / range) * 22 + 6)
        return (
          <div key={i} style={{
            width: 8, height: h, background: color, borderRadius: '2px 2px 0 0',
            transition: 'height 0.3s ease',
          }} />
        )
      })}
    </div>
  )
}

// 迷你面积图
function MiniArea({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 80
    const y = 28 - ((v - min) / range) * 22
    return `${x},${y}`
  })
  const areaPts = `0,28 ${pts.join(' ')} 80,28`
  return (
    <svg width="80" height="28" viewBox="0 0 80 28" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad_${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill={`url(#grad_${color.replace('#','')})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Tooltip
const ActiveTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}：{p.name === '活跃用户' ? `${p.value.toLocaleString()}人` : `${p.value.toLocaleString()}次`}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function UserAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('活跃用户趋势')
  const [timeRange, setTimeRange] = useState('7日')

  const chartData = activeTab === '活跃用户趋势' ? ACTIVE_TREND : SESSION_DATA

  return (
    <div style={{ padding: '24px', background: '#F1F5F9', minHeight: '100vh' }}>

      {/* ====== ① 核心数据卡片区 ====== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="card" style={{ padding: '20px 24px', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>{s.unit}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: s.progress !== undefined ? 10 : 8 }}>
              <span style={{ color: s.up ? '#059669' : '#EF4444', fontSize: 13, fontWeight: 700 }}>
                {s.up ? '↑' : '↓'} {s.change}{s.changeUnit}
              </span>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>{s.compare}</span>
            </div>
            {s.progress !== undefined ? (
              <div>
                <div style={{ background: '#E2E8F0', borderRadius: 4, height: 6, width: '100%' }}>
                  <div style={{ width: `${s.progress}%`, height: '100%', background: s.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ) : (
              <div style={{ height: 28, display: 'flex', alignItems: 'center' }}>
                {s.miniType === 'bar'
                  ? <MiniBar data={s.trend} color={s.color} />
                  : <MiniArea data={s.trend} color={s.color} />
                }
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ====== ② 图表区 ====== */}
      <div className="card">
        {/* 顶部操作栏 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 12 }}>
          {/* 标签切换 */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['活跃用户趋势', '启动次数'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
                  background: activeTab === tab ? '#1E3A5F' : '#F1F5F9',
                  color: activeTab === tab ? '#fff' : '#64748B',
                  fontWeight: activeTab === tab ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >{tab}</button>
            ))}
          </div>

          {/* 快捷时间筛选 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>时间范围</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {QUICK_RANGES.map(r => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  style={{
                    padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
                    background: timeRange === r ? '#1E3A5F' : '#fff',
                    color: timeRange === r ? '#fff' : '#64748B',
                    fontWeight: timeRange === r ? 600 : 400,
                    border: timeRange === r ? 'none' : '1px solid #E2E8F0',
                  }}
                >{r}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 图表主体 */}
        <div style={{ padding: '20px' }}>
          {/* 图例 */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
            {activeTab === '活跃用户趋势' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#1E3A5F' }} />
                  <span style={{ fontSize: 12, color: '#64748B' }}>活跃用户数（人）</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#3B82F6' }} />
                  <span style={{ fontSize: 12, color: '#64748B' }}>启动次数（次）</span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#1E3A5F' }} />
                <span style={{ fontSize: 12, color: '#64748B' }}>启动次数（次）</span>
              </div>
            )}
          </div>

          <ResponsiveContainer width="100%" height={280}>
            {activeTab === '活跃用户趋势' ? (
              <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="sessionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="users" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="sessions" orientation="right" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ActiveTooltip />} />
                <Area yAxisId="users" type="monotone" dataKey="users" name="活跃用户" stroke="#1E3A5F" strokeWidth={2} fill="url(#userGrad)" dot={{ r: 4, fill: '#1E3A5F' }} activeDot={{ r: 6 }} />
                <Area yAxisId="sessions" type="monotone" dataKey="sessions" name="启动次数" stroke="#3B82F6" strokeWidth={2} fill="url(#sessionGrad)" dot={false} activeDot={{ r: 5 }} />
              </ComposedChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ActiveTooltip />} />
                <Area type="monotone" dataKey="sessions" name="启动次数" stroke="#1E3A5F" strokeWidth={2} fill="url(#sessGrad)" dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== 会员等级分布 ====== */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>🎖 会员等级分布</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>各等级会员人数及占比</div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>等级</th>
                <th>会员人数</th>
                <th>占比</th>
                <th>等级分布</th>
              </tr>
            </thead>
            <tbody>
              {LEVEL_DATA.map(l => (
                <tr key={l.level}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: '#1E3A5F' }}>{l.level}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1E3A5F', fontWeight: 600 }}>{l.count.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}>{l.pct}%</td>
                  <td>
                    <div style={{ background: '#E2E8F0', borderRadius: 4, height: 10, width: '100%', overflow: 'hidden' }}>
                      <div style={{ width: `${l.pct}%`, height: '100%', background: l.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
