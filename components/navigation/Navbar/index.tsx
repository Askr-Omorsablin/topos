'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { ProductsNav } from '@/components/navigation/ProductsNav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/navigation/UserMenu'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 检查是否有 token 来判断登录状态
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }

    // 初始检查
    checkAuthStatus()

    // 监听 storage 变化
    const handleStorageChange = () => {
      checkAuthStatus()
    }

    // 监听自定义事件
    const handleAuthChange = () => {
      checkAuthStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth-change', handleAuthChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [])

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-1">
            <Logo />
          </div>
          
          <div className="hidden sm:flex items-center justify-center flex-1 space-x-12">
            <Link 
              href="/research" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Research
            </Link>
            <ProductsNav />
            <Link 
              href="/company" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Company
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="text-sm font-medium px-6 py-2 bg-transparent border border-white/20 
                    text-white hover:bg-white hover:text-black
                    transition-all duration-300 rounded-full
                    hover:scale-105 hover:border-white"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 