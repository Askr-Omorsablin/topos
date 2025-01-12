'use client'

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  duration?: number
  className?: string
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  curvature?: number
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 2,
  className,
  pathColor = "rgba(156, 163, 175, 0.2)",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#6366f1", // Indigo
  gradientStopColor = "#8b5cf6",  // Purple
  curvature = 0.5
}: AnimatedBeamProps) {
  return (
    <div className={className}>
      <div className="relative">
        {/* 基础路径 */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${pathColor} ${pathOpacity * 100}%, transparent)`,
            height: `${pathWidth}px`,
          }}
        />

        {/* 光束效果 */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${gradientStartColor}, ${gradientStopColor})`,
            animation: `beam ${duration}s linear infinite`,
            height: `${pathWidth * 2}px`,
            filter: 'blur(4px)',
            transform: `translateY(-${pathWidth / 2}px)`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes beam {
          0% {
            transform: translateX(-100%) scaleX(0.5);
            opacity: 0;
          }
          50% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}