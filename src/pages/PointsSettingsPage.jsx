import React, { useState } from 'react'
import '../styles/admin.css'

export default function PointsSettingsPage() {
  const [settings, setSettings] = useState({
    // 积分有效期
    expiryEnabled: true,
    expiryType: 'year', // 'fixed' | 'year'
    expiryMonths: 12,
    expiryDate: '2027-12-31',
    // 积分抵扣
    deductionEnabled: true,
    deductionRules: [
      { points: 100, money: 1 },
    ],
    // 积分获取
    pointsPerMoney: 1,   // 每多少元获取1积分
    maxPointsPerDay: 500, // 每天最多获取多少积分
  })

  const [saved, setSaved] = useState(false)

  function set(key, val) {
    setSettings(prev => ({ ...prev, [key]: val }))
    setSaved(false)
  }

  function setRule(idx, key, val) {
    setSettings(prev => {
      const rules = [...prev.deductionRules]
      rules[idx] = { ...rules[idx], [key]: val }
      return { ...prev, deductionRules: rules }
    })
    setSaved(false)
  }

  function addRule() {
    setSettings(prev => ({
      ...prev,
      deductionRules: [...prev.deductionRules, { points: 100, money: 1 }]
    }))
  }

  function deleteRule(idx) {
    setSettings(prev => ({
      ...prev,
      deductionRules: prev.deductionRules.filter((_, i) => i !== idx)
    }))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    if (!confirm('确定重置所有设置为默认值？')) return
    setSettings({
      expiryEnabled: true,
      expiryType: 'year',
      expiryMonths: 12,
      expiryDate: '2027-12-31',
      deductionEnabled: true,
      deductionRules: [{ points: 100, money: 1 }],
      pointsPerMoney: 1,
      maxPointsPerDay: 500,
    })
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>积分设置</h3>
          <p className="card-subtitle">配置积分有效期、抵扣规则、获取规则</p>
        </div>
        <div className="card-body">

          {/* 积分有效期 */}
          <div className="settings-section">
            <div className="settings-header">⏰ 积分有效期设置</div>
            <div className="settings-body">
              <div className="switch-row">
                <div>
                  <div className="switch-label">积分到期失效</div>
                  <div className="switch-desc">开启后，积分将在到期后自动失效</div>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={settings.expiryEnabled} onChange={e => set('expiryEnabled', e.target.checked)} />
                  <span className="switch-slider" />
                </label>
              </div>

              {settings.expiryEnabled && (
                <div style={{ padding: '12px 0' }}>
                  <div className="form-row" style={{ marginBottom: 12 }}>
                    <div className="form-item">
                      <label className="form-label">有效期计算方式</label>
                      <select
                        className="form-select"
                        value={settings.expiryType || 'year'}
                        onChange={e => set('expiryType', e.target.value)}
                      >
                        <option value="year">按年计算（获取后N个月到期）</option>
                        <option value="fixed">固定日期（每年固定日期到期）</option>
                      </select>
                    </div>
                  </div>

                  {settings.expiryType === 'year' ? (
                    <div className="form-item" style={{ maxWidth: 280 }}>
                      <label className="form-label">积分有效期（月）</label>
                      <select
                        className="form-select"
                        value={settings.expiryMonths || 12}
                        onChange={e => set('expiryMonths', parseInt(e.target.value))}
                      >
                        {[6, 12, 18, 24, 36].map(m => (
                          <option key={m} value={m}>{m} 个月</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="form-item" style={{ maxWidth: 280 }}>
                      <label className="form-label">每年到期日</label>
                      <input
                        className="form-input"
                        type="date"
                        value={settings.expiryDate || ''}
                        onChange={e => set('expiryDate', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="info-hint" style={{ marginTop: 12 }}>
                    ℹ 示例：选择12个月，则2024年6月1日获取的积分，将于2025年6月1日0点失效
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 积分抵扣 */}
          <div className="settings-section">
            <div className="settings-header">🛒 积分抵扣设置</div>
            <div className="settings-body">
              <div className="switch-row">
                <div>
                  <div className="switch-label">积分抵扣启用</div>
                  <div className="switch-desc">开启后，用户下单时可使用积分抵扣部分金额</div>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={settings.deductionEnabled} onChange={e => set('deductionEnabled', e.target.checked)} />
                  <span className="switch-slider" />
                </label>
              </div>

              {settings.deductionEnabled && (
                <div style={{ padding: '12px 0' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>抵扣规则</p>

                  <div className="rules-list">
                    {settings.deductionRules.map((rule, idx) => (
                      <div key={idx} className="rule-item">
                        <span className="rule-text">
                          <span style={{ color: '#1E3A5F', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{rule.points}</span>
                          {' '}积分
                        </span>
                        <span style={{ color: '#64748B' }}>可抵扣</span>
                        <input
                          className="points-rule-input"
                          type="number"
                          value={rule.money}
                          onChange={e => setRule(idx, 'money', parseFloat(e.target.value))}
                          style={{ width: 80 }}
                          min={0.01}
                          step={0.01}
                        />
                        <span className="rule-text">元</span>
                        <input
                          className="points-rule-input"
                          type="number"
                          value={rule.points}
                          onChange={e => setRule(idx, 'points', parseInt(e.target.value))}
                          style={{ width: 100 }}
                          min={1}
                        />
                        <span className="rule-text">积分</span>
                        <button className="rule-delete" onClick={() => deleteRule(idx)}>✕</button>
                      </div>
                    ))}
                  </div>

                  <button className="add-rule-btn" onClick={addRule}>
                    + 添加抵扣规则
                  </button>

                  <div className="info-hint" style={{ marginTop: 12 }}>
                    ℹ 示例：设置 100积分抵扣1元，则下单100元时最多可用10000积分抵扣100元
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 积分获取 */}
          <div className="settings-section">
            <div className="settings-header">🎁 积分获取设置</div>
            <div className="settings-body">
              <div className="form-row" style={{ marginBottom: 16 }}>
                <div className="form-item">
                  <label className="form-label">每消费多少元获取 1 积分</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#64748B' }}>每消费</span>
                    <input
                      className="form-input"
                      type="number"
                      value={settings.pointsPerMoney || 1}
                      onChange={e => set('pointsPerMoney', parseFloat(e.target.value))}
                      style={{ width: 100, textAlign: 'center' }}
                      min={0.1}
                      step={0.1}
                    />
                    <span style={{ color: '#64748B' }}>元获取 1 积分</span>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label">每天最多获取积分上限</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      className="form-input"
                      type="number"
                      value={settings.maxPointsPerDay || 500}
                      onChange={e => set('maxPointsPerDay', parseInt(e.target.value))}
                      style={{ width: 120, textAlign: 'center' }}
                      min={0}
                    />
                    <span style={{ color: '#64748B' }}>积分/天</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>设置0表示不设上限</p>
                </div>
              </div>

              <div className="info-hint">
                ℹ 示例：设置每消费10元获取1积分，每天上限500积分，则消费5000元可获得500积分（达到每日上限）
              </div>
            </div>
          </div>

          <div className="flex gap-12 justify-end" style={{ marginTop: 24 }}>
            <button className="btn-reset" onClick={handleReset}>重置</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {saved ? '✓ 已保存' : '保存设置'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
