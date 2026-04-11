import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import MembersPage from './pages/MembersPage'
import MemberLevelsPage from './pages/MemberLevelsPage'
import PointsSettingsPage from './pages/PointsSettingsPage'
import PointsQueryPage from './pages/PointsQueryPage'
import MemberDetailPage from './pages/MemberDetailPage'
import MiniprogramPage from './pages/MiniprogramPage'
import ProductPage from './pages/ProductPage'
import OrderPage from './pages/OrderPage'
import SystemPage from './pages/SystemPage'
import LogsPage from './pages/LogsPage'
import TenantPage from './pages/TenantPage'
import DataAnalyticsPage from './pages/DataAnalyticsPage'
import FeedbackPage from './pages/operation/FeedbackPage'
import ActivityPage from './pages/operation/ActivityPage'
import ContentManagePage from './pages/operation/ContentManagePage'
import NotificationPage from './pages/operation/NotificationPage'
import CouponPage from './pages/operation/CouponPage'
import GiftPage from './pages/operation/GiftPage'
import MarketingActivityPage from './pages/operation/MarketingActivityPage'
import ScaleManagePage from './pages/operation/ScaleManagePage'
import ModelManagePage from './pages/operation/ModelManagePage'
import DeviceManagePage from './pages/operation/DeviceManagePage'
import OperationPage from './pages/operation/OperationPage'
import AdminLayout from './components/AdminLayout'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  if (!token) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminLayout><DashboardPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><AdminLayout><ProfilePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><AdminLayout><MembersPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/members/:id" element={<ProtectedRoute><AdminLayout><MemberDetailPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/member-levels" element={<ProtectedRoute><AdminLayout><MemberLevelsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/points-settings" element={<ProtectedRoute><AdminLayout><PointsSettingsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/points-query" element={<ProtectedRoute><AdminLayout><PointsQueryPage /></AdminLayout></ProtectedRoute>} />
        {/* 小程序管理 - 合并页面 */}
        <Route path="/miniprogram/*" element={<ProtectedRoute><AdminLayout><MiniprogramPage /></AdminLayout></ProtectedRoute>} />
        {/* 商品管理 - 合并页面 */}
        <Route path="/products/*" element={<ProtectedRoute><AdminLayout><ProductPage /></AdminLayout></ProtectedRoute>} />
        {/* 订单管理 - 合并页面 */}
        <Route path="/orders/*" element={<ProtectedRoute><AdminLayout><OrderPage /></AdminLayout></ProtectedRoute>} />
        {/* 系统管理 - 合并页面 */}
        <Route path="/system/*" element={<ProtectedRoute><AdminLayout><SystemPage /></AdminLayout></ProtectedRoute>} />
        {/* 日志管理 - 合并页面 */}
        <Route path="/logs/*" element={<ProtectedRoute><AdminLayout><LogsPage /></AdminLayout></ProtectedRoute>} />
        {/* 租户管理 - 合并页面 */}
        <Route path="/tenants/*" element={<ProtectedRoute><AdminLayout><TenantPage /></AdminLayout></ProtectedRoute>} />
        {/* 数据分析 - 合并页面 */}
        <Route path="/analytics/*" element={<ProtectedRoute><AdminLayout><DataAnalyticsPage /></AdminLayout></ProtectedRoute>} />
        {/* 运营管理 - 合并页面 */}
        <Route path="/operation" element={<ProtectedRoute><AdminLayout><OperationPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/*" element={<ProtectedRoute><AdminLayout><OperationPage /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
