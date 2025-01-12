'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://axovcyuykttb.sealoshzh.site/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // 存储 token
      localStorage.setItem('token', data.token)
      
      // 登录成功后跳转
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-black">
      {/* 左侧内容区 */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col justify-center p-12 relative overflow-hidden">
        {/* 添加背景图片 */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/n.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9, // 可以调整透明度
          }}
        />
        
        {/* 添加渐变遮罩 */}
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-black/40 to-transparent"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* 内容放在遮罩上层 */}
        <div className="relative z-10 text-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-light text-white tracking-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent 
                             font-medium mt-2 block text-7xl">
                Topos
              </span>
            </h1>
            <p className="text-white/70 max-w-md mx-auto text-lg">
              Sign in to discover and explore the world.
            </p>
          </div>
        </div>

      </div>

      {/* 右侧表单区 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-light text-white">Log In</h2>
            <p className="mt-2 text-sm text-white/60">
              New to Wordware?{' '}
              <Link 
                href="/signup" 
                className="text-purple-500 hover:text-purple-400 transition-colors"
              >
                Sign up for an account
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                            text-white placeholder-white/30 focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                            text-white placeholder-white/30 focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 
                       hover:from-purple-500 hover:to-blue-500 text-white py-2.5 rounded-lg
                       transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 