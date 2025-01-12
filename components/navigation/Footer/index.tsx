import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto py-20 px-4">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo 区域 */}
          <div className="col-span-4 lg:col-span-1 mb-10 lg:mb-0">
            <Logo className="mb-6" />
            <p className="text-sm text-white/60">
              Empowering the future through AI research and innovation.
            </p>
          </div>

          {/* 导航链接区域 */}
          <div className="col-span-2 lg:col-span-3 grid grid-cols-3 gap-8">
            {/* Products & Research 列 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Products & Research</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products/pathless" className="text-sm text-white/60 hover:text-white transition-colors">
                    Pathless
                  </Link>
                </li>
                <li>
                  <Link href="/products/bifrost" className="text-sm text-white/60 hover:text-white transition-colors">
                    Bifrost
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-sm text-white/60 hover:text-white transition-colors">
                    Research
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company 列 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/company" className="text-sm text-white/60 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sm text-white/60 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal 列 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 订阅区域 */}
          <div className="col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4">Stay Connected</h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to get updates on our latest research and product releases.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  "flex-1 bg-white/5 rounded-md px-3 py-2",
                  "text-sm text-white placeholder:text-white/40",
                  "border border-white/10",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                  "transition-all duration-200"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "px-3 py-2 rounded-md",
                  "bg-gradient-to-r from-purple-500 to-blue-500",
                  "text-sm font-medium text-white",
                  "hover:opacity-90",
                  "transition-opacity duration-200"
                )}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © 2024 Topos. Building the future of AI.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="https://github.com/topos-ai" className="text-white/60 hover:text-white transition-colors">
                <GithubIcon className="h-5 w-5" />
              </Link>
              <Link href="https://arxiv.org/search/?query=topos&searchtype=all" className="text-white/60 hover:text-white transition-colors">
                <ArxivIcon className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/topos_ai" className="text-white/60 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function ArxivIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 120 60" 
      fill="currentColor" 
      {...props}
    >
      <path d="M17.3 40.3H14l-2.5-4.7-2.6 4.7H5.6l4-6.8-3.7-6.3h3.3l2.3 4.3 2.3-4.3h3.3l-3.7 6.1 3.9 7zm12.6-13.1h3v13.1h-3zm15 0l-5.9 8.8v4.3h-2.9v-4.2l-6-8.9h3.5l4.1 6.3 4.1-6.3zm13.5 7.7h-9.7c.1.8.5 1.5 1.1 1.9.6.5 1.4.7 2.3.7 1.4 0 2.4-.4 3-1.3h3.1c-.4 1.3-1.1 2.3-2.1 3-.9.6-2.1 1-3.7 1-1.8 0-3.2-.6-4.3-1.7s-1.7-2.5-1.7-4.3.6-3.2 1.7-4.3 2.6-1.7 4.3-1.7c1.7 0 3.1.6 4.1 1.7s1.6 2.5 1.6 4.3v.7zm-3-2.2c-.1-.8-.4-1.4-1-1.8-.6-.5-1.3-.7-2.1-.7s-1.5.2-2 .7c-.6.5-.9 1.1-1 1.8h6.1zm13.9-4.6h-3.1c-.2-.6-.5-1-.9-1.3s-1-.4-1.7-.4c-.9 0-1.6.3-2.2.8s-.8 1.2-.8 2.1.3 1.5.8 1.9c.5.5 1.3.7 2.2.7.7 0 1.2-.1 1.7-.4s.7-.7.9-1.3h3.1c-.3 1.3-.9 2.3-1.9 3s-2.1 1-3.4 1c-1.8 0-3.2-.6-4.2-1.7s-1.6-2.5-1.6-4.3.5-3.2 1.6-4.3 2.5-1.7 4.2-1.7c1.4 0 2.5.3 3.4 1s1.6 1.7 1.9 2.9zm12.9 4.6h-9.7c.1.8.5 1.5 1.1 1.9.6.5 1.4.7 2.3.7 1.4 0 2.4-.4 3-1.3h3.1c-.4 1.3-1.1 2.3-2.1 3-.9.6-2.1 1-3.7 1-1.8 0-3.2-.6-4.3-1.7s-1.7-2.5-1.7-4.3.6-3.2 1.7-4.3 2.6-1.7 4.3-1.7c1.7 0 3.1.6 4.1 1.7s1.6 2.5 1.6 4.3v.7zm-3-2.2c-.1-.8-.4-1.4-1-1.8-.6-.5-1.3-.7-2.1-.7s-1.5.2-2 .7c-.6.5-.9 1.1-1 1.8h6.1zm13.9-5.5v13.1h-2.9v-1.3c-.4.5-.9.8-1.5 1.1s-1.3.4-2 .4c-1.5 0-2.7-.5-3.6-1.6s-1.4-2.5-1.4-4.3.5-3.2 1.4-4.3 2.1-1.6 3.6-1.6c.7 0 1.3.1 2 .4s1.1.6 1.5 1.1v-3h2.9zm-2.9 7.4c0-1.1-.3-1.9-.8-2.6-.5-.6-1.3-.9-2.2-.9s-1.6.3-2.2.9c-.5.6-.8 1.5-.8 2.6s.3 1.9.8 2.6c.5.6 1.3.9 2.2.9s1.6-.3 2.2-.9c.5-.7.8-1.5.8-2.6z"/>
    </svg>
  );
}

function TwitterIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}