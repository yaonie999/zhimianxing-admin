import React, { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import '../styles/admin.css'

// 模拟会员数据（真实项目中从 API 获取）
const MOCK_DETAIL = {
  1: {
    id: 1, name: '张伟', gender: '男', age: 45, phone: '138****1234', job: '企业高管',
    cardNo: '20251225001', group: '睡眠心理科', studio: '朝阳睡眠工作室',
    level: '黄金会员', checkinDays: 85, archiveTime: '2025-12-25 21:47', marriage: '已婚', avatar: null,
    assessments: [
      { label: '入组同意书', status: '已完成', time: '2025-12-25' },
      { label: '睡眠半结构式晤谈问卷', status: '已完成', time: '2025-12-25' },
      { label: '睡眠日记', status: '已完成', time: '2026-01-10' },
    ],
    pushedScales: ['匹兹堡睡眠质量指数(PSQI)', 'Epworth嗜睡量表(ESS)'],
    evalRecords: [
      { date: '2026-01-05', doctor: '李医生', content: '入睡困难改善明显，建议继续当前作息计划' },
      { date: '2026-02-10', doctor: '李医生', content: '睡眠效率提升至75%，继续保持' },
    ],
    checkinRecords: [
      { date: '2026-04-10', status: '✅ 已打卡', sleepHours: '7.5h', quality: '良好' },
      { date: '2026-04-09', status: '✅ 已打卡', sleepHours: '6.8h', quality: '一般' },
      { date: '2026-04-08', status: '✅ 已打卡', sleepHours: '8.0h', quality: '优秀' },
      { date: '2026-04-07', status: '❌ 未打卡', sleepHours: '-', quality: '-' },
      { date: '2026-04-06', status: '✅ 已打卡', sleepHours: '7.2h', quality: '良好' },
    ],
    timeline: [
      { date: '2025-12-25', event: '入组登记，填写入组同意书', type: '入组' },
      { date: '2025-12-25', event: '完成睡眠半结构式晤谈问卷', type: '评估' },
      { date: '2025-12-26', event: '首次打卡，开始14天管理周期', type: '打卡' },
      { date: '2026-01-05', event: '第一次评估反馈，李医生面谈', type: '评估' },
      { date: '2026-01-10', event: '完成睡眠日记提交', type: '打卡' },
      { date: '2026-02-10', event: '第二次评估反馈，睡眠效率提升', type: '评估' },
      { date: '2026-04-01', event: '完成第85天打卡', type: '打卡' },
    ],
  },
  2: {
    id: 2, name: '李娜', gender: '女', age: 32, phone: '139****5678', job: '教师',
    cardNo: '20251226002', group: '睡眠心理科', studio: '海淀健康中心',
    level: '白银会员', checkinDays: 42, archiveTime: '2025-12-26 10:00', marriage: '已婚', avatar: null,
    assessments: [
      { label: '入组同意书', status: '已完成', time: '2025-12-26' },
      { label: '睡眠半结构式晤谈问卷', status: '已完成', time: '2025-12-26' },
      { label: '睡眠日记', status: '进行中', time: '2026-02-01' },
    ],
    pushedScales: ['匹兹堡睡眠质量指数(PSQI)'],
    evalRecords: [
      { date: '2026-01-10', doctor: '王健康师', content: '焦虑情绪有所缓解，睡眠质量改善中' },
    ],
    checkinRecords: [
      { date: '2026-04-10', status: '✅ 已打卡', sleepHours: '7.0h', quality: '良好' },
      { date: '2026-04-09', status: '✅ 已打卡', sleepHours: '6.5h', quality: '一般' },
      { date: '2026-04-08', status: '❌ 未打卡', sleepHours: '-', quality: '-' },
    ],
    timeline: [
      { date: '2025-12-26', event: '入组登记', type: '入组' },
      { date: '2025-12-26', event: '完成入组评估问卷', type: '评估' },
      { date: '2026-01-01', event: '开始打卡计划', type: '打卡' },
      { date: '2026-01-10', event: '第一次评估反馈', type: '评估' },
    ],
  },
  3: {
    id: 3, name: '王磊', gender: '男', age: 28, phone: '137****9012', job: 'IT工程师',
    cardNo: '20251227003', group: '睡眠心理科', studio: '浦东睡眠医学中心',
    level: '钻石会员', checkinDays: 120, archiveTime: '2025-12-27 14:30', marriage: '未婚', avatar: null,
    assessments: [
      { label: '入组同意书', status: '已完成', time: '2025-12-27' },
      { label: '睡眠半结构式晤谈问卷', status: '已完成', time: '2025-12-27' },
      { label: '睡眠日记', status: '已完成', time: '2026-01-15' },
    ],
    pushedScales: ['Epworth嗜睡量表(ESS)', '睡眠呼吸暂停筛查'],
    evalRecords: [
      { date: '2026-01-15', doctor: '张睡眠师', content: 'IT行业作息不规律，调整方案制定中' },
      { date: '2026-03-01', doctor: '张睡眠师', content: '深度睡眠占比提升至22%，效果显著' },
    ],
    checkinRecords: [
      { date: '2026-04-10', status: '✅ 已打卡', sleepHours: '8.5h', quality: '优秀' },
      { date: '2026-04-09', status: '✅ 已打卡', sleepHours: '7.8h', quality: '优秀' },
      { date: '2026-04-08', status: '✅ 已打卡', sleepHours: '8.0h', quality: '良好' },
    ],
    timeline: [
      { date: '2025-12-27', event: '入组登记', type: '入组' },
      { date: '2025-12-27', event: '完成问卷评估', type: '评估' },
      { date: '2026-01-01', event: '加入打卡计划', type: '打卡' },
      { date: '2026-01-15', event: '首次评估反馈', type: '评估' },
      { date: '2026-03-01', event: '第二次评估，效果显著提升', type: '评估' },
    ],
  },
}

export default function MemberDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  // 优先用导航传来的数据，否则按ID查模拟数据
  const member = location.state?.member || MOCK_DETAIL[Number(id)] || {
    id: Number(id), name: '未知会员', gender: '-', age: '-', phone: '-', job: '-',
    cardNo: '-', group: '-', studio: '-', level: '-', checkinDays: 0, archiveTime: '-',
    marriage: '-', avatar: null, assessments: [], pushedScales: [], evalRecords: [], checkinRecords: [], timeline: []
  }

  const [activeSection, setActiveSection] = useState('basic')

  const sections = [
    { key: 'basic', label: '基本资料' },
    { key: 'consent', label: '入组同意书' },
    { key: 'plans', label: '方案和报告' },
    { key: 'checkin', label: '打卡记录' },
    { key: 'timeline', label: '用户旅程时间轴' },
  ]

  function renderSection() {
    switch (activeSection) {
      case 'basic': return <BasicSection member={member} />
      case 'consent': return <ConsentSection member={member} />
      case 'plans': return <PlansSection member={member} />
      case 'checkin': return <CheckinSection records={member.checkinRecords} />
      case 'timeline': return <TimelineSection events={member.timeline} />
      default: return null
    }
  }

  return (
    <div style={{ padding: '0' }}>
      {/* 顶部导航 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 14, color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← 返回
        </button>
        <div style={{ flex: 1 }} />
      </div>

      {/* 会员信息头 */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1E3A5F, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 28, fontWeight: 700, flexShrink: 0
          }}>
            {member.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F' }}>{member.name}</span>
              <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{member.level}</span>
              <span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 10px', borderRadius: 12, fontSize: 12 }}>已打卡 {member.checkinDays} 天</span>
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 14, color: '#9CA3AF' }}>
              <span>👤 {member.gender} | {member.age}岁 | {member.marriage}</span>
              <span>📱 {member.phone}</span>
              <span>🏥 {member.studio}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm">✏️ 编辑</button>
          </div>
        </div>
      </div>

      {/* 左侧：Tab导航 + 内容 */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* 左侧Tab */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {sections.map(s => (
              <div
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                style={{
                  padding: '12px 20px', cursor: 'pointer', fontSize: 14,
                  fontWeight: activeSection === s.key ? 700 : 400,
                  color: activeSection === s.key ? '#1E3A5F' : '#9CA3AF',
                  background: activeSection === s.key ? '#EFF6FF' : 'transparent',
                  borderLeft: activeSection === s.key ? '3px solid #1E3A5F' : '3px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧内容 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

/* 基本资料 */
function BasicSection({ member }) {
  const items = [
    { label: '卡号', value: member.cardNo },
    { label: '电话', value: member.phone },
    { label: '职业', value: member.job },
    { label: '分组', value: member.group },
    { label: '建档时间', value: member.archiveTime },
    { label: '所属工作室', value: member.studio },
    { label: '入组/问询/评估', value: '' },
  ]

  return (
    <div className="card">
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <h3>📋 基本资料</h3>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {items.map(item => (
            <div key={item.label} style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 4 }}>{item.label}</div>
              {item.label === '入组/问询/评估' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {member.assessments.map(a => (
                    <div key={a.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14, color: '#E2E8F0' }}>{a.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge badge-success" style={{ fontSize: 11 }}>{a.status}</span>
                        <span style={{ fontSize: 11, color: '#CBD5E1' }}>{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1E3A5F', fontFamily: item.label === '卡号' || item.label === '电话' ? 'JetBrains Mono' : 'inherit' }}>
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 推送量表 */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 8 }}>推送量表</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {member.pushedScales.map(s => (
              <span key={s} className="badge badge-primary">{s}</span>
            ))}
          </div>
        </div>

        {/* 测评记录 */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: '#CBD5E1', marginBottom: 8 }}>测评记录</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {member.evalRecords.map((r, i) => (
              <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{r.doctor}</span>
                  <span style={{ color: '#CBD5E1', fontSize: 12 }}>{r.date}</span>
                </div>
                <div style={{ fontSize: 13, color: '#E2E8F0' }}>{r.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* 入组同意书 */
function ConsentSection({ member }) {
  return (
    <div className="card">
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>📄 入组同意书</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>🖨️ 打印</button>
          <button className="btn btn-primary btn-sm" onClick={() => alert('导出成功')}>📥 导出</button>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
          <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#1E3A5F', marginBottom: 16 }}>
            短程行为治疗入组知情同意书
          </div>
          <div style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 2 }}>
            <p style={{ marginBottom: 12 }}>
              <strong>姓名：{member.name}</strong> &nbsp;&nbsp;
              <strong>性别：{member.gender}</strong> &nbsp;&nbsp;
              <strong>年龄：{member.age}</strong> &nbsp;&nbsp;
              <strong>联系电话：{member.phone}</strong>
            </p>
            <p style={{ marginBottom: 16, fontWeight: 600 }}>尊敬的睡眠心理科患者及家属：</p>
            <p style={{ textIndent: 28, marginBottom: 12 }}>
              您好！短程行为治疗是针对睡眠医学中心患者开展的一种覆盖"生物-心理-医学"的全新管理模式，以BBTi（失眠的短程行为治疗）的理论、技术为基础，具有形式结构化、治疗周期短的特点，目的在于帮助失眠患者学习自我应对和调控失眠的方法。该治疗方式是通过改变对睡眠不正确的认知和行为，建立个性化的睡眠习惯和作息，使患者习得自我调控睡眠的有效方法，加强药物、物理等治疗的疗效，从而提高治愈率、降低复发率。管理人群主要针对睡眠障碍、睡眠障碍合并焦虑抑郁情绪等心理疾病和不合理睡眠行为导致的失眠问题的患者。
            </p>
            <p style={{ textIndent: 28, marginBottom: 12 }}>
              短程行为治疗的费用：管理周期为14天，费用按照一个周期一次性收费 元/人。参与者按治疗要求接受管理，工作人员将全程追踪您的情况并及时进行反馈与调整，为确保治疗的稳定性，希望您能全程参与，若中途因个人原因拒绝继续治疗，可提出退出管理周期的申请，但不予退费。
            </p>
            <p style={{ textIndent: 28, marginBottom: 12 }}>
              当您确认入组参与管理，我们将全程践行保密原则：所有参与短程行为治疗的工作人员及机构有责任保护您的隐私权，同样您有义务为与您一同参与团体治疗的其他参与者的信息进行保密，我们的治疗在内容和范围上受到国家法律和专业伦理规范的保护和约束。
            </p>
            <p style={{ textIndent: 28, marginBottom: 12 }}>
              下列情况为保密原则的例外：（1）参与短程行为治疗的工作人员发现患有伤害自身致伤害他人的严重危险时；（2）您有致命的传染性疾病或其他疾病等且可能危及自身以及他人安全时；（3）未成年人在受到性侵犯或虐待时；（4）法律规定需要披露时。
            </p>
            <p style={{ textIndent: 28, marginBottom: 16 }}>
              以上对参与短程行为治疗的参与者的评估解释权归于医院睡眠心理科。
            </p>
            <p style={{ textIndent: 28, marginBottom: 24 }}>
              我是短程行为治疗的参与者，我对所提供的信息承担一切法律责任，已经阅读，理解并且同意上述条款。
            </p>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'flex-end' }}>
              <div>
                <div style={{ marginBottom: 8 }}>参与者签字：<strong>{member.name}</strong></div>
                <div>日期：2026.1.22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 方案和报告 */
function PlansSection({ member }) {
  return (
    <div className="card">
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <h3>📊 方案和报告</h3>
      </div>
      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { icon: '📋', title: '睡眠方案', desc: '个性化睡眠改善方案，含作息计划、注意事项', btn: '查看方案', color: '#EFF6FF', borderColor: '#BFDBFE' },
          { icon: '📈', title: '睡眠报告', desc: '最新睡眠数据分析报告，包含各项指标解读', btn: '查看报告', color: '#F0FDF4', borderColor: '#BBF7D0' },
        ].map(item => (
          <div key={item.title} style={{ background: item.color, border: `1px solid ${item.borderColor}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1E3A5F', marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16 }}>{item.desc}</div>
            <button className="btn btn-primary btn-sm">{item.btn}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 打卡记录 */
function CheckinSection({ records }) {
  return (
    <div className="card">
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <h3>✅ 打卡记录</h3>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>日期</th>
              <th>打卡状态</th>
              <th>睡眠时长</th>
              <th>睡眠质量</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: 13 }}>{r.date}</td>
                <td>
                  <span className={`badge ${r.status.includes('已') ? 'badge-success' : 'badge-default'}`}
                    style={{ background: r.status.includes('已') ? '#D1FAE5' : '#FEE2E2', color: r.status.includes('已') ? '#059669' : '#EF4444' }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'JetBrains Mono', color: r.sleepHours === '-' ? '#CBD5E1' : '#1E3A5F' }}>{r.sleepHours}</td>
                <td>
                  {r.quality !== '-' && (
                    <span style={{
                      padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                      background: r.quality === '优秀' ? '#D1FAE5' : r.quality === '良好' ? '#EFF6FF' : '#FEF3C7',
                      color: r.quality === '优秀' ? '#059669' : r.quality === '良好' ? '#1D4ED8' : '#D97706'
                    }}>
                      {r.quality}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* 用户旅程时间轴 */
function TimelineSection({ events }) {
  const typeColors = {
    '入组': { bg: '#DBEAFE', color: '#1D4ED8' },
    '评估': { bg: '#F3E8FF', color: '#7C3AED' },
    '打卡': { bg: '#D1FAE5', color: '#059669' },
  }

  return (
    <div className="card">
      <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <h3>🗺️ 用户旅程时间轴</h3>
        <p className="card-subtitle">用户行为轨迹</p>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ position: 'relative' }}>
          {/* 时间轴竖线 */}
          <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: '#E2E8F0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {events.map((e, i) => {
              const tc = typeColors[e.type] || { bg: '#F1F5F9', color: '#9CA3AF' }
              return (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < events.length - 1 ? 20 : 0 }}>
                  {/* 圆点 */}
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: tc.bg, border: `2px solid ${tc.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: tc.color }} />
                  </div>
                  {/* 内容 */}
                  <div style={{ flex: 1, background: '#F8FAFC', borderRadius: 10, padding: '12px 16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: tc.color }}>{e.type}</span>
                      <span style={{ fontSize: 12, color: '#CBD5E1', fontFamily: 'JetBrains Mono' }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 14, color: '#E2E8F0' }}>{e.event}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
