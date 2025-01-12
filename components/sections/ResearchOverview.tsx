'use client'
import * as React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from "@/lib/utils"
import { 
  Brain, 
  BookOpen, 
  Atom, 
  Globe2, 
  Microscope,
  Factory,
  GraduationCap,
  Expand,
  Move3D,
  Library
} from 'lucide-react'
import { BeamSystem, type BeamConnection as BeamSystemConnection } from "@/components/ui/beam-system"
import ShinyButton from "@/components/ui/shiny-button"
import { CurvedBeam } from "@/components/ui/curved-beam"

// 连线点组件
const BeamPoint = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div
      ref={ref}
      className={cn("absolute w-2 h-2 rounded-full bg-indigo-500/50", className)}
    />
  )
)
BeamPoint.displayName = "BeamPoint"

// 添加连线描述组件
const BeamLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "absolute text-sm text-white/60 pointer-events-none transition-opacity duration-300",
    className
  )}>
    {children}
  </div>
);

const Card = ({ 
  title, 
  children,
  variant = 'secondary',
  className = "",
  icon: Icon,
  beamPoints = {}
}: { 
  title: string
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'teal' | 'purple' | 'white'
  className?: string
  icon?: React.ElementType
  beamPoints?: {
    right?: React.RefObject<HTMLDivElement>
    left?: React.RefObject<HTMLDivElement>
    top?: React.RefObject<HTMLDivElement>
    bottom?: React.RefObject<HTMLDivElement>
  }
}) => {
  const styles = {
    primary: 'bg-gradient-to-br from-[#1a237e]/90 to-[#0d47a1]/90',
    secondary: 'bg-gradient-to-br from-[#283593]/90 to-[#1565c0]/90',
    teal: 'bg-gradient-to-br from-[#26a69a]/90 to-[#00796b]/90',
    purple: 'bg-gradient-to-br from-[#673ab7]/90 to-[#4527a0]/90',
    white: 'bg-gradient-to-br from-white/20 to-white/10'
  }

  const borderStyles = {
    primary: 'border-indigo-400/20',
    secondary: 'border-blue-400/20',
    teal: 'border-teal-400/20',
    purple: 'border-purple-400/20',
    white: 'border-white/20'
  }

  const glowStyles = {
    primary: 'shadow-[0_0_25px_-5px_rgba(63,81,181,0.3)]',
    secondary: 'shadow-[0_0_25px_-5px_rgba(33,150,243,0.3)]',
    teal: 'shadow-[0_0_25px_-5px_rgba(38,166,154,0.3)]',
    purple: 'shadow-[0_0_25px_-5px_rgba(103,58,183,0.3)]',
    white: 'shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)]'
  }

  return (
    <div 
      className={cn(
        // 基础样式
        'relative px-6 py-3 rounded-lg',
        'backdrop-blur-sm',
        'border',
        // 渐变背景
        styles[variant],
        // 边框效果
        borderStyles[variant],
        // 光晕效果
        glowStyles[variant],
        // 悬停效果
        'transition-all duration-300 ease-in-out',
        'hover:scale-[1.02]',
        'hover:shadow-lg',
        // 玻璃态效果
        'before:absolute before:inset-0',
        'before:rounded-lg',
        'before:bg-gradient-to-br',
        'before:from-white/5 before:to-transparent',
        'before:pointer-events-none',
        className
      )}
    >
      <div className="relative z-10 flex items-center gap-3">
        {Icon && (
          <Icon className={cn(
            "w-5 h-5",
            "text-white/80",
            "transition-transform duration-300",
            "group-hover:scale-110"
          )} />
        )}
        <span className={cn(
          "text-white text-sm font-medium",
          "tracking-wide",
          "transition-colors duration-300",
          "group-hover:text-white"
        )}>
          {title}
        </span>
      </div>
      {beamPoints.right && (
        <BeamPoint 
          ref={beamPoints.right} 
          className="right-0 top-1/2 translate-x-1/2 -translate-y-1/2" 
        />
      )}
      {beamPoints.left && (
        <BeamPoint 
          ref={beamPoints.left} 
          className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" 
        />
      )}
      {beamPoints.top && (
        <BeamPoint 
          ref={beamPoints.top} 
          className="top-0 left-1/2 -translate-y-1/2 -translate-x-1/2" 
        />
      )}
      {beamPoints.bottom && (
        <BeamPoint 
          ref={beamPoints.bottom} 
          className="bottom-0 right-0 translate-y-1/2 translate-x-1/2"
        />
      )}
    </div>
  )
}

const Container = ({
  title,
  children,
  className = "",
  icon: Icon,
  beamPoints = {}
}: {
  title: string
  children: React.ReactNode
  className?: string
  icon?: React.ElementType
  beamPoints?: {
    right?: React.RefObject<HTMLDivElement>
    left?: React.RefObject<HTMLDivElement>
    left2?: React.RefObject<HTMLDivElement>
    top?: React.RefObject<HTMLDivElement>
    bottom?: React.RefObject<HTMLDivElement>
  }
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={className}
  >
    <div className={cn(
      "relative p-4 rounded-lg flex flex-col",
      // 渐变背景
      "bg-gradient-to-br from-[#1a237e]/90 to-[#0d47a1]/90",
      // 边框效果
      "border border-indigo-400/20",
      // 光晕效果
      "shadow-[0_0_35px_-5px_rgba(63,81,181,0.3)]",
      // 玻璃态效果
      "backdrop-blur-sm",
      "before:absolute before:inset-0",
      "before:rounded-lg",
      "before:bg-gradient-to-br",
      "before:from-white/5 before:to-transparent",
      "before:pointer-events-none",
      // 悬停效果
      "transition-all duration-300 ease-in-out",
      "hover:shadow-lg"
    )}>
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon className={cn(
              "w-5 h-5",
              "text-white/80",
              "transition-transform duration-300",
              "group-hover:scale-110"
            )} />
          )}
          <span className={cn(
            "text-white text-sm font-medium",
            "tracking-wide",
            "transition-colors duration-300",
            "group-hover:text-white"
          )}>
            {title}
          </span>
        </div>
      </div>
      <div className="space-y-2 flex-1 relative z-10">
        {children}
      </div>
      {beamPoints.right && <BeamPoint ref={beamPoints.right} className="right-0 top-[34%] translate-x-1/2 -translate-y-1/2" />}
      {beamPoints.left && <BeamPoint ref={beamPoints.left} className="left-0 top-[34%] -translate-x-1/2 -translate-y-1/2" />}
      {beamPoints.left2 && <BeamPoint ref={beamPoints.left2} className="left-0 top-[58%] -translate-x-1/2 -translate-y-1/2" />}
      {beamPoints.top && <BeamPoint ref={beamPoints.top} className="top-0 left-[58%] -translate-y-1/2 -translate-x-1/2" />}
      {beamPoints.bottom && <BeamPoint ref={beamPoints.bottom} className="bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2" />}
    </div>
  </motion.div>
)

// 修改 LambdaOrb 组件，移除动画
const LambdaOrb = ({ 
  className, 
  isActive,
  label,
  labelPosition = 'top',
  beamPoints = {}
}: { 
  className?: string, 
  isActive?: boolean,
  label: string,
  labelPosition?: 'top' | 'bottom',
  beamPoints?: {
    bottom?: React.RefObject<HTMLDivElement>
  }
}) => (
  <div className={cn("relative flex flex-col items-center", className)}>
    {/* 标签文字 */}
    {labelPosition === 'top' && (
      <div className="mb-3">
        <div className={cn(
          "px-3 py-1.5 rounded-full",
          "bg-black/30 backdrop-blur-sm",
          "whitespace-nowrap",
          isActive ? "opacity-100" : "opacity-70"
        )}>
          <span className="text-sm text-white/90 font-medium tracking-wide">
            {label}
          </span>
        </div>
      </div>
    )}
    
    {/* Lambda 球体 - 移除动画效果 */}
    <div className={cn(
      "w-10 h-10 rounded-full",
      "flex items-center justify-center",
      "bg-gradient-to-br from-indigo-500/90 to-sky-500/90",
      "border border-white/30",
      "shadow-[0_0_30px_rgba(99,102,241,0.5)]",
      "before:absolute before:inset-0",
      "before:rounded-full",
      "before:bg-indigo-500/20",
      "before:blur-xl",
      "before:transform-gpu",
      isActive ? "opacity-100 scale-110" : "opacity-90",
      "transition-all duration-500"
    )}>
      <span className="text-white text-lg font-light relative z-10">λ</span>
    </div>

    {/* 底部标签 */}
    {labelPosition === 'bottom' && (
      <div className="mt-3">
        <div className={cn(
          "px-3 py-1.5 rounded-full",
          "bg-black/30 backdrop-blur-sm",
          "whitespace-nowrap",
          isActive ? "opacity-100" : "opacity-70"
        )}>
          <span className="text-sm text-white/90 font-medium tracking-wide">
            {label}
          </span>
        </div>
      </div>
    )}

    {beamPoints.bottom && (
      <BeamPoint 
        ref={beamPoints.bottom} 
        className="bottom-[20%] right-0 translate-y-1/2 translate-x-1/2"  // 将 bottom-0 改为 bottom-[20%]
      />
    )}
  </div>
);

// 修改 MathOrb 组件，移除动画
const MathOrb = ({ 
  className, 
  isActive,
  label,
  symbol = 'Σ',
  labelPosition = 'top'
}: { 
  className?: string, 
  isActive?: boolean,
  label: string,
  symbol?: string,
  labelPosition?: 'top' | 'bottom' | 'right' | 'left'
}) => (
  <div className={cn(
    "relative flex",
    // 修改布局方向和对齐方式
    "flex-row items-center",
    // 根据标签位置调整顺序
    labelPosition === 'right' ? "flex-row" : "flex-row-reverse",
    className
  )}>
    {/* 球体部分 - 移除动画 */}
    <div className={cn(
      "w-10 h-10 rounded-full",
      "flex items-center justify-center",
      "bg-gradient-to-br from-orange-500/90 to-purple-500/90",
      "border border-white/30",
      "shadow-[0_0_30px_rgba(249,115,22,0.5)]",
      "before:absolute before:inset-0",
      "before:rounded-full",
      "before:bg-orange-500/20",
      "before:blur-xl",
      "before:transform-gpu",
      isActive ? "opacity-100 scale-110" : "opacity-90",
      "transition-all duration-500",
      labelPosition === 'right' ? "mr-3" : "ml-3"
    )}>
      <span className="text-white text-lg font-light relative z-10">{symbol}</span>
    </div>

    {/* 标签部分 */}
    <div className={cn(
      "px-3 py-1.5 rounded-full",
      "bg-black/30 backdrop-blur-sm",
      "whitespace-nowrap",
      isActive ? "opacity-100" : "opacity-70"
    )}>
      <span className="text-sm text-white/90 font-medium tracking-wide">
        {label}
      </span>
    </div>
  </div>
);

// 扩展导入的类型而不是重新定义
interface BeamConnection extends BeamSystemConnection {
  delay: number;
  checkRefs?: boolean;
}

export default function ResearchOverview() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // 只保留两端的引用点
  const containerRef = useRef<HTMLDivElement>(null);
  const innateModelRightRef = useRef<HTMLDivElement>(null);
  const realWorldLeftRef = useRef<HTMLDivElement>(null);
  // 新增的引用点
  const acquiredModelRightRef = useRef<HTMLDivElement>(null);
  const infoWorldLeftRef = useRef<HTMLDivElement>(null);
  const infoWorldRightRef = useRef<HTMLDivElement>(null);
  const realWorldTopRef = useRef<HTMLDivElement>(null);
  const realWorldLeftRef2 = useRef<HTMLDivElement>(null);
  const humanBottomRef = useRef<HTMLDivElement>(null);  // 添加 Human 底部引用点
  const adaptorFactoryTopRef = useRef<HTMLDivElement>(null);  // 添加 Adaptor Factory 顶部引用点
  const adaptorFactoryRightRef = useRef<HTMLDivElement>(null);  // 添加工厂右侧引用点
  const adaptorContainerLeftRef = useRef<HTMLDivElement>(null);  // 添加容器左侧引用点
  const actionAdaptorRightRef = useRef<HTMLDivElement>(null);
  const biologyWorldRightRef = useRef<HTMLDivElement>(null);  // 改为 Right
  const biologyWorldBottomRef = useRef<HTMLDivElement>(null);  // 添加底部连接点
  const aynAdaptorTopRef = useRef<HTMLDivElement>(null);
  const synchronizeLambdaBottomRef = useRef<HTMLDivElement>(null);
  const extendAdaptorRightRef = useRef<HTMLDivElement>(null);
  const modelingLambdaBottomRef = useRef<HTMLDivElement>(null);

  // 修改连线配置，添加引用点检查
  const beamConnections: BeamSystemConnection[] = [
    {
      id: 'acquired-info',
      from: infoWorldLeftRef,
      to: acquiredModelRightRef,
      isActive: activeSection === 'human' || activeSection === 'info'
    },
    {
      id: 'info-real',
      from: realWorldLeftRef2,
      to: infoWorldRightRef,
      isActive: activeSection === 'info' || activeSection === 'real'
    },
    {
      id: 'real-innate',
      from: realWorldLeftRef,
      to: innateModelRightRef,
      isActive: activeSection === 'human' || activeSection === 'real'
    },
    {
      id: 'human-adaptor',
      from: humanBottomRef,
      to: adaptorFactoryTopRef,
      isActive: activeSection === 'human'
    },
    {
      id: 'factory-container',
      from: adaptorFactoryRightRef,
      to: adaptorContainerLeftRef,
      isActive: activeSection === 'human'
    }
  ];

  // 修改初始化逻辑
  useEffect(() => {
    // 给 DOM 更多时间来渲染
    const timer = setTimeout(() => {
      // 检查所有必要的引用点是否已经准备好
      const allRefsReady = beamConnections.every(
        conn => conn.from.current && conn.to.current
      );

      if (allRefsReady) {
        setActiveSection('human');
      } else {
        // 如果引用点还没准备好，再等一会儿
        const retryTimer = setTimeout(() => {
          setActiveSection('human');
        }, 500);
        return () => clearTimeout(retryTimer);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [beamConnections]);

  // 增强清理逻辑
  useEffect(() => {
    return () => {
      // 清理所有 leader-line 相关元素
      const cleanupLeaderLines = () => {
        // 清理 leader-line-layer
        const layers = document.querySelectorAll('.leader-line-layer');
        layers.forEach(layer => layer.remove());

        // 清理 leader-line
        const lines = document.querySelectorAll('.leader-line');
        lines.forEach(line => line.remove());

        // 清理可能存在的其他相关元素
        const svgContainer = document.querySelector('body > .leader-line');
        if (svgContainer) {
          svgContainer.remove();
        }
      };

      // 执行清理
      cleanupLeaderLines();

      // 确保在任何异步操作完成后也进行清理
      setTimeout(cleanupLeaderLines, 100);
    };
  }, []);

  return (
    <div className={cn(
      "relative w-full h-[800px]",
      "bg-black",
      "overflow-hidden",
      "research-overview-container"
    )}>
      {/* 最外层渐变 - 添加缓慢心跳 */}
      <div className={cn(
        "absolute inset-0",
        "bg-[radial-gradient(circle_5000px_at_center,transparent_20%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.8)_80%,black_100%)]",
        "animate-heartbeat-slow",
        "pointer-events-none"
      )} />

      {/* 主要发光效果 - 集中在中心的心跳 */}
      <div className={cn(
        "absolute inset-0",
        "bg-[radial-gradient(circle_1500px_at_center,#1a237e30,rgba(26,35,126,0.08)_40%,rgba(26,35,126,0.02)_60%,transparent_80%)]",
        "animate-heartbeat",
        "opacity-90"
      )} />

      {/* 动态脉冲效果 - 更集中的中心效果 */}
      <div className={cn(
        "absolute inset-0",
        "bg-[radial-gradient(circle_1000px_at_center,#1a237e25,rgba(26,35,126,0.05)_30%,transparent_60%)]",
        "animate-heartbeat-delayed",
        "pointer-events-none"
      )} />

      {/* 中心亮点 - 不添加动画 */}
      <div className={cn(
        "absolute inset-0",
        "bg-[radial-gradient(circle_600px_at_center,#3949ab35,rgba(57,73,171,0.1)_40%,transparent_70%)]",
        "opacity-95",
        "pointer-events-none"
      )} />

      {/* 添加额外的光晕层 - 静态深度效果 */}
      <div className={cn(
        "absolute inset-0",
        "bg-[radial-gradient(circle_800px_at_center,#1a237e20,transparent_60%)]",
        "mix-blend-screen",
        "pointer-events-none"
      )} />

      {/* 原有的容器内容 */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-[1700px] h-[600px] flex flex-col justify-center gap-32">
          {/* First Row */}
          <div className="flex justify-center gap-56 items-start">
            {/* Human Section */}
            <motion.div>
              <Container 
                title="Human" 
                icon={Brain}
                beamPoints={{ 
                  bottom: humanBottomRef  // 添加底部连接点
                }}
              >
                <Card 
                  title="Innate World Model" 
                  icon={Brain}
                  beamPoints={{ right: innateModelRightRef }}
                  className={cn(
                    "transition-all duration-300",
                    activeSection === 'human' && "transform scale-105"
                  )}
                />
                <Card 
                  title="Acquired World Model" 
                  icon={BookOpen}
                  beamPoints={{ right: acquiredModelRightRef }}
                  className={cn(
                    "transition-all duration-300 mt-16",
                    activeSection === 'human' && "transform scale-105"
                  )}
                />
              </Container>
            </motion.div>

            {/* Center Information World Models */}
            <motion.div className="mt-[104px] relative">
              {/* 第一个 Lambda 球 - Diachronic Evolution */}
              <div className="absolute -top-[99px] left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
                <LambdaOrb 
                  label="Diachronic Evolution"
                  isActive={activeSection === 'human' || activeSection === 'real'}
                />
              </div>

              {/* 第二个 Lambda 球 - Synchronize */}
              <div className="absolute -left-[130px] top-[99%] -translate-y-1/2 z-[100] pointer-events-none">
                <LambdaOrb 
                  label="Synchronize"
                  labelPosition="bottom"
                  isActive={activeSection === 'human' || activeSection === 'info'}
                  beamPoints={{ bottom: synchronizeLambdaBottomRef }}
                />
              </div>

              {/* 第三个 Lambda 球 - Modeling */}
              <div className="absolute -right-[130px] top-[99%] -translate-y-1/2 z-[100] pointer-events-none">
                <LambdaOrb 
                  label="Modeling"
                  labelPosition="bottom"
                  isActive={activeSection === 'human' || activeSection === 'real'}
                  beamPoints={{ bottom: modelingLambdaBottomRef }}
                />
              </div>

              <Card 
                title="Information World Models" 
                variant="teal"
                className={cn(
                  "text-center w-full transition-all duration-300",
                  activeSection === 'info' && "transform scale-105"
                )}
                icon={Library}
                beamPoints={{ 
                  left: infoWorldLeftRef,
                  right: infoWorldRightRef
                }}
              />
            </motion.div>

            {/* Real World Section */}
            <motion.div>
              <Container 
                title="Real World" 
                icon={Globe2}
                beamPoints={{ 
                  left: realWorldLeftRef,
                  left2: realWorldLeftRef2
                }}
              >
                <Card 
                  title="Quantum World" 
                  icon={Atom}
                  className={cn(
                    "transition-all duration-300",
                    activeSection === 'real' && "transform scale-105"
                  )}
                />
                <Card title="Classical World" icon={Move3D} />
                <Card 
                  title="Biology World" 
                  icon={Microscope}
                  beamPoints={{ bottom: biologyWorldBottomRef }}  // 只保留底部连接点
                />
              </Container>
            </motion.div>
          </div>

          {/* Second Row */}
          <div className="flex justify-center gap-44 items-center relative">
            {/* Lambda 球 - Coding */}
            <div className="absolute left-[240px] -top-[95px] z-[100] pointer-events-none">
              <LambdaOrb 
                label="Coding"
                labelPosition="bottom"
                isActive={activeSection === 'human'}
              />
            </div>

            {/* Lambda 球 - Building */}
            <div className="absolute left-[598px] top-[83px] z-[100] pointer-events-none">
              <LambdaOrb 
                label="Building"
                labelPosition="bottom"
                isActive={activeSection === 'human'}
              />
            </div>

            {/* Adaptor Factory */}
            <Card 
              title="Adaptor Factory" 
              variant="white"
              className="w-[300px] text-center"
              icon={Factory}
              beamPoints={{ 
                top: adaptorFactoryTopRef,
                right: adaptorFactoryRightRef  // 添加右侧连接点
              }}
            />
            
            {/* Adaptor Container */}
            <div className="bg-[#4527A0] p-6 rounded-lg w-[300px] relative">
              <BeamPoint 
                ref={adaptorContainerLeftRef} 
                className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" 
              />
              <div className="space-y-3">
                <Card 
                  title="Ayn Adaptor" 
                  variant="purple" 
                  icon={GraduationCap}
                  beamPoints={{ top: aynAdaptorTopRef }}
                />
                <Card 
                  title="Extend Adaptor" 
                  variant="purple" 
                  icon={Expand}
                  beamPoints={{ right: extendAdaptorRightRef }}
                />
                <Card 
                  title="Action Adaptor" 
                  variant="purple" 
                  icon={Move3D}
                  beamPoints={{ right: actionAdaptorRightRef }}  // 确保右侧连接点存在
                />
              </div>
            </div>

            {/* Math 球 - Accelerating */}
            <div className="absolute left-[654px] top-[-130px] z-[100] pointer-events-none">
              <MathOrb 
                label="Accelerating"
                symbol="Π"
                labelPosition="left"  // 确保标签在左侧
                isActive={activeSection === 'human'}
              />
            </div>

            {/* Math 球 - Extending Attention */}
            <div className="absolute right-[255px] top-[-100px] z-[100] pointer-events-none">
              <MathOrb 
                label="Extending Attention"
                symbol="Σ"
                labelPosition="left"  // 确保标签在左侧
                isActive={activeSection === 'human'}
              />
            </div>

            {/* Math 球 - Changing */}
            <div className="absolute left-[1086px] -top-[55px] z-[100] pointer-events-none">
              <MathOrb 
                label="Changing"
                symbol="ζ"
                labelPosition="left"  // 确保标签在左侧
                isActive={activeSection === 'human'}
              />
            </div>
          </div>

          {/* BeamSystem - 添加条件渲染 */}
          <BeamSystem 
            connections={beamConnections}
            className="pointer-events-none z-40"
          />

          <CurvedBeam
            fromRef={actionAdaptorRightRef}
            toRef={biologyWorldBottomRef}
            startSocket="right"
            endSocket="bottom"
            isActive={activeSection === 'human'}
            delay={5500}
          />

          <CurvedBeam
            fromRef={aynAdaptorTopRef}
            toRef={synchronizeLambdaBottomRef}
            startSocket="top"
            endSocket="bottom"
            isActive={activeSection === 'human'}
            delay={5500}
          />

          <CurvedBeam
            fromRef={extendAdaptorRightRef}
            toRef={modelingLambdaBottomRef}
            startSocket="right"
            endSocket="bottom"
            isActive={activeSection === 'human'}
            delay={5500}
          />
        </div>
      </div>
    </div>
  );
} 
