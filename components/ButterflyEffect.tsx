'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import styles from './ButterflyEffect.module.css'

// 定义蝴蝶的初始配置
interface ButterflyConfig {
  timeOffset: number
  speedFactor: number
  verticalOffset: number
  scale: number
  colorSeed: number
  wingDelay: number
  startDelay: number
}

// 创建两组蝴蝶
const createButterflies = (count: number, startDelay: number = 0): ButterflyConfig[] => {
  return Array.from({ length: count }, (_, index) => {
    const isSecondGroup = startDelay > 0
    const baseOffset = isSecondGroup ? -0.3 : -0.5
    const offsetRange = isSecondGroup ? 0.2 : 0.15
    
    return {
      timeOffset: Math.PI * 2 * (index / count + (isSecondGroup ? 0.3 : 0)),
      // 第二组速度更慢，形成自然延迟
      speedFactor: isSecondGroup ? 
        (0.4 + (index / count) * 0.3) :  // 第二组速度范围 0.4-0.7
        (0.8 + (index / count) * 0.4),   // 第一组速度范围 0.8-1.2
      verticalOffset: baseOffset + (index / count) * offsetRange,
      scale: 0.6 + (index / count) * (isSecondGroup ? 0.7 : 0.8),
      colorSeed: index + (isSecondGroup ? 5 : 0),
      wingDelay: (index * 0.1) + (isSecondGroup ? 0.25 : 0),
      startDelay: 0  // 不再使用延迟
    }
  })
}

// 在组件顶部添加一个工具函数
const generateColor = (seed: number): string => {
  // 使用固定的数学运算，确保服务端和客户端结果一致
  const fixedSeed = Math.abs(Math.sin(seed * 1000)) // 生成 0-1 之间的确定性值
  const hue = 30 + Math.round(fixedSeed * 10) // 30-40 之间的色相
  const lightness = 50 + Math.round(fixedSeed * 10) // 50-60 之间的亮度
  return `hsl(${hue}, 100%, ${lightness}%)`
}

// 单个蝴蝶组件
const Butterfly: React.FC<{ config: ButterflyConfig }> = ({ config }) => {
  const butterflyRef = useRef<HTMLDivElement>(null)
  
  // 使用 colorSeed 生成颜色
  const color = useMemo(() => generateColor(config.colorSeed), [config.colorSeed])
  
  return (
    <div 
      ref={butterflyRef} 
      className={styles.butterfly_container}
    >
      <figure className={styles.butterfly}>
        <svg 
          className={`${styles.wing} ${styles.left}`} 
          viewBox="0 0 50 100"
          style={{ animationDelay: `-${config.wingDelay}s` }}
        >
          <use xlinkHref="#shape-butterfly-1" style={{ fill: color }}></use>
        </svg>
        <svg 
          className={`${styles.wing} ${styles.right}`} 
          viewBox="0 0 50 100"
          style={{ animationDelay: `-${config.wingDelay}s` }}
        >
          <use xlinkHref="#shape-butterfly-1" style={{ fill: color }}></use>
        </svg>
      </figure>
    </div>
  )
}


const ButterflyEffect: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)  // 添加世界容器引用
  
  // 创建两组蝴蝶
  const butterflies = useRef([
    ...createButterflies(5, 0),      // 第一组，立即起飞
    ...createButterflies(5, 5000)    // 第二组，延迟3秒起飞
  ])

  useEffect(() => {
    const scene = sceneRef.current
    const world = worldRef.current
    if (!scene || !world) return

    // 初始化蝴蝶位置
    butterflies.current.forEach((config, index) => {
      const butterfly = scene.children[0].children[index] as HTMLElement  // 注意这里的路径变化
      if (!butterfly) return

      const isSecondGroup = index >= 5
      // 减小初始距离
      const initialX = world.clientWidth * 0.8 + (isSecondGroup ? 
        500 + Math.random() * 300 :  // 第二组起始位置
        300 + Math.random() * 200     // 第一组起始位置
      )
      const initialY = isSecondGroup 
        ? -100 + config.verticalOffset * world.clientHeight
        : -300 + config.verticalOffset * world.clientHeight
      const initialZ = -1500 - (isSecondGroup ?
        Math.random() * 400 :  // 减小深度范围
        Math.random() * 300
      )

      butterfly.dataset.prevX = initialX.toString()
      butterfly.dataset.prevY = initialY.toString()
      butterfly.dataset.prevZ = initialZ.toString()

      butterfly.style.transform = `
        translate3d(${initialX}px, ${initialY}px, ${initialZ}px)
        rotateZ(-90deg)
        scale(${0.3 * config.scale})
      `
    })

    let time = 0
    const startTime = performance.now();
    let animationFrameId: number

    const animate = () => {
      const currentTime = Date.now() - startTime
      time += 0.008

      // 添加一个标记来检查是否所有蝴蝶都飞完了
      let allButterfliesFinished = true

      butterflies.current.forEach((config, index) => {
        const butterfly = scene.children[0].children[index] as HTMLElement
        if (!butterfly) return

        // 如果蝴蝶已经标记为完成，跳过动画
        if (butterfly.dataset.finished === 'true') {
          return
        }
        allButterfliesFinished = false

        const isSecondGroup = index >= 5
        const adjustedTime = time + config.timeOffset
        
        // 调整速度计算
        const speedMultiplier = isSecondGroup ? 0.4 : 0.8  // 第二组速度更慢
        const forwardSpeed = 150 * config.speedFactor * speedMultiplier
        const verticalSpeed = 80 * config.speedFactor * speedMultiplier
        const depthSpeed = 70 * config.speedFactor * speedMultiplier

        const curveAmplitude = 200
        const curveFrequency = 1.7
        
        const baseX = world.clientWidth - (adjustedTime * forwardSpeed * 1.5)
        const baseY = (-200 + config.verticalOffset * world.clientHeight) + 
                     (adjustedTime * verticalSpeed)  // 从上方往下飞
        const baseZ = -1500 + (adjustedTime * depthSpeed)
        
        const curve = Math.sin(adjustedTime * curveFrequency)
        const x = baseX + curve * 100
        const y = baseY + curve * 50
        const z = baseZ + Math.cos(adjustedTime * curveFrequency) * curveAmplitude

        const dx = x - (butterfly.dataset.prevX ? parseFloat(butterfly.dataset.prevX) : x)
        const dy = y - (butterfly.dataset.prevY ? parseFloat(butterfly.dataset.prevY) : y)
        const dz = z - (butterfly.dataset.prevZ ? parseFloat(butterfly.dataset.prevZ) : z)

        const yawAngle = Math.atan2(dx, dz) * (180 / Math.PI) + 180
        const pitchAngle = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz)) * (180 / Math.PI)
        
        const bankAngle = curve * 30
        
        const zFactor = (z + 1500) / 2500
        const screenFacingAngle = (zFactor - 0.5) * 30
        const targetPitch = pitchAngle * 0.5 + screenFacingAngle

        const minScale = 0.4 * config.scale
        const maxScale = 1.6 * config.scale
        const zRange = 2500
        
        const rawScale = (z + 1500) / zRange
        const scale = minScale + (maxScale - minScale) * Math.max(0, Math.min(1, rawScale))

        // 修改重置逻辑，飞出左侧后停止
        if (x < -200) {
          // 标记蝴蝶已完成
          butterfly.dataset.finished = 'true'
          // 隐藏蝴蝶
          butterfly.style.opacity = '0'
          butterfly.style.transition = 'opacity 0.5s ease-out'
          return
        }

        // 正常动画继续
        butterfly.style.transform = `
          translate3d(${x}px, ${y}px, ${z}px)
          rotateZ(${-90 + bankAngle}deg)
          rotateY(${yawAngle}deg)
          rotateX(${targetPitch}deg)
          scale(${scale})
        `

        butterfly.dataset.prevX = x.toString()
        butterfly.dataset.prevY = y.toString()
        butterfly.dataset.prevZ = z.toString()
      })

      // 如果所有蝴蝶都完成了，停止动画循环
      if (allButterfliesFinished) {
        cancelAnimationFrame(animationFrameId)
        return
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div ref={sceneRef} className={styles.scene}>
      <div ref={worldRef} className={styles.world}>
        {butterflies.current.map((config, index) => (
          <Butterfly key={index} config={config} />
        ))}
      </div>
      <svg className={styles.svg_defs}>
        <defs>
          <g id="shape-butterfly-1">
            <path d="M8.65,2.85c0.934-0.2,2.15-0.333,3.65-0.4c1.534-0.1,2.667-0.083,3.4,0.05
              c1.533,0.267,3.45,0.767,5.75,1.5c2.466,0.8,4.35,1.617,5.65,2.45c2.066,1.2,3.883,2.383,5.45,3.55c2.567,2.1,4.35,3.8,5.35,5.1
              l2.1,2.5c0.933,1.167,1.517,1.983,1.75,2.45c0.333,0.767,1.083,2.117,2.25,4.05c0.233,0.467,0.717,1.683,1.45,3.65
              c0.733,2.067,1.2,3.45,1.4,4.15c0.467,1.733,0.917,3.767,1.35,6.1l0.4,3.85l-0.25-3.4c-0.6-5.967-1.267-10.25-2-12.85
              c-0.733-2.434-2.167-5.467-4.3-9.1c-0.966-1.667-1.566-3-1.8-4c-0.233-0.933-0.1-1.267,0.4-1c1.3,0.733,2.917,3.867,4.85,9.4
              c1.667,4.7,2.85,11.2,3.55,19.5c0.567,6.934,0.667,11.917,0.3,14.95l0.2,0.05c0.231,0,0.348-0.05,0.35-0.15v0.05l0.1,0.05v27.4
              c-0.032-0.018-0.065-0.035-0.1-0.05v-0.05c-0.7,0.267-0.983,0.117-0.85-0.45c0.067-0.333,0.017-0.817-0.15-1.45
              c-0.2-0.6-0.316-0.983-0.35-1.15l-0.5-1.65c-0.533-2.967-0.833-5.034-0.9-6.2c-0.1-1.533-0.133-2.4-0.1-2.6
              c0-0.933,0.167-1.667,0.5-2.2c0.567-0.9,0.684-1.75,0.35-2.55c-0.167-0.367-0.367-0.6-0.6-0.7c-0.333-0.133-0.517,0.283-0.55,1.25
              c-0.033,1.533-0.167,2.9-0.4,4.1c-0.1,2.3-0.267,3.684-0.5,4.15c-0.333,0.667-1.25,2.95-2.75,6.85c-1.167,2.8-2.233,4.817-3.2,6.05
              c-0.9,1.2-1.583,2.1-2.05,2.7c-0.8,1-1.434,1.667-1.9,2c-2.067,1.333-3.633,2.067-4.7,2.2c-3.033,0.267-4.95,0.317-5.75,0.15
              c-0.8-0.167-1.383-0.217-1.75-0.15c-0.533,0.1-1.033,0.45-1.5,1.05c-0.5,0.667-1.217,1.284-2.15,1.85
              c-0.934,0.567-1.85,0.934-2.75,1.1c-2.467,0.433-4.45,0.25-5.95-0.55c-0.7-0.4-1.467-1.15-2.3-2.25c-0.6-0.867-1.033-1.567-1.3-2.1
              c-0.267-0.667-0.483-1.483-0.65-2.45c-0.3-1.467-0.383-2.717-0.25-3.75c0.267-1.9,0.45-3.05,0.55-3.45
              c0.233-1.233,0.566-2.333,1-3.3C9.25,77.45,9.767,76.4,10,76c0.667-1.233,1.55-2.583,2.65-4.05c1.1-1.434,2.184-2.583,3.25-3.45
              c0.367-0.3,1.15-0.867,2.35-1.7c0.767-0.566,1.917-1.25,3.45-2.05c1.733-0.933,3.267-1.633,4.6-2.1
              c2.133-0.733,4.534-1.467,7.2-2.2c0.467-0.1,1.517-0.3,3.15-0.6c0.967-0.233,0.4-0.4-1.7-0.5c-2.434-0.1-4.534-0.3-6.3-0.6
              c-1.566-0.267-3.383-0.7-5.45-1.3c-2.8-0.8-4.467-1.317-5-1.55c-1.567-0.667-3.2-1.75-4.9-3.25c-1.733-1.533-3-3.1-3.8-4.7
              c-0.533-1.067-0.967-2.434-1.3-4.1c-0.233-1.067-0.3-2.133-0.2-3.2c0.133-0.833,0.183-1.3,0.15-1.4v-0.6
              c-2.467-3.233-3.983-5.433-4.55-6.6c-0.533-1.033-0.883-1.833-1.05-2.4c-0.3-0.867-0.466-1.85-0.5-2.95
              c-0.033-2.367,0.034-4.117,0.2-5.25c0.3-1.034,0.483-1.8,0.55-2.3c0.167-0.867,0.034-1.533-0.4-2c-0.6-0.7-1.133-1.517-1.6-2.45
              c-0.566-1.133-0.833-2.117-0.8-2.95c0.033-1.333,0.167-2.367,0.4-3.1c0.367-1.267,1.05-2.267,2.05-3
              C4.417,4.25,6.483,3.317,8.65,2.85z"/>
          </g>

          <filter id="butterfly-gradient">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 3 -1"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default ButterflyEffect

