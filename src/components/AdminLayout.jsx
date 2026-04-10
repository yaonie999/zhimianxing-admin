import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    section: '用户中心',
    items: [
      { icon: '👤', label: '个人中心', path: '/profile' },
      { icon: '👥', label: '会员管理', path: '/members' },
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
              <div className="nav-section-label">{section.section}</div>
              {section.items.map(item => renderItem(item, 0))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="topbar-title">{getLabel(location.pathname)}</div>
          <div className="topbar-breadcrumb">首页 / {getLabel(location.pathname)}</div>
          <div className="topbar-actions">
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
