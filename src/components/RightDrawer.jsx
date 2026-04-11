import React, { useEffect, useRef } from 'react'

/**
 * 统一右侧抽屉组件
 * - 从右侧滑入
 * - 遮罩层占满屏幕，点击遮罩关闭
 * - ESC 键关闭
 * - 传入 children 作为抽屉内容
 */
export default function RightDrawer({ open, onClose, title, width = 520, children, footer }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* 遮罩层 */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
          zIndex: 900,
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={onClose}
      />
      {/* 抽屉主体 - 右侧滑入 */}
      <div
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: typeof width === 'number' ? `${width}px` : width,
          maxWidth: '95vw',
          background: '#fff',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
          zIndex: 901,
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.25s ease',
          overflow: 'hidden',
        }}
      >
        {/* 标题栏 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
          background: '#fff',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 18, color: 'var(--text-dim)', lineHeight: 1,
              padding: '4px 6px', borderRadius: 4,
            }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >✕</button>
        </div>

        {/* 内容区 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>

        {/* 底部按钮 */}
        {footer && (
          <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: 10,
            padding: '14px 24px',
            borderTop: '1px solid var(--border-subtle)',
            flexShrink: 0,
            background: '#fff',
          }}>
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  )
}
