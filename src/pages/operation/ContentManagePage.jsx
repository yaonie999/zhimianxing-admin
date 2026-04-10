import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

// ===================== 常量数据 =====================
const TABS = ['推荐', '专家专栏', '爆款推文', '睡眠音乐', '物理治疗']
const TAG_OPTIONS = ['睡眠科普', '健康养生', '专家解读', '用户故事', '常见问题', '改善建议']
const EXPERTS = ['张三', '李四', '王五', '六六', '王二麻子']

function makeData() {
  const base = {
    '推荐': [
      { id: 1, title: '如何提高深度睡眠质量', tags: ['睡眠科普', '健康养生'], content: '深度睡眠是恢复精力的关键阶段...', isTop: true, status: '显示', author: '王建国', expert: '', createTime: '2026-04-08 14:30:08', img: 'https://picsum.photos/40/40?random=1', isRecommend: false },
      { id: 2, title: '今晚8点直播：饮食与睡眠的关系', tags: ['健康养生', '专家解读'], content: '饮食对睡眠有重要影响，直播为您详解...', isTop: false, status: '显示', author: '李健康', expert: '李明医生', createTime: '2026-04-09 09:15:20', img: 'https://picsum.photos/40/40?random=2', isRecommend: true },
      { id: 3, title: '使用智能手环一个月后的真实体验', tags: ['用户故事'], content: '智能设备真的能帮助改善睡眠吗...', isTop: false, status: '隐藏', author: '张体验', expert: '', createTime: '2026-04-10 11:20:05', img: 'https://picsum.photos/40/40?random=3', isRecommend: false },
      { id: 4, title: '关于睡眠的5大误区', tags: ['睡眠科普', '常见问题'], content: '这些广为流传的睡眠说法竟然是错的...', isTop: true, status: '显示', author: '王建国', expert: '', createTime: '2026-04-07 08:45:33', img: 'https://picsum.photos/40/40?random=4', isRecommend: true },
      { id: 5, title: '午睡30分钟效果最佳，科学依据在此', tags: ['睡眠科普'], content: '午睡时间过长反而影响下午状态...', isTop: false, status: '显示', author: '李健康', expert: '', createTime: '2026-04-06 16:00:00', img: 'https://picsum.photos/40/40?random=5', isRecommend: false },
      { id: 6, title: '压力大睡不着？5个方法帮你快速入睡', tags: ['健康养生', '改善建议'], content: '压力和焦虑是失眠的主要原因之一...', isTop: false, status: '隐藏', author: '王建国', expert: '', createTime: '2026-04-05 10:10:10', img: 'https://picsum.photos/40/40?random=6', isRecommend: false },
      { id: 7, title: '睡眠呼吸暂停综合征的识别与应对', tags: ['睡眠科普', '专家解读'], content: '打鼾不是睡得香，可能是健康警报...', isTop: false, status: '显示', author: '张体验', expert: '李明医生', createTime: '2026-04-04 12:00:00', img: 'https://picsum.photos/40/40?random=7', isRecommend: true },
      { id: 8, title: '睡前滑手机影响睡眠的真相', tags: ['睡眠科普', '常见问题'], content: '蓝光如何影响褪黑素分泌...', isTop: false, status: '显示', author: '李健康', expert: '', createTime: '2026-04-03 18:30:00', img: 'https://picsum.photos/40/40?random=8', isRecommend: false },
      { id: 9, title: '春季睡眠调理指南', tags: ['健康养生', '改善建议'], content: '春季气候变化大，睡眠如何适应...', isTop: false, status: '隐藏', author: '王建国', expert: '', createTime: '2026-04-02 09:00:00', img: 'https://picsum.photos/40/40?random=9', isRecommend: false },
      { id: 10, title: '儿童睡眠标准你家娃睡够了吗', tags: ['睡眠科普'], content: '不同年龄段儿童需要多少睡眠时间...', isTop: false, status: '显示', author: '张体验', expert: '', createTime: '2026-04-01 15:20:00', img: 'https://picsum.photos/40/40?random=10', isRecommend: false },
      { id: 11, title: '睡眠与免疫力的关系', tags: ['睡眠科普', '健康养生'], content: '免疫力低下可能是睡眠出了问题...', isTop: false, status: '显示', author: '李健康', expert: '', createTime: '2026-03-31 11:00:00', img: 'https://picsum.photos/40/40?random=11', isRecommend: false },
      { id: 12, title: '更年期睡眠障碍的应对策略', tags: ['健康养生', '专家解读'], content: '更年期激素变化如何影响睡眠...', isTop: false, status: '隐藏', author: '王建国', expert: '李明医生', createTime: '2026-03-30 14:00:00', img: 'https://picsum.photos/40/40?random=12', isRecommend: false },
    ],
    '专家专栏': [
      { id: 1, title: '睡眠医学前沿：最新研究进展', tags: ['专家解读', '睡眠科普'], content: '近年来睡眠医学领域取得了突破性进展...', isTop: true, status: '显示', author: '陈学术', expert: '张三', createTime: '2026-04-08 10:00:00', img: 'https://picsum.photos/40/40?random=21', isRecommend: true },
      { id: 2, title: '中医视角下的失眠调理方案', tags: ['专家解读', '健康养生'], content: '从中医角度如何认识失眠的成因...', isTop: false, status: '显示', author: '陈学术', expert: '李四', createTime: '2026-04-07 11:00:00', img: 'https://picsum.photos/40/40?random=22', isRecommend: true },
      { id: 3, title: '青少年睡眠问题及干预措施', tags: ['专家解读', '常见问题'], content: '青少年面临哪些特殊的睡眠挑战...', isTop: false, status: '隐藏', author: '王专家', expert: '王五', createTime: '2026-04-06 09:30:00', img: 'https://picsum.photos/40/40?random=23', isRecommend: false },
      { id: 4, title: '慢性失眠的认知行为治疗', tags: ['专家解读'], content: 'CBT-I是治疗慢性失眠的一线方法...', isTop: true, status: '显示', author: '陈学术', expert: '六六', createTime: '2026-04-05 14:00:00', img: 'https://picsum.photos/40/40?random=24', isRecommend: true },
      { id: 5, title: '运动与睡眠的相互关系', tags: ['健康养生', '改善建议'], content: '规律运动如何改善睡眠质量...', isTop: false, status: '显示', author: '王专家', expert: '王二麻子', createTime: '2026-04-04 08:00:00', img: 'https://picsum.photos/40/40?random=25', isRecommend: false },
    ],
    '爆款推文': [
      { id: 1, title: '#睡眠挑战 7天改善睡眠质量', tags: ['睡眠科普', '用户故事'], content: '连续7天坚持这些习惯，睡眠明显变好...', isTop: true, status: '显示', author: '运营小王', expert: '', createTime: '2026-04-10 08:00:00', img: 'https://picsum.photos/40/40?random=31', isRecommend: false },
      { id: 2, title: '测一测你的睡眠年龄是几岁', tags: ['睡眠科普', '常见问题'], content: '通过8道题测出你的睡眠年龄...', isTop: false, status: '显示', author: '运营小李', expert: '', createTime: '2026-04-09 10:00:00', img: 'https://picsum.photos/40/40?random=32', isRecommend: false },
      { id: 3, title: '睡前5个动作改善睡眠质量', tags: ['改善建议', '健康养生'], content: '简单易学的睡前放松动作...', isTop: false, status: '隐藏', author: '运营小王', expert: '', createTime: '2026-04-08 12:00:00', img: 'https://picsum.photos/40/40?random=33', isRecommend: false },
    ],
    '睡眠音乐': [
      { id: 1, title: '雨后森林｜深度助眠白噪音', tags: ['改善建议'], content: '沉浸式雨后森林白噪音音频...', isTop: true, status: '显示', author: '音乐师', expert: '', createTime: '2026-04-09 06:00:00', img: 'https://picsum.photos/40/40?random=41', isRecommend: false },
      { id: 2, title: '舒伯特小夜曲｜古典助眠名曲', tags: ['改善建议'], content: '精选古典音乐精选集...', isTop: false, status: '显示', author: '音乐师', expert: '', createTime: '2026-04-08 20:00:00', img: 'https://picsum.photos/40/40?random=42', isRecommend: false },
      { id: 3, title: '海浪声｜自然白噪音合集', tags: ['改善建议'], content: '不同场景的自然白噪音音频...', isTop: false, status: '隐藏', author: '音乐师', expert: '', createTime: '2026-04-07 22:00:00', img: 'https://picsum.photos/40/40?random=43', isRecommend: false },
    ],
    '物理治疗': [
      { id: 1, title: '经颅微电流刺激改善失眠的机制', tags: ['专家解读', '睡眠科普'], content: 'CES技术如何治疗失眠...', isTop: true, status: '显示', author: '物疗师', expert: '', createTime: '2026-04-08 10:00:00', img: 'https://picsum.photos/40/40?random=51', isRecommend: false },
      { id: 2, title: '光照疗法：调整生物钟的新方法', tags: ['健康养生', '专家解读'], content: '特定波长的光如何帮助调节睡眠...', isTop: false, status: '显示', author: '物疗师', expert: '', createTime: '2026-04-07 09:00:00', img: 'https://picsum.photos/40/40?random=52', isRecommend: false },
    ],
  }
  return base
}

// ===================== 工具函数 =====================
function BoolBadge({ value, trueLabel = '是', falseLabel = '否' }) {
  return value
    ? <span style={{ background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{trueLabel}</span>
    : <span style={{ background: '#F1F5F9', color: '#9CA3AF', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{falseLabel}</span>
}

function StatusBadge({ s }) {
  return s === '显示'
    ? <span style={{ background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>显示</span>
    : <span style={{ background: '#F1F5F9', color: '#9CA3AF', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>隐藏</span>
}

// ===================== 新增/编辑弹窗 =====================
function ContentModal({ tab, editTarget, onClose, onSave }) {
  const [form, setForm] = useState({
    title: editTarget?.title || '',
    tags: editTarget?.tags || [],
    content: editTarget?.content || 'KindEditor 编辑器\n\n在此输入内容详情，支持富文本编辑。\n\n功能说明：\n· 加粗、斜体、下划线、字体、字号、颜色\n· 对齐方式、项目符号、编号\n· 插入图片、链接、表格',
    isTop: editTarget ? editTarget.isTop : false,
    isRecommend: editTarget ? editTarget.isRecommend : (tab === '专家专栏'),
    imagePreview: editTarget?.imagePreview || null,
  })

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  function toggleTag(tag) {
    const cur = form.tags
    if (cur.includes(tag)) set('tags', cur.filter(t => t !== tag))
    else set('tags', [...cur, tag])
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) set('imagePreview', URL.createObjectURL(file))
  }

  function handleSave() {
    if (!form.title) { alert('请填写标题'); return }
    onSave({ ...editTarget, ...form })
  }

  const isEdit = !!(editTarget && editTarget.title)
  const showRecommend = tab === '专家专栏'

  return (
    <CenterModal
      open={true}
      onClose={onClose}
      title={isEdit ? '编辑内容' : '新增内容'}
      width={720}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose} style={{ minWidth: 90, height: 38, fontSize: 14 }}>取消</button>
          <button className="btn-query" onClick={handleSave} style={{ height: 38, padding: '0 24px', fontSize: 14 }}>确定</button>
        </>
      }
    >
      {/* 封面图 */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>封面图</div>
        <div
          style={{
            width: 120, height: 120, border: '2px dashed #E2E8F0', borderRadius: 8,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', background: '#FAFBFC', overflow: 'hidden',
          }}
          onClick={() => document.getElementById('content-img-input').click()}
        >
          {form.imagePreview ? (
            <img src={form.imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="封面" />
          ) : (
            <>
              <div style={{ fontSize: 28, color: '#CBD5E1' }}>+</div>
              <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}>上传图片</div>
            </>
          )}
          <input id="content-img-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
        <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 6 }}>推荐尺寸 750×400 px</div>
      </div>

      {/* 标题 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>
          <span style={{ color: '#EF4444', marginRight: 3 }}>*</span>标题
        </div>
        <input
          className="form-input"
          placeholder="请输入内容标题"
          value={form.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>

      {/* 标签 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>标签</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TAG_OPTIONS.map(tag => (
            <span
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: '4px 12px', borderRadius: 16, fontSize: 13, cursor: 'pointer',
                background: form.tags.includes(tag) ? '#EFF6FF' : '#F1F5F9',
                border: form.tags.includes(tag) ? '1.5px solid #1E3A5F' : '1.5px solid #E2E8F0',
                color: form.tags.includes(tag) ? '#1E3A5F' : '#9CA3AF',
                fontWeight: form.tags.includes(tag) ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >{tag}</span>
          ))}
        </div>
      </div>

      {/* 内容编辑器 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>内容</div>
        {/* 工具栏 */}
        <div style={{ display: 'flex', gap: 2, padding: '6px 8px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderBottom: 'none', borderRadius: '8px 8px 0 0', flexWrap: 'wrap' }}>
          {['加粗', '斜体', '下划线', '字体', '字号', '文字颜色', '背景色', '对齐', '列表', '缩进', '链接', '图片', '表格', '表情', '源码', '插入'].map(tool => (
            <button key={tool}
              style={{ padding: '3px 8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#E2E8F0', borderRadius: 4, whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.target.style.background = '#E2E8F0'}
              onMouseLeave={e => e.target.style.background = 'none'}
            >{tool}</button>
          ))}
        </div>
        <textarea
          className="form-input"
          rows={8}
          value={form.content}
          onChange={e => set('content', e.target.value)}
          style={{ borderRadius: '0 0 8px 8px', resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      {/* 是否置顶 + 是否推荐 */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>是否置顶</span>
          {[{ label: '是', val: true }, { label: '否', val: false }].map(o => (
            <label key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 13, color: form.isTop === o.val ? '#1E3A5F' : '#9CA3AF', fontWeight: form.isTop === o.val ? 600 : 400 }}>
              <input type="radio" name="istop" checked={form.isTop === o.val} onChange={() => set('isTop', o.val)} style={{ accentColor: '#1E3A5F' }} />
              {o.label}
            </label>
          ))}
        </div>
        {showRecommend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>是否推荐</span>
            {[{ label: '是', val: true }, { label: '否', val: false }].map(o => (
              <label key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 13, color: form.isRecommend === o.val ? '#1E3A5F' : '#9CA3AF', fontWeight: form.isRecommend === o.val ? 600 : 400 }}>
                <input type="radio" name="isrecommend" checked={form.isRecommend === o.val} onChange={() => set('isRecommend', o.val)} style={{ accentColor: '#1E3A5F' }} />
                {o.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </CenterModal>
  )
}

// ===================== 分页组件 =====================
function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const totalPages = Math.ceil(total / pageSize) || 1
  const pageSizeOptions = [10, 20, 50]
  const [jumpPage, setJumpPage] = useState('')

  function handleJump() {
    const p = parseInt(jumpPage)
    if (p >= 1 && p <= totalPages) { onPageChange(p); setJumpPage('') }
  }

  let startPage = Math.max(1, page - 2)
  let endPage = Math.min(totalPages, startPage + 4)
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4)
  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 10 }}>
      {/* 左侧：总条数 + 每页条数 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: '#9CA3AF' }}>共 <strong style={{ color: '#1E3A5F' }}>{total}</strong> 条记录</span>
        <select
          className="form-select"
          style={{ width: 110, fontSize: 13, padding: '4px 8px' }}
          value={pageSize}
          onChange={e => onPageSizeChange(parseInt(e.target.value))}
        >
          {pageSizeOptions.map(n => <option key={n}>{n}条/页</option>)}
        </select>
      </div>
      {/* 右侧：页码 + 跳转 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button className="page-btn" onClick={() => onPageChange(1)} disabled={page === 1} style={{ minWidth: 34, height: 34, fontSize: 13 }}>«</button>
        <button className="page-btn" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} style={{ minWidth: 34, height: 34, fontSize: 13 }}>‹</button>
        {pageNumbers.map(n => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            style={{
              minWidth: 34, height: 34, borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
              background: page === n ? '#1E3A5F' : 'transparent',
              color: page === n ? '#fff' : '#E2E8F0',
              fontWeight: page === n ? 700 : 400,
            }}
          >{n}</button>
        ))}
        <button className="page-btn" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} style={{ minWidth: 34, height: 34, fontSize: 13 }}>›</button>
        <button className="page-btn" onClick={() => onPageChange(totalPages)} disabled={page >= totalPages} style={{ minWidth: 34, height: 34, fontSize: 13 }}>»</button>
        <span style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 4 }}>第 <strong style={{ color: '#1E3A5F' }}>{page}</strong> / <strong style={{ color: '#1E3A5F' }}>{totalPages}</strong> 页</span>
        <span style={{ color: '#E2E8F0' }}>|</span>
        <input
          type="number"
          min={1}
          value={jumpPage}
          onChange={e => setJumpPage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleJump()}
          placeholder="跳至"
          style={{ width: 56, height: 34, padding: '0 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#E2E8F0', outline: 'none' }}
        />
        <button
          onClick={handleJump}
          style={{ height: 34, padding: '0 12px', background: '#1E3A5F', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}
        >跳转</button>
      </div>
    </div>
  )
}

// ===================== 主组件 =====================
export default function ContentManagePage() {
  const [activeTab, setActiveTab] = useState('推荐')
  const [search, setSearch] = useState('')
  const [filterTag, setFilterTag] = useState('全部')
  const [filterTop, setFilterTop] = useState('全部')
  const [filterStatus, setFilterStatus] = useState('全部')
  const [filterExpert, setFilterExpert] = useState('全部')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [modalTarget, setModalTarget] = useState(null) // null=无弹窗
  const [data, setData] = useState(makeData())

  const allData = data[activeTab] || []

  const filtered = allData.filter(item => {
    if (search && !item.title.includes(search)) return false
    if (filterTag !== '全部' && !item.tags.includes(filterTag)) return false
    if (filterTop !== '全部' && ((filterTop === '是') !== item.isTop)) return false
    if (filterStatus !== '全部' && item.status !== filterStatus) return false
    if (activeTab === '专家专栏' && filterExpert !== '全部' && item.expert !== filterExpert) return false
    return true
  })

  const total = filtered.length
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  function resetFilters() {
    setSearch(''); setFilterTag('全部'); setFilterTop('全部'); setFilterStatus('全部'); setFilterExpert('全部'); setPage(1)
  }

  function handleSave(item) {
    if (modalTarget && modalTarget.title) {
      // 编辑
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(it => it.id === item.id ? item : it)
      }))
    } else {
      // 新建
      setData(prev => ({
        ...prev,
        [activeTab]: [{ ...item, id: Date.now(), createTime: new Date().toISOString().slice(0, 19).replace('T', ' '), img: item.imagePreview || null }, ...prev[activeTab]]
      }))
    }
    setModalTarget(null)
  }

  function openNew() {
    // 创建一个空对象用于新建
    setModalTarget({ title: null })
  }

  function handleTabChange(tab) {
    setActiveTab(tab)
    setPage(1)
    setSearch('')
    setFilterTag('全部')
    setFilterTop('全部')
    setFilterStatus('全部')
    setFilterExpert('全部')
  }

  return (
    <div>
      <div className="card" style={{ padding: 0 }}>
        {/* 顶部蓝色标签栏 */}
        <div style={{ display: 'flex', borderBottom: '2px solid #E2E8F0', padding: '0 20px', background: '#fff', borderRadius: '12px 12px 0 0', gap: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{
                padding: '14px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14,
                fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? '#1E3A5F' : '#CBD5E1',
                borderBottom: activeTab === tab ? '2px solid #1E3A5F' : '2px solid transparent',
                marginBottom: -2,
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >{tab}</button>
          ))}
        </div>

        {/* 筛选区 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          {/* 标题 */}
          <div className="search-input-wrap" style={{ width: 180 }}>
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="请输入标题" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          {/* 标签 */}
          <select className="form-select" style={{ width: 140, fontSize: 13 }} value={filterTag} onChange={e => { setFilterTag(e.target.value); setPage(1) }}>
            <option value="全部">请选择标签</option>
            {TAG_OPTIONS.map(t => <option key={t}>{t}</option>)}
          </select>
          {/* 是否置顶 */}
          <select className="form-select" style={{ width: 140, fontSize: 13 }} value={filterTop} onChange={e => { setFilterTop(e.target.value); setPage(1) }}>
            <option value="全部">请选择是否置顶</option>
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
          {/* 状态 */}
          <select className="form-select" style={{ width: 140, fontSize: 13 }} value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
            <option value="全部">请选择状态</option>
            <option value="显示">显示</option>
            <option value="隐藏">隐藏</option>
          </select>
          {/* 专家姓名（仅专家专栏） */}
          {activeTab === '专家专栏' && (
            <select className="form-select" style={{ width: 140, fontSize: 13 }} value={filterExpert} onChange={e => { setFilterExpert(e.target.value); setPage(1) }}>
              <option value="全部">请选择专家</option>
              {EXPERTS.map(e => <option key={e}>{e}</option>)}
            </select>
          )}
          {/* 按钮 */}
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button className="btn-query" style={{ height: 34, padding: '0 16px', fontSize: 13 }} onClick={() => setPage(1)}>查询</button>
            <button className="btn-reset" style={{ height: 34, padding: '0 16px', fontSize: 13 }} onClick={resetFilters}>重置</button>
          </div>
        </div>

        {/* 新增按钮（专家专栏有） */}
        {activeTab === '专家专栏' && (
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex' }}>
            <button
              className="btn-query"
              style={{ height: 34, padding: '0 16px', fontSize: 13, background: '#3B82F6' }}
              onClick={openNew}
            >+ 新增内容</button>
          </div>
        )}

        {/* 表头 */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', gap: 8, overflowX: 'auto' }}>
          {[
            activeTab === '专家专栏' ? { w: 50, label: '序号' } : null,
            { w: 50, label: '序号' },
            { w: 200, label: '标题' },
            activeTab === '专家专栏' ? { w: 90, label: '专家姓名' } : null,
            { w: 140, label: '标签' },
            { w: 150, label: '内容' },
            { w: 80, label: '是否置顶' },
            activeTab === '专家专栏' ? { w: 90, label: '是否推荐' } : null,
            { w: 70, label: '状态' },
            { w: 80, label: '创建人' },
            { w: 150, label: '创建时间' },
            { w: 70, label: '操作' },
          ].filter(Boolean).map((col, i) => (
            <div key={i} style={{ width: col.w, flexShrink: 0, fontSize: 12, fontWeight: 700, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{col.label}</div>
          ))}
        </div>

        {/* 列表数据行 */}
        {pageData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#CBD5E1', fontSize: 14 }}>暂无数据</div>
        ) : (
          pageData.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', padding: '12px 20px',
                borderBottom: '1px solid #F1F5F9', gap: 8, overflowX: 'auto',
                background: idx % 2 === 0 ? '#fff' : '#FAFBFC',
              }}
            >
              {/* 序号 */}
              <div style={{ width: 50, flexShrink: 0, fontSize: 13, color: '#CBD5E1' }}>{item.id}</div>
              {/* 标题 */}
              <div style={{ width: 200, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src={item.img} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1E3A5F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
              </div>
              {/* 专家姓名（仅专家专栏） */}
              {activeTab === '专家专栏' && <div style={{ width: 90, flexShrink: 0, fontSize: 13, color: '#E2E8F0' }}>{item.expert || '-'}</div>}
              {/* 标签 */}
              <div style={{ width: 140, flexShrink: 0, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {item.tags.slice(0, 2).map(tag => (
                  <span key={tag} style={{ background: '#EFF6FF', color: '#1E3A5F', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>{tag}</span>
                ))}
              </div>
              {/* 内容 */}
              <div style={{ width: 150, flexShrink: 0, fontSize: 12, color: '#CBD5E1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.content}</div>
              {/* 是否置顶 */}
              <div style={{ width: 80, flexShrink: 0 }}><BoolBadge value={item.isTop} /></div>
              {/* 是否推荐（仅专家专栏） */}
              {activeTab === '专家专栏' && <div style={{ width: 90, flexShrink: 0 }}><BoolBadge value={item.isRecommend} /></div>}
              {/* 状态 */}
              <div style={{ width: 70, flexShrink: 0 }}><StatusBadge s={item.status} /></div>
              {/* 创建人 */}
              <div style={{ width: 80, flexShrink: 0, fontSize: 13, color: '#E2E8F0' }}>{item.author}</div>
              {/* 创建时间 */}
              <div style={{ width: 150, flexShrink: 0, fontSize: 12, color: '#CBD5E1' }}>{item.createTime}</div>
              {/* 操作 */}
              <div style={{ width: 70, flexShrink: 0 }}>
                <button
                  className="btn-action"
                  style={{ borderColor: '#1E3A5F', color: '#1E3A5F', width: 60, height: 28, fontSize: 12 }}
                  onClick={() => setModalTarget(item)}
                >查看</button>
              </div>
            </div>
          ))
        )}

        {/* 分页 */}
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={p => setPage(p)}
          onPageSizeChange={s => { setPageSize(s); setPage(1) }}
        />
      </div>

      {/* 新增/编辑弹窗 */}
      {modalTarget !== null && (
        <ContentModal
          tab={activeTab}
          editTarget={modalTarget.title !== undefined && modalTarget.title !== null ? modalTarget : null}
          onClose={() => setModalTarget(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}