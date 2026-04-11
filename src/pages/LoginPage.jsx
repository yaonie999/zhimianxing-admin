import React, { useState, useEffect } from 'react'
import LoginCard from '../components/LoginCard'

export default function LoginPage() {
  return (
    <div className="login-page">
      <StarBackground />
      <div className="login-container">
        <LoginBrand />
        <LoginCard />
      </div>
    </div>
  )
}

function LoginBrand() {
  return (
    <div className="login-brand">
      <div className="brand-logo">
        <div className="brand-logo-icon">🌙</div>
        <span className="brand-name">智眠星</span>
      </div>
      <p className="brand-slogan">
        智眨百站，共筑全国睡眠健康图谱<br />
        守护每一夜，安睡每一天
      </p>
      <div className="brand-features">
        <div className="brand-feature">
          <div className="brand-feature-dot" />
          <span>智慧睡眠监测与分析</span>
        </div>
        <div className="brand-feature">
          <div className="brand-feature-dot" />
          <span>个性化助眠方案推荐</span>
        </div>
        <div className="brand-feature">
          <div className="brand-feature-dot" />
          <span>全场景健康数据管理</span>
        </div>
      </div>
    </div>
  )
}

function StarBackground() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3 + 's',
      duration: Math.random() * 2 + 2 + 's'
    }))
    setStars(generated)
  }, [])

  return (
    <div className="star-bg">
      <div className="stars">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size + 'px',
              height: s.size + 'px',
              animationDelay: s.delay,
              animationDuration: s.duration
            }}
          />
        ))}
      </div>
    </div>
  )
}
