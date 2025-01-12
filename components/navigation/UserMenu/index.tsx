'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'

export function UserMenu() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      await fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      // 清除本地存储的 token
      localStorage.removeItem('token')
      
      // 触发自定义事件
      window.dispatchEvent(new Event('auth-change'))
      
      // 刷新页面或重定向
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative h-8 w-8 rounded-full bg-white/10"
        >
          <span className="sr-only">Open user menu</span>
          <div className="flex items-center justify-center w-full h-full text-sm text-white">
            U
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black/95 border border-white/10">
        <DropdownMenuItem
          className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          disabled={isLoading}
          onClick={handleLogout}
        >
          {isLoading ? 'Signing out...' : 'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 