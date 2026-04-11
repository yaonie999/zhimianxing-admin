import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../styles/admin.css'
import FeedbackPage from './FeedbackPage'
import ActivityPage from './ActivityPage'
import ContentManagePage from './ContentManagePage'
import NotificationPage from './NotificationPage'
import ScaleManagePage from './ScaleManagePage'
import ModelManagePage from './ModelManagePage'
import DeviceManagePage from './DeviceManagePage'
import MarketingActivityPage from './MarketingActivityPage'

const TAB_CONFIG = [
  { label: '意见建议', tabKey: '意见建议', path: '/operation/feedback', component: FeedbackPage },
  { label: '活动管理', tabKey: '活动管理', path: '/operation/activity', component: ActivityPage },
  { label: '内容管理', tabKey: '内容管理', path: '/operation/content', component: ContentManagePage },
  { label: '消息通知', tabKey: '消息通知', path: '/operation/notification', component: NotificationPage },
  { label: '营销活动', tabKey: '营销活动', path: '/operation/marketing', component: MarketingActivityPage },
  { label: '量表管理', tabKey: '量表管理', path: '/operation/scale', component: ScaleManagePage },
  { label: '分类模型', tabKey: '分类模型', path: '/operation/model', component: ModelManagePage },
  { label: '设备参数管理', tabKey: '设备参数管理', path: '/operation/device', component: DeviceManagePage },
]

function getTabFromPath(pathname) {
  const exact = TAB_CONFIG.find(t => t.path === pathname)
  if (exact) return exact.tabKey
  const prefix = TAB_CONFIG.find(t => pathname.startsWith(t.path + '/') || pathname === t.path)
  if (prefix) return prefix.tabKey
  return '分类模型'
}

export default function OperationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname))

  // 侧边栏点击路由变化时，同步高亮对应标签
  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname))
  }, [location.pathname])

  function handleTabClick(tab) {
    setActiveTab(tab.tabKey)
    navigate(tab.path)
  }

  const activeConfig = TAB_CONFIG.find(t => t.tabKey === activeTab) || TAB_CONFIG[6]
  const ActiveComponent = activeConfig.component

  return (
    <>
      {/* 顶部标签栏 */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 20px',
        overflowX: 'auto',
        flexWrap: 'nowrap',
      }}>
        {TAB_CONFIG.map(tab => (
          <button
            key={tab.tabKey}
            onClick={() => handleTabClick(tab)}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'transparent',
              fontSize: 13,
              fontWeight: activeTab === tab.tabKey ? 700 : 500,
              color: activeTab === tab.tabKey ? 'var(--blue-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              borderBottom: activeTab === tab.tabKey ? '2.5px solid var(--blue-primary)' : '2.5px solid transparent',
              marginBottom: -1,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容 */}
      <ActiveComponent key={activeTab} />
    </>
  )
}
