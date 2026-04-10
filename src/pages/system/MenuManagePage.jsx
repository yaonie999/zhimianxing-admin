import React from 'react'
import '../../styles/admin.css'

const MENUS = [
  { id: 1, name: '用户中心', icon: '👤', sort: 1, type: '目录', path: '/users', status: '启用' },
  { id: 2, name: '个人中心', icon: '👤', sort: 1, type: '菜单', path: '/profile', parent: '用户中心', status: '启用' },
  { id: 3, name: '会员列表', icon: '👥', sort: 2, type: '菜单', path: '/members', parent: '用户中心', status: '启用' },
  { id: 4, name: '业务管理', icon: '📱', sort: 2, type: '目录', path: '/business', status: '启用' },
  { id: 5, name: '小程序管理', icon: '📱', sort: 1, type: '菜单', path: '/miniprogram', parent: '业务管理', status: '启用' },
  { id: 6, name: '商品管理', icon: '🛍', sort: 2, type: '菜单', path: '/products', parent: '业务管理', status: '启用' },
  { id: 7, name: '系统配置', icon: '⚙️', sort: 3, type: '目录', path: '/system', status: '启用' },
  { id: 8, name: '系统管理', icon: '🔐', sort: 1, type: '菜单', path: '/system/main', parent: '系统配置', status: '启用' },
]

export default function MenuManagePage() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>👥 菜单管理</h3>
          <p className="card-subtitle">配置系统左侧菜单结构、图标和路由</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 新增菜单</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>菜单名称</th>
                <th>图标</th>
                <th>路由</th>
                <th>类型</th>
                <th>上级</th>
                <th>排序</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {MENUS.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.icon} {m.name}</td>
                  <td style={{ fontSize: 18 }}>{m.icon}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#9CA3AF' }}>{m.path}</td>
                  <td><span className={`badge ${m.type === '目录' ? 'badge-warning' : 'badge-primary'}`}>{m.type}</span></td>
                  <td style={{ color: '#CBD5E1', fontSize: 13 }}>{m.parent || '—'}</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{m.sort}</td>
                  <td><span className={`badge ${m.status === '启用' ? 'badge-success' : 'badge-default'}`}>{m.status}</span></td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: 4 }}>编辑</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}>删除</button>
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
