import { motion } from 'framer-motion'

interface ButterflyProps {
  className?: string
  scale?: number
  blur?: number
}

export const Butterfly = ({ 
  className = '',
  scale = 1,
  blur = 2
}: ButterflyProps) => {
  // 翅膀动画变体
  const wingVariants = {
    animate: {
      rotateY: [0, 40, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ scale }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* 左翼 */}
        <motion.path
          d="M20 20C20 20 12 15 8 12C4 9 2 5 3 3C4 1 8 2 12 5C16 8 20 20 20 20Z"
          className="fill-[#FFB06B] opacity-90"
          variants={wingVariants}
          animate="animate"
          style={{
            transformOrigin: "right center",
            filter: `blur(${blur}px)`
          }}
        />
        {/* 右翼 */}
        <motion.path
          d="M20 20C20 20 28 15 32 12C36 9 38 5 37 3C36 1 32 2 28 5C24 8 20 20 20 20Z"
          className="fill-[#FFB06B] opacity-90"
          variants={{
            animate: {
              rotateY: [0, -40, 0],
              transition: {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          animate="animate"
          style={{
            transformOrigin: "left center",
            filter: `blur(${blur}px)`
          }}
        />
      </svg>
      
      {/* 光晕效果 */}
      <div 
        className="absolute inset-0 rounded-full bg-[#FFB06B]/30"
        style={{
          filter: `blur(${blur * 4}px)`,
          mixBlendMode: 'screen'
        }}
      />
    </motion.div>
  )
} 