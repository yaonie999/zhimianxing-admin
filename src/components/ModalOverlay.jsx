import React, { useEffect, useRef } from 'react'

/**
 * 统一的弹窗遮罩层管理组件
 * - ESC 键关闭（仅当没有输入框聚焦时）
 * - 点击遮罩外层关闭
 * - 点击弹窗内部不会触关闭
 * - 统一 z-index 层级
 */
export default function ModalOverlay({ children, onClose, show }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!show) return

    function handleKeyDown(e) {
      // ESC 关闭（避免在输入框/文本区聚焦时误关闭）
      if (e.key === 'Escape') {
        const tag = document.activeElement?.tagName
        const isEditing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)
        if (!isEditing) onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [show, onClose])

  // 禁止滚动
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [show])

  if (!show) return null

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => {
        // 只有点击遮罩本身（不是弹窗内容）才关闭
        if (e.target === overlayRef.current) onClose()
      }}
    >
      {children}
    </div>
  )
}
