import React, { useState, useRef, useEffect } from 'react'

const API = '/api'

export default function VerifyCodeInput({ value, onChange, phone, type, length = 4 }) {
  const [countdown, setCountdown] = useState(0)
  const [sent, setSent] = useState(false)
  const refs = useRef([])

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  async function handleSend() {
    if (countdown > 0 || !phone || phone.length !== 11) return
    setSent(true)
    setCountdown(60)
    try {
      await fetch(`${API}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, type })
      })
    } catch { /* ignore */ }
  }

  function handleChange(idx, val) {
    if (!/^\d?$/.test(val)) return
    const newVal = value.split('')
    newVal[idx] = val
    onChange(newVal.join(''))
    if (val && idx < length - 1) {
      refs.current[idx + 1]?.focus()
    }
  }

  function handleKeyDown(idx, e) {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus()
    }
  }

  return (
    <div className="verify-row">
      <div className="verify-inputs">
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            className="verify-char"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            disabled={countdown > 0 && !sent}
          />
        ))}
      </div>
      <button
        type="button"
        className="countdown-btn"
        onClick={handleSend}
        disabled={countdown > 0 || !phone || phone.length !== 11}
      >
        {countdown > 0 ? `${countdown}s` : sent ? '重新获取' : '获取验证码'}
      </button>
    </div>
  )
}
