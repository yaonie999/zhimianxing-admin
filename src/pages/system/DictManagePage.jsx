import React, { useState } from 'react'
import '../../styles/admin.css'

const DICTS = [
  { id: 1, name: '会员等级', type: '系统', key: 'member_level', items: '青铜,白银,黄金,铂金,钻石', updateTime: '2026-01-10' },
  { id: 2, name: '订单状态', type: '业务', key: 'order_status', items: '待付款,已付款,已发货,已完成,已取消,退款中', updateTime: '2026-01-15' },
  { id: 3, name: '性别', type: '系统', key: 'gender', items: '男,女,未知', updateTime: '2026-01-01' },
  { id: 4, name: '婚姻状况', type: '业务', key: 'marriage', items: '未婚,已婚,离异,丧偶', updateTime: '2026-01-01' },
  { id: 5, name: '设备状态', type: '业务', key: 'device_status', items: '在线,离线,故障,维修中', updateTime: '2026-02-01' },
  { id: 6, name: '支付方式', type: '业务', key: 'pay_method', items: '微信支付,支付宝,银行卡,积分抵扣', updateTime: '2026-01-20' },
]

export default function DictManagePage() {
  const [search, setSearch] = useState('')

  const filtered = DICTS.filter(d => {
    if (search && !d.name.includes(search) && !d.key.includes(search)) return false
    return true
  })

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>📖 字典管理</h3>
          <p className="card-subtitle">管理系统和业务字典数据</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="字典名称/键搜索" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 新增字典</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>字典名称</th>
                <th>字典键</th>
                <th>类型</th>
                <th>字典项</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600 }}>{d.name}</td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono' }}>{d.key}</span></td>
                  <td><span className={`badge ${d.type === '系统' ? 'badge-warning' : 'badge-primary'}`}>{d.type}</span></td>
                  <td style={{ color: '#9CA3AF', fontSize: 13, maxWidth: 300 }}>{d.items}</td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{d.updateTime}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: 4 }}>编辑</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
