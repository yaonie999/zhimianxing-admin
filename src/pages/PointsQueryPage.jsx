import React, { useState, useEffect, useRef } from 'react'
import CenterModal from '../components/CenterModal'
import '../styles/admin.css'

/* ==================== 模拟数据 ==================== */
const STUDIOS = ['朝阳睡眠工作室', '海淀健康中心', '浦东睡眠医学中心', '天河睡眠驿站', '南山睡眠医学中心']
const CHANGE_NAMES = ['消费返积分', '签到奖励', '任务奖励', '活动奖励', '积分兑换', '积分退款', '积分扣除', '新手奖励']

function randomPhone() {
  const p = '15118173429'.split('')
  p[3] = String.fromCharCode(42 + Math.floor(Math.random() * 9))
  p[4] = String.fromCharCode(42 + Math.floor(Math.random() * 9))
  p[5] = String.fromCharCode(42 + Math.floor(Math.random() * 9))
  return p.join('')
}

function genMock(total = 400) {
  const names = ['张伟', '李娜', '王磊', '刘芳', '陈明', '周静', '吴强', '郑丽', '赵军', '孙颖', '黄勇', '林涛', '徐婷', '何晨', '马超', '胡蝶', '朱琳', '高阳', '罗浩', '梁雪']
  const results = []
  let balance = 10000
  for (let i = 1; i <= total; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const changeName = CHANGE_NAMES[Math.floor(Math.random() * CHANGE_NAMES.length)]
    const isPositive = Math.random() > 0.2
    const amount = isPositive
      ? Math.floor(Math.random() * 2000) + 1
      : -(Math.floor(Math.random() * 500) + 1)
    balance = Math.max(0, balance + amount)
    const y = 2020 + Math.floor(Math.random() * 6)
    const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const d = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
    const hh = String(Math.floor(Math.random() * 24)).padStart(2, '0')
    const mm = String(Math.floor(Math.random() * 60)).padStart(2, '0')
    const ss = String(Math.floor(Math.random() * 60)).padStart(2, '0')
    results.push({
      id: i,
      name,
      phone: randomPhone(),
      changeName,
      amount,
      balance,
      time: `${y}-${m}-${d} ${hh}:${mm}:${ss}`,
    })
  }
  return results
}

const ALL_DATA = genMock(400)

function maskPhone(phone) {
  // 151****7329
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/* ==================== 格式化 ==================== */
function fmtBalance(n) {
  return n.toLocaleString('zh-CN')
}
function fmtAmount(n) {
  return (n > 0 ? '+' : '') + n.toLocaleString('zh-CN')
}

/* ==================== 页面组件 ==================== */
export default function PointsQueryPage() {
  /* --- 标签 --- */
  const [activeTab, setActiveTab] = useState('积分查询')

  /* --- 筛选条件 --- */
  const [studio, setStudio] = useState('')
  const [keyword, setKeyword] = useState('')
  const [changeName, setChangeName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  /* --- 分页 --- */
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [jumpVal, setJumpVal] = useState('')

  /* --- 清空积分弹窗 --- */
  const [clearModal, setClearModal] = useState(false)

  /* --- 筛选逻辑 --- */
  function doFilter() {
    setPage(1)
  }

  function doReset() {
    setStudio(''); setKeyword(''); setChangeName(''); setStartDate(''); setEndDate(''); setPage(1)
  }

  function getFiltered() {
    return ALL_DATA.filter(r => {
      if (studio && !r.studio?.includes(studio)) return false
      if (keyword && !r.name.includes(keyword) && !r.phone.includes(keyword)) return false
      if (changeName && r.changeName !== changeName) return false
      if (startDate && r.time < startDate + ' 00:00:00') return false
      if (endDate && r.time > endDate + ' 23:59:59') return false
      return true
    })
  }

  const filtered = getFiltered()
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize) || 1
  const start = (page - 1) * pageSize
  const pageData = filtered.slice(start, start + pageSize)

  /* --- 页码渲染 --- */
  function renderPages() {
    const pages = []
    for (let p = 1; p <= Math.min(totalPages, 9); p++) pages.push(p)
    return pages
  }

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value))
    setPage(1)
  }

  function handleJump(e) {
    const v = parseInt(jumpVal)
    if (!isNaN(v) && v >= 1 && v <= totalPages) setPage(v)
    setJumpVal('')
  }

  /* --- 清空积分 --- */
  function handleClear() {
    setClearModal(false)
    alert('已清空所有积分（演示）')
  }

  /* --- 选中工作室高亮计数 --- */
  const studioCount = studio ? 1 : 0

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
            padding: '6px 20px',
            borderRadius: 6,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: activeTab === '首页' ? '#fff' : 'transparent',
            color: activeTab === '首页' ? 'var(--blue-primary)' : 'var(--text-muted)',
          }}
        >首页</button>
        <button
          onClick={() => setActiveTab('积分查询')}
          style={{
            padding: '6px 20px',
            borderRadius: 6,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: activeTab === '积分查询' ? '#fff' : 'transparent',
            color: activeTab === '积分查询' ? 'var(--blue-primary)' : 'var(--text-muted)',
          }}
        >积分查询</button>
      </div>

      {/* ==================== 二、筛选区 ==================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 16,
        border: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
          {/* 所属工作室 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#64748B', whiteSpace: 'nowrap', flexShrink: 0 }}>所属工作室</span>
            <div style={{ position: 'relative' }}>
              <select
                value={studio}
                onChange={e => { setStudio(e.target.value); setPage(1) }}
                style={{
                  height: 34,
                  padding: '0 32px 0 12px',
                  border: '1.5px solid var(--border-default)',
                  borderRadius: 6,
                  fontSize: 13,
                  color: studio ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  minWidth: 180,
                }}
              >
                <option value="">请选择工作室</option>
                {STUDIOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', fontSize: 10, color: 'var(--text-muted)'
              }}>▼</span>
            </div>
            {studio && (
              <span style={{
                background: 'var(--blue-primary)', color: '#fff',
                borderRadius: '50%', width: 18, height: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0
              }}>1</span>
            )}
          </div>

          {/* 会员信息 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#64748B', whiteSpace: 'nowrap', flexShrink: 0 }}>会员信息</span>
            <input
              value={keyword}
              onChange={e => { setKeyword(e.target.value); setPage(1) }}
              placeholder="请输入会员姓名 / 手机号"
              style={{
                height: 34,
                padding: '0 12px',
                border: '1.5px solid var(--border-default)',
                borderRadius: 6,
                fontSize: 13,
                color: 'var(--text-primary)',
                background: '#fff',
                width: 200,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--blue-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          {/* 变动名称 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#64748B', whiteSpace: 'nowrap', flexShrink: 0 }}>变动名称</span>
            <div style={{ position: 'relative' }}>
              <select
                value={changeName}
                onChange={e => { setChangeName(e.target.value); setPage(1) }}
                style={{
                  height: 34,
                  padding: '0 32px 0 12px',
                  border: '1.5px solid var(--border-default)',
                  borderRadius: 6,
                  fontSize: 13,
                  color: changeName ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  minWidth: 160,
                }}
              >
                <option value="">请选择变动名称</option>
                {CHANGE_NAMES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', fontSize: 10, color: 'var(--text-muted)'
              }}>▼</span>
            </div>
          </div>

          {/* 变动日期 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#64748B', whiteSpace: 'nowrap', flexShrink: 0 }}>变动日期</span>
            <input
              type="date"
              value={startDate}
              onChange={e => { setStartDate(e.target.value); setPage(1) }}
              style={{
                height: 34,
                padding: '0 10px',
                border: '1.5px solid var(--border-default)',
                borderRadius: 6,
                fontSize: 13,
                color: 'var(--text-primary)',
                background: '#fff',
                outline: 'none',
                width: 140,
              }}
            />
            <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>—</span>
            <input
              type="date"
              value={endDate}
              onChange={e => { setEndDate(e.target.value); setPage(1) }}
              style={{
                height: 34,
                padding: '0 10px',
                border: '1.5px solid var(--border-default)',
                borderRadius: 6,
                fontSize: 13,
                color: 'var(--text-primary)',
                background: '#fff',
                outline: 'none',
                width: 140,
              }}
            />
          </div>
        </div>

        {/* 查询 + 重置 */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={doFilter}
            style={{
              height: 34,
              padding: '0 20px',
              background: 'var(--blue-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
            }}
          >🔍 查询</button>
          <button
            onClick={doReset}
            style={{
              height: 34,
              padding: '0 20px',
              background: '#fff',
              color: 'var(--text-secondary)',
              border: '1.5px solid var(--border-default)',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >重置</button>
        </div>
      </div>

      {/* ==================== 三、操作按钮区 ==================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '16px 24px',
        marginBottom: 16,
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}>
        <button
          style={{
            height: 34,
            padding: '0 18px',
            background: '#fff',
            color: 'var(--blue-primary)',
            border: '1.5px solid var(--blue-primary)',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
          onClick={() => alert('导出明细（演示）')}
        >📥 导出明细</button>
        <button
          style={{
            height: 34,
            padding: '0 18px',
            background: '#fff',
            color: 'var(--red-online)',
            border: '1.5px solid var(--red-online)',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
          onClick={() => setClearModal(true)}
        >🗑 清空积分</button>
      </div>

      {/* ==================== 四、表格列表区 ==================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['序号', '会员姓名', '手机号', '积分变动名称', '变动数', '剩余积分', '变动时间'].map((h, i) => (
                  <th key={i} style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    fontSize: 13,
                    borderBottom: '1px solid var(--border-subtle)',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-dim)' }}>
                    暂无数据
                  </td>
                </tr>
              ) : pageData.map((r, idx) => (
                <tr key={r.id} style={{
                  borderBottom: idx < pageData.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <td style={{ padding: '12px 16px', color: 'var(--text-dim)', fontSize: 12 }}>{start + idx + 1}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-secondary)' }}>{maskPhone(r.phone)}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{r.changeName}</td>
                  <td style={{
                    padding: '12px 16px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 14,
                    fontWeight: 700,
                    color: r.amount > 0 ? 'var(--green-online)' : 'var(--red-online)',
                  }}>{fmtAmount(r.amount)}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{fmtBalance(r.balance)}</td>
                  <td style={{ padding: '12px 16px', color: '#9CA3AF', fontSize: 12, whiteSpace: 'nowrap' }}>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== 五、分页区 ==================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '14px 20px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        {/* 左侧信息 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#64748B' }}>
            共 <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{total}</strong> 条记录
          </span>
          <span style={{ fontSize: 13, color: '#64748B' }}>
            第 <strong style={{ color: 'var(--blue-primary)', fontWeight: 700 }}>{page}</strong> / {totalPages} 页
          </span>
        </div>

        {/* 分页控件 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* 页码按钮 */}
          {renderPages().map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1.5px solid ${p === page ? 'var(--blue-primary)' : 'var(--border-default)'}`,
                borderRadius: 6,
                background: p === page ? '#fff' : '#fff',
                color: p === page ? 'var(--blue-primary)' : 'var(--text-secondary)',
                fontSize: 13,
                fontWeight: p === page ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >{p}</button>
          ))}

          {/* 上一页 */}
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid var(--border-default)',
              borderRadius: 6,
              background: '#fff',
              color: page === 1 ? 'var(--text-dim)' : 'var(--text-secondary)',
              fontSize: 16,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: page === 1 ? 0.4 : 1,
            }}
          >‹</button>

          {/* 下一页 */}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            style={{
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid var(--border-default)',
              borderRadius: 6,
              background: '#fff',
              color: page >= totalPages ? 'var(--text-dim)' : 'var(--text-secondary)',
              fontSize: 16,
              cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              opacity: page >= totalPages ? 0.4 : 1,
            }}
          >›</button>

          {/* 分割线 */}
          <div style={{ width: 1, height: 24, background: 'var(--border-subtle)', margin: '0 4px' }} />

          {/* 10条/页 */}
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{
              height: 34,
              padding: '0 28px 0 10px',
              border: '1.5px solid var(--border-default)',
              borderRadius: 6,
              fontSize: 13,
              color: 'var(--text-primary)',
              background: '#fff',
              cursor: 'pointer',
              appearance: 'none',
              position: 'relative',
            }}
          >
            <option value={10}>10 条/页</option>
            <option value={20}>20 条/页</option>
            <option value={50}>50 条/页</option>
          </select>

          {/* 跳至 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#64748B' }}>跳至</span>
            <input
              value={jumpVal}
              onChange={e => setJumpVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJump()}
              placeholder="页码"
              style={{
                width: 54,
                height: 34,
                padding: '0 10px',
                border: '1.5px solid var(--border-default)',
                borderRadius: 6,
                fontSize: 13,
                color: 'var(--text-primary)',
                background: '#fff',
                textAlign: 'center',
                outline: 'none',
              }}
            />
            <span style={{ fontSize: 13, color: '#64748B' }}>页</span>
            <button
              onClick={handleJump}
              style={{
                height: 34,
                padding: '0 12px',
                background: 'var(--blue-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >确定</button>
          </div>
        </div>
      </div>

      {/* ==================== 六、清空积分二次确认弹窗 ==================== */}
      <CenterModal
        open={clearModal}
        onClose={() => setClearModal(false)}
        title="清空积分确认"
        width={440}
        footer={
          <>
            <button
              onClick={() => setClearModal(false)}
              style={{
                height: 34, padding: '0 20px',
                background: '#fff', color: 'var(--text-secondary)',
                border: '1.5px solid var(--border-default)', borderRadius: 6,
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >取消</button>
            <button
              onClick={handleClear}
              style={{
                height: 34, padding: '0 20px',
                background: 'var(--red-online)', color: '#fff',
                border: 'none', borderRadius: 6,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(239,68,68,0.3)',
              }}
            >确认清空</button>
          </>
        }
      >
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            确定要清空所有积分吗？
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            此操作不可逆，清空后所有会员积分将归零
          </p>
        </div>
      </CenterModal>
    </div>
  )
}
