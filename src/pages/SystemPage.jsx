import React, { useState } from 'react'
import '../styles/admin.css'
import SystemUsersPage from './system/SystemUsersPage'
import RoleManagePage from './system/RoleManagePage'
import MenuManagePage from './system/MenuManagePage'

/* ==================== 主页面 ==================== */
export default function SystemPage() {
  const [tab, setTab] = useState('用户列表')

  const TABS = ['用户列表', '角色管理', '菜单管理']

  return (
    <div className="page-container" style={{ padding: '24px' }}>
      <div className="card">
        <div style={{
          padding: '0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 0,
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '14px 24px',
                border: 'none',
                background: 'transparent',
                fontSize: 14,
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
                cursor: 'pointer',
                borderBottom: tab === t ? '2.5px solid var(--gold)' : '2.5px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                letterSpacing: '0.3px',
              }}
              onMouseOver={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseOut={e => { if (tab !== t) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ padding: 0 }}>
          {tab === '用户列表' && <SystemUsersPage />}
          {tab === '角色管理' && <RoleManagePage />}
          {tab === '菜单管理' && <MenuManagePage />}
        </div>
      </div>
    </div>
  )
}
