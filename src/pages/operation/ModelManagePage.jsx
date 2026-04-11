import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 常量 ==================== */
const ROWS = ['睡眠状态', '昼夜节律', '清醒机制']
const COLS = ['易感因素', '诱发因素', '维持因素']

/* 初始矩阵数据（3行×3列）matrix[rowIdx][colIdx] = 指标列表 */
const INIT_MATRIX = [
  // row 0: 睡眠状态
  [
    [{ id: 1, name: '年龄' }, { id: 2, name: '性别' }, { id: 3, name: '遗传因素' }, { id: 4, name: '性格特征' }],
    [{ id: 5, name: '在床上做与睡眠无关的事（性行为除外）' }, { id: 6, name: '为了补觉而提前上床' }, { id: 7, name: '周末或假日赖床不起' }, { id: 8, name: '夜间入睡时间不固定' }, { id: 9, name: '白天缺少体力活动' }, { id: 10, name: '午睡时间过长' }],
    [{ id: 11, name: '担心睡眠' }, { id: 12, name: '上床后仍思虑工作、学习、生活烦恼' }, { id: 13, name: '上床后感到饥饿或过饱' }, { id: 14, name: '喝了含咖啡因的饮料' }, { id: 15, name: '睡前使用手机、iPad等电子产品' }, { id: 16, name: '周围环境噪声' }, { id: 17, name: '倒班/跨时区旅行' }],
  ],
  // row 1: 昼夜节律
  [
    [{ id: 18, name: '轮班工作' }, { id: 19, name: '时差变化' }, { id: 20, name: '不规律作息' }],
    [{ id: 21, name: '生活/工作/学习压力大' }, { id: 22, name: '突发事件导致情绪波动' }, { id: 23, name: '悲伤/抑郁情绪' }, { id: 24, name: '焦虑/担忧情绪' }],
    [{ id: 25, name: '噪音（打鼾、说话、宠物等）' }, { id: 26, name: '光线（路灯、夜灯、电子设备等）' }, { id: 27, name: '温度（太冷/太热）' }, { id: 28, name: '卧具（枕头/床垫不舒适）' }, { id: 29, name: 'Space-空间（床/卧室不舒适）' }, { id: 30, name: '更换睡眠环境（酒店/朋友家）' }],
  ],
  // row 2: 清醒机制
  [
    [{ id: 31, name: '思虑过度' }, { id: 32, name: '反刍思维（反复回想）' }, { id: 33, name: '全身紧张/肌肉紧绷' }, { id: 34, name: '植物神经兴奋（心慌/出汗/尿频）' }],
    [{ id: 35, name: '午睡时间过长' }, { id: 36, name: '白天补觉' }, { id: 37, name: '卧床时间过长' }],
    [{ id: 38, name: '对失眠后果的灾难化认知' }, { id: 39, name: '无法控制担忧的失控感' }, { id: 40, name: '长期使用助眠药物' }, { id: 41, name: '长期饮酒助眠' }],
  ],
]

/* ==================== 编辑指标弹窗 ==================== */
function EditIndicatorModal({ initialName, onConfirm, onClose }) {
  const [name, setName] = useState(initialName)

  return (
    <CenterModal title="管理指标" open={true} onClose={onClose} width={480}>
      <div style={{
        background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: 6,
        padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#713F12', lineHeight: 1.6,
      }}>
        💡 点击确定时，验证名称不能重复；点击修改图标时，弹窗中的指标名称默认显示为当前要修改指标的名称
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
          指标名称 <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          className="form-input"
          style={{ width: '100%', boxSizing: 'border-box' }}
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          onKeyDown={e => e.key === 'Enter' && name.trim() && onConfirm(name.trim())}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', height: 34, lineHeight: '34px', padding: '0 20px', fontSize: 13 }} onClick={onClose}>取消</button>
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 20px', fontSize: 13 }} onClick={() => name.trim() && onConfirm(name.trim())}>确定</button>
      </div>
    </CenterModal>
  )
}

/* ==================== 管理指标弹窗 ==================== */
function ManageIndicatorsModal({ rowIdx, colIdx, matrix, setMatrix, onClose }) {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [addName, setAddName] = useState('')
  const [editTarget, setEditTarget] = useState(null)

  const cellData = matrix[rowIdx][colIdx]
  const filtered = cellData.filter(ind => !search || ind.name.toLowerCase().includes(search.toLowerCase()))

  function syncUpdate(newCell) {
    setMatrix(prev => {
      const next = prev.map(r => [...r])
      next[rowIdx][colIdx] = newCell
      return next
    })
  }

  function handleDelete(delId) { syncUpdate(cellData.filter(i => i.id !== delId)) }

  function handleAdd() {
    if (!addName.trim()) return
    syncUpdate([...cellData, { id: Date.now(), name: addName.trim() }])
    setAddName('')
    setShowAdd(false)
  }

  function handleEditConfirm(name) {
    syncUpdate(cellData.map(i => i.id === editTarget.id ? { ...i, name } : i))
    setEditTarget(null)
  }

  return (
    <CenterModal title="管理指标" open={true} onClose={onClose} width={680}>
      {/* 顶部提示 */}
      <div style={{
        background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: 6, padding: '10px 14px', marginBottom: 16,
        fontSize: 13, color: 'var(--blue-primary)', lineHeight: 1.5,
      }}>
        您正在管理「{ROWS[rowIdx]} - {COLS[colIdx]}」的指标信息
      </div>

      {/* 筛选区 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
        <div className="search-input-wrap" style={{ width: 240 }}>
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="请输入" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-query" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 13 }}>查询</button>
        <button className="btn-reset" style={{ width: 60, height: 34, lineHeight: '34px', padding: 0, fontSize: 13 }} onClick={() => setSearch('')}>重置</button>
      </div>

      {/* 表格 */}
      <div className="table-wrapper" style={{ marginBottom: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>序号</th>
              <th>名称</th>
              <th style={{ width: 120 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px 0' }}>暂无数据</td></tr>
            ) : filtered.map((ind, idx) => (
              <tr key={ind.id}>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{idx + 1}</td>
                <td style={{ color: 'var(--text-primary)', fontSize: 13 }}>{ind.name}</td>
                <td>
                  <button className="btn-action" style={{ borderColor: 'var(--blue-primary)', color: 'var(--blue-primary)', marginRight: 6, fontSize: 12, padding: '2px 8px' }} onClick={() => setEditTarget(ind)}>编辑</button>
                  <button className="btn-action" style={{ borderColor: '#EF4444', color: '#EF4444', fontSize: 12, padding: '2px 8px' }} onClick={() => handleDelete(ind.id)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加按钮 */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
        <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 20px', fontSize: 13 }} onClick={() => setShowAdd(true)}>+ 添加</button>
      </div>

      {/* 添加弹窗 */}
      {showAdd && (
        <CenterModal title="添加指标" open={true} onClose={() => { setShowAdd(false); setAddName('') }} width={480}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
              指标名称 <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input className="form-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="请输入指标名称" value={addName} onChange={e => setAddName(e.target.value)} autoFocus onKeyDown={e => e.key === 'Enter' && handleAdd()} />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', height: 34, lineHeight: '34px', padding: '0 20px', fontSize: 13 }} onClick={() => { setShowAdd(false); setAddName('') }}>取消</button>
            <button className="btn btn-primary" style={{ height: 34, lineHeight: '34px', padding: '0 20px', fontSize: 13 }} onClick={handleAdd}>确定</button>
          </div>
        </CenterModal>
      )}

      {/* 编辑弹窗 */}
      {editTarget && (
        <EditIndicatorModal initialName={editTarget.name} onConfirm={handleEditConfirm} onClose={() => setEditTarget(null)} />
      )}
    </CenterModal>
  )
}

/* ==================== 分类矩阵（CSS Grid 实现，9格强制等高对齐） ==================== */
function ModelMatrixTab({ matrix, setMatrix }) {
  const [manageTarget, setManageTarget] = useState(null)

  // 列标题和行标题
  const colLabels = COLS
  const rowLabels = ROWS

  return (
    <>
      {/* 说明 */}
      <div style={{
        background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: 6,
        padding: '10px 16px', margin: '16px 20px 0', fontSize: 12, color: '#713F12', lineHeight: 1.6,
      }}>
        💡 分类矩阵：行为认知失眠模型（3P模型）的三因素模型，包括易感因素(Predisposing)、诱发因素(Precipitating)、维持因素(Perpetuating)。
        每个分类下方显示对应指标，点击「管理指标」可进行增删改操作。
      </div>

      {/* Grid 矩阵容器 */}
      <div style={{ padding: '20px', overflowX: 'auto' }}>
        {/* 外层 Grid：3列（行标题 + 3列内容） */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px repeat(3, 1fr)',
          gridTemplateRows: 'auto repeat(3, 180px)',
          gap: 0,
          minWidth: 600,
          border: '1px solid var(--border-default)',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          {/* ===== 第0行：列标题 ===== */}
          {/* 左上角空白 */}
          <div style={{
            background: 'var(--bg-elevated)',
            borderRight: '1px solid var(--border-default)',
            borderBottom: '1px solid var(--border-default)',
          }} />

          {/* 3个列标题 */}
          {colLabels.map(col => (
            <div key={col} style={{
              background: 'var(--bg-elevated)',
              borderRight: '1px solid var(--border-default)',
              borderBottom: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}>
              {col}
            </div>
          ))}

          {/* ===== 3行数据行 ===== */}
          {rowLabels.map((row, ri) => (
            <React.Fragment key={row}>
              {/* 行标题 */}
              <div style={{
                background: 'var(--bg-elevated)',
                borderRight: '1px solid var(--border-default)',
                borderBottom: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
              }}>
                {row}
              </div>

              {/* 9个数据单元格（3列 × 3行） */}
              {colLabels.map((col, ci) => {
                const cellInds = matrix[ri]?.[ci] || []
                return (
                  <div
                    key={col}
                    style={{
                      background: 'var(--bg-card)',
                      borderRight: '1px solid var(--border-subtle)',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      // 强制等高：撑满 Grid 行高度
                      minHeight: 0,
                      overflow: 'hidden',
                    }}
                  >
                    {/* 指标列表（可滚动） */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 0' }}>
                      {cellInds.length === 0 ? (
                        <span style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>暂无指标</span>
                      ) : cellInds.map(ind => (
                        <div key={ind.id} style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          padding: '3px 0',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}>
                          {ind.name}
                        </div>
                      ))}
                    </div>

                    {/* 按钮：永远固定在底部居中 */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '8px 14px',
                      flexShrink: 0,
                      borderTop: '1px solid var(--border-subtle)',
                    }}>
                      <button
                        className="btn btn-primary"
                        style={{
                          height: 28,
                          lineHeight: '28px',
                          padding: '0 14px',
                          fontSize: 12,
                          minWidth: 80,
                          flexShrink: 0,
                        }}
                        onClick={() => setManageTarget({ rowIdx: ri, colIdx: ci })}
                      >
                        管理指标
                      </button>
                    </div>
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {manageTarget && (
        <ManageIndicatorsModal
          rowIdx={manageTarget.rowIdx}
          colIdx={manageTarget.colIdx}
          matrix={matrix}
          setMatrix={setMatrix}
          onClose={() => setManageTarget(null)}
        />
      )}
    </>
  )
}

/* ==================== 主页面 ==================== */
export default function ModelManagePage() {
  const [matrix, setMatrix] = useState(() => INIT_MATRIX.map(row => [...row]))
  return <ModelMatrixTab matrix={matrix} setMatrix={setMatrix} />
}
