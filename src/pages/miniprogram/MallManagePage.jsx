import React, { useState } from 'react'
import '../../styles/admin.css'
import EditBannerDrawer from '../../components/drawers/EditBannerDrawer'

const BANNERS = [
  { id: 1, name: '春季睡眠改善计划', position: '首页Banner', status: '启用', jumpType: '链接地址', jumpValue: 'https://zhimianxing.com/spring', imagePreview: null, content: '春季特惠，睡眠改善计划8折起' },
  { id: 2, name: '新品首发通知', position: '启动页', status: '启用', jumpType: '无跳转', jumpValue: '', imagePreview: null, content: '智能睡眠监测手环Pro正式发布' },
  { id: 3, name: '会员专享活动', position: '首页中部', status: '停用', jumpType: '窜文本', jumpValue: '', imagePreview: null, content: '黄金及以上会员专享双倍积分' },
  { id: 4, name: '618大促Banner', position: '活动Banner', status: '启用', jumpType: '链接地址', jumpValue: 'https://zhimianxing.com/618', imagePreview: null, content: '618年中大促，全场低至5折' },
]

export default function MallManagePage() {
  const [banners, setBanners] = useState(BANNERS)
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('全部')
  const [editTarget, setEditTarget] = useState(null)

  const filtered = banners.filter(b => {
    if (search && !b.name.includes(search)) return false
    if (position !== '全部' && b.position !== position) return false
    return true
  })

  function handleSave(updated) {
    setBanners(prev => prev.map(b => b.id === updated.id ? updated : b))
    setEditTarget(null)
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🛍 商城管理</h3>
          <p className="card-subtitle">管理商城广告内容、banner图和跳转配置</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="广告名称搜索" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 160 }} value={position} onChange={e => setPosition(e.target.value)}>
              <option value="全部">全部位置</option>
              <option value="启动页">启动页</option>
              <option value="首页Banner">首页Banner</option>
              <option value="首页中部">首页中部</option>
              <option value="社区Banner">社区Banner</option>
              <option value="活动Banner">活动Banner</option>
            </select>
            <button className="btn-query" onClick={() => setSearch(search)}style={{ width: 60 }}>查询</button>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 新增内容</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>广告名称</th>
                <th>广告位置</th>
                <th>跳转方式</th>
                <th>状态</th>
                <th>广告内容</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600 }}>{b.name}</td>
                  <td><span className="badge badge-primary">{b.position}</span></td>
                  <td>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                      {b.jumpType === '无跳转' ? '—' : b.jumpType === '链接地址' ? `🔗 链接` : '📝 文本'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${b.status === '启用' ? 'badge-success' : 'badge-default'}`}>
                      {b.status === '启用' ? '✅ 启用' : '⛔ 停用'}
                    </span>
                  </td>
                  <td style={{ color: '#9CA3AF', fontSize: 13, maxWidth: 250 }}>{b.content}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: 4 }} onClick={() => setEditTarget({ ...b })}>编辑</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editTarget && (
        <EditBannerDrawer
          banner={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
