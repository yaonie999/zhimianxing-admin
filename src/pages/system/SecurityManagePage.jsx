import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 安全管理 ==================== */

function ModuleCard({ title, enabled, onToggle, children, description }) {
  const [enabledState, setEnabledState] = useState(enabled)

  const handleToggle = (val) => {
    setEnabledState(val)
    onToggle(val)
  }

  const cardTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    borderBottom: '1px solid #F1F5F9',
    background: '#EFF6FF',
    borderRadius: '8px 8px 0 0',
  }

  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 8 }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={cardTitleStyle}>
        <div style={labelStyle}>
          <span style={{ fontSize: 16 }}>🔐</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{title}</span>
        </div>
        <span className={`badge ${enabledState ? 'badge-success' : 'badge-default'}`}
          style={{ background: enabledState ? '#D1FAE5' : '#F1F5F9', color: enabledState ? '#059669' : '#94A3B8', fontSize: 12 }}>
          {enabledState ? '已启用' : '已禁用'}
        </span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 13, color: '#64748B', marginBottom: 16, lineHeight: 1.7 }}>
          {description}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: children ? 16 : 0 }}>
          <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>启用{title}：</span>
          {/* Toggle switch */}
          <div
            onClick={() => handleToggle(!enabledState)}
            style={{
              width: 44, height: 24, borderRadius: 12, background: enabledState ? '#10B981' : '#E2E8F0',
              cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: '50%', background: '#fff',
              position: 'absolute', top: 2, left: enabledState ? 22 : 2,
              transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
          <span style={{ fontSize: 13, color: enabledState ? '#10B981' : '#94A3B8' }}>
            {enabledState ? '开启' : '关闭'}
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function SecurityManagePage() {
  const [pwdType, setPwdType] = useState('月')
  const [pwdDays, setPwdDays] = useState('3')
  const [saved, setSaved] = useState(false)

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <ModuleCard
        title="初始密码修改策略"
        enabled={true}
        onToggle={(val) => {}}
        description="启用此策略后，所有新开户的用户在首次登录系统时，将被强制要求修改初始密码。这有助于确保新用户立即设置自己的专属密码，提高账户安全性。"
      />

      <ModuleCard
        title="定期强制修改密码策略"
        enabled={true}
        onToggle={(val) => {}}
        description="启用此策略后，超过设置时间未修改密码的用户在登录系统时将被强制要求修改密码。定期更新密码是防止未授权访问的重要安全措施。"
      >
        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
              <label style={labelStyle}>超期类型</label>
              <select style={inputStyle} value={pwdType} onChange={e => setPwdType(e.target.value)}>
                <option value="天">按天</option>
                <option value="月">按月</option>
                <option value="年">按年</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
              <label style={labelStyle}>{redStar}超期时间</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="number" style={{ ...inputStyle, borderRadius: '6px 0 0 6px' }} value={pwdDays} onChange={e => setPwdDays(e.target.value)} min={1} />
                <span style={{ padding: '8px 12px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderLeft: 'none', borderRadius: '0 6px 6px 0', fontSize: 13, color: '#64748B', flexShrink: 0 }}>
                  {pwdType === '天' ? '天' : pwdType === '月' ? '月' : '年'}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8', flex: 1 }}>
              <span style={{ color: '#F59E0B', marginRight: 4 }}>ℹ</span>
              设置后，超过 {pwdDays} {pwdType} 未修改密码的用户将在登录时被强制要求修改密码
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* 保存按钮 */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 8, paddingBottom: 24 }}>
        <button
          style={{ ...btnBase, background: '#3B82F6', color: '#fff', padding: '10px 32px', height: 40, fontSize: 14 }}
          onClick={handleSave}
        >
          {saved ? '✓ 保存成功' : '保存配置'}
        </button>
      </div>
    </div>
  )
}
