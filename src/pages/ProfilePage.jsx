import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CenterModal from '../components/CenterModal'
import '../styles/admin.css'

const TABS = [
  { key: 'info', label: '基本资料' },
  { key: 'password', label: '修改密码' },
]

/* 模拟用户数据 */
const MOCK_USER = {
  loginName: 'admin',
  name: '刘亦菲',
  gender: '女',
  userType: '超级管理员',
  userStatus: '正常',
  onJobStatus: '在职',
  phone: '151****2508',
  email: '909303454@qq.com',
  jobNumber: 'ZM-8801',
  department: '产品研发部',
  position: '产品经理',
  createTime: '2025-07-14 18:29:20',
  avatar: null,
}

export default function ProfilePage() {
  const [tab, setTab] = useState('info')
  const navigate = useNavigate()

  return (
    <div className="page-container">
      {/* 顶部Tab切换 */}
      <div className="page-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`page-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'info' && <BasicInfoTab />}
      {tab === 'password' && <PasswordTab navigate={navigate} />}
    </div>
  )
}

/* ============ 基本资料 ============ */
function BasicInfoTab() {
  const [form, setForm] = useState({
    name: MOCK_USER.name,
    gender: MOCK_USER.gender,
    phone: MOCK_USER.phone,
    email: MOCK_USER.email,
    department: MOCK_USER.department,
    position: MOCK_USER.position,
  })
  const [avatar, setAvatar] = useState(MOCK_USER.avatar)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatar(url)
    }
  }

  function handleSave() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }, 800)
  }

  function InfoRow({ label, value }) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: 13,
      }}>
        <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 500, textAlign: 'right' }}>{value}</span>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>👤 基本资料</h3>
        <p className="card-subtitle">完善账号信息，管理您的个人资料</p>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        {/* 左侧：固定只读信息 */}
        <div style={{
          width: 260,
          flexShrink: 0,
          borderRight: '1px solid var(--border-subtle)',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* 头像 */}
          <div style={{
            width: 96, height: 96,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--gold)',
            boxShadow: '0 0 20px var(--gold-glow)',
            marginBottom: 12,
            position: 'relative',
          }}>
            {avatar ? (
              <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, var(--gold), #B8922E)',
                color: '#0D1B2A',
                fontSize: 36, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {form.name.charAt(0)}
              </div>
            )}
            {/* 头像上的摄像头图标 */}
            <label style={{
              position: 'absolute', bottom: 2, right: 2,
              width: 28, height: 28,
              background: 'var(--blue-primary)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              border: '2px solid var(--bg-card)',
              fontSize: 12,
              transition: 'transform 0.2s',
              boxShadow: '0 2px 8px rgba(59,130,246,0.4)',
            }}
              onmouseover={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onmouseout={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              📷
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
            {form.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
            {MOCK_USER.userType}
          </div>

          {/* 只读信息列表 */}
          <div style={{ width: '100%', alignSelf: 'flex-start', marginTop: 8 }}>
            <InfoRow label="登录名称" value={MOCK_USER.loginName} />
            <InfoRow label="用户类型" value={MOCK_USER.userType} />
            <InfoRow label="用户状态" value={<span style={{ color: 'var(--green-online)' }}>● {MOCK_USER.userStatus}</span>} />
            <InfoRow label="在职状态" value={MOCK_USER.onJobStatus} />
            <InfoRow label="工号" value={MOCK_USER.jobNumber} />
            <InfoRow label="创建时间" value={MOCK_USER.createTime} />
          </div>
        </div>

        {/* 右侧：可编辑表单 */}
        <div style={{ flex: 1, padding: '28px 32px' }}>
          <div style={{
            fontSize: 13, fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: 24,
            paddingBottom: 12,
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            编辑基本信息
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {/* 姓名 */}
            <div className="form-item">
              <div className="form-label">姓名</div>
              <input className="form-input" value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="请输入姓名" />
            </div>

            {/* 性别 */}
            <div className="form-item">
              <div className="form-label">性别</div>
              <select className="form-input" value={form.gender}
                onChange={e => set('gender', e.target.value)}>
                <option>男</option>
                <option>女</option>
                <option>未知</option>
              </select>
            </div>

            {/* 手机号 */}
            <div className="form-item">
              <div className="form-label">手机号</div>
              <input className="form-input" value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="请输入手机号" />
            </div>

            {/* 邮箱 */}
            <div className="form-item">
              <div className="form-label">邮箱</div>
              <input className="form-input" type="email" value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="请输入邮箱" />
            </div>

            {/* 部门 */}
            <div className="form-item">
              <div className="form-label">部门</div>
              <input className="form-input" value={form.department}
                onChange={e => set('department', e.target.value)}
                placeholder="请输入部门" />
            </div>

            {/* 岗位 */}
            <div className="form-item">
              <div className="form-label">岗位</div>
              <input className="form-input" value={form.position}
                onChange={e => set('position', e.target.value)}
                placeholder="请输入岗位" />
            </div>
          </div>

          {/* 保存按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading || saved}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                gap: 8,
                minWidth: 120,
                transition: 'all 0.2s',
                background: saved
                  ? 'linear-gradient(135deg, var(--green-online), #059669)'
                  : loading
                    ? 'linear-gradient(135deg, #9CA3AF, #475569)'
                    : 'linear-gradient(135deg, var(--blue-primary), var(--blue-hover))',
                boxShadow: saved
                  ? '0 4px 16px rgba(16,185,129,0.4)'
                  : '0 2px 12px var(--blue-glow)',
              }}
            >
              {loading ? (
                <>⟳ 保存中...</>
              ) : saved ? (
                <>✓ 保存成功</>
              ) : (
                <>💾 保存修改</>
              )}
            </button>

            {saved && (
              <span style={{ fontSize: 13, color: 'var(--green-online)' }}>
                信息已更新
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ 修改密码 ============ */
function PasswordTab({ navigate }) {
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function getStrength(pwd) {
    if (!pwd) return { label: '', color: '', width: 0 }
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score++
    if (score <= 1) return { label: '弱', color: 'var(--red-online)', width: 33 }
    if (score <= 3) return { label: '中', color: 'var(--amber)', width: 66 }
    return { label: '强', color: 'var(--green-online)', width: 100 }
  }

  const strength = getStrength(newPwd)

  function validatePassword(pwd) {
    if (pwd.length < 8 || pwd.length > 16) return false
    let types = 0
    if (/[a-zA-Z]/.test(pwd)) types++
    if (/[0-9]/.test(pwd)) types++
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) types++
    return types >= 2
  }

  function handleSubmit() {
    setError('')
    if (!oldPwd) { setError('请输入原密码'); return }
    if (!validatePassword(newPwd)) {
      setError('新密码需 8-16 位，且包含字母、数字或符号中至少 2 种')
      return
    }
    if (newPwd !== confirmPwd) { setError('两次输入的密码不一致'); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        navigate('/')
      }, 1500)
    }, 1000)
  }

  function EyeBtn({ show, onClick }) {
    return (
      <button type="button" onClick={onClick}
        style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: show ? 'var(--gold)' : 'var(--text-muted)',
          fontSize: 15, transition: 'color 0.2s',
          padding: '4px',
        }}>
        {show ? '👁' : '👁‍🗨'}
      </button>
    )
  }

  function PwdField({ label, value, onChange, show, setShow, placeholder }) {
    return (
      <div className="form-item" style={{ marginBottom: 20 }}>
        <div className="form-label">{label}</div>
        <div style={{ position: 'relative' }}>
          <input
            className="form-input"
            type={show ? 'text' : 'password'}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ paddingRight: 44 }}
            autoComplete={label === '原密码' ? 'current-password' : 'new-password'}
          />
          <EyeBtn show={show} onClick={() => setShow(!show)} />
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>🔑 修改密码</h3>
        <p className="card-subtitle">定期更换密码，保护账户安全</p>
      </div>

      <div className="card-body">
        <div style={{ maxWidth: 480 }}>
          {/* 密码强度指示 */}
          {newPwd && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>密码强度</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: strength.color }}>{strength.label}</span>
              </div>
              <div style={{ height: 4, background: 'var(--border-default)', borderRadius: 2 }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  width: `${strength.width}%`,
                  background: strength.color,
                  transition: 'all 0.3s ease',
                  boxShadow: `0 0 6px ${strength.color}`,
                }} />
              </div>
            </div>
          )}

          <PwdField label="原密码" value={oldPwd} onChange={setOldPwd} show={showOld} setShow={setShowOld} placeholder="请输入原密码" />
          <PwdField label="新密码" value={newPwd} onChange={setNewPwd} show={showNew} setShow={setShowNew} placeholder="8-16位，含字母+数字或符号" />
          <PwdField label="确认密码" value={confirmPwd} onChange={setConfirmPwd} show={showConfirm} setShow={setShowConfirm} placeholder="再次输入新密码" />

          {error && (
            <div style={{
              padding: '10px 14px',
              background: 'var(--red-bg)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 8,
              color: '#FCA5A5',
              fontSize: 13,
              marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '10px 14px',
              background: 'var(--green-bg)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 8,
              color: '#6EE7B7',
              fontSize: 13,
              marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              ✓ 密码修改成功，即将跳转登录页...
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || success}
            style={{
              padding: '10px 28px',
              borderRadius: 8,
              fontSize: 14,
              minWidth: 120,
              background: success
                ? 'linear-gradient(135deg, var(--green-online), #059669))'
                : 'linear-gradient(135deg, var(--blue-primary), var(--blue-hover))',
              boxShadow: success
                ? '0 4px 16px rgba(16,185,129,0.4)'
                : '0 2px 12px var(--blue-glow)',
            }}
          >
            {loading ? '⟳ 保存中...' : success ? '✓ 修改成功' : '💾 保存密码'}
          </button>
        </div>
      </div>
    </div>
  )
}
