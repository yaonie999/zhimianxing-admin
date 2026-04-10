import React, { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'
import '../../styles/admin.css'

// 行为事件选项
const EVENT_OPTIONS = [
  '打开APP', '查看睡眠报告', '使用睡眠监测', '查看科普内容',
  '浏览商品', '提交订单', '参与社区互动', '分享睡眠报告'
]

// 统计维度
const DIM_OPTIONS = ['总次数', '触发用户数', '人均次数']

// 行为数据
const BEHAVIOR_TABLE = [
  { id: 1, action: '打开APP', users: 4231, pct: 100, avgTime: '2分30秒', color: '#1E3A5F' },
  { id: 2, action: '查看睡眠报告', users: 3892, pct: 92, avgTime: '1分15秒', color: '#2563EB' },
  { id: 3, action: '使用睡眠监测', users: 3412, pct: 81, avgTime: '7小时20分', color: '#3B82F6' },
  { id: 4, action: '查看科普内容', users: 2108, pct: 50, avgTime: '3分45秒', color: '#6366F1' },
  { id: 5, action: '浏览商品', users: 1893, pct: 45, avgTime: '5分10秒', color: '#8B5CF6' },
  { id: 6, action: '提交订单', users: 876, pct: 21, avgTime: '2分05秒', color: '#A78BFA' },
  { id: 7, action: '参与社区互动', users: 654, pct: 15, avgTime: '8分30秒', color: '#C4B5FD' },
  { id: 8, action: '分享睡眠报告', users: 234, pct: 6, avgTime: '1分20秒', color: '#94A3B8' },
]

// 趋势数据
const TREND_DATA = [
  { date: '04-04', eventA: 4120, eventB: 1820 },
  { date: '04-05', eventA: 4380, eventB: 1980 },
  { date: '04-06', eventA: 4050, eventB: 1750 },
  { date: '04-07', eventA: 4620, eventB: 2100 },
  { date: '04-08', eventA: 4890, eventB: 2240 },
  { date: '04-09', eventA: 5010, eventB: 2380 },
  { date: '04-10', eventA: 4920, eventB: 2210 },
]

const COLORS = ['#1E3A5F', '#3B82F6', '#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#94A3B8']

// 统计汇总
const SUMMARY = [
  { label: '打开APP', total: '49,342次', users: '8,432人' },
  { label: '查看睡眠报告', total: '38,912次', users: '6,218人' },
  { label: '使用睡眠监测', total: '34,120次', users: '5,102人' },
]

const VIEW_TYPES = ['折线图', '柱状图', '饼图']

const TooltipCustom = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}：{p.value.toLocaleString()}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function BehaviorAnalyticsPage() {
  const [events, setEvents] = useState([
    { event: '打开APP', dim: '总次数' },
    { event: '查看睡眠报告', dim: '总次数' },
  ])
  const [granularity, setGranularity] = useState('按日')
  const [viewType, setViewType] = useState('折线图')
  const [startDate, setStartDate] = useState('2026-04-04')
  const [endDate, setEndDate] = useState('2026-04-10')

  function updateEvent(idx, key, val) {
    const updated = [...events]
    updated[idx][key] = val
    setEvents(updated)
  }

  function addEvent() {
    const usedEvents = events.map(e => e.event)
    const nextEvent = EVENT_OPTIONS.find(e => !usedEvents.includes(e)) || EVENT_OPTIONS[0]
    setEvents([...events, { event: nextEvent, dim: '总次数' }])
  }

  return (
    <div style={{ padding: '24px', background: '#F1F5F9', minHeight: '100vh' }}>

      {/* ====== ① 顶部筛选区 ====== */}
      <div className="card" style={{ marginBottom: 16 }}>

        {/* 事件选择模块 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', flexShrink: 0 }}>事件选择</span>
            <div style={{ height: 1, flex: 1, background: '#E2E8F0' }} />
          </div>

          {/* 事件行 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            {events.map((ev, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: '#94A3B8', width: 16, textAlign: 'center', flexShrink: 0 }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <select
                  className="form-select"
                  style={{ width: 160, fontSize: 13 }}
                  value={ev.event}
                  onChange={e => updateEvent(idx, 'event', e.target.value)}
                >
                  {EVENT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <select
                  className="form-select"
                  style={{ width: 130, fontSize: 13 }}
                  value={ev.dim}
                  onChange={e => updateEvent(idx, 'dim', e.target.value)}
                >
                  {DIM_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                {events.length > 1 && (
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#EF4444', fontSize: 12, padding: '4px 8px' }}
                    onClick={() => setEvents(events.filter((_, i) => i !== idx))}
                  >✕</button>
                )}
              </div>
            ))}
          </div>

          <button
            className="btn btn-ghost btn-sm"
            style={{ fontSize: 13, color: '#1E3A5F', border: '1px solid #E2E8F0', padding: '5px 14px', borderRadius: 6 }}
            onClick={addEvent}
          >
            ＋ 添加事件
          </button>
        </div>

        {/* 全局筛选模块 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', flexShrink: 0 }}>全局筛选</span>
            <div style={{ height: 1, flex: 1, background: '#E2E8F0' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <select className="form-select" style={{ width: 140, fontSize: 13 }}>
              <option>年龄</option>
              <option>用户类型</option>
              <option>工作室</option>
            </select>
            <select className="form-select" style={{ width: 100, fontSize: 13 }}>
              <option>等于</option>
              <option>大于</option>
              <option>小于</option>
            </select>
            <select className="form-select" style={{ width: 120, fontSize: 13 }}>
              <option>18-25岁</option>
              <option>26-35岁</option>
              <option>36-45岁</option>
              <option>45岁以上</option>
            </select>
            <button
              className="btn btn-ghost btn-sm"
              style={{ fontSize: 12, color: '#64748B', border: '1px solid #E2E8F0', padding: '5px 12px', borderRadius: 6 }}
            >
              ＋ 添加条件
            </button>
          </div>
        </div>

        {/* 时间筛选 + 查询重置 */}
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>

          {/* 时间粒度 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#64748B', flexShrink: 0 }}>时间粒度</span>
            <select
              className="form-select"
              style={{ width: 100, fontSize: 13 }}
              value={granularity}
              onChange={e => setGranularity(e.target.value)}
            >
              <option>按日</option>
              <option>按周</option>
              <option>按月</option>
            </select>
          </div>

          {/* 日期范围 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="date"
              className="form-input"
              style={{ width: 140, fontSize: 13 }}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            <span style={{ color: '#CBD5E1', fontSize: 14 }}>—</span>
            <input
              type="date"
              className="form-input"
              style={{ width: 140, fontSize: 13 }}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>

          {/* 统计汇总 */}
          <div style={{ display: 'flex', gap: 16, flex: 1, flexWrap: 'wrap' }}>
            {SUMMARY.map(s => (
              <div key={s.label} style={{ fontSize: 12, color: '#64748B' }}>
                <span style={{ color: '#1E3A5F', fontWeight: 600 }}>{s.label}：</span>
                <span>{s.total}</span>
                <span style={{ marginLeft: 8, color: '#94A3B8' }}>({s.users})</span>
              </div>
            ))}
          </div>

          {/* 查询重置 */}
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button className="btn-query" style={{ height: 34, padding: '0 20px', fontSize: 14 }}>查询</button>
            <button className="btn-reset" style={{ height: 34, padding: '0 20px', fontSize: 14 }}>重置</button>
          </div>
        </div>
      </div>

      {/* ====== ② 中间图表区 ====== */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>📈 事件趋势分析</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
              {events.map(e => e.event).join(' / ')} · {startDate} 至 {endDate}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {VIEW_TYPES.map(v => (
              <button
                key={v}
                onClick={() => setViewType(v)}
                style={{
                  padding: '5px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12,
                  background: viewType === v ? '#1E3A5F' : '#F1F5F9',
                  color: viewType === v ? '#fff' : '#64748B',
                  fontWeight: viewType === v ? 600 : 400,
                }}
              >{v}</button>
            ))}
            <button
              style={{
                padding: '5px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12,
                background: '#F1F5F9', color: '#64748B',
              }}
            >📥 下载</button>
          </div>
        </div>

        {/* 图例 */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {events.map((ev, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 3, borderRadius: 2, background: COLORS[idx * 2] }} />
                <span style={{ fontSize: 12, color: '#64748B' }}>{ev.event}（{ev.dim}）</span>
              </div>
            ))}
          </div>
        </div>

        {/* 图表主体 */}
        <div style={{ padding: '16px 20px 20px' }}>
          <ResponsiveContainer width="100%" height={280}>
            {viewType === '折线图' ? (
              <LineChart data={TREND_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<TooltipCustom />} />
                {events.map((ev, idx) => (
                  <Line
                    key={idx}
                    type="monotone"
                    dataKey={`event${String.fromCharCode(65 + idx)}`}
                    name={ev.event}
                    stroke={COLORS[idx * 2]}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: COLORS[idx * 2] }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            ) : viewType === '柱状图' ? (
              <BarChart data={TREND_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<TooltipCustom />} />
                {events.map((ev, idx) => (
                  <Bar
                    key={idx}
                    dataKey={`event${String.fromCharCode(65 + idx)}`}
                    name={ev.event}
                    fill={COLORS[idx * 2]}
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                  />
                ))}
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={TREND_DATA.map((d, i) => ({ name: d.date, value: d[`event${events.length > 1 ? 'A' : 'A'}`] }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {TREND_DATA.map((_, i) => <Cell key={i} fill={COLORS[i * 2]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== ③ 底部表格区 ====== */}
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>📋 行为步骤详情</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>各行为步骤触发用户数、覆盖率、人均时长完整统计</div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 36, textAlign: 'center' }}>#</th>
                <th>行为步骤</th>
                <th>触发用户数</th>
                <th>覆盖率</th>
                <th>人均时长</th>
                <th>分布</th>
              </tr>
            </thead>
            <tbody>
              {BEHAVIOR_TABLE.map(b => (
                <tr key={b.id}>
                  <td style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12 }}>{b.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: '#1E3A5F' }}>{b.action}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1E3A5F', fontWeight: 600 }}>{b.users.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}>{b.pct}%</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#374151' }}>{b.avgTime}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, background: '#E2E8F0', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                        <div style={{ width: `${b.pct}%`, height: '100%', background: b.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                      </div>
                      <span style={{ fontSize: 12, color: '#94A3B8', width: 28, textAlign: 'right', flexShrink: 0 }}>{b.pct}%</span>
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
