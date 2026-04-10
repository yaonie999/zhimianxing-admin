import React from 'react'
import '../../styles/admin.css'

const SETTINGS = [
  { id: 1, key: 'password.minLength', label: '密码最小长度', value: '8', type: '数字', desc: '登录密码最少字符数' },
  { id: 2, key: 'password.expiryDays', label: '密码有效期', value: '90天', type: '文本', desc: '超过天数需强制修改密码' },
  { id: 3, key: 'login.maxAttempts', label: '登录失败锁定次数', value: '5次', type: '数字', desc: '连续失败后锁定账户' },
  { id: 4, key: 'login.lockDuration', label: '账户锁定时长', value: '30分钟', type: '文本', desc: '锁定后自动解锁时间' },
  { id: 5, key: 'session.timeout', label: '会话超时时间', value: '30分钟', type: '文本', desc: '无操作自动退出时间' },
  { id: 6, key: 'captcha.enabled', label: '验证码开关', value: '启用', type: '开关', desc: '登录失败3次后显示验证码' },
  { id: 7, key: 'ip.whitelist', label: 'IP白名单', value: '', type: '文本', desc: '允许访问的IP地址，多个用逗号分隔' },
  { id: 8, key: 'log.retentionDays', label: '日志保留天数', value: '180天', type: '文本', desc: '操作日志和登录日志保留天数' },
]

export default function SecurityManagePage() {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>🔒 安全管理</h3>
          <p className="card-subtitle">配置密码策略、登录限制、会话管理等安全参数</p>
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
                <th>说明</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {SETTINGS.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.label}</td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{s.key}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono', color: '#1E3A5F', fontWeight: 600 }}>{s.value || '—'}</td>
                  <td><span className="badge badge-primary">{s.type}</span></td>
                  <td style={{ color: '#CBD5E1', fontSize: 13 }}>{s.desc}</td>
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
