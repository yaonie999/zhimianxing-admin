import React, { useState } from 'react'
import '../styles/admin.css'

/**************************** 开关组件 ****************************/
function Toggle({ checked, onChange }) {
  return (
    <label style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center',
      cursor: 'pointer', flexShrink: 0,
    }}>
      <div style={{
        width: 40, height: 22,
        background: checked ? 'var(--blue-primary)' : '#CBD5E1',
        borderRadius: 11,
        transition: 'background 0.2s',
        position: 'relative',
      }} />
      <div style={{
        position: 'absolute', left: checked ? 20 : 2,
        top: 2,
        width: 18, height: 18,
        background: '#fff',
        borderRadius: '50%',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ display: 'none' }}
      />
    </label>
  )
}

/**************************** 单选组件 ****************************/
function Radio({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      cursor: 'pointer', fontSize: 14,
      color: checked ? 'var(--text-primary)' : 'var(--text-muted)',
      fontWeight: checked ? 600 : 400,
      transition: 'color 0.15s',
    }}>
      <div style={{
        width: 18, height: 18,
        border: `2px solid ${checked ? 'var(--blue-primary)' : 'var(--border-default)'}`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.15s', flexShrink: 0,
      }}>
        {checked && <div style={{
          width: 10, height: 10,
          background: 'var(--blue-primary)',
          borderRadius: '50%',
        }} />}
      </div>
      <input type="radio" checked={checked} onChange={() => onChange()} style={{ display: 'none' }} />
      {label}
    </label>
  )
}

/**************************** 主页面 ****************************/
export default function PointsSettingsPage() {
  /* 标签 */
  const [activeTab, setActiveTab] = useState('积分设置')

  /* 1. 积分设置总开关 */
  const [pointsEnabled, setPointsEnabled] = useState(true)

  /* 2. 积分有效期 */
  const [expiryType, setExpiryType] = useState('forever')   // 'forever' | 'expire'
  const [expiryDate, setExpiryDate] = useState('')
  const [expiryDateError, setExpiryDateError] = useState('')

  /* 3. 积分抵扣开关 */
  const [deductionEnabled, setDeductionEnabled] = useState(true)

  /* 4. 抵扣规则 */
  const [deductionPoints, setDeductionPoints] = useState('')
  const [deductionPointsError, setDeductionPointsError] = useState('')

  /* 5. 积分获取 */
  const [pointsPerMoney, setPointsPerMoney] = useState('10')
  const [pointsPerMoneyError, setPointsPerMoneyError] = useState('')

  /* 6. 获取上限 */
  const [maxPointsPerDay, setMaxPointsPerDay] = useState('')

  /* 保存状态 */
  const [saved, setSaved] = useState(false)

  /* 校验 */
  function validateDeduction() {
    if (!deductionPoints.trim()) {
      setDeductionPointsError('不可为空')
      return false
    }
    const n = parseInt(deductionPoints)
    if (isNaN(n) || n <= 0) {
      setDeductionPointsError('必须为正整数')
      return false
    }
    setDeductionPointsError('')
    return true
  }

  function validatePointsPerMoney() {
    if (!pointsPerMoney.trim()) {
      setPointsPerMoneyError('不可为空')
      return false
    }
    const n = parseFloat(pointsPerMoney)
    if (isNaN(n) || n <= 0) {
      setPointsPerMoneyError('必须为正数')
      return false
    }
    setPointsPerMoneyError('')
    return true
  }

  function validateExpiryDate() {
    if (expiryType === 'expire') {
      if (!expiryDate) {
        setExpiryDateError('请选择日期')
        return false
      }
      const selected = new Date(expiryDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selected <= today) {
        setExpiryDateError('日期必须晚于今天')
        return false
      }
      setExpiryDateError('')
    }
    return true
  }

  function handleSave() {
    const ok1 = validateDeduction()
    const ok2 = validatePointsPerMoney()
    const ok3 = validateExpiryDate()
    if (!ok1 || !ok2 || !ok3) return
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    setPointsEnabled(true)
    setExpiryType('forever')
    setExpiryDate('')
    setExpiryDateError('')
    setDeductionEnabled(true)
    setDeductionPoints('')
    setDeductionPointsError('')
    setPointsPerMoney('10')
    setPointsPerMoneyError('')
    setMaxPointsPerDay('')
  }

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>

      {/* ==================== 一、顶部标签 ==================== */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: '#fff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 8,
        padding: '4px',
        marginBottom: 20,
      }}>
        <button
          onClick={() => setActiveTab('首页')}
          style={{
            padding: '6px 20px', borderRadius: 6, border: 'none',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
            background: activeTab === '首页' ? '#fff' : 'transparent',
            color: activeTab === '首页' ? 'var(--blue-primary)' : 'var(--text-muted)',
          }}
        >首页</button>
        <button
          onClick={() => setActiveTab('积分设置')}
          style={{
            padding: '6px 20px', borderRadius: 6, border: 'none',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
            background: activeTab === '积分设置' ? '#fff' : 'transparent',
            color: activeTab === '积分设置' ? 'var(--blue-primary)' : 'var(--text-muted)',
          }}
        >积分设置</button>
      </div>

      {/* ==================== 积分设置表单 ==================== */}
      <div style={{
        background: '#fff', borderRadius: 12,
        border: '1px solid var(--border-subtle)',
        padding: '28px 32px',
        maxWidth: 680,
      }}>

        {/* 1. 积分设置 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                积分设置 <span style={{ color: '#EF4444' }}>*</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>控制积分功能总开关</div>
            </div>
            <Toggle checked={pointsEnabled} onChange={setPointsEnabled} />
          </div>
        </div>

        {/* 分隔线 */}
        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 28 }} />

        {/* 2. 积分有效期 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>
            积分有效期 <span style={{ color: '#EF4444' }}>*</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Radio
              label="永久生效"
              checked={expiryType === 'forever'}
              onChange={() => { setExpiryType('forever'); setExpiryDateError('') }}
            />
            <Radio
              label="到期失效"
              checked={expiryType === 'expire'}
              onChange={() => { setExpiryType('expire'); validateExpiryDate() }}
            />
          </div>

          {/* 日期选择器：到期失效时显示 */}
          {expiryType === 'expire' && (
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="date"
                value={expiryDate}
                onChange={e => { setExpiryDate(e.target.value); setExpiryDateError('') }}
                placeholder="请选择日期"
                style={{
                  height: 36, padding: '0 12px',
                  border: `1.5px solid ${expiryDateError ? '#EF4444' : 'var(--border-default)'}`,
                  borderRadius: 6, fontSize: 14,
                  color: 'var(--text-primary)', background: '#fff',
                  outline: 'none', width: 200,
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
                onBlur={e => e.target.style.borderColor = expiryDateError ? '#EF4444' : 'var(--border-default)'}
              />
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>到期积分清零</span>
            </div>
          )}
          {expiryDateError && (
            <div style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>{expiryDateError}</div>
          )}
        </div>

        {/* 分隔线 */}
        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 28 }} />

        {/* 3. 积分抵扣 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                积分抵扣 <span style={{ color: '#EF4444' }}>*</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>控制积分抵扣功能总开关</div>
            </div>
            <Toggle checked={deductionEnabled} onChange={setDeductionEnabled} />
          </div>

          {/* 抵扣规则 */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
              抵扣规则 <span style={{ color: '#EF4444' }}>*</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="number"
                value={deductionPoints}
                onChange={e => { setDeductionPoints(e.target.value); setDeductionPointsError('') }}
                placeholder="填写积分数量"
                style={{
                  height: 36, padding: '0 12px',
                  border: `1.5px solid ${deductionPointsError ? '#EF4444' : 'var(--border-default)'}`,
                  borderRadius: 6, fontSize: 14,
                  color: 'var(--text-primary)', background: '#fff',
                  outline: 'none', width: 160, textAlign: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
                onBlur={e => { e.target.style.borderColor = deductionPointsError ? '#EF4444' : 'var(--border-default)'; validateDeduction() }}
              />
              <span style={{ fontSize: 14, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>积分 抵扣 ¥1.00</span>
            </div>
            {deductionPointsError && (
              <div style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>{deductionPointsError}</div>
            )}
          </div>
        </div>

        {/* 分隔线 */}
        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 28 }} />

        {/* 4. 积分获取 */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            积分获取 <span style={{ color: '#EF4444' }}>*</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>消费</span>
              <input
                type="number"
                value={pointsPerMoney}
                onChange={e => { setPointsPerMoney(e.target.value); setPointsPerMoneyError('') }}
                placeholder="10"
                style={{
                  height: 36, padding: '0 12px',
                  border: `1.5px solid ${pointsPerMoneyError ? '#EF4444' : 'var(--border-default)'}`,
                  borderRadius: 6, fontSize: 14,
                  color: 'var(--text-primary)', background: '#fff',
                  outline: 'none', width: 80, textAlign: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
                onBlur={e => { e.target.style.borderColor = pointsPerMoneyError ? '#EF4444' : 'var(--border-default)'; validatePointsPerMoney() }}
              />
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>元</span>
            </div>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>获取 1 积分</span>
          </div>
          {pointsPerMoneyError && (
            <div style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>{pointsPerMoneyError}</div>
          )}
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 8 }}>
            说明：消费对应金额，自动获取 1 积分
          </div>
        </div>

        {/* 分隔线 */}
        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 28 }} />

        {/* 5. 获取上限 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            获取上限
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>每天最多获取</span>
            <input
              type="number"
              value={maxPointsPerDay}
              onChange={e => setMaxPointsPerDay(e.target.value)}
              placeholder="请输入积分上限"
              style={{
                height: 36, padding: '0 12px',
                border: '1.5px solid var(--border-default)',
                borderRadius: 6, fontSize: 14,
                color: 'var(--text-primary)', background: '#fff',
                outline: 'none', width: 160,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
            />
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>积分</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 8 }}>
            说明：限制用户每日获取积分的最大值，可留空（不限制）
          </div>
        </div>

        {/* ==================== 底部保存按钮 ==================== */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleSave}
            style={{
              height: 38, padding: '0 32px',
              background: 'var(--blue-primary)',
              color: '#fff', border: 'none', borderRadius: 6,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--blue-hover)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--blue-primary)'}
          >
            {saved ? '✓ 已保存' : '保存设置'}
          </button>
          <button
            onClick={handleReset}
            style={{
              height: 38, padding: '0 24px',
              background: '#fff',
              color: 'var(--text-secondary)',
              border: '1.5px solid var(--border-default)',
              borderRadius: 6, fontSize: 14, fontWeight: 500,
              cursor: 'pointer',
            }}
          >重置</button>
        </div>

      </div>
    </div>
  )
}
