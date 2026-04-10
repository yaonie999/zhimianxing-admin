import React from 'react'
import '../../styles/admin.css'

const ROLES = [
  { id: 1, name: '超级管理员', code: 'SUPER_ADMIN', desc: '拥有系统所有权限', userCount: 2, status: '启用', createTime: '2024-01-01' },
  { id: 2, name: '运营主管', code: 'OPERATION_MANAGER', desc: '负责日常运营管理', userCount: 5, status: '启用', createTime: '2024-01-15' },
  { id: 3, name: '数据分析师', code: 'DATA_ANALYST', desc: '查看数据报表权限', userCount: 3, status: '启用', createTime: '2024-02-01' },
  { id: 4, name: '客服专员', code: 'CUSTOMER_SERVICE', desc: '处理用户反馈和咨询', userCount: 8, status: '停用', createTime: '2024-03-10' },
]

export default function RoleManagePage() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🎭 角色管理</h3>
          <p className="card-subtitle">配置系统角色、权限标识和关联用户</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">+ 新增角色</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>角色名称</th>
                <th>权限标识</th>
                <th>描述</th>
                <th>关联用户</th>
                <th>状态</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono' }}>{r.code}</span></td>
                  <td style={{ color: '#9CA3AF', fontSize: 13 }}>{r.desc}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F' }}>{r.userCount} 人</td>
                  <td><span className={`badge ${r.status === '启用' ? 'badge-success' : 'badge-default'}`}>{r.status}</span></td>
                  <td style={{ color: '#CBD5E1', fontSize: 12 }}>{r.createTime}</td>
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
