import React, { useState } from 'react'
import '../../styles/admin.css'
import CenterModal from '../../components/CenterModal'

/* ==================== 系统配置 ==================== */
const CONFIGS = [
  { id: 1, name: '系统名称', code: 'system.name', value: '智眠星管理后台', sensitive: '否', type: '文本', createBy: '系统', createTime: '2026-01-10 10:00' },
  { id: 2, name: '系统Logo', code: 'system.logo', value: '/logo.png', sensitive: '否', type: '图片', createBy: '系统', createTime: '2026-01-10 10:00' },
  { id: 3, name: '登录页Logo', code: 'login.logo', value: '/login-logo.png', sensitive: '否', type: '图片', createBy: '张三', createTime: '2026-02-01 10:00' },
  { id: 4, name: '登录页背景图', code: 'login.bg_image', value: '/login-bg.jpg', sensitive: '否', type: '图片', createBy: '张三', createTime: '2026-02-01 10:00' },
  { id: 5, name: '登录方式', code: 'login.methods', value: '密码登录,短信验证码登录', sensitive: '否', type: '登录方式', createBy: '李四', createTime: '2026-02-15 10:00' },
  { id: 6, name: '短信服务商', code: 'sms.provider', value: 'aliyun', sensitive: '是', type: '文本', createBy: '系统', createTime: '2026-01-10 10:00' },
  { id: 7, name: '短信密钥', code: 'sms.secret', value: 'wx****1234', sensitive: '是', type: '文本', createBy: '系统', createTime: '2026-01-10 10:00' },
  { id: 8, name: '小程序AppID', code: 'wechat.appid', value: 'wx****5678', sensitive: '是', type: '文本', createBy: '李四', createTime: '2026-02-20 10:00' },
  { id: 9, name: '积分有效期（月）', code: 'points.expiry', value: '12', sensitive: '否', type: '数字', createBy: '系统', createTime: '2026-03-01 10:00' },
  { id: 10, name: '上传文件大小限制', code: 'upload.max_size', value: '10MB', sensitive: '否', type: '文本', createBy: '张三', createTime: '2026-03-05 10:00' },
]

const SENSITIVE_OPTIONS = ['是', '否']
const LOGIN_METHOD_OPTIONS = [
  { label: '密码登录', value: '密码登录' },
  { label: '短信验证码登录', value: '短信验证码登录' },
  { label: '微信授权登录', value: '微信授权登录' },
]

export default function SystemConfigPage() {
  const [configs] = useState(CONFIGS)
  const [keyword, setKeyword] = useState('')
  const [code, setCode] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [editConfig, setEditConfig] = useState(undefined)
  const [deleteConfig, setDeleteConfig] = useState(null)
  const [viewConfig, setViewConfig] = useState(null)
  const [form, setForm] = useState({ name: '', code: '', value: '', sensitive: '否', remark: '' })
  const [previewImg, setPreviewImg] = useState('')

  const filtered = configs.filter(c => {
    if (keyword && !c.name.includes(keyword)) return false
    if (code && !c.code.includes(code)) return false
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageData = filtered.slice(startIdx, startIdx + pageSize)

  const go = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const changePageSize = (sz) => { setPageSize(sz); setPage(1) }

  const openAdd = () => {
    setForm({ name: '', code: '', value: '', sensitive: '否', remark: '' })
    setPreviewImg('')
    setEditConfig(null)
  }

  const openEdit = (c) => {
    setForm({ name: c.name, code: c.code, value: c.value, sensitive: c.sensitive, remark: '' })
    if (c.type === '图片') setPreviewImg(c.value)
    else setPreviewImg('')
    setEditConfig(c)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setForm(f => ({ ...f, value: file.name }))
      setPreviewImg(url)
    }
  }

  const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6, fontWeight: 500 }
  const redStar = <span style={{ color: '#EF4444', marginRight: 2 }}>*</span>
  const btnBase = { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', lineHeight: 1, height: 34, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }

  const isImageType = editConfig !== undefined && (editConfig?.type === '图片' || form.code === 'login.logo' || form.code === 'login.bg_image' || form.code === 'system.logo' || (!editConfig && (form.code === 'login.logo' || form.code === 'login.bg_image' || form.code === 'system.logo')))
  const isLoginMethod = editConfig !== undefined && (editConfig?.type === '登录方式' || form.code === 'login.methods' || (!editConfig && form.code === 'login.methods'))

  const currentLoginMethods = isLoginMethod && form.value
    ? form.value.split(',').filter(Boolean)
    : []

  const toggleLoginMethod = (val) => {
    const current = [...currentLoginMethods]
    const idx = current.indexOf(val)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(val)
    setForm(f => ({ ...f, value: current.join(',') }))
  }

  return (
    <div>
      <div className="card">
        {/* 筛选区 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
                <label style={labelStyle}>参数名称</label>
                <input style={inputStyle} placeholder="请输入参数名称" value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1) }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
                <label style={labelStyle}>参数编码</label>
                <input style={inputStyle} placeholder="请输入参数编码" value={code} onChange={e => { setCode(e.target.value); setPage(1) }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setPage(1)}>查询</button>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => { setKeyword(''); setCode(''); setPage(1) }}>重置</button>
              <button style={{ ...btnBase, background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }} onClick={() => setCollapsed(!collapsed)}>{collapsed ? '展开' : '收起'}</button>
            </div>
          </div>

          {!collapsed && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={openAdd}>新增</button>
            </div>
          )}
        </div>

        {/* 表格 */}
        <div className="table-wrapper">
          <table className="table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 50 }}>序号</th>
                <th>参数名称</th>
                <th>参数编码</th>
                <th>参数值</th>
                <th style={{ width: 90 }}>敏感数据</th>
                <th>创建人</th>
                <th style={{ width: 140 }}>创建时间</th>
                <th style={{ width: 150 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>暂无数据</td></tr>
              ) : pageData.map((c, idx) => (
                <tr key={c.id}>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{startIdx + idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1E293B' }}>{c.name}</td>
                  <td><span className="badge badge-default" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{c.code}</span></td>
                  <td>
                    {c.type === '图片' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 4, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={c.value} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none' }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#94A3B8', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.value}</span>
                      </div>
                    ) : c.type === '登录方式' ? (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {c.value.split(',').filter(Boolean).map(m => (
                          <span key={m} className="badge badge-primary" style={{ fontSize: 11 }}>{m}</span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.value}</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${c.sensitive === '是' ? 'badge-warning' : 'badge-default'}`}
                      style={{ background: c.sensitive === '是' ? '#FEF3C7' : '#F1F5F9', color: c.sensitive === '是' ? '#D97706' : '#94A3B8' }}>
                      {c.sensitive}
                    </span>
                  </td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>{c.createBy}</td>
                  <td style={{ color: '#94A3B8', fontSize: 12 }}>{c.createTime}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <button style={{ ...btnBase, background: 'transparent', color: '#3B82F6', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setViewConfig(c)}>详情</button>
                      <button style={{ ...btnBase, background: '#3B82F6', color: '#fff', height: 28, padding: '0 10px', fontSize: 12 }} onClick={() => openEdit(c)}>编辑</button>
                      <button style={{ ...btnBase, background: 'transparent', color: '#EF4444', border: 'none', height: 28, padding: '0 8px', fontSize: 12 }} onClick={() => setDeleteConfig(c)}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#64748B' }}>共 <span style={{ color: '#1E293B', fontWeight: 600 }}>{total}</span> 条记录</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#64748B' }}>每页</span>
            <select style={{ padding: '4px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, color: '#1E293B', background: '#fff', cursor: 'pointer' }} value={pageSize} onChange={e => changePageSize(Number(e.target.value))}>
              {[10, 20, 50].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span style={{ fontSize: 13, color: '#64748B' }}>条</span>
            <button className="page-btn" disabled={page === 1} onClick={() => go(1)}>«</button>
            <button className="page-btn" disabled={page === 1} onClick={() => go(page - 1)}>‹</button>
            <span style={{ fontSize: 13, color: '#64748B', padding: '0 6px' }}>第 {page} / {totalPages} 页</span>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => go(page + 1)}>›</button>
            <button className="page-btn" disabled={page >= totalPages} onClick={() => go(totalPages)}>»</button>
          </div>
        </div>
      </div>

      {/* 新建/编辑配置弹窗 */}
      {editConfig !== undefined && (
        <CenterModal
          open={true}
          onClose={() => setEditConfig(undefined)}
          title={editConfig ? '编辑配置' : '新增配置'}
          width={560}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setEditConfig(undefined)}>取消</button>
              <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setEditConfig(undefined)}>确定</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>{redStar}参数名称</label>
              <input style={inputStyle} placeholder="请输入参数名称" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>{redStar}参数编码</label>
              <input style={{ ...inputStyle, background: editConfig ? '#F8FAFC' : '#fff' }} placeholder="请输入参数编码" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} disabled={!!editConfig} />
            </div>

            {/* 图片类型：文件上传+预览 */}
            {(form.code === 'login.logo' || form.code === 'login.bg_image' || form.code === 'system.logo') ? (
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>{redStar}参数值（图片）</label>
                <div style={{ border: '1px dashed #CBD5E1', borderRadius: 8, padding: 16, textAlign: 'center', background: '#F8FAFC', cursor: 'pointer' }} onClick={() => document.getElementById('config-file-upload').click()}>
                  {previewImg ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={previewImg} alt="preview" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 6, objectFit: 'contain' }} />
                      <div style={{ marginTop: 8, fontSize: 12, color: '#10B981' }}>点击更换图片</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                      <div style={{ fontSize: 13, color: '#64748B' }}>点击上传图片</div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>支持 JPG、PNG，建议尺寸 200x60</div>
                    </div>
                  )}
                </div>
                <input id="config-file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
            ) : (
              /* 登录方式：复选框 */
              form.code === 'login.methods' ? (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>{redStar}登录方式</label>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 4 }}>
                    {LOGIN_METHOD_OPTIONS.map(opt => (
                      <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, color: '#374151', padding: '8px 12px', border: `1px solid ${currentLoginMethods.includes(opt.value) ? '#3B82F6' : '#E2E8F0'}`, borderRadius: 6, background: currentLoginMethods.includes(opt.value) ? '#EFF6FF' : '#fff', transition: 'all 0.15s' }}>
                        <input type="checkbox" checked={currentLoginMethods.includes(opt.value)} onChange={() => toggleLoginMethod(opt.value)} style={{ cursor: 'pointer' }} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>请选择允许的登录方式，至少选择一种</div>
                </div>
              ) : (
                /* 普通文本值 */
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>{redStar}参数值</label>
                  <input style={inputStyle} placeholder="请输入参数值" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
                </div>
              )
            )}

            <div>
              <label style={labelStyle}>{redStar}敏感数据</label>
              <select style={inputStyle} value={form.sensitive} onChange={e => setForm({ ...form, sensitive: e.target.value })}>
                {SENSITIVE_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>备注</label>
              <input style={inputStyle} placeholder="选填" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            </div>
          </div>
        </CenterModal>
      )}

      {/* 详情弹窗 */}
      {viewConfig !== null && (
        <CenterModal
          open={true}
          onClose={() => setViewConfig(null)}
          title="配置详情"
          width={540}
          footer={
            <button style={{ ...btnBase, background: '#3B82F6', color: '#fff' }} onClick={() => setViewConfig(null)}>关闭</button>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>参数名称</label>
              <div style={{ fontSize: 13, color: '#1E293B', fontWeight: 600 }}>{viewConfig.name}</div>
            </div>
            <div>
              <label style={labelStyle}>参数编码</label>
              <div style={{ fontSize: 13, color: '#1E293B', fontFamily: 'JetBrains Mono' }}>{viewConfig.code}</div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>参数值</label>
              {viewConfig.type === '图片' ? (
                <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, textAlign: 'center', border: '1px solid #E2E8F0' }}>
                  <img src={viewConfig.value} alt="preview" style={{ maxWidth: 200, maxHeight: 100, objectFit: 'contain', borderRadius: 4 }} onError={e => { e.target.parentElement.innerHTML = '<span style=\'color:#94A3B8;font-size:13px;\'>图片加载失败</span>' }} />
                </div>
              ) : viewConfig.type === '登录方式' ? (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {viewConfig.value.split(',').filter(Boolean).map(m => (
                    <span key={m} className="badge badge-primary">{m}</span>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#1E293B', fontFamily: 'JetBrains Mono', wordBreak: 'break-all', background: '#F8FAFC', padding: '8px 12px', borderRadius: 6, border: '1px solid #E2E8F0' }}>{viewConfig.value}</div>
              )}
            </div>
            <div>
              <label style={labelStyle}>敏感数据</label>
              <span className={`badge ${viewConfig.sensitive === '是' ? 'badge-warning' : 'badge-default'}`}>{viewConfig.sensitive}</span>
            </div>
            <div>
              <label style={labelStyle}>创建人</label>
              <div style={{ fontSize: 13, color: '#64748B' }}>{viewConfig.createBy}</div>
            </div>
            <div>
              <label style={labelStyle}>创建时间</label>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>{viewConfig.createTime}</div>
            </div>
          </div>
        </CenterModal>
      )}

      {/* 删除确认弹窗 */}
      {deleteConfig !== null && (
        <CenterModal
          open={true}
          onClose={() => setDeleteConfig(null)}
          title="删除确认"
          width={420}
          footer={
            <>
              <button style={{ ...btnBase, background: '#fff', color: '#475569', border: '1px solid #E2E8F0' }} onClick={() => setDeleteConfig(null)}>取消</button>
              <button style={{ ...btnBase, background: '#EF4444', color: '#fff' }} onClick={() => setDeleteConfig(null)}>确定</button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 6, fontWeight: 600 }}>确认删除配置「{deleteConfig?.name}」吗？</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>删除后不可恢复，请谨慎操作。</div>
          </div>
        </CenterModal>
      )}
    </div>
  )
}
