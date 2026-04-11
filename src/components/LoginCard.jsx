import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from './PasswordInput'
import VerifyCodeInput from './VerifyCodeInput'

const API = 'https://zhimianxing-api.onrender.com/api'

export default function LoginCard() {
  const [tab, setTab] = useState('password')
  const navigate = useNavigate()

  return (
    <div className="login-card">
      <div className="login-tabs">
        <button
          className={`login-tab ${tab === 'password' ? 'active' : ''}`}
          onClick={() => setTab('password')}
        >
          账号密码登录
        </button>
        <button
          className={`login-tab ${tab === 'wechat' ? 'active' : ''}`}
          onClick={() => setTab('wechat')}
        >
          微信扫码登录
        </button>
      </div>

      {tab === 'password' && <PasswordLogin onSuccess={() => navigate('/dashboard')} />}
      {tab === 'wechat' && <WechatLogin />}
    </div>
  )
}

/* ============ 账号密码登录 ============ */
function PasswordLogin({ onSuccess }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [needCaptcha, setNeedCaptcha] = useState(false)
  const [captchaCode, setCaptchaCode] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [showForget, setShowForget] = useState(false)
  const [showSetPwd, setShowSetPwd] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(null)
  const [rememberPwd, setRememberPwd] = useState(false)
  const navigate = useNavigate()

  // 页面加载时读取本地保存的账号密码
  useEffect(() => {
    const savedPhone = localStorage.getItem('saved_phone')
    const savedPwd = localStorage.getItem('saved_password')
    if (savedPhone) setPhone(savedPhone)
    if (savedPwd) setPassword(savedPwd)
  }, [])

  const isLocked = lockedUntil && Date.now() < lockedUntil

  async function handleLogin(e) {
    e.preventDefault()
    if (isLocked) return
    setError('')
    setLoading(true)

    // ========== 测试账号 bypass（前端模拟登录，数据不上报后端）==========
    const TEST_ACCOUNTS = [
      { phone: '13800138000', password: 'admin123', name: '刘亦菲', userType: '超级管理员' },
      { phone: '13800138001', password: 'admin123', name: '陈明', userType: '管理员' },
    ]
    const testAccount = TEST_ACCOUNTS.find(a => a.phone === phone && a.password === password)
    if (testAccount) {
      const mockToken = 'mock_token_' + Date.now()
      const mockUser = {
        id: 1,
        phone: testAccount.phone,
        name: testAccount.name,
        nickname: testAccount.name,
        userType: testAccount.userType,
        loginName: testAccount.phone,
        gender: '女',
        userStatus: '正常',
        onJobStatus: '在职',
        email: 'admin@zhimianxing.com',
        jobNumber: 'ZM-8801',
        department: '产品研发部',
        position: '产品经理',
        createTime: '2025-07-14 18:29:20',
        avatar: null,
      }
      localStorage.setItem('admin_token', mockToken)
      localStorage.setItem('admin_user', JSON.stringify(mockUser))
      if (rememberPwd) {
        localStorage.setItem('saved_phone', phone)
        localStorage.setItem('saved_password', password)
      } else {
        localStorage.removeItem('saved_phone')
        localStorage.removeItem('saved_password')
      }
      setLoading(false)
      onSuccess()
      return
    }
    // ========== 正式登录流程 ==========

    try {
      const body = { phone, password }
      if (needCaptcha) body.captcha = captchaCode

      const res = await fetch(`${API}/auth/login-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.error)
        setShake(true)
        setTimeout(() => setShake(false), 500)

        if (data.code === 'NEED_CAPTCHA') {
          setNeedCaptcha(true)
          setLoginAttempts(data.attempts || 0)
        }
        if (data.code === 'ACCOUNT_LOCKED') {
          setLockedUntil(Date.now() + (data.lockMinutes || 30) * 60 * 1000)
          setLoginAttempts(data.attempts || 0)
        }
        if (data.code === 'NEED_SET_PASSWORD') {
          setShowSetPwd(true)
        }
      } else {
        localStorage.setItem('admin_token', data.token)
        localStorage.setItem('admin_user', JSON.stringify(data.user))
        if (rememberPwd) {
          localStorage.setItem('saved_phone', phone)
          localStorage.setItem('saved_password', password)
        } else {
          localStorage.removeItem('saved_phone')
          localStorage.removeItem('saved_password')
        }
        onSuccess()
      }
    } catch {
      setError('网络错误，请稍后重试')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} className={shake ? 'shake' : ''}>
        <div className="form-group">
          <label className="form-label">手机号</label>
          <input
            className="form-input"
            type="tel"
            placeholder="请输入手机号"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            maxLength={11}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">登录密码</label>
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="请输入密码"
            error={error && !needCaptcha && !isLocked}
          />
        </div>

        {needCaptcha && !isLocked && (
          <div className="form-group">
            <label className="form-label">验证码</label>
            <VerifyCodeInput
              value={captchaCode}
              onChange={setCaptchaCode}
              phone={phone}
              type="login"
              length={4}
            />
            {error && <p className="error-msg">• {error}</p>}
          </div>
        )}

        {isLocked && (
          <div className="locked-hint">
            ⏱ 账户已锁定，请在 {Math.ceil((lockedUntil - Date.now()) / 60000)} 分钟后再试
          </div>
        )}

        {!needCaptcha && error && !isLocked && (
          <p className="error-msg" style={{ marginBottom: 16 }}>• {error}</p>
        )}

        <div className="form-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <label className="remember-row" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberPwd}
                onChange={e => setRememberPwd(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span className="remember-label">保存密码</span>
            </label>
          </div>
          <button type="button" className="forgot-link" onClick={() => setShowForget(true)} style={{ marginLeft: 'auto' }}>
            忘记密码？
          </button>
        </div>

        {/* 第三方登录 */}
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>其他登录方式</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 12, transition: 'background 0.2s' }} title="QQ登录" onClick={() => alert('QQ登录需配置QQ互联应用')}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" fill="#12B7F5" opacity="0.15"/>
                <path d="M12 2C6.48 2 2 5.58 2 10.2C2 12.54 3.12 14.64 5.04 15.96C5.04 15.96 4.2 19.14 4.08 19.92C4.08 19.92 5.76 20.52 7.68 20.52C9.48 20.52 10.92 19.98 12 19.26C13.08 19.98 14.52 20.52 16.32 20.52C18.24 20.52 19.92 19.92 19.92 19.92C19.8 19.14 18.96 15.96 18.96 15.96C20.88 14.64 22 12.54 22 10.2C22 5.58 17.52 2 12 2Z" fill="#12B7F5"/>
                <path d="M9.12 8.8C9.12 8.8 8.4 10.44 8.4 11.64C8.4 12.36 8.76 12.84 9.6 12.84C10.44 12.84 11.28 11.64 11.28 11.64C11.28 11.64 10.2 10.56 9.12 8.8Z" fill="white"/>
                <path d="M14.88 8.8C14.88 8.8 14.16 10.44 14.16 11.64C14.16 12.36 14.52 12.84 15.36 12.84C16.2 12.84 17.04 11.64 17.04 11.64C17.04 11.64 15.96 10.56 14.88 8.8Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading || isLocked}>
          {loading ? '登录中...' : '登 录'}
        </button>
      </form>

      {showForget && (
        <ForgetModal
          onClose={() => setShowForget(false)}
          phoneHint={phone}
        />
      )}

      {showSetPwd && (
        <SetPasswordModal
          phone={phone}
          onClose={() => setShowSetPwd(false)}
          onSuccess={() => { setShowSetPwd(false); onSuccess() }}
        />
      )}
    </>
  )
}

/* ============ 微信扫码登录 ============ */
function WechatLogin() {
  const [step, setStep] = useState('qr') // 'qr' | 'bind'

  return (
    <div>
      {step === 'qr' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '20px 0' }}>
            <div style={{ width: 160, height: 160, border: '1px solid #E2E8F0', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#F8FAFC' }}>
              <div style={{ fontSize: 48 }}>𝕆</div>
              <div style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', padding: '0 12px' }}>微信开放平台<br/>扫码区域</div>
            </div>
            <p style={{ fontSize: 13, color: '#475569', textAlign: 'center', lineHeight: 1.6 }}>
              使用微信扫一扫登录
            </p>
            <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center' }}>
              扫码后需绑定账号，验证码<span style={{ color: '#3B82F6', fontWeight: 600 }}>5分钟</span>内有效
            </p>
          </div>
          <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 8 }}>
            ℹ 微信扫码登录需开通微信开放平台（<span style={{ color: '#3B82F6' }}>open.weixin.qq.com</span>），并配置回调域名
          </p>
        </>
      )}

      {step === 'bind' && (
        <BindPhoneStep onCancel={() => setStep('qr')} />
      )}
    </div>
  )
}

function BindPhoneStep({ onCancel }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleBind(e) {
    e.preventDefault()
    if (!phone || phone.length !== 11) { setError('请输入正确的手机号'); return }
    if (!password) { setError('请输入密码'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/auth/bind-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('admin_token', data.token)
        localStorage.setItem('admin_user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.error)
      }
    } catch {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleBind}>
      <div style={{ background: '#FEF3C7', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#92400E', lineHeight: 1.6 }}>
        ℹ 您的账号未绑定微信，请输入账号密码完成绑定
      </div>
      <div className="form-group">
        <label className="form-label">账号（手机号）</label>
        <input
          className="form-input"
          type="tel"
          placeholder="请输入账号"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          maxLength={11}
          required
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="form-label">密码</label>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="请输入密码"
        />
      </div>
      {error && <p className="error-msg" style={{ marginBottom: 12 }}>• {error}</p>}
      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }} disabled={loading}>
        {loading ? '绑定中...' : '绑 定'}
      </button>
      <button type="button" className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={onCancel}>
        返回扫码
      </button>
    </form>
  )
}

/* ============ 忘记密码弹窗 ============ */
function ForgetModal({ onClose, phoneHint }) {
  const [phone, setPhone] = useState(phoneHint || '')
  const [step, setStep] = useState('phone') // 'phone' | 'img' | 'code' | 'pwd'
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [imgCode, setImgCode] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imgCaptchaId, setImgCaptchaId] = useState('')
  const navigate = useNavigate()

  function getImgCaptchaUrl() {
    const id = imgCaptchaId || (Math.random().toString(36).slice(2))
    setImgCaptchaId(id)
    return `${API}/auth/img-captcha?id=${id}&t=${Date.now()}`
  }

  async function handleSendCode() {
    if (!phone || phone.length !== 11) { setError('请输入正确的手机号'); return }
    if (!imgCode || imgCode.length !== 4) { setError('请输入图片验证码'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, type: 'forget', imgCode, imgCaptchaId })
      })
      const data = await res.json()
      if (data.success) { setStep('code') }
      else { setError(data.error); setImgCode('') }
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  async function handleVerifyCode(e) {
    e.preventDefault()
    if (!code || code.length !== 4) { setError('请输入短信验证码'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, type: 'forget' })
      })
      const data = await res.json()
      if (data.success) setStep('pwd')
      else setError(data.error)
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  async function handleResetPwd(e) {
    e.preventDefault()
    if (password.length < 8) { setError('密码至少8位'); return }
    if (password !== confirmPwd) { setError('两次密码不一致'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, password })
      })
      const data = await res.json()
      if (data.success) { alert('密码重置成功，请重新登录'); onClose() }
      else setError(data.error)
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h2 className="modal-title">{step === 'phone' ? '忘记密码' : step === 'code' ? '输入验证码' : '设置新密码'}</h2>
        <p className="modal-subtitle">
          {step === 'phone' && '输入注册手机号，获取验证码重置密码'}
          {step === 'code' && '验证码已发送至您的手机，5分钟内有效'}
          {step === 'pwd' && '请设置8-16位登录密码，需包含字母和数字'}
        </p>

        {step === 'phone' && (
          <form onSubmit={e => { e.preventDefault(); handleSendCode() }}>
            <div className="form-group">
              <input className="form-input" type="tel" placeholder="请填写手机号码"
                value={phone} onChange={e => setPhone(e.target.value)} maxLength={11} autoFocus />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="form-input"
                  type="text"
                  placeholder="请输入图片验证码"
                  value={imgCode}
                  onChange={e => setImgCode(e.target.value)}
                  maxLength={4}
                  style={{ flex: 1 }}
                />
                <img
                  src={getImgCaptchaUrl()}
                  alt="图片验证码"
                  onClick={e => { e.currentTarget.src = getImgCaptchaUrl() }}
                  style={{ height: 40, borderRadius: 6, cursor: 'pointer', border: '1px solid #E2E8F0', flexShrink: 0 }}
                />
              </div>
            </div>
            {error && <p className="error-msg" style={{ marginBottom: 12 }}>• {error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '发送中...' : '获取验证码'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerifyCode}>
            <div className="form-group">
              <VerifyCodeInput value={code} onChange={setCode} phone={phone} type="forget" length={4} />
            </div>
            {error && <p className="error-msg">• {error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '验证中...' : '下一步'}
            </button>
          </form>
        )}

        {step === 'pwd' && (
          <form onSubmit={handleResetPwd}>
            <div className="form-group">
              <label className="form-label">新密码</label>
              <PasswordInput value={password} onChange={setPassword} placeholder="8-16位，字母+数字组合" />
            </div>
            <div className="form-group">
              <label className="form-label">确认密码</label>
              <PasswordInput value={confirmPwd} onChange={setConfirmPwd} placeholder="再次输入密码" />
            </div>
            {error && <p className="error-msg">• {error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '重置中...' : '重置密码'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* ============ 引导设置密码弹窗 ============ */
function SetPasswordModal({ phone, onClose, onSuccess }) {
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSetPwd(e) {
    e.preventDefault()
    if (password.length < 8 || password.length > 16) { setError('密码需8-16位'); return }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) { setError('需同时包含字母和数字'); return }
    if (password !== confirmPwd) { setError('两次密码不一致'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      })
      const data = await res.json()
      if (data.success) { localStorage.setItem('admin_token', data.token); onSuccess() }
      else setError(data.error)
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">设置登录密码</h2>
        <p className="modal-subtitle">
          为保障账户安全，请设置登录密码后方可进入系统
        </p>
        <form onSubmit={handleSetPwd}>
          <div className="form-group">
            <label className="form-label">设置密码</label>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="8-16位字母数字或符号，2种及以上组合"
              showStrength
            />
          </div>
          <div className="form-group">
            <label className="form-label">确认密码</label>
            <PasswordInput value={confirmPwd} onChange={setConfirmPwd} placeholder="再次输入密码" />
          </div>
          {error && <p className="error-msg" style={{ marginBottom: 12 }}>• {error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }} disabled={loading}>
            {loading ? '设置中...' : '保 存'}
          </button>
        </form>
      </div>
    </div>
  )
}
