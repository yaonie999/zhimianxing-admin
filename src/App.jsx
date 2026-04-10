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
import ExpertManagePage from './pages/miniprogram/ExpertManagePage'
import MallManagePage from './pages/miniprogram/MallManagePage'
import HotTopicsPage from './pages/miniprogram/HotTopicsPage'
import CommunityManagePage from './pages/miniprogram/CommunityManagePage'
import ProductListPage from './pages/product/ProductListPage'
import ProductCategoryPage from './pages/product/ProductCategoryPage'
import OrderListPage from './pages/order/OrderListPage'
import VerifyRecordPage from './pages/order/VerifyRecordPage'
import OrderAnalyticsPage from './pages/analytics/OrderAnalyticsPage'
import UserAnalyticsPage from './pages/analytics/UserAnalyticsPage'
import BehaviorAnalyticsPage from './pages/analytics/BehaviorAnalyticsPage'
import SystemUsersPage from './pages/system/SystemUsersPage'
import MenuManagePage from './pages/system/MenuManagePage'
import RoleManagePage from './pages/system/RoleManagePage'
import SystemConfigPage from './pages/system/SystemConfigPage'
import SecurityManagePage from './pages/system/SecurityManagePage'
import DictManagePage from './pages/system/DictManagePage'
import LoginLogPage from './pages/logs/LoginLogPage'
import OperationLogPage from './pages/logs/OperationLogPage'
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
import TenantListPage from './pages/tenant/TenantListPage'
import TenantPackagePage from './pages/tenant/TenantPackagePage'
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
        <Route path="/miniprogram/expert" element={<ProtectedRoute><AdminLayout><ExpertManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/miniprogram/mall" element={<ProtectedRoute><AdminLayout><MallManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/miniprogram/hot-topics" element={<ProtectedRoute><AdminLayout><HotTopicsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/miniprogram/community" element={<ProtectedRoute><AdminLayout><CommunityManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/products/list" element={<ProtectedRoute><AdminLayout><ProductListPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/products/category" element={<ProtectedRoute><AdminLayout><ProductCategoryPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/orders/list" element={<ProtectedRoute><AdminLayout><OrderListPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/orders/verify" element={<ProtectedRoute><AdminLayout><VerifyRecordPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/analytics/orders" element={<ProtectedRoute><AdminLayout><OrderAnalyticsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/analytics/users" element={<ProtectedRoute><AdminLayout><UserAnalyticsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/analytics/behavior" element={<ProtectedRoute><AdminLayout><BehaviorAnalyticsPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/feedback" element={<ProtectedRoute><AdminLayout><FeedbackPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/activity" element={<ProtectedRoute><AdminLayout><ActivityPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/content" element={<ProtectedRoute><AdminLayout><ContentManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/notification" element={<ProtectedRoute><AdminLayout><NotificationPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/marketing/coupon" element={<ProtectedRoute><AdminLayout><CouponPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/marketing/gift" element={<ProtectedRoute><AdminLayout><GiftPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/marketing" element={<ProtectedRoute><AdminLayout><MarketingActivityPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/scale" element={<ProtectedRoute><AdminLayout><ScaleManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/model" element={<ProtectedRoute><AdminLayout><ModelManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/operation/device" element={<ProtectedRoute><AdminLayout><DeviceManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/system/users" element={<ProtectedRoute><AdminLayout><SystemUsersPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/system/menus" element={<ProtectedRoute><AdminLayout><MenuManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/system/roles" element={<ProtectedRoute><AdminLayout><RoleManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/system/config" element={<ProtectedRoute><AdminLayout><SystemConfigPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/system/security" element={<ProtectedRoute><AdminLayout><SecurityManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/system/dict" element={<ProtectedRoute><AdminLayout><DictManagePage /></AdminLayout></ProtectedRoute>} />
        <Route path="/logs/login" element={<ProtectedRoute><AdminLayout><LoginLogPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/logs/operation" element={<ProtectedRoute><AdminLayout><OperationLogPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/tenants/list" element={<ProtectedRoute><AdminLayout><TenantListPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/tenants/packages" element={<ProtectedRoute><AdminLayout><TenantPackagePage /></AdminLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
