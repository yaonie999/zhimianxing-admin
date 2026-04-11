import React, { useState } from 'react'
import RightDrawer from '../components/RightDrawer'
import '../styles/admin.css'

/* ==================== 模拟数据 ==================== */
const MEMBERS = [
  { id: 1, name: '张伟', phone: '138****1234', level: 2, levelName: '白银会员', growth: 1888, color: '#C0C0C0', icon: '🥈' },
  { id: 2, name: '李娜', phone: '139****5678', level: 3, levelName: '黄金会员', growth: 4200, color: '#FFD700', icon: '🥇' },
  { id: 3, name: '王磊', phone: '136****9012', level: 1, levelName: '青铜会员', growth: 650, color: '#CD7F32', icon: '🥉' },
  { id: 4, name: '刘芳', phone: '137****3456', level: 4, levelName: '铂金会员', growth: 7800, color: '#E5E4E2', icon: '💎' },
  { id: 5, name: '陈明', phone: '135****7890', level: 5, levelName: '钻石会员', growth: 15000, color: '#9370DB', icon: '💠' },
]

const LEVELS = [
  { id: 1, name: '青铜会员', levelNum: 1, min: 0, max: 999, discount: '98', discountType: '打折', bgImage: '', remark: '', creator: '系统', createdAt: '2024-01-15 10:30:00' },
  { id: 2, name: '白银会员', levelNum: 2, min: 1000, max: 2999, discount: '95', discountType: '打折', bgImage: '', remark: '', creator: '系统', createdAt: '2024-01-15 10:31:00' },
  { id: 3, name: '黄金会员', levelNum: 3, min: 3000, max: 5999, discount: '90', discountType: '打折', bgImage: '', remark: '', creator: '管理员', createdAt: '2024-02-01 09:15:00' },
  { id: 4, name: '铂金会员', levelNum: 4, min: 6000, max: 9999, discount: '85', discountType: '打折', bgImage: '', remark: '', creator: '管理员', createdAt: '2024-02-10 14:20:00' },
  { id: 5, name: '钻石会员', levelNum: 5, min: 10000, max: 999999, discount: '80', discountType: '打折', bgImage: '', remark: '最高等级', creator: '管理员', createdAt: '2024-03-01 08:00:00' },
]

/* ==================== 表单抽屉 ==================== */
function LevelFormDrawer({ level, levels, onClose, onSave }) {
  const isNew = !level?.id
  const [form, setForm] = useState({
    levelNum: level?.levelNum ?? (levels.length + 1),
    name: level?.name ?? '',
    min: level?.min ?? 0,
    max: level?.max ?? 999,
    discount: level?.discount ?? '90',
    discountType: level?.discountType ?? '打折',
    bgImage: level?.bgImage ?? '',
    remark: level?.remark ?? '',
  })
  const [errors, setErrors] = useState({})

  function set(k, v) {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = '不可为空'
    if (!form.levelNum && form.levelNum !== 0) errs.levelNum = '不可为空'
    if (form.min === '' || form.min === null || isNaN(form.min)) errs.min = '不可为空'
    if (form.max === '' || form.max === null || isNaN(form.max)) errs.max = '不可为空'
    if (!errs.min && !errs.max && Number(form.min) >= Number(form.max)) {
      errs.max = '起始值必须小于结束值'
    }
    if (!form.discount) errs.discount = '请选择折扣'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSave() {
    if (!validate()) return
    onSave({ ...level, ...form })
  }

  const discounts = ['100', '98', '95', '90', '88', '85', '80', '75', '70', '60', '50']

  // 新增时：成长值起始值 = 当前最高 max + 1
  const maxOfLevels = levels.length > 0 ? Math.max(...levels.map(l => l.max >= 999999 ? 0 : l.max)) : 0
  const suggestedMin = isNew ? (maxOfLevels >= 999999 ? maxOfLevels : maxOfLevels + 1) : form.min

  return (
    <RightDrawer
      open={true}
      onClose={onClose}
      title={isNew ? '新增等级' : `编辑等级：${level?.name || ''}`}
      width={520}
      footer={
        <>
          <button
            onClick={onClose}
            style={{
              height: 36, padding: '0 20px',
              background: '#fff', color: 'var(--text-secondary)',
              border: '1.5px solid var(--border-default)',
              borderRadius: 6, fontSize: 14, fontWeight: 500,
              cursor: 'pointer',
            }}
          >取消</button>
          <button
            onClick={handleSave}
            style={{
              height: 36, padding: '0 20px',
              background: 'var(--blue-primary)', color: '#fff',
              border: 'none', borderRadius: 6,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
            }}
          >确定</button>
        </>
      }
    >
      {/* ===== ① 等级信息 ===== */}
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 12, letterSpacing: '0.5px' }}>
        等级信息
      </div>

      {/* 会员等级 + 等级名称 同行 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
            会员等级 <span style={{ color: '#EF4444' }}>*</span>
          </div>
          <input
            type="number"
            value={form.levelNum}
            onChange={e => set('levelNum', parseInt(e.target.value))}
            placeholder="请输入"
            style={{
              width: '100%', height: 36, padding: '0 12px',
              border: `1.5px solid ${errors.levelNum ? '#EF4444' : 'var(--border-default)'}`,
              borderRadius: 6, fontSize: 14,
              color: 'var(--text-primary)', background: '#fff',
              outline: 'none', fontFamily: 'JetBrains Mono, monospace',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
            onBlur={e => e.target.style.borderColor = errors.levelNum ? '#EF4444' : 'var(--border-default)'}
          />
          {errors.levelNum && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.levelNum}</div>}
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
            等级名称 <span style={{ color: '#EF4444' }}>*</span>
          </div>
          <input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="请输入等级名称"
            style={{
              width: '100%', height: 36, padding: '0 12px',
              border: `1.5px solid ${errors.name ? '#EF4444' : 'var(--border-default)'}`,
              borderRadius: 6, fontSize: 14,
              color: 'var(--text-primary)', background: '#fff',
              outline: 'none', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
            onBlur={e => e.target.style.borderColor = errors.name ? '#EF4444' : 'var(--border-default)'}
          />
          {errors.name && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.name}</div>}
        </div>
      </div>

      {/* 成长值范围 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
          成长值范围 <span style={{ color: '#EF4444' }}>*</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="number"
            value={isNew ? suggestedMin : form.min}
            onChange={e => set('min', parseInt(e.target.value))}
            placeholder="起始值"
            style={{
              flex: 1, height: 36, padding: '0 12px',
              border: `1.5px solid ${errors.min ? '#EF4444' : 'var(--border-default)'}`,
              borderRadius: 6, fontSize: 14,
              color: 'var(--text-primary)', background: '#fff',
              outline: 'none', fontFamily: 'JetBrains Mono, monospace',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
            onBlur={e => e.target.style.borderColor = errors.min ? '#EF4444' : 'var(--border-default)'}
          />
          <span style={{ color: 'var(--text-dim)', fontSize: 14, flexShrink: 0 }}>—</span>
          <input
            type="number"
            value={form.max >= 999999 ? '' : form.max}
            onChange={e => set('max', parseInt(e.target.value) || 999999)}
            placeholder="结束值"
            style={{
              flex: 1, height: 36, padding: '0 12px',
              border: `1.5px solid ${errors.max ? '#EF4444' : 'var(--border-default)'}`,
              borderRadius: 6, fontSize: 14,
              color: 'var(--text-primary)', background: '#fff',
              outline: 'none', fontFamily: 'JetBrains Mono, monospace',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
            onBlur={e => e.target.style.borderColor = errors.max ? '#EF4444' : 'var(--border-default)'}
          />
          <span style={{ color: 'var(--text-dim)', fontSize: 13, flexShrink: 0 }}>无上限则留空</span>
        </div>
        {errors.min && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.min}</div>}
        {errors.max && !errors.min && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.max}</div>}
      </div>

      {/* 等级背景图 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>等级背景图</div>
        <button
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 4,
            width: 80, height: 80,
            border: '1.5px dashed var(--border-default)',
            borderRadius: 8,
            background: '#FAFAFA',
            cursor: 'pointer',
            fontSize: 12, color: 'var(--text-dim)',
            transition: 'all 0.15s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--blue-primary)'; e.currentTarget.style.color = 'var(--blue-primary)' }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-dim)' }}
        >
          <span style={{ fontSize: 22, lineHeight: 1 }}>+</span>
          <span>上传图片</span>
        </button>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>
          建议尺寸 375×200px，图片用于会员中心首页展示
        </div>
      </div>

      {/* 备注 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>备注</div>
        <input
          value={form.remark}
          onChange={e => set('remark', e.target.value)}
          placeholder="请输入备注"
          style={{
            width: '100%', height: 36, padding: '0 12px',
            border: '1.5px solid var(--border-default)',
            borderRadius: 6, fontSize: 14,
            color: 'var(--text-primary)', background: '#fff',
            outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
        />
      </div>

      {/* 分隔线 */}
      <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 20 }} />

      {/* ===== ② 选择等级权益 ===== */}
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 12, letterSpacing: '0.5px' }}>
        选择等级权益
      </div>

      {/* 权益单选 */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
        {[
          { key: '打折', label: '消费打折' },
          { key: '双倍积分', label: '消费双倍积分' },
        ].map(opt => (
          <label
            key={opt.key}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', fontSize: 14,
              color: form.discountType === opt.key ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: form.discountType === opt.key ? 600 : 400,
            }}
            onClick={() => set('discountType', opt.key)}
          >
            <div style={{
              width: 18, height: 18,
              border: `2px solid ${form.discountType === opt.key ? 'var(--blue-primary)' : 'var(--border-default)'}`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.15s', flexShrink: 0,
            }}>
              {form.discountType === opt.key && (
                <div style={{ width: 10, height: 10, background: 'var(--blue-primary)', borderRadius: '50%' }} />
              )}
            </div>
            {opt.label}
          </label>
        ))}
      </div>

      {/* 折扣下拉 */}
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
          折扣 <span style={{ color: '#EF4444' }}>*</span>
        </div>
        <div style={{ position: 'relative' }}>
          <select
            value={form.discount}
            onChange={e => { set('discount', e.target.value); setErrors(p => ({ ...p, discount: '' })) }}
            style={{
              width: '100%', height: 36, padding: '0 32px 0 12px',
              border: `1.5px solid ${errors.discount ? '#EF4444' : 'var(--border-default)'}`,
              borderRadius: 6, fontSize: 14,
              color: 'var(--text-primary)', background: '#fff',
              appearance: 'none', cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <option value="">请选择折扣</option>
            {discounts.map(d => (
              <option key={d} value={d}>
                {d === '100' ? '无折扣（100%）' : `${d}折`}
              </option>
            ))}
          </select>
          <span style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none', fontSize: 10, color: 'var(--text-dim)',
          }}>▼</span>
        </div>
        {errors.discount && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.discount}</div>}
      </div>
    </RightDrawer>
  )
}

/* ==================== 主页面 ==================== */
export default function MemberLevelsPage() {
  const [activeTab, setActiveTab] = useState('会员等级')
  const [levels, setLevels] = useState(LEVELS)
  const [editLevel, setEditLevel] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  function handleSaveLevel(updated) {
    if (updated.id) {
      setLevels(prev => prev.map(l => l.id === updated.id ? { ...l, ...updated } : l))
    } else {
      const newId = Math.max(...levels.map(l => l.id)) + 1
      setLevels(prev => [...prev, { ...updated, id: newId, creator: '管理员', createdAt: new Date().toLocaleString('zh-CN') }])
    }
    setEditLevel(null)
  }

  function handleDelete(id) {
    if (!confirm('确定删除该等级吗？')) return
    setLevels(prev => prev.filter(l => l.id !== id))
  }

  // 分页
  const totalPages = Math.ceil(levels.length / pageSize)
  const start = (page - 1) * pageSize
  const pageData = levels.slice(start, start + pageSize)

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>

      {/* ===== 顶部标签 ===== */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        background: '#fff', border: '1px solid var(--border-subtle)',
        borderRadius: 8, padding: '4px', marginBottom: 20,
      }}>
        {['首页', '会员等级'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '6px 20px', borderRadius: 6, border: 'none',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.15s',
              background: activeTab === t ? '#fff' : 'transparent',
              color: activeTab === t ? 'var(--blue-primary)' : 'var(--text-muted)',
            }}
          >{t}</button>
        ))}
      </div>

      {/* ===== 卡片 ===== */}
      <div style={{
        background: '#fff', borderRadius: 12,
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}>
        {/* 卡片头部 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>会员等级体系</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>配置各会员等级成长值范围、权益和折扣</p>
          </div>
          <button
            onClick={() => setEditLevel({ id: null, name: '', levelNum: levels.length + 1, min: 0, max: 999, discount: '90', discountType: '打折', bgImage: '', remark: '' })}
            style={{
              height: 34, padding: '0 16px',
              background: 'var(--blue-primary)', color: '#fff',
              border: 'none', borderRadius: 6,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
            }}
          >+ 新增</button>
        </div>

        {/* 表格 */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['序号', '会员等级', '等级名称', '成长值范围', '会员权益', '备注', '创建人', '创建时间', '操作'].map((h, i) => (
                  <th key={i} style={{
                    padding: '11px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    fontSize: 13,
                    borderBottom: '1px solid var(--border-subtle)',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((lv, idx) => (
                <tr key={lv.id}
                  style={{ borderBottom: idx < pageData.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td style={{ padding: '11px 16px', color: 'var(--text-dim)', fontSize: 12 }}>{start + idx + 1}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: '50%',
                      background: lv.color + '20', color: lv.color,
                      fontSize: 13, fontWeight: 700,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>{lv.levelNum}</span>
                  </td>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{lv.name}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--text-secondary)' }}>
                    {lv.min.toLocaleString()} ~ {lv.max >= 999999 ? '无上限' : lv.max.toLocaleString()}
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
                    {lv.discountType === '双倍积分' ? '消费双倍积分' : `消费${lv.discount}折`}
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: 'var(--text-dim)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lv.remark || '—'}
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: 'var(--text-dim)' }}>{lv.creator}</td>
                  <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{lv.createdAt}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setEditLevel(lv)}
                        style={{
                          padding: '4px 12px',
                          background: '#fff', color: 'var(--blue-primary)',
                          border: '1.5px solid var(--blue-primary)',
                          borderRadius: 5, fontSize: 12, fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >编辑</button>
                      <button
                        onClick={() => handleDelete(lv.id)}
                        style={{
                          padding: '4px 12px',
                          background: '#fff', color: 'var(--red-online)',
                          border: '1.5px solid var(--red-online)',
                          borderRadius: 5, fontSize: 12, fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          gap: 12, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            共 <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{levels.length}</strong> 条记录
            第 <strong style={{ color: 'var(--blue-primary)', fontWeight: 700 }}>{page}</strong> / {totalPages || 1} 页
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {Array.from({ length: Math.min(totalPages, 9) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1.5px solid ${p === page ? 'var(--blue-primary)' : 'var(--border-default)'}`,
                  borderRadius: 6,
                  background: p === page ? '#fff' : '#fff',
                  color: p === page ? 'var(--blue-primary)' : 'var(--text-secondary)',
                  fontSize: 13, fontWeight: p === page ? 700 : 500,
                  cursor: 'pointer',
                }}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid var(--border-default)', borderRadius: 6,
                background: '#fff', color: page >= totalPages ? 'var(--text-dim)' : 'var(--text-secondary)',
                fontSize: 16, cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages ? 0.5 : 1,
              }}
            >›</button>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
              style={{
                height: 32, padding: '0 28px 0 10px',
                border: '1.5px solid var(--border-default)', borderRadius: 6,
                fontSize: 13, color: 'var(--text-primary)', background: '#fff',
                cursor: 'pointer', appearance: 'none',
              }}
            >
              <option value={10}>10 条/页</option>
              <option value={20}>20 条/页</option>
              <option value={50}>50 条/页</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== 编辑/新增抽屉 ===== */}
      {editLevel !== null && (
        <LevelFormDrawer
          level={editLevel}
          levels={levels}
          onClose={() => setEditLevel(null)}
          onSave={handleSaveLevel}
        />
      )}
    </div>
  )
}
