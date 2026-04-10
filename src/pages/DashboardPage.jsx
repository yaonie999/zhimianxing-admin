import React, { useEffect, useState } from 'react'

const API = 'https://zhimianxing-api.onrender.com/api'

const STATS = [
  { label: '会员总数', value: '12,847', trend: '+12.3%', up: true, icon: '👥', color: 'blue' },
  { label: '在线设备', value: '3,291', trend: '+5.7%', up: true, icon: '📱', color: 'green' },
  { label: '今日订单', value: '486', trend: '+8.2%', up: true, icon: '📦', color: 'purple' },
  { label: '今日营收', value: '¥28,540', trend: '-2.1%', up: false, icon: '💰', color: 'orange' },
]

const QUICK_ACTIONS = [
  { icon: '👥', label: '会员管理', desc: '查看/管理会员列表', color: '#EFF6FF', textColor: '#3B82F6', path: '/members' },
  { icon: '📱', label: '设备监控', desc: '查看设备在线状态', color: '#ECFDF5', textColor: '#10B981', path: '/devices' },
  { icon: '📊', label: '数据报表', desc: '查看运营数据', color: '#F5F3FF', textColor: '#8B5CF6', path: '/analytics' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState(STATS)
  const user = JSON.parse(localStorage.getItem('admin_user') || '{}')
  const hour = new Date().getHours()
  const greeting = hour < 12 ? '上午好' : hour < 18 ? '下午好' : '晚上好'

  useEffect(() => {
    fetch(`${API}/dashboard/stats`)
      .then(r => r.json())
      .then(data => {
        if (data.totalUsers) {
          setStats(prev => prev.map((s, i) => {
            if (i === 0) return { ...s, value: data.totalUsers.toLocaleString() }
            if (i === 1) return { ...s, value: data.activeDevices?.toLocaleString() || s.value }
            return s
          }))
        }
      })
      .catch(() => {/* use mock data */})
  }, [])

  return (
    <div>
      <div className="dashboard-welcome">
        <h1>{greeting}，管理员 {user.phone ? `(${user.phone})` : ''} 👋</h1>
        <p>欢迎回来！这里是智眠星后台管理系统的首页，数据统计日期：{new Date().toLocaleDateString('zh-CN')}</p>
      </div>

      {/* 统计卡片 */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-card-header">
              <span className="stat-card-label">{stat.label}</span>
              <div className={`stat-card-icon ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className={`stat-card-trend ${stat.up ? 'trend-up' : 'trend-down'}`}>
              {stat.up ? '↑' : '↓'} {stat.trend} vs 上日
            </div>
          </div>
        ))}
      </div>

      {/* 快捷入口 */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 14 }}>快捷操作</h2>
        <div className="quick-actions">
          {QUICK_ACTIONS.map((qa, i) => (
            <div className="quick-action-card" key={i}>
              <div className="qa-icon" style={{ background: qa.color, color: qa.textColor }}>{qa.icon}</div>
              <div className="qa-text">
                <h3>{qa.label}</h3>
                <p>{qa.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 系统公告 */}
      <div style={{
        background: 'white',
        borderRadius: 12,
        padding: 24,
        border: '1px solid #E2E8F0'
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>📢 系统公告</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { time: '2026-04-10', text: '智眠星后台管理系统 v1.0 正式上线', hot: true },
            { time: '2026-04-08', text: '会员管理模块已完成开发，进入测试阶段', hot: false },
            { time: '2026-04-05', text: '设备管理接口已完成对接，支持实时状态监控', hot: false },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              background: item.hot ? '#FFF7ED' : '#F8FAFC',
              borderRadius: 8,
              border: `1px solid ${item.hot ? '#FED7AA' : '#E2E8F0'}`,
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'white',
                background: item.hot ? '#F97316' : '#CBD5E1',
                padding: '2px 8px',
                borderRadius: 4,
                flexShrink: 0,
              }}>NEW</span>
              <span style={{ fontSize: 13, color: '#475569', flex: 1 }}>{item.text}</span>
              <span style={{ fontSize: 12, color: '#CBD5E1', flexShrink: 0 }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 待办事项 */}
      <div style={{
        marginTop: 20,
        background: 'white',
        borderRadius: 12,
        padding: 24,
        border: '1px solid #E2E8F0'
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>📋 待办事项</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { done: false, text: '完成会员管理模块的CRUD功能' },
            { done: false, text: '对接微信开放平台扫码登录接口' },
            { done: true, text: '搭建后台框架和登录认证体系' },
            { done: true, text: '配置短信验证码服务（容联云）' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: item.done ? '#CBD5E1' : '#334155',
              textDecoration: item.done ? 'line-through' : 'none',
            }}>
              <span style={{ fontSize: 14 }}>{item.done ? '✅' : '⬜'}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
