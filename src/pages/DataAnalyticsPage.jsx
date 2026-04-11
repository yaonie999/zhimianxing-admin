import React, { useState } from 'react'
import '../styles/admin.css'

/* ==================== 模拟数据 ==================== */
function genOrders(days = 30) {
  const data = []
  for (let i = 0; i < days; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const label = `${d.getMonth() + 1}/${d.getDate()}`
    data.push({ label, orders: Math.floor(Math.random() * 200) + 50, revenue: Math.floor(Math.random() * 30000) + 5000, users: Math.floor(Math.random() * 100) + 20 })
  }
  return data.reverse()
}

function OrderAnalytics() {
  const data = genOrders()
  const maxOrders = Math.max(...data.map(d => d.orders))
  const totalOrders = data.reduce((s, d) => s + d.orders, 0)
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0)

  return (
    <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: '总订单数', value: totalOrders.toLocaleString(), icon: '📦', color: '#0EA5E9' },
            { label: '总销售额', value: '¥' + (totalRevenue / 10000).toFixed(1) + '万', icon: '💰', color: '#10B981' },
            { label: '日均订单', value: Math.round(totalOrders / data.length), icon: '📊', color: '#8B5CF6' },
          ].map((kpi, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: kpi.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{kpi.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{kpi.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>📈 30天订单趋势</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
            {data.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: '#0EA5E9', borderRadius: '3px 3px 0 0', minHeight: 4, height: Math.max(4, (d.orders / maxOrders) * 100), transition: 'height 0.3s' }} title={`${d.label}: ${d.orders}单`} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-dim)' }}>
            <span>{data[0]?.label}</span>
            <span>{data[data.length - 1]?.label}</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', padding: '20px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>📋 近30天订单明细</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['日期', '订单数', '销售额（元）', '客单价（元）'].map((h, i) => <th key={i} style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(-10).reverse().map((d, i) => (
                <tr key={i} style={{ borderBottom: i < 9 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>{d.label}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--blue-primary)' }}>{d.orders}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--green-online)' }}>¥{d.revenue.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-dim)' }}>¥{Math.round(d.revenue / d.orders)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

function UserAnalytics() {
  const [days, setDays] = useState(30)
  const activeUsers = Math.floor(Math.random() * 5000) + 2000
  const newUsers = Math.floor(Math.random() * 500) + 200
  const retention = (Math.random() * 30 + 60).toFixed(1)

  return (
    <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: '活跃用户', value: activeUsers.toLocaleString(), icon: '👥', color: '#8B5CF6' },
            { label: '新增用户', value: newUsers.toLocaleString(), icon: '🆕', color: '#10B981' },
            { label: '次月留存率', value: retention + '%', icon: '📊', color: '#F59E0B' },
          ].map((kpi, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: kpi.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{kpi.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{kpi.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>👥 用户增长趋势</div>
            <select value={days} onChange={e => setDays(Number(e.target.value))} style={{ height: 32, padding: '0 12px', border: '1.5px solid var(--border-default)', borderRadius: 6, fontSize: 13, color: 'var(--text-primary)', background: '#fff', cursor: 'pointer' }}>
              <option value={7}>近7天</option>
              <option value={30}>近30天</option>
              <option value={90}>近90天</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { title: '性别分布', data: [{ label: '女性', value: 58, color: '#EC4899' }, { label: '男性', value: 42, color: '#0EA5E9' }] },
              { title: '年龄分布', data: [{ label: '18-25岁', value: 32, color: '#8B5CF6' }, { label: '26-35岁', value: 41, color: '#0EA5E9' }, { label: '36-45岁', value: 18, color: '#10B981' }, { label: '45岁以上', value: 9, color: '#F59E0B' }] },
            ].map((section, si) => (
              <div key={si}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>{section.title}</div>
                {section.data.map((item, ji) => (
                  <div key={ji} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                      <span style={{ fontWeight: 700, color: item.color }}>{item.value}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: item.value + '%', background: item.color, borderRadius: 3, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

function BehaviorAnalytics() {
  const behaviors = [
    { name: '睡前冥想音频', users: 3421, sessions: 12830, avgDuration: '18.5分钟', rate: 94.2 },
    { name: '睡眠监测同步', users: 2891, sessions: 8721, avgDuration: '7.2分钟', rate: 81.3 },
    { name: '睡眠报告查看', users: 2134, sessions: 5621, avgDuration: '3.1分钟', rate: 62.1 },
    { name: '专家咨询预约', users: 892, sessions: 1234, avgDuration: '15分钟', rate: 28.4 },
    { name: '积分签到', users: 1892, sessions: 6721, avgDuration: '1分钟', rate: 58.3 },
    { name: '积分商城浏览', users: 1234, sessions: 2341, avgDuration: '4.5分钟', rate: 42.1 },
    { name: '社区帖子浏览', users: 2103, sessions: 6781, avgDuration: '8.3分钟', rate: 71.2 },
    { name: '订单支付', users: 682, sessions: 823, avgDuration: '2.1分钟', rate: 23.8 },
  ]

  return (
    <div style={{ padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', padding: '20px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>🔍 用户行为分析</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['行为名称', '使用用户数', '总使用次数', '平均使用时长', '使用率'].map((h, i) => <th key={i} style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {behaviors.map((b, i) => (
                <tr key={i} style={{ borderBottom: i < behaviors.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{b.name}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--blue-primary)' }}>{b.users.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>{b.sessions.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-dim)' }}>{b.avgDuration}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--bg-elevated)', borderRadius: 3, maxWidth: 120 }}>
                        <div style={{ height: '100%', width: b.rate + '%', background: b.rate > 70 ? 'var(--green-online)' : b.rate > 40 ? 'var(--blue-primary)' : 'var(--amber)', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: b.rate > 70 ? 'var(--green-online)' : b.rate > 40 ? 'var(--blue-primary)' : 'var(--amber)', fontWeight: 700, minWidth: 40 }}>{b.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

/* ==================== 主页面 ==================== */
export default function DataAnalyticsPage() {
  const [tab, setTab] = useState('订单数据分析')
  const TABS = ['订单数据分析', '用户数据分析', '用户行为分析']

  return (
    <div style={{ padding: '24px' }}>
      {/* 顶部标签栏 */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: '#fff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 8,
        padding: '4px',
        marginBottom: 20,
      }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '6px 20px',
              borderRadius: 6,
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: tab === t ? 'var(--blue-primary)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text-muted)',
            }}
          >{t}</button>
        ))}
      </div>

      {/* 内容区 */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}>
        {tab === '订单数据分析' && <OrderAnalytics />}
        {tab === '用户数据分析' && <UserAnalytics />}
        {tab === '用户行为分析' && <BehaviorAnalytics />}
      </div>
    </div>
  )
}
