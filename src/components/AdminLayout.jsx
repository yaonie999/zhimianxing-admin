import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/* ==================== 7 种主题配色 ==================== */
const THEMES = [
  { key: 'sky-blue', label: '天蓝', swatch: '#0EA5E9', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#1E293B', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#0EA5E9', '--gold-light': '#38BDF8', '--gold-glow': 'rgba(14,165,233,0.15)', '--blue-primary': '#0EA5E9', '--blue-hover': '#0284C7', '--blue-glow': 'rgba(14,165,233,0.15)', '--blue-bg': 'rgba(14,165,233,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'deep-blue', label: '深海蓝', swatch: '#3B82F6', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#0F172A', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#3B82F6', '--gold-light': '#60A5FA', '--gold-glow': 'rgba(59,130,246,0.15)', '--blue-primary': '#3B82F6', '--blue-hover': '#2563EB', '--blue-glow': 'rgba(59,130,246,0.15)', '--blue-bg': 'rgba(59,130,246,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'emerald', label: '翡翠绿', swatch: '#10B981', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#064E3B', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#10B981', '--gold-light': '#34D399', '--gold-glow': 'rgba(16,185,129,0.15)', '--blue-primary': '#10B981', '--blue-hover': '#059669', '--blue-glow': 'rgba(16,185,129,0.15)', '--blue-bg': 'rgba(16,185,129,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'violet', label: '暗夜紫', swatch: '#8B5CF6', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#2E1065', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#8B5CF6', '--gold-light': '#A78BFA', '--gold-glow': 'rgba(139,92,246,0.15)', '--blue-primary': '#8B5CF6', '--blue-hover': '#7C3AED', '--blue-glow': 'rgba(139,92,246,0.15)', '--blue-bg': 'rgba(139,92,246,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'amber', label: '琥珀橙', swatch: '#F59E0B', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#78350F', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#F59E0B', '--gold-light': '#FCD34D', '--gold-glow': 'rgba(245,158,11,0.15)', '--blue-primary': '#F59E0B', '--blue-hover': '#D97706', '--blue-glow': 'rgba(245,158,11,0.15)', '--blue-bg': 'rgba(245,158,11,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'rose', label: '玫瑰红', swatch: '#F43F5E', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#4C0515', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#F43F5E', '--gold-light': '#FB7185', '--gold-glow': 'rgba(244,63,94,0.15)', '--blue-primary': '#F43F5E', '--blue-hover': '#E11D48', '--blue-glow': 'rgba(244,63,94,0.15)', '--blue-bg': 'rgba(244,63,94,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'cyan', label: '青瓷色', swatch: '#06B6D4', colors: { '--bg-void': '#F8FAFC', '--bg-night': '#F1F5F9', '--bg-sidebar': '#0C4A6E', '--bg-card': '#FFFFFF', '--bg-elevated': '#F8FAFC', '--bg-hover': '#E2E8F0', '--border-subtle': '#E2E8F0', '--border-default': '#CBD5E1', '--border-bright': '#94A3B8', '--text-primary': '#0F172A', '--text-secondary': '#1E293B', '--text-muted': '#475569', '--text-dim': '#64748B', '--gold': '#06B6D4', '--gold-light': '#22D3EE', '--gold-glow': 'rgba(6,182,212,0.15)', '--blue-primary': '#06B6D4', '--blue-hover': '#0891B2', '--blue-glow': 'rgba(6,182,212,0.15)', '--blue-bg': 'rgba(6,182,212,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
  { key: 'night', label: '极夜黑', swatch: '#6366F1', colors: { '--bg-void': '#111827', '--bg-night': '#1F2937', '--bg-sidebar': '#020617', '--bg-card': '#111827', '--bg-elevated': '#1F2937', '--bg-hover': '#374151', '--border-subtle': '#374151', '--border-default': '#4B5563', '--border-bright': '#6B7280', '--text-primary': '#F9FAFB', '--text-secondary': '#E5E7EB', '--text-muted': '#D1D5DB', '--text-dim': '#9CA3AF', '--gold': '#6366F1', '--gold-light': '#818CF8', '--gold-glow': 'rgba(99,102,241,0.15)', '--blue-primary': '#6366F1', '--blue-hover': '#4F46E5', '--blue-glow': 'rgba(99,102,241,0.15)', '--blue-bg': 'rgba(99,102,241,0.08)', '--green-online': '#10B981', '--green-bg': 'rgba(16,185,129,0.1)', '--red-online': '#EF4444', '--red-bg': 'rgba(239,68,68,0.1)', '--amber': '#F59E0B', '--amber-bg': 'rgba(245,158,11,0.1)', '--purple': '#8B5CF6', '--purple-bg': 'rgba(139,92,246,0.1)' }},
]

function applyTheme(themeKey) {
  const theme = THEMES.find(t => t.key === themeKey) || THEMES[0]
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([k, v]) => root.style.setProperty(k, v))
  localStorage.setItem('admin_theme', themeKey)
}

function ThemeSwitcher({ currentTheme, onSelect }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
      {THEMES.map(theme => {
        const isActive = currentTheme === theme.key
        return (
          <div key={theme.key} onClick={() => onSelect(theme.key)} title={theme.label} style={{
            width: 22, height: 22, borderRadius: '50%', background: theme.swatch,
            cursor: 'pointer', border: isActive ? '2.5px solid #fff' : '2px solid rgba(255,255,255,0.3)',
            boxShadow: isActive ? `0 0 0 2px ${theme.swatch}, 0 0 8px ${theme.swatch}` : 'none',
            transition: 'all 0.2s', flexShrink: 0, transform: isActive ? 'scale(1.15)' : 'scale(1)',
          }}
            onMouseOver={e => { if (!isActive) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.border = '2px solid rgba(255,255,255,0.6)' }}}
            onMouseOut={e => { if (!isActive) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)' }}}
          />
        )
      })}
    </div>
  )
}

const NAV_ITEMS = [
  {
    section: '用户中心',
    items: [
      { icon: '👤', label: '个人中心', path: '/profile' },
      {
        icon: '👥', label: '会员管理', expandable: true, children: [
          { icon: '👤', label: '会员列表', path: '/members' },
          { icon: '🔍', label: '积分查询', path: '/points-query' },
          { icon: '🏆', label: '会员等级', path: '/member-levels' },
          { icon: '⚙️', label: '积分设置', path: '/points-settings' },
        ]
      },
    ]
  },
  {
    section: '业务管理',
    items: [
      {
        icon: '📱', label: '小程序管理', expandable: true, children: [
          { icon: '👨‍⚕️', label: '专家管理', path: '/miniprogram/expert' },
          { icon: '🛍', label: '商城管理', path: '/miniprogram/mall' },
          { icon: '🔥', label: '热点/提问', path: '/miniprogram/hot-topics' },
          { icon: '💬', label: '社区动态', path: '/miniprogram/community' },
        ]
      },
      {
        icon: '🛍', label: '商品管理', expandable: true, children: [
          { icon: '📋', label: '商品列表', path: '/products/list' },
          { icon: '🏷', label: '商品分类', path: '/products/category' },
        ]
      },
      {
        icon: '📦', label: '订单管理', expandable: true, children: [
          { icon: '🧾', label: '订单列表', path: '/orders/list' },
          { icon: '✔', label: '核销记录', path: '/orders/verify' },
        ]
      },
      {
        icon: '📊', label: '数据分析', expandable: true, children: [
          { icon: '💹', label: '订单数据分析', path: '/analytics/orders' },
          { icon: '👥', label: '用户数据分析', path: '/analytics/users' },
          { icon: '📋', label: '用户行为分析', path: '/analytics/behavior' },
        ]
      },
      {
        icon: '💬', label: '运营管理', expandable: true, children: [
          { icon: '💡', label: '意见建议', path: '/operation/feedback' },
          { icon: '🎯', label: '活动管理', path: '/operation/activity' },
          { icon: '📝', label: '内容管理', path: '/operation/content' },
          { icon: '🔔', label: '消息通知', path: '/operation/notification' },
          { icon: '🎁', label: '营销活动', path: '/operation/marketing' },
          { icon: '📊', label: '量表管理', path: '/operation/scale' },
          { icon: '🧠', label: '分类模型', path: '/operation/model' },
          { icon: '📱', label: '设备参数管理', path: '/operation/device' },
        ]
      },
    ]
  },
  {
    section: '系统配置',
    items: [
      {
        icon: '🔐', label: '系统管理', expandable: true, children: [
          { icon: '👤', label: '用户列表', path: '/system/users' },
          { icon: '👥', label: '菜单管理', path: '/system/menus' },
          { icon: '🎭', label: '角色管理', path: '/system/roles' },
          { icon: '⚙️', label: '系统配置', path: '/system/config' },
          { icon: '🔒', label: '安全管理', path: '/system/security' },
          { icon: '📖', label: '字典管理', path: '/system/dict' },
        ]
      },
      {
        icon: '📝', label: '日志管理', expandable: true, children: [
          { icon: '🔑', label: '登录日志', path: '/logs/login' },
          { icon: '📋', label: '操作日志', path: '/logs/operation' },
        ]
      },
      {
        icon: '🏢', label: '租户管理', expandable: true, children: [
          { icon: '🏢', label: '租户列表', path: '/tenants/list' },
          { icon: '📦', label: '租户套餐', path: '/tenants/packages' },
        ]
      },
    ]
  }
]

function flattenItems(items) {
  return items.flatMap(i => i.children ? [i, ...flattenItems(i.children)] : [i])
}

function getAllItems(nav) {
  return nav.flatMap(s => flattenItems(s.items))
}

function getLabel(path) {
  return getAllItems(NAV_ITEMS).find(i => i.path === path)?.label || ''
}

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expanded, setExpanded] = useState({})
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('admin_theme') || 'deep-blue')

  useEffect(() => { applyTheme(currentTheme) }, [currentTheme])

  const user = JSON.parse(localStorage.getItem('admin_user') || '{}')
  const userName = user.phone || '138****8000'
  const displayName = 'momo zxy'
  const userInitial = 'm'

  function handleLogout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/')
  }

  function toggleExpand(label) {
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }))
  }

  function isActive(path) {
    return location.pathname === path
  }

  function isParentActive(item) {
    if (!item.children) return false
    return item.children.some(c => c.path === location.pathname || (c.children && c.children.some(gc => gc.path === location.pathname)))
  }

  function renderItem(item, depth = 0) {
    if (item.children) {
      const isActiveParent = isParentActive(item)
      const isExpanded = expanded[item.label]
      const isNested = depth > 0

      return (
        <div key={item.label}>
          <div
            className={`nav-item ${isActiveParent || isExpanded ? 'active' : ''} ${isNested ? 'nav-child-parent' : ''}`}
            style={isNested ? { paddingLeft: `${16 + depth * 16}px` } : {}}
            onClick={() => toggleExpand(item.label)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span className={`nav-arrow ${isExpanded ? 'open' : ''}`}>›</span>
          </div>
          {isExpanded && (
            <div className="nav-children">
              {item.children.map(child => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    const isNested = depth > 0
    return (
      <div
        key={item.path}
        className={`nav-item ${isNested ? 'nav-child' : ''} ${isActive(item.path) ? 'active' : ''}`}
        style={isNested ? { paddingLeft: `${16 + depth * 16}px` } : {}}
        onClick={() => navigate(item.path)}
      >
        <span className="nav-item-icon">{item.icon}</span>
        <span>{item.label}</span>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">🌙</div>
          <div>
            <div className="sidebar-title">智眠星</div>
            <div className="sidebar-subtitle">管理后台</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(section => (
            <div className="nav-section" key={section.section}>
              {section.items.map(item => {
                const isParentActive = item.children ? item.children.some(c => location.pathname.startsWith(c.path.split('/').slice(0, -1).join('/') + '/') || c.path === location.pathname) : false
                const hasChildren = !!(item.children && item.children.length > 0)
                return (
                  <div
                    key={item.path || item.label}
                    className={`nav-item ${isParentActive ? 'active' : ''}`}
                    onClick={() => {
                      if (hasChildren) {
                        navigate(item.children[0].path)
                      } else if (item.path) {
                        navigate(item.path)
                      }
                    }}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    <span>{item.label}</span>
                    {hasChildren && <span className="nav-arrow">›</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="topbar-title">{getLabel(location.pathname)}</div>
          <div className="topbar-breadcrumb">首页 / {getLabel(location.pathname)}</div>
          <div className="topbar-actions">
            <ThemeSwitcher currentTheme={currentTheme} onSelect={setCurrentTheme} />
            <span className="topbar-time">{new Date().toLocaleString('zh-CN')}</span>
            {/* 右上角用户菜单 */}
            <div className="user-menu-wrapper">
              <div
                className="user-menu-trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-avatar">{userInitial}</div>
                <span className="user-name">{displayName}</span>
                <span className="user-dropdown-icon" style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </div>

              {userMenuOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                    onClick={() => setUserMenuOpen(false)} />
                  <div className="user-dropdown">
                    <button className="user-dropdown-item" onClick={() => { setUserMenuOpen(false); navigate('/profile') }}>
                      👤 个人中心
                    </button>
                    <button className="user-dropdown-item" onClick={() => { setUserMenuOpen(false); navigate('/profile') }}>
                      🔑 修改密码
                    </button>
                    <div className="user-dropdown-divider" />
                    <button className="user-dropdown-item danger" onClick={() => { setUserMenuOpen(false); handleLogout() }}>
                      🚪 退出登录
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  )
}
