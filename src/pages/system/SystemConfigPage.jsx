import React from 'react'
import '../../styles/admin.css'

const CONFIGS = [
  { id: 1, key: 'system.name', label: '系统名称', value: '智眠星管理后台', type: '文本', updateTime: '2026-01-10' },
  { id: 2, key: 'system.logo', label: '系统Logo', value: '/logo.png', type: '图片', updateTime: '2026-01-10' },
  { id: 3, key: 'sms.provider', label: '短信服务商', value: 'aliyun', type: '文本', updateTime: '2026-02-15' },
  { id: 4, key: 'wechat.appid', label: '小程序AppID', value: 'wx****1234', type: '文本', updateTime: '2026-02-20' },
  { id: 5, key: 'points.expiry', label: '积分有效期（月）', value: '12', type: '数字', updateTime: '2026-03-01' },
  { id: 6, key: 'upload.max_size', label: '上传文件大小限制', value: '10MB', type: '文本', updateTime: '2026-03-05' },
]

export default function SystemConfigPage() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>⚙️ 系统配置</h3>
          <p className="card-subtitle">配置系统参数、第三方服务和功能开关</p>
        </div>
        <div className="toolbar">
          <div className="toolbar-right">
            <button className="btn btn-primary btn-sm">保存配置</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>配置项</th>
                <th>配置键</th>
                <th>当前值</th>
                <th>类型</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {CONFIGS.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.label}</td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono' }}>{c.key}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F' }}>{c.value}</td>
                  <td><span className="badge badge-primary">{c.type}</span></td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{c.updateTime}</td>
                  <td><button className="btn btn-secondary btn-sm">编辑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
