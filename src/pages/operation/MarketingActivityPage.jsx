import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const totalPages = Math.ceil(total / pageSize) || 1
  const [jump, setJump] = useState('')
  function doJump() { const p = parseInt(jump); if (p >= 1 && p <= totalPages) { onPageChange(p); setJump('') } }
  let s = Math.max(1, page - 2), e = Math.min(totalPages, s + 4)
  if (e - s < 4) s = Math.max(1, e - 4)
  const nums = []; for (let i = s; i <= e; i++) nums.push(i)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: '#64748B' }}>共 <strong style={{ color: '#1E3A5F' }}>{total}</strong> 条记录</span>
        <select className="form-select" style={{ width: 110, fontSize: 13, padding: '4px 8px' }}
          value={`${pageSize} 条/页`} onChange={e => onPageSizeChange(parseInt(e.target.value))}>
          {[10, 20, 50].map(n => <option key={n}>{n} 条/页</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button style={{ minWidth: 34, height: 34, fontSize: 13, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: page === 1 ? '#CBD5E1' : '#374151' }} onClick={() => onPageChange(1)} disabled={page === 1}>«</button>
        <button style={{ minWidth: 34, height: 34, fontSize: 13, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: page === 1 ? '#CBD5E1' : '#374151' }} onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
        {nums.map(n => (
          <button key={n} onClick={() => onPageChange(n)}
            style={{ minWidth: 34, height: 34, borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, background: page === n ? '#1E3A5F' : 'transparent', color: page === n ? '#fff' : '#374151', fontWeight: page === n ? 700 : 400 }}>{n}</button>
        ))}
        <button style={{ minWidth: 34, height: 34, fontSize: 13, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: page >= totalPages ? '#CBD5E1' : '#374151' }} onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>›</button>
        <button style={{ minWidth: 34, height: 34, fontSize: 13, background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: page >= totalPages ? '#CBD5E1' : '#374151' }} onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>»</button>
        <span style={{ fontSize: 13, color: '#64748B', marginLeft: 8 }}>第 <strong style={{ color: '#1E3A5F' }}>{page}</strong> / <strong style={{ color: '#1E3A5F' }}>{totalPages}</strong> 页</span>
        <span style={{ color: '#E2E8F0' }}>|</span>
        <input type="number" min={1} value={jump} onChange={e => setJump(e.target.value)} onKeyDown={e => e.key === 'Enter' && doJump()} placeholder="跳至" style={{ width: 56, height: 34, padding: '0 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#374151', outline: 'none' }} />
        <button onClick={doJump} style={{ height: 34, padding: '0 12px', background: '#1E3A5F', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>跳转</button>
      </div>
    </div>
  )
}

function DeleteModal({ title, onConfirm, onCancel }) {
  return (
    <CenterModal
      open={true}
      onClose={onCancel}
      title="删除确认"
      width={420}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onCancel} style={{ minWidth: 80, height: 36, fontSize: 14, padding: '8px 20px', borderRadius: 8 }}>取消</button>
          <button onClick={onConfirm} style={{ height: 36, padding: '0 20px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>确认删除</button>
        </>
      }
    >
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
        <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
          删除 <strong>{title}</strong>，删除后不能恢复，是否继续？
        </div>
      </div>
    </CenterModal>
  )
}

function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: '12px 16px', background: '#F8FAFC', borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1E3A5F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>1</div>
        <span style={{ fontSize: 13, color: '#1E3A5F', fontWeight: 600 }}>选择活动类型</span>
      </div>
      <div style={{ width: 30, height: 1, background: '#E2E8F0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1E3A5F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>2</div>
        <span style={{ fontSize: 13, color: '#1E3A5F', fontWeight: 600 }}>设置活动</span>
      </div>
    </div>
  )
}

function FieldGroup({ label, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
        {required && <span style={{ color: '#EF4444', marginRight: 3 }}>*</span>}{label}
      </div>
      {children}
    </div>
  )
}

function RadioGroup({ options, value, onChange, inline }) {
  return (
    <div style={{ display: inline ? 'flex' : 'block', gap: inline ? 16 : 0, flexDirection: 'column' }}>
      {options.map(opt => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, color: value === opt.value ? '#1E3A5F' : '#64748B', fontWeight: value === opt.value ? 600 : 400, marginBottom: inline ? 0 : 8 }}>
          <input type="radio" value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} style={{ accentColor: '#1E3A5F' }} />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

function Badge({ s }) {
  const m = { '进行中': { bg: '#D1FAE5', c: '#065F46' }, '已结束': { bg: '#F1F5F9', c: '#64748B' }, '未开始': { bg: '#FEF3C7', c: '#92400E' } }
  const st = m[s] || { bg: '#F1F5F9', c: '#64748B' }
  return <span style={{ background: st.bg, color: st.c, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{s}</span>
}

// ========== 优惠券表单弹窗 ==========
function CouponForm({ editTarget, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: editTarget?.name || '',
    type: editTarget?.type || '满减券',
    thresholdType: editTarget?.thresholdType || '订单满',
    threshold: editTarget?.threshold || '',
    stock: editTarget?.stock || '',
    validType: editTarget?.validType || '设置有效期',
    validFrom: editTarget?.validFrom || '2015-10-02',
    validTo: editTarget?.validTo || '2015-10-10',
    discount: editTarget?.discount || '',
    amount: editTarget?.amount || '',
    note: editTarget?.note || '',
    perLimitType: editTarget?.perLimitType || '固定',
    perLimit: editTarget?.perLimit || '1',
    useTimeType: editTarget?.useTimeType || '领取后',
    useTime: editTarget?.useTime || '',
    useTimeFrom: editTarget?.useTimeFrom || '2015-10-02',
    useTimeTo: editTarget?.useTimeTo || '2015-10-10',
    stackable: editTarget?.stackable || '可叠加其他类型的优惠',
    userType: editTarget?.userType || '部分会员',
    rules: editTarget?.rules || [{ level: 'V1', op: '包含', tag: '' }],
  })
  const [loading, setLoading] = useState(false)
  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }
  function addRule() { setForm(p => ({ ...p, rules: [...p.rules, { level: 'V1', op: '包含', tag: '' }] })) }
  function removeRule(i) { setForm(p => ({ ...p, rules: p.rules.filter((_, idx) => idx !== i) })) }
  function updateRule(i, k, v) { setForm(p => ({ ...p, rules: p.rules.map((r, idx) => idx === i ? { ...r, [k]: v } : r) })) }
  async function handleSave() {
    if (!form.name) { alert('请填写活动名称'); return }
    if (!form.stock) { alert('请填写发放数量'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    onSave({ ...editTarget, ...form })
    setLoading(false)
  }
  const LEVELS = ['V1', 'V2', 'V3', 'V4', 'V5']
  const OPS = ['包含', '不包含']

  return (
    <CenterModal open={true} onClose={onCancel} title={editTarget?.name ? '编辑优惠券' : '创建优惠券'} width={720}
      footer={<><button className="btn btn-ghost" onClick={onCancel} style={{ minWidth: 90, height: 38, fontSize: 14 }}>取消</button><button className="btn-query" onClick={handleSave} disabled={loading} style={{ height: 38, padding: '0 24px', fontSize: 14 }}>{loading ? '保存中...' : '发布'}</button></>}>
      <StepBar />
      <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 16 }}>处理描述有点多有点多 不得不换行。</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F1F5F9' }}>活动基本信息</div>

      <FieldGroup label="活动图片" required>
        <div style={{ width: 80, height: 80, border: '2px dashed #E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94A3B8', fontSize: 24 }}>+</div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>建议尺寸 750×400px</div>
      </FieldGroup>

      <FieldGroup label="活动名称" required>
        <input className="form-input" placeholder="请输入活动名称" value={form.name} onChange={e => set('name', e.target.value)} style={{ width: '100%' }} />
      </FieldGroup>

      <FieldGroup label="活动有效期" required>
        <RadioGroup options={[{ value: '永久有效', label: '永久有效' }, { value: '设置有效期', label: '设置有效期' }]} value={form.validType} onChange={v => set('validType', v)} inline />
        {form.validType === '设置有效期' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <input type="date" className="form-input" value={form.validFrom} onChange={e => set('validFrom', e.target.value)} style={{ width: 160, fontSize: 13 }} />
            <span style={{ color: '#64748B' }}>~</span>
            <input type="date" className="form-input" value={form.validTo} onChange={e => set('validTo', e.target.value)} style={{ width: 160, fontSize: 13 }} />
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="使用门槛" required>
        <RadioGroup options={[{ value: '无门槛', label: '无门槛' }, { value: '订单满', label: '订单满' }]} value={form.thresholdType} onChange={v => set('thresholdType', v)} inline />
        {form.thresholdType === '订单满' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            <input className="form-input" placeholder="请输入" value={form.threshold} onChange={e => set('threshold', e.target.value)} style={{ width: 100, fontSize: 13 }} />
            <span style={{ fontSize: 13, color: '#64748B' }}>元</span>
            <button style={{ height: 34, padding: '0 12px', background: '#10B981', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>可用</button>
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="发放数量" required>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input className="form-input" placeholder="请输入" value={form.stock} onChange={e => set('stock', e.target.value)} style={{ width: 160, fontSize: 13 }} />
          <span style={{ fontSize: 13, color: '#64748B' }}>张</span>
        </div>
      </FieldGroup>

      <FieldGroup label="优惠券类型" required>
        <RadioGroup options={[{ value: '折扣券', label: '折扣券' }, { value: '满减券', label: '满减券' }]} value={form.type} onChange={v => set('type', v)} inline />
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          {form.type === '折扣券' && <><input className="form-input" placeholder="请输入" value={form.discount} onChange={e => set('discount', e.target.value)} style={{ width: 100, fontSize: 13 }} /><span style={{ fontSize: 13, color: '#64748B' }}>折</span></>}
          {form.type === '满减券' && <><input className="form-input" placeholder="请输入" value={form.amount} onChange={e => set('amount', e.target.value)} style={{ width: 100, fontSize: 13 }} /><span style={{ fontSize: 13, color: '#64748B' }}>元</span></>}
        </div>
      </FieldGroup>

      <FieldGroup label="备注">
        <textarea className="form-input" placeholder="请输入备注" rows={3} value={form.note} onChange={e => set('note', e.target.value)} style={{ width: '100%', resize: 'vertical' }} />
      </FieldGroup>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F1F5F9' }}>活动规则</div>

      <FieldGroup label="每人限领" required>
        <RadioGroup options={[{ value: '不限张数', label: '不限张数' }, { value: '固定', label: '固定' }]} value={form.perLimitType} onChange={v => set('perLimitType', v)} inline />
        {form.perLimitType === '固定' && <><input className="form-input" placeholder="请输入" value={form.perLimit} onChange={e => set('perLimit', e.target.value)} style={{ width: 80, fontSize: 13, marginTop: 8 }} /><span style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>张</span></>}
      </FieldGroup>

      <FieldGroup label="使用时间" required>
        <RadioGroup options={[{ value: '指定时间', label: '指定时间' }, { value: '领取后', label: '领取后' }]} value={form.useTimeType} onChange={v => set('useTimeType', v)} inline />
        {form.useTimeType === '领取后' && <><input className="form-input" placeholder="请输入" value={form.useTime} onChange={e => set('useTime', e.target.value)} style={{ width: 80, fontSize: 13, marginTop: 8 }} /><span style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>日内可用</span></>}
        {form.useTimeType === '指定时间' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <input type="date" className="form-input" value={form.useTimeFrom} onChange={e => set('useTimeFrom', e.target.value)} style={{ width: 160, fontSize: 13 }} />
            <span style={{ color: '#64748B' }}>~</span>
            <input type="date" className="form-input" value={form.useTimeTo} onChange={e => set('useTimeTo', e.target.value)} style={{ width: 160, fontSize: 13 }} />
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="优惠叠加" required>
        <RadioGroup options={[{ value: '不可叠加', label: '不可叠加' }, { value: '可叠加其他类型的优惠', label: '可叠加其他类型的优惠' }]} value={form.stackable} onChange={v => set('stackable', v)} inline />
      </FieldGroup>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F1F5F9' }}>条件规则</div>

      <FieldGroup label="适用用户" required>
        <RadioGroup options={[{ value: '全部会员', label: '全部会员' }, { value: '部分会员', label: '部分会员' }]} value={form.userType} onChange={v => set('userType', v)} inline />
      </FieldGroup>

      <FieldGroup label="运算池">
        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>用户标签满足以下规则的人</div>
        {form.rules.map((rule, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            {i > 0 && <span style={{ fontSize: 12, color: '#64748B', width: 20, textAlign: 'center' }}>且</span>}
            <select className="form-select" style={{ width: 100, fontSize: 12 }} value={rule.level} onChange={e => updateRule(i, 'level', e.target.value)}>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            <select className="form-select" style={{ width: 80, fontSize: 12 }} value={rule.op} onChange={e => updateRule(i, 'op', e.target.value)}>
              {OPS.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="form-select" style={{ width: 120, fontSize: 12 }} value={rule.tag} onChange={e => updateRule(i, 'tag', e.target.value)}>
              <option value="">请选择用户标签</option>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            {form.rules.length > 1 && <button onClick={() => removeRule(i)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 16 }}>×</button>}
          </div>
        ))}
        <button onClick={addRule} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', border: '1.5px dashed #CBD5E1', borderRadius: 6, background: 'transparent', color: '#64748B', fontSize: 12, cursor: 'pointer' }}>+ 添加</button>
      </FieldGroup>
    </CenterModal>
  )
}

// ========== 注册有礼表单弹窗 ==========
function GiftForm({ editTarget, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: editTarget?.name || '',
    rewardType: editTarget?.rewardType || '满减券',
    amount: editTarget?.amount || '',
    discount: editTarget?.discount || '',
    stock: editTarget?.stock || '',
    validType: editTarget?.validType || '设置有效期',
    validFrom: editTarget?.validFrom || '2015-10-02',
    validTo: editTarget?.validTo || '2015-10-10',
    note: editTarget?.note || '',
    perLimitType: editTarget?.perLimitType || '固定',
    perLimit: editTarget?.perLimit || '1',
    useTimeType: editTarget?.useTimeType || '领取后',
    useTime: editTarget?.useTime || '',
    useTimeFrom: editTarget?.useTimeFrom || '2015-10-02',
    useTimeTo: editTarget?.useTimeTo || '2015-10-10',
    stackable: editTarget?.stackable || '可叠加其他类型的优惠',
    userType: editTarget?.userType || '全部会员',
    rules: editTarget?.rules || [{ level: 'V1', op: '包含', tag: '' }],
  })
  const [loading, setLoading] = useState(false)
  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }
  function addRule() { setForm(p => ({ ...p, rules: [...p.rules, { level: 'V1', op: '包含', tag: '' }] })) }
  function removeRule(i) { setForm(p => ({ ...p, rules: p.rules.filter((_, idx) => idx !== i) })) }
  function updateRule(i, k, v) { setForm(p => ({ ...p, rules: p.rules.map((r, idx) => idx === i ? { ...r, [k]: v } : r) })) }
  async function handleSave() {
    if (!form.name) { alert('请填写活动名称'); return }
    if (!form.stock) { alert('请填写发放数量'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    onSave({ ...editTarget, ...form })
    setLoading(false)
  }
  const LEVELS = ['V1', 'V2', 'V3', 'V4', 'V5']
  const OPS = ['包含', '不包含']

  return (
    <CenterModal open={true} onClose={onCancel} title={editTarget?.name ? '编辑注册有礼' : '创建注册有礼'} width={720}
      footer={<><button className="btn btn-ghost" onClick={onCancel} style={{ minWidth: 90, height: 38, fontSize: 14 }}>取消</button><button className="btn-query" onClick={handleSave} disabled={loading} style={{ height: 38, padding: '0 24px', fontSize: 14 }}>{loading ? '保存中...' : '发布'}</button></>}>
      <StepBar />
      <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 16 }}>处理描述有点多有点多 不得不换行。</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F1F5F9' }}>活动基本信息</div>

      <FieldGroup label="活动图片" required>
        <div style={{ width: 80, height: 80, border: '2px dashed #E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94A3B8', fontSize: 24 }}>+</div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>建议尺寸 750×400px</div>
      </FieldGroup>

      <FieldGroup label="活动名称" required>
        <input className="form-input" placeholder="请输入活动名称" value={form.name} onChange={e => set('name', e.target.value)} style={{ width: '100%' }} />
      </FieldGroup>

      <FieldGroup label="活动有效期" required>
        <RadioGroup options={[{ value: '永久有效', label: '永久有效' }, { value: '设置有效期', label: '设置有效期' }]} value={form.validType} onChange={v => set('validType', v)} inline />
        {form.validType === '设置有效期' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <input type="date" className="form-input" value={form.validFrom} onChange={e => set('validFrom', e.target.value)} style={{ width: 160, fontSize: 13 }} />
            <span style={{ color: '#64748B' }}>~</span>
            <input type="date" className="form-input" value={form.validTo} onChange={e => set('validTo', e.target.value)} style={{ width: 160, fontSize: 13 }} />
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="奖励内容" required>
        <RadioGroup options={[{ value: '满减券', label: '满减券' }, { value: '折扣券', label: '折扣券' }, { value: '积分', label: '积分' }]} value={form.rewardType} onChange={v => set('rewardType', v)} inline />
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          {form.rewardType === '积分' && <><input className="form-input" placeholder="请输入" value={form.amount} onChange={e => set('amount', e.target.value)} style={{ width: 100, fontSize: 13 }} /><span style={{ fontSize: 13, color: '#64748B' }}>积分</span></>}
          {form.rewardType === '满减券' && <><input className="form-input" placeholder="请输入" value={form.amount} onChange={e => set('amount', e.target.value)} style={{ width: 100, fontSize: 13 }} /><span style={{ fontSize: 13, color: '#64748B' }}>元</span></>}
          {form.rewardType === '折扣券' && <><input className="form-input" placeholder="请输入" value={form.discount} onChange={e => set('discount', e.target.value)} style={{ width: 100, fontSize: 13 }} /><span style={{ fontSize: 13, color: '#64748B' }}>折</span></>}
        </div>
      </FieldGroup>

      <FieldGroup label="发放数量" required>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input className="form-input" placeholder="请输入" value={form.stock} onChange={e => set('stock', e.target.value)} style={{ width: 160, fontSize: 13 }} />
          <span style={{ fontSize: 13, color: '#64748B' }}>张</span>
        </div>
      </FieldGroup>

      <FieldGroup label="备注">
        <textarea className="form-input" placeholder="请输入备注" rows={3} value={form.note} onChange={e => set('note', e.target.value)} style={{ width: '100%', resize: 'vertical' }} />
      </FieldGroup>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F1F5F9' }}>活动规则</div>

      <FieldGroup label="每人限领" required>
        <RadioGroup options={[{ value: '不限张数', label: '不限张数' }, { value: '固定', label: '固定' }]} value={form.perLimitType} onChange={v => set('perLimitType', v)} inline />
        {form.perLimitType === '固定' && <><input className="form-input" placeholder="请输入" value={form.perLimit} onChange={e => set('perLimit', e.target.value)} style={{ width: 80, fontSize: 13, marginTop: 8 }} /><span style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>张</span></>}
      </FieldGroup>

      <FieldGroup label="使用时间" required>
        <RadioGroup options={[{ value: '指定时间', label: '指定时间' }, { value: '领取后', label: '领取后' }]} value={form.useTimeType} onChange={v => set('useTimeType', v)} inline />
        {form.useTimeType === '领取后' && <><input className="form-input" placeholder="请输入" value={form.useTime} onChange={e => set('useTime', e.target.value)} style={{ width: 80, fontSize: 13, marginTop: 8 }} /><span style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>日内可用</span></>}
        {form.useTimeType === '指定时间' && (
          <div style={{ display: 'flex', gap: 8, marginTop:
8, alignItems: 'center' }}>
            <input type="date" className="form-input" value={form.useTimeFrom} onChange={e => set('useTimeFrom', e.target.value)} style={{ width: 160, fontSize: 13 }} />
            <span style={{ color: '#64748B' }}>~</span>
            <input type="date" className="form-input" value={form.useTimeTo} onChange={e => set('useTimeTo', e.target.value)} style={{ width: 160, fontSize: 13 }} />
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="优惠叠加" required>
        <RadioGroup options={[{ value: '不可叠加', label: '不可叠加' }, { value: '可叠加其他类型的优惠', label: '可叠加其他类型的优惠' }]} value={form.stackable} onChange={v => set('stackable', v)} inline />
      </FieldGroup>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F1F5F9' }}>条件规则</div>

      <FieldGroup label="适用用户" required>
        <RadioGroup options={[{ value: '全部会员', label: '全部会员' }, { value: '部分会员', label: '部分会员' }]} value={form.userType} onChange={v => set('userType', v)} inline />
      </FieldGroup>

      <FieldGroup label="运算池">
        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>用户标签满足以下规则的人</div>
        {form.rules.map((rule, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            {i > 0 && <span style={{ fontSize: 12, color: '#64748B', width: 20, textAlign: 'center' }}>且</span>}
            <select className="form-select" style={{ width: 100, fontSize: 12 }} value={rule.level} onChange={e => updateRule(i, 'level', e.target.value)}>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            <select className="form-select" style={{ width: 80, fontSize: 12 }} value={rule.op} onChange={e => updateRule(i, 'op', e.target.value)}>
              {OPS.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="form-select" style={{ width: 120, fontSize: 12 }} value={rule.tag} onChange={e => updateRule(i, 'tag', e.target.value)}>
              <option value="">请选择用户标签</option>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            {form.rules.length > 1 && <button onClick={() => removeRule(i)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 16 }}>x</button>}
          </div>
        ))}
        <button onClick={addRule} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', border: '1.5px dashed #CBD5E1', borderRadius: 6, background: 'transparent', color: '#64748B', fontSize: 12, cursor: 'pointer' }}>+ 添加</button>
      </FieldGroup>
    </CenterModal>
  )
}

// ========== 主页面 ==========
export default function MarketingActivityPage() {
  const [tab, setTab] = useState('coupon')
  const [coupons, setCoupons] = useState([
    { id: 1, name: '新人10元券', type: '满减券', stock: 5000, used: 1234, validFrom: '2016-09-01', validTo: '2016-09-30', status: '进行中' },
    { id: 2, name: '会员专属20元券', type: '满减券', stock: 2000, used: 876, validFrom: '2016-09-01', validTo: '2016-11-30', status: '进行中' },
    { id: 3, name: '限时5折券', type: '折扣券', stock: 500, used: 321, validFrom: '2016-03-01', validTo: '2016-03-31', status: '已结束' },
    { id: 4, name: '节日专享100元券', type: '满减券', stock: 1000, used: 543, validFrom: '2016-10-01', validTo: '2016-10-07', status: '未开始' },
  ])
  const [gifts, setGifts] = useState([
    { id: 1, name: '注册送10元券', reward: '满减券10元', stock: 10000, validFrom: '2016-09-01', validTo: '2016-12-31', users: '全部会员', status: '进行中' },
    { id: 2, name: '邀请注册送积分', reward: '500积分', stock: 9999, validFrom: '2016-08-01', validTo: '2016-08-31', users: '全部会员', status: '已结束' },
  ])
  const [cSearch, setCSearch] = useState('')
  const [cType, setCType] = useState('')
  const [cPage, setCPage] = useState(1)
  const [cPageSize, setCPageSize] = useState(10)
  const [gSearch, setGSearch] = useState('')
  const [gPage, setGPage] = useState(1)
  const [gPageSize, setGPageSize] = useState(10)
  const [delTarget, setDelTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const cFiltered = coupons.filter(c => {
    if (cSearch && !c.name.includes(cSearch)) return false
    if (cType && c.type !== cType) return false
    return true
  })
  const cTotal = cFiltered.length
  const cData = cFiltered.slice((cPage - 1) * cPageSize, cPage * cPageSize)

  const gFiltered = gifts.filter(g => {
    if (gSearch && !g.name.includes(gSearch)) return false
    return true
  })
  const gTotal = gFiltered.length
  const gData = gFiltered.slice((gPage - 1) * gPageSize, gPage * gPageSize)

  function handleSaveCoupon(item) {
    if (item.id) setCoupons(prev => prev.map(c => c.id === item.id ? { ...c, ...item } : c))
    else setCoupons(prev => [{ ...item, id: Date.now(), used: 0, status: '进行中' }, ...prev])
    setShowForm(false)
  }

  function handleSaveGift(item) {
    if (item.id) setGifts(prev => prev.map(g => g.id === item.id ? { ...g, ...item } : g))
    else setGifts(prev => [{ ...item, id: Date.now(), status: '进行中' }, ...prev])
    setShowForm(false)
  }

  function handleDel(type, id) {
    if (type === 'coupon') setCoupons(prev => prev.filter(c => c.id !== id))
    else setGifts(prev => prev.filter(g => g.id !== id))
    setDelTarget(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, padding: '0 24px', background: '#fff', borderBottom: '2px solid #F1F5F9' }}>
        {[['coupon', '优惠券'], ['gift', '注册有礼']].map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #3B82F6' : '2px solid transparent', cursor: 'pointer', fontSize: 14, fontWeight: tab === t ? 700 : 400, color: tab === t ? '#3B82F6' : '#64748B', marginBottom: -2, whiteSpace: 'nowrap' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'coupon' && (
        <div className="card" style={{ padding: 0, borderRadius: '0 0 12px 12px' }}>
          <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderBottom: '1px solid #F1F5F9', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="search-input-wrap" style={{ width: 200 }}>
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="请输入优惠券名称" value={cSearch} onChange={e => { setCSearch(e.target.value); setCPage(1) }} />
            </div>
            <select className="form-select" style={{ width: 160, fontSize: 13 }} value={cType} onChange={e => { setCType(e.target.value); setCPage(1) }}>
              <option value="">请选择类型</option>
              <option>满减券</option><option>折扣券</option>
            </select>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button className="btn-query" style={{ height: 34, padding: '0 20px', fontSize: 14 }} onClick={() => setCPage(1)}>查询</button>
              <button className="btn-reset" style={{ height: 34, padding: '0 20px', fontSize: 14 }} onClick={() => { setCSearch(''); setCType(''); setCPage(1) }}>重置</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: '10px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13, background: '#3B82F6' }} onClick={() => { setEditTarget(null); setShowForm(true) }}>+ 新增</button>
            <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13, background: '#6B7280' }}
              onClick={() => { if (cData.length === 0) return; const ids = cData.map(c => c.id); setCoupons(prev => prev.filter(c => !ids.includes(c.id))) }}>批量删除</button>
          </div>
          <div style={{ display: 'flex', padding: '10px 20px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 50, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>序号</div>
            <div style={{ width: 160, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>优惠券名称</div>
            <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>类型</div>
            <div style={{ width: 150, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>有效期</div>
            <div style={{ width: 120, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>发放数量</div>
            <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>剩余数量</div>
            <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>状态</div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>操作</div>
          </div>
          {cData.map((c, idx) => (
            <div key={c.id} style={{ display: 'flex', padding: '12px 20px', borderBottom: '1px solid #F1F5F9', gap: 8, alignItems: 'center', background: idx % 2 === 0 ? '#fff' : '#FAFBFC' }}>
              <div style={{ width: 50, fontSize: 13, color: '#94A3B8', flexShrink: 0 }}>{c.id}</div>
              <div style={{ width: 160, fontSize: 13, fontWeight: 600, color: '#1E3A5F', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.name}>{c.name}</div>
              <div style={{ width: 80, fontSize: 13, color: '#374151', flexShrink: 0 }}>{c.type}</div>
              <div style={{ width: 150, fontSize: 12, color: '#94A3B8', flexShrink: 0 }}>{c.validFrom} ~ {c.validTo}</div>
              <div style={{ width: 120, fontSize: 13, fontFamily: 'monospace', color: '#374151', flexShrink: 0 }}>{c.stock}</div>
              <div style={{ width: 80, fontSize: 13, fontFamily: 'monospace', color: '#059669', flexShrink: 0 }}>{c.stock - c.used}</div>
              <div style={{ width: 80, flexShrink: 0 }}><Badge s={c.status} /></div>
              <div style={{ flex: 1, display: 'flex', gap: 4, flexShrink: 0 }}>
                <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', width: 48, height: 28, fontSize: 12, padding: '0 4px' }}
                  onClick={() => { setEditTarget(c); setShowForm(true) }}>编辑</button>
                <button className="btn-action btn-delete" style={{ width: 48, height: 28, fontSize: 12, padding: '0 4px' }}
                  onClick={() => setDelTarget({ type: 'coupon', id: c.id, name: c.name })}>删除</button>
              </div>
            </div>
          ))}
          <Pagination page={cPage} pageSize={cPageSize} total={cTotal} onPageChange={setCPage} onPageSizeChange={s => { setCPageSize(s); setCPage(1) }} />
        </div>
      )}

      {tab === 'gift' && (
        <div className="card" style={{ padding: 0, borderRadius: '0 0 12px 12px' }}>
          <div style={{ display: 'flex', gap: 8, padding: '14px 20px', borderBottom: '1px solid #F1F5F9', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="search-input-wrap" style={{ width: 200 }}>
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="请输入活动名称" value={gSearch} onChange={e => { setGSearch(e.target.value); setGPage(1) }} />
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button className="btn-query" style={{ height: 34, padding: '0 20px', fontSize: 14 }} onClick={() => setGPage(1)}>查询</button>
              <button className="btn-reset" style={{ height: 34, padding: '0 20px', fontSize: 14 }} onClick={() => { setGSearch(''); setGPage(1) }}>重置</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, padding: '10px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13, background: '#3B82F6' }} onClick={() => { setEditTarget(null); setShowForm(true) }}>+ 新增</button>
            <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13, background: '#6B7280' }}
              onClick={() => { if (gData.length === 0) return; const ids = gData.map(g => g.id); setGifts(prev => prev.filter(g => !ids.includes(g.id))) }}>批量删除</button>
          </div>
          <div style={{ display: 'flex', padding: '10px 20px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 50, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>序号</div>
            <div style={{ width: 180, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>活动名称</div>
            <div style={{ width: 120, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>奖励内容</div>
            <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>发放数量</div>
            <div style={{ width: 150, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>有效期</div>
            <div style={{ width: 100, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>适用用户</div>
            <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>状态</div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#64748B', flexShrink: 0 }}>操作</div>
          </div>
          {gData.map((g, idx) => (
            <div key={g.id} style={{ display: 'flex', padding: '12px 20px', borderBottom: '1px solid #F1F5F9', gap: 8, alignItems: 'center', background: idx % 2 === 0 ? '#fff' : '#FAFBFC' }}>
              <div style={{ width: 50, fontSize: 13, color: '#94A3B8', flexShrink: 0 }}>{g.id}</div>
              <div style={{ width: 180, fontSize: 13, fontWeight: 600, color: '#1E3A5F', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={g.name}>{g.name}</div>
              <div style={{ width: 120, fontSize: 13, color: '#374151', flexShrink: 0 }}>{g.reward}</div>
              <div style={{ width: 80, fontSize: 13, fontFamily: 'monospace', color: '#374151', flexShrink: 0 }}>{g.stock}</div>
              <div style={{ width: 150, fontSize: 12, color: '#94A3B8', flexShrink: 0 }}>{g.validFrom} ~ {g.validTo}</div>
              <div style={{ width: 100, fontSize: 13, color: '#374151', flexShrink: 0 }}>{g.users}</div>
              <div style={{ width: 80, flexShrink: 0 }}><Badge s={g.status} /></div>
              <div style={{ flex: 1, display: 'flex', gap: 4, flexShrink: 0 }}>
                <button className="btn-action" style={{ borderColor: '#1E3A5F', color: '#1E3A5F', width: 48, height: 28, fontSize: 12, padding: '0 4px' }}
                  onClick={() => { setEditTarget(g); setShowForm(true) }}>编辑</button>
                <button className="btn-action btn-delete" style={{ width: 48, height: 28, fontSize: 12, padding: '0 4px' }}
                  onClick={() => setDelTarget({ type: 'gift', id: g.id, name: g.name })}>删除</button>
              </div>
            </div>
          ))}
          <Pagination page={gPage} pageSize={gPageSize} total={gTotal} onPageChange={setGPage} onPageSizeChange={s => { setGPageSize(s); setGPage(1) }} />
        </div>
      )}

      {showForm && (
        tab === 'coupon'
          ? <CouponForm editTarget={editTarget} onSave={handleSaveCoupon} onCancel={() => setShowForm(false)} />
          : <GiftForm editTarget={editTarget} onSave={handleSaveGift} onCancel={() => setShowForm(false)} />
      )}
      {delTarget && (
        <DeleteModal title={delTarget.name} onConfirm={() => handleDel(delTarget.type, delTarget.id)} onCancel={() => setDelTarget(null)} />
      )}
    </div>
  )
}
