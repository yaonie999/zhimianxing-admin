import React, { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts'
import '../../styles/admin.css'

// 时间筛选
const TIME_RANGES = [
  { label: '7日', value: '7d' },
  { label: '30日', value: '30d' },
  { label: '60日', value: '60d' },
]

// 核心指标卡片
const STATS = [
  {
    label: '今日订单',
    value: '128',
    unit: '单',
    change: '+12',
    changeUnit: '%',
    up: true,
    compare: '较昨日',
    icon: '📦',
    color: '#1E3A5F',
    lightColor: '#EFF6FF',
  },
  {
    label: '今日营收',
    value: '48,320',
    unit: '元',
    change: '+8',
    changeUnit: '%',
    up: true,
    compare: '较昨日',
    icon: '💰',
    color: '#059669',
    lightColor: '#ECFDF5',
  },
  {
    label: '待发货',
    value: '23',
    unit: '单',
    change: '-5',
    changeUnit: '%',
    up: false,
    compare: '较昨日',
    icon: '🚚',
    color: '#D97706',
    lightColor: '#FFFBEB',
  },
  {
    label: '退款申请',
    value: '4',
    unit: '单',
    change: '+2',
    changeUnit: '%',
    up: false,
    compare: '较昨日',
    icon: '🔙',
    color: '#DC2626',
    lightColor: '#FEF2F2',
  },
]

// 订单 & 营收趋势数据
const TREND_DATA = [
  { date: '04-04', orders: 98, revenue: 32100, newCust: 42, oldCust: 56 },
  { date: '04-05', orders: 112, revenue: 38900, newCust: 48, oldCust: 64 },
  { date: '04-06', orders: 105, revenue: 35200, newCust: 45, oldCust: 60 },
  { date: '04-07', orders: 120, revenue: 41500, newCust: 52, oldCust: 68 },
  { date: '04-08', orders: 135, revenue: 46200, newCust: 58, oldCust: 77 },
  { date: '04-09', orders: 142, revenue: 47900, newCust: 61, oldCust: 81 },
  { date: '04-10', orders: 128, revenue: 48320, newCust: 55, oldCust: 73 },
]

// 订单构成数据
const CUSTOMER_DATA = [
  { name: '新客订单', thisPeriod: 361, lastPeriod: 298 },
  { name: '老客订单', thisPeriod: 479, lastPeriod: 402 },
]

// 交易转化漏斗
const FUNNEL_DATA = [
  { stage: '访问量', value: 8420, pct: 100 },
  { stage: '加购数', value: 3821, pct: 45 },
  { stage: '提交订单', value: 1280, pct: 15 },
  { stage: '支付成功', value: 896, pct: 11 },
  { stage: '完成交易', value: 742, pct: 9 },
]

// 表格数据
const TABLE_DATA = [
  { date: '04-04', orders: 98, revenue: 32100, avgPrice: 328, refund: 3 },
  { date: '04-05', orders: 112, revenue: 38900, avgPrice: 347, refund: 4 },
  { date: '04-06', orders: 105, revenue: 35200, avgPrice: 335, refund: 2 },
  { date: '04-07', orders: 120, revenue: 41500, avgPrice: 346, refund: 3 },
  { date: '04-08', orders: 135, revenue: 46200, avgPrice: 342, refund: 5 },
  { date: '04-09', orders: 142, revenue: 47900, avgPrice: 337, refund: 4 },
  { date: '04-10', orders: 128, revenue: 48320, avgPrice: 378, refund: 4 },
]

// 自定义Tooltip
const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontWeight: 600, marginBottom: 2 }}>
            {p.name}：{p.name === '营收金额' ? `¥${p.value.toLocaleString()}` : p.value}
          </div>
        ))}
      </div>
    )
  }
  return null
}

const CustomerTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontWeight: 600, marginBottom: 2 }}>
            {p.name}：{p.value}单
          </div>
        ))}
      </div>
    )
  }
  return null
}

const FunnelTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontWeight: 700, color: '#1E3A5F' }}>{payload[0].payload.stage}</div>
        <div style={{ color: '#9CA3AF', marginTop: 4 }}>数值：{payload[0].value.toLocaleString()}</div>
        <div style={{ color: '#9CA3AF' }}>占比：{payload[0].payload.pct}%</div>
      </div>
    )
  }
  return null
}

// 漏斗图组件
function FunnelChart({ data }) {
  const maxVal = data[0].value
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 8px' }}>
      {data.map((d, i) => {
        const widthPct = (d.value / maxVal) * 100
        const colors = ['#1E3A5F', '#3B82F6', '#6366F1', '#8B5CF6', '#A78BFA']
        return (
          <div key={d.stage} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 56, fontSize: 12, color: '#9CA3AF', textAlign: 'right', flexShrink: 0 }}>{d.stage}</div>
            <div style={{ flex: 1, height: 32, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: `${widthPct}%`, height: '100%', background: colors[i],
                borderRadius: 4, transition: 'width 0.5s ease',
                display: 'flex', alignItems: 'center', paddingLeft: 10,
              }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{d.value.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ width: 36, fontSize: 12, color: '#CBD5E1', textAlign: 'left', flexShrink: 0 }}>{d.pct}%</div>
          </div>
        )
      })}
    </div>
  )
}

// 迷你趋势线图（用于卡片内）
function MiniTrend({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 80
    const y = 28 - ((v - min) / range) * 22
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width="80" height="28" viewBox="0 0 80 28" style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function OrderAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [chartType, setChartType] = useState('area') // 'area' | 'bar'

  return (
    <div style={{ padding: '24px', background: '#F1F5F9', minHeight: '100vh' }}>

      {/* ====== ① 时间筛选栏 ====== */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', flexShrink: 0 }}>时间筛选</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {TIME_RANGES.map(r => (
              <button
                key={r.value}
                onClick={() => setTimeRange(r.value)}
                style={{
                  padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
                  background: timeRange === r.value ? '#1E3A5F' : '#fff',
                  color: timeRange === r.value ? '#fff' : '#9CA3AF',
                  fontWeight: timeRange === r.value ? 600 : 400,
                  border: timeRange === r.value ? 'none' : '1px solid #E2E8F0',
                  transition: 'all 0.15s',
                }}
              >{r.label}</button>
            ))}
          </div>
          <input
            type="date"
            style={{
              padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: 6,
              fontSize: 13, color: '#E2E8F0', background: '#fff', cursor: 'pointer',
            }}
          />
          <span style={{ color: '#CBD5E1', fontSize: 14 }}>—</span>
          <input
            type="date"
            style={{
              padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: 6,
              fontSize: 13, color: '#E2E8F0', background: '#fff', cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* ====== ② 核心数据卡片区 ====== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        {STATS.map((s) => (
          <div key={s.label} className="card" style={{ padding: '20px 24px', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 13, color: '#CBD5E1' }}>{s.unit}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{ color: s.up ? '#059669' : '#EF4444', fontSize: 13, fontWeight: 700 }}>
                {s.up ? '↑' : '↓'} {s.change}{s.changeUnit}
              </span>
              <span style={{ fontSize: 12, color: '#CBD5E1' }}>{s.compare}</span>
            </div>
            <div style={{ height: 28, display: 'flex', alignItems: 'center' }}>
              <MiniTrend
                data={[98, 112, 105, 120, 135, 142, 128]}
                color={s.up ? '#059669' : '#EF4444'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ====== ③ 可视化图表区 ====== */}

      {/* 图表1：订单量 & 营收金额趋势 */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>📈 订单量 & 营收金额趋势</div>
            <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>2026年04月04日 - 04月10日</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'area', label: '面积图' },
              { key: 'bar', label: '柱状图' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setChartType(t.key)}
                style={{
                  padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12,
                  background: chartType === t.key ? '#1E3A5F' : '#F1F5F9',
                  color: chartType === t.key ? '#fff' : '#9CA3AF',
                  fontWeight: chartType === t.key ? 600 : 400,
                }}
              >{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1E3A5F' }} />
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>订单量（单）</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#3B82F6' }} />
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>营收金额（元）</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            {chartType === 'area' ? (
              <ComposedChart data={TREND_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="orders" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="revenue" orientation="right" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} tickFormatter={v => `¥${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<RevenueTooltip />} />
                <Area yAxisId="orders" type="monotone" dataKey="orders" name="订单量" stroke="#1E3A5F" strokeWidth={2} fill="none" dot={{ r: 4, fill: '#1E3A5F' }} activeDot={{ r: 6 }} />
                <Area yAxisId="revenue" type="monotone" dataKey="revenue" name="营收金额" stroke="#3B82F6" strokeWidth={2} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5 }} />
              </ComposedChart>
            ) : (
              <ComposedChart data={TREND_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="orders" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="revenue" orientation="right" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} tickFormatter={v => `¥${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<RevenueTooltip />} />
                <Bar yAxisId="orders" dataKey="orders" name="订单量" fill="#1E3A5F" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar yAxisId="revenue" dataKey="revenue" name="营收金额" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={28} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 图表2：左右分栏 - 订单构成 + 交易转化漏斗 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* 左：订单构成（新客/老客） */}
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>🏗 客户构成</div>
            <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>本期 vs 上期 订单量对比</div>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#1E3A5F' }} />
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>本期</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#93C5FD' }} />
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>上期</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={CUSTOMER_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#CBD5E1' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomerTooltip />} />
                <Bar dataKey="thisPeriod" name="本期" fill="#1E3A5F" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="lastPeriod" name="上期" fill="#93C5FD" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 右：交易转化漏斗 */}
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>🔁 交易转化漏斗</div>
            <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>从访问到完成交易的转化路径</div>
          </div>
          <div style={{ padding: '20px' }}>
            <FunnelChart data={FUNNEL_DATA} />
          </div>
        </div>
      </div>

      {/* ====== ④ 数据表格区 ====== */}
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>📋 订单明细数据</div>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 2 }}>每日订单统计 · 2026年04月04日 - 04月10日</div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>日期</th>
                <th>订单量（单）</th>
                <th>营收金额（元）</th>
                <th>客单价（元）</th>
                <th>退款数（单）</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map(t => (
                <tr key={t.date}>
                  <td style={{ fontWeight: 700, color: '#1E3A5F', width: 100 }}>{t.date}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1E3A5F', fontWeight: 600 }}>{t.orders}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#D97706', fontWeight: 700 }}>¥{t.revenue.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF' }}>¥{t.avgPrice}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#EF4444' }}>{t.refund}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
