import React, { useState } from 'react'
import '../styles/admin.css'
import LoginLogPage from './logs/LoginLogPage'
import OperationLogPage from './logs/OperationLogPage'

/* ==================== 主页面 ==================== */
export default function LogsPage() {
  const [tab, setTab] = useState('登录日志')

  const TABS = ['登录日志', '操作日志']

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
          {tab === '登录日志' && <LoginLogPage />}
          {tab === '操作日志' && <OperationLogPage />}
        </div>
      </div>
    </div>
  )
}
