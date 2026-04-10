import React, { useEffect, useRef } from 'react'

/**
 * 统一居中弹窗组件
 * - 遮罩层占满屏幕，点击外部关闭
 * - 弹窗主体居中，固定宽度，圆角，带动画
 * - ESC 键关闭
 * - 传入 children 作为弹窗内容
 */
export default function CenterModal({ open, onClose, title, width = 520, children, footer }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        const tag = document.activeElement?.tagName
        if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) onClose()
      }
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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.18s ease',
        }}
        onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      >
        {/* 弹窗主体 */}
        <div
          style={{
            position: 'relative',
            width: typeof width === 'number' ? `${width}px` : width,
            maxWidth: '95vw',
            maxHeight: '90vh',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            zIndex: 901,
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            animation: 'scaleIn 0.2s ease',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 标题栏 */}
          {title && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid #E2E8F0',
              flexShrink: 0,
              background: '#F8FAFC',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F' }}>{title}</div>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#CBD5E1', lineHeight: 1, padding: '2px 6px', borderRadius: 4 }}
                onMouseEnter={e => e.target.style.color = '#E2E8F0'}
                onMouseLeave={e => e.target.style.color = '#CBD5E1'}
              >✕</button>
            </div>
          )}

          {/* 内容区 */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {children}
          </div>

          {/* 底部按钮 */}
          {footer && (
            <div style={{
              display: 'flex', justifyContent: 'flex-end', gap: 10,
              padding: '14px 24px',
              borderTop: '1px solid #E2E8F0',
              flexShrink: 0,
              background: '#F8FAFC',
            }}>
              {footer}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </>
  )
}
