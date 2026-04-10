import React, { useState } from 'react'

export default function PasswordInput({ value, onChange, placeholder, error, showStrength }) {
  const [visible, setVisible] = useState(false)

  function getStrength(pwd) {
    if (!pwd) return null
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd)) score++
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score++
    if (score <= 1) return 'weak'
    if (score <= 2) return 'medium'
    return 'strong'
  }

  function getHint(pwd) {
    if (!pwd) return null
    if (pwd.length < 8) return { text: '密码长度至少8位', cls: 'error' }
    const hasLetter = /[A-Za-z]/.test(pwd)
    const hasNum = /[0-9]/.test(pwd)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
    if (!hasLetter || !hasNum) return { text: '需包含字母和数字', cls: 'warn' }
    if (hasSpecial) return { text: '密码强度：强 ✓', cls: 'strong' }
    return { text: '密码强度：中等', cls: 'warn' }
  }

  const strength = showStrength ? getStrength(value) : null
  const hint = showStrength ? getHint(value) : null

  return (
    <div>
      <div className="form-input-wrapper">
        <input
          className={`form-input ${error ? 'error' : ''}`}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete="current-password"
        />
        <span className="form-input-icon" onClick={() => setVisible(v => !v)}>
          {visible ? '👁' : '👁‍🗨'}
        </span>
      </div>
      {showStrength && strength && (
        <>
          <div className="strength-bar">
            <div className={`strength-fill strength-${strength}`} />
          </div>
          {hint && <p className={`strength-hint ${hint.cls}`}>{hint.text}</p>}
        </>
      )}
    </div>
  )
}
