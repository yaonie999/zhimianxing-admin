import React, { useState, useEffect } from 'react'
import CenterModal from './CenterModal'

export default function EditLevelDrawer({ level, levels, onClose, onSave }) {
  const isNew = !level.id
  const [form, setForm] = useState({ ...level })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-fill: 新增时，成长值起始值 = 当前最高等级 max + 1
  useEffect(() => {
    if (isNew && levels && levels.length > 0) {
      const maxVal = Math.max(...levels.map(l => l.max >= 999999 ? l.max : l.max))
      const autoStart = maxVal >= 999999 ? maxVal : maxVal + 1
      setForm(prev => ({ ...prev, startValue: autoStart, min: autoStart }))
    }
  }, [isNew])

  function set(k, v) {
    setForm(p => ({ ...p, [k]: v }))
    // 同步 min（保持一致性）
    if (k === 'startValue') {
      setForm(p => ({ ...p, min: v }))
      setError('')
    }
  }

  function validate() {
    const sv = form.startValue
    if (sv === '' || sv === null || sv === undefined) {
      setError('成长值起始值不能为空')
      return false
    }
    const n = Number(sv)
    if (isNaN(n)) {
      setError('成长值起始值必须为数字')
      return false
    }
    if (n < 0) {
      setError('成长值起始值不能为负数')
      return false
    }
    // 检查重复（排除自己）
    const duplicate = levels.find(l => l.id !== level.id && l.min === n)
    if (duplicate) {
      setError(`与「${duplicate.name}」的起始值重复`)
      return false
    }
    // 起始值应小于等于 max
    if (n > (form.max || 0) && form.max < 999999) {
      setError('成长值起始值不能大于成长值上限')
      return false
    }
    setError('')
    return true
  }

  async function handleSave() {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onSave({ ...form, min: form.startValue })
    setLoading(false)
  }

  const discounts = ['100', '98', '95', '90', '88', '85', '80', '75', '70', '60', '50']

  return (
    <CenterModal
      open={true}
      onClose={onClose}
      title={`${isNew ? '新增' : '编辑'}等级：${level.name || '新等级'}`}
      width={560}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 80 }}>取消</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 100 }}>{loading ? '保存中...' : '确定保存'}</button>
      </>}
    >
      {/* ===== 等级信息 ===== */}
      <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', marginBottom: 12 }}>等级信息</div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">
          等级名称 <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          className="form-input"
          value={form.name || ''}
          onChange={e => set('name', e.target.value)}
          placeholder="如：黄金会员"
        />
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">
          成长值起始值 <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          className="form-input"
          type="number"
          value={form.startValue ?? (form.min ?? 0)}
          onChange={e => set('startValue', parseInt(e.target.value))}
          placeholder="请输入成长值起始值"
          style={error && form.startValue === '' ? { borderColor: '#EF4444' } : {}}
        />
        {error && (
          <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{error}</div>
        )}
        {!isNew && (
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
            ℹ️ 修改后，低于此值的现有会员不会降级；达到新值的会员满足条件后将按规则升级
          </div>
        )}
      </div>

      {/* ===== 成长值范围 ===== */}
      <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', marginBottom: 12, marginTop: 8 }}>成长值范围</div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">起始值</label>
          <input
            className="form-input"
            type="number"
            value={form.startValue ?? (form.min ?? 0)}
            disabled
            style={{ cursor: 'not-allowed' }}
            title="请使用上方「成长值起始值」字段"
          />
        </div>
        <div className="form-item" style={{ flex: 1 }}>
          <label className="form-label">上限</label>
          <input
            className="form-input"
            type="number"
            value={form.max >= 999999 ? '' : form.max}
            onChange={e => set('max', parseInt(e.target.value) || 999999)}
            placeholder="无上限则留空"
          />
        </div>
      </div>

      <div className="form-item" style={{ marginBottom: 16 }}>
        <label className="form-label">等级图标</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['🥉', '🥈', '🥇', '💎', '💠', '🏆', '⭐', '🌟', '👑'].map(icon => (
            <div key={icon} onClick={() => set('icon', icon)}
              style={{
                width: 44, height: 44, borderRadius: 8,
                background: form.icon === icon ? '#EFF6FF' : '#F8FAFC',
                border: form.icon === icon ? '2px solid #3B82F6' : '1.5px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >{icon}</div>
          ))}
        </div>
      </div>

      {/* ===== 选择等级权益 ===== */}
      <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', marginBottom: 12, marginTop: 8 }}>选择等级权益</div>

      <div className="form-item" style={{ marginBottom: 12 }}>
        <label className="form-label">权益类型</label>
        <select
          className="form-select"
          value={form.rightsType || 'discount'}
          onChange={e => set('rightsType', e.target.value)}
        >
          <option value="discount">消费折扣</option>
          <option value="points">积分倍数</option>
        </select>
      </div>

      {form.rightsType !== 'points' && (
        <div className="form-item" style={{ marginBottom: 12 }}>
          <label className="form-label">折扣比例</label>
          <select
            className="form-select"
            value={form.discount || '90'}
            onChange={e => set('discount', e.target.value)}
          >
            {discounts.map(d => (
              <option key={d} value={d}>
                {d === '100' ? '无折扣（100%）' : `${d}折`}
              </option>
            ))}
          </select>
        </div>
      )}

      {form.rightsType === 'points' && (
        <div className="form-item" style={{ marginBottom: 12 }}>
          <label className="form-label">积分倍数</label>
          <select
            className="form-select"
            value={form.pointsMultiple || 2}
            onChange={e => set('pointsMultiple', parseInt(e.target.value))}
          >
            <option value={1}>无倍数</option>
            <option value={2}>双倍积分</option>
            <option value={3}>三倍积分</option>
            <option value={5}>五倍积分</option>
          </select>
        </div>
      )}

      <div className="form-item" style={{ marginBottom: 0 }}>
        <label className="form-label">等级背景色</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {['#CD7F32', '#C0C0C0', '#FFD700', '#E5E4E2', '#9370DB', '#FF69B4', '#06B6D4', '#10B981', '#F43F5E'].map(c => (
            <div key={c} onClick={() => set('color', c)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: c,
                cursor: 'pointer',
                border: form.color === c ? '3px solid #1E3A5F' : '2px solid transparent',
                boxShadow: form.color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </CenterModal>
  )
}
