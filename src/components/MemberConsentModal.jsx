import React, { useState, useEffect, useRef } from 'react'

const CONSENT_CONTENT = {
  mainTitle: '短程行为治疗入组知情同意书',
  intro: '以下信息旨在帮助您了解"CBT-I 短程行为治疗入组管理"服务的具体内容、您的权益及相关要求。在您确认加入之前，请务必完整阅读以下条款。如有任何疑问，请向您的主治医生或健康管理师咨询。',
  section1: {
    title: '一、治疗目的与预期效果',
    content: `1. 通过系统化的睡眠健康管理，帮助您建立规律的睡眠节律，改善入睡效率和睡眠质量。
2. 通过认知行为疗法（CBT-I）核心技术，帮助您识别并调整对睡眠的不合理认知与行为模式。
3. 本服务为14天/周期管理，包含睡眠评估、方案定制、每日打卡反馈、阶段复盘等环节。
4. 预期效果因个体差异而不同，治疗期间请配合健康管理师的指导，积极完成每日打卡任务。`
  },
  section2: {
    title: '二、治疗过程说明',
    content: `1. 入组后，您将接受睡眠评估问卷（PSQI、ESS等）以建立个人睡眠档案。
2. 根据评估结果，健康管理师将为您制定个性化的睡眠改善方案。
3. 治疗期间，您需每日通过小程序完成睡眠打卡（就寝/起床时间、睡眠质量自评）。
4. 每5-7天进行一次阶段复盘，根据数据反馈调整方案内容。
5. 管理周期结束时，将出具完整的睡眠管理报告供您和您的医生参考。`
  },
  section3: {
    title: '三、您的权利',
    content: `1. 您有权了解治疗目的、方法和预期效果。
2. 您有权随时退出入组管理，退出前请告知您的健康管理师。
3. 您的个人健康信息将严格保密，未经本人授权不会对外披露。
4. 您有权拒绝接受任何您不理解的评估问卷或治疗建议。
5. 退出后，您仍可保存个人的睡眠数据和报告供后续参考。`
  },
  section4: {
    title: '四、您的义务与配合要求',
    content: `1. 治疗期间请保持相对规律的作息时间，避免昼夜颠倒。
2. 请于每日22:00前完成就寝打卡，并于次日早晨填写起床时间。
3. 请按要求如实填写每日睡眠日记，不得虚构或篡改数据。
4. 如有身体不适或特殊情况，请主动告知健康管理师。
5. 管理期间禁止使用其他睡眠类药物或接受其他睡眠治疗（如有需要请提前告知）。`
  },
  section5: {
    title: '五、费用说明',
    content: `1. 入组管理服务费用标准请参见《睡眠健康管理服务协议》。
2. 费用按周期收取，中途退出不予退款。
3. 打卡数据将作为费用结算的依据，请确保每日按时打卡。
4. 如有退费争议，请联系客服人员协调处理。`
  },
  section6: {
    title: '六、隐私保护与数据使用',
    content: `1. 您的睡眠数据、健康信息将加密存储于系统数据库中。
2. 数据仅用于为您提供个性化的健康管理服务，不会用于商业推广。
3. 如涉及学术研究或服务改进，数据将进行匿名化处理后方可使用。
4. 您可随时申请导出个人数据，数据导出请求将在7个工作日内完成。
5. 账号注销后，所有数据将在30天内永久删除。`
  },
  section7: {
    title: '七、其他说明',
    content: `1. 本协议自您点击"确认签署"之日起生效，有效期至管理周期结束。
2. 如因不可抗力导致服务中断，我们将另行通知并协商解决方案。
3. 本协议的最终解释权归"智眠星"平台所有。
4. 若您对服务有任何建议或投诉，请通过客服渠道反馈。`
  },
  signature: {
    patientLabel: '患者/授权代理人签名：',
    therapistLabel: '健康管理师签名：',
    dateLabel: '签署日期：',
    note: '注：本同意书一式两份，患者与健康管理师各执一份，具有同等法律效力。'
  }
}

export default function MemberConsentModal({ member, onClose }) {
  const [signed, setSigned] = useState(false)
  const overlayRef = useRef(null)

  // ESC 键关闭（避免在输入框聚焦时误触）
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        const tag = document.activeElement?.tagName
        if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handlePrint() { window.print() }
  function handleExport() { alert('导出为PDF功能演示中，实际项目可接入 html2pdf / jspdf') }

  const c = CONSENT_CONTENT

  return (
    <>
      {/* 遮罩层：点击外部关闭，点击内部不关闭 */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 900,
          animation: 'fadeIn 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => {
          // 只有直接点击遮罩（不是弹窗内容）才关闭
          if (e.target === overlayRef.current) onClose()
        }}
      >
        {/* 弹窗主体：阻止事件冒泡，点击弹窗内容不会触发遮罩关闭 */}
        <div
          style={{
            position: 'relative',
            width: '90vw', maxWidth: 1100,
            height: '90vh',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            zIndex: 901,
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.25s ease',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 顶部操作栏 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', flexShrink: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1E3A5F' }}>入组知情同意书</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={handleExport}>📥 导出</button>
              <button className="btn btn-secondary btn-sm" onClick={handlePrint}>🖨️ 打印</button>
              <button className="btn btn-ghost btn-sm" onClick={onClose}>✕ 关闭</button>
            </div>
          </div>

          {/* 左+右分栏 */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* 左侧患者信息 */}
            <div style={{ width: 220, flexShrink: 0, background: '#F8FAFC', borderRight: '1px solid #E2E8F0', padding: '20px 16px', overflowY: 'auto' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>患者信息</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #1E3A5F, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 700, margin: '0 auto 8px' }}>
                    {member?.name?.charAt(0) || '?'}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>{member?.name || '未知'}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{member?.level || ''}</div>
                </div>
                <InfoRow label="卡号" value={member?.cardNo || '-'} />
                <InfoRow label="手机" value={member?.phone || '-'} />
                <InfoRow label="性别" value={member?.gender || '-'} />
                <InfoRow label="年龄" value={member?.age ? `${member.age}岁` : '-'} />
                <InfoRow label="婚姻" value={member?.marriage || '-'} />
                <InfoRow label="职业" value={member?.job || '-'} />
                <InfoRow label="工作室" value={member?.studio || '-'} />
                <InfoRow label="健康师" value={member?.advisor || '-'} />
                <InfoRow label="入组日期" value={member?.archiveTime ? member.archiveTime.split(' ')[0] : '-'} />
              </div>
            </div>

            {/* 右侧知情同意书正文 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 19, fontWeight: 700, color: '#1E3A5F', marginBottom: 6 }}>{c.mainTitle}</div>
                <div style={{ fontSize: 11, color: '#CBD5E1' }}>文件编号：SM-CBTI-{member?.cardNo || '000000'}-IC</div>
              </div>

              <div style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.9, marginBottom: 18, padding: '10px 14px', background: '#F8FAFC', borderLeft: '3px solid #1E3A5F', borderRadius: 4 }}>
                {c.intro}
              </div>

              {[c.section1, c.section2, c.section3, c.section4, c.section5, c.section6, c.section7].map((sec, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F', marginBottom: 6, paddingBottom: 5, borderBottom: '1px solid #E2E8F0' }}>{sec.title}</div>
                  <div style={{ fontSize: 12.5, color: '#E2E8F0', lineHeight: 2, whiteSpace: 'pre-line' }}>{sec.content}</div>
                </div>
              ))}

              {/* 签名区 */}
              <div style={{ marginTop: 28, padding: '16px 20px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', gap: 36, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 5 }}>{c.signature.patientLabel}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F', paddingBottom: 5, borderBottom: '1px solid #E2E8F0', width: 190 }}>{member?.name || ''}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 5 }}>{c.signature.therapistLabel}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F', paddingBottom: 5, borderBottom: '1px solid #E2E8F0', width: 150 }}>{member?.advisor || ''}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 5 }}>{c.signature.dateLabel}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F', paddingBottom: 5, borderBottom: '1px solid #E2E8F0', width: 110 }}>{member?.archiveTime ? member.archiveTime.split(' ')[0] : ''}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#CBD5E1', fontStyle: 'italic' }}>{c.signature.note}</div>
              </div>

              {!signed ? (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <button className="btn btn-primary" style={{ padding: '9px 36px', fontSize: 14, borderRadius: 8 }} onClick={() => setSigned(true)}>
                    ✅ 确认签署
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', marginTop: 20, padding: '10px 20px', background: '#D1FAE5', borderRadius: 8, color: '#065F46', fontSize: 13 }}>
                  ✅ 已签署，感谢您的配合！本知情同意书已生效。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function InfoRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: '#CBD5E1', marginBottom: 1 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#1E3A5F', fontWeight: 500, wordBreak: 'break-all' }}>{value}</div>
    </div>
  )
}
