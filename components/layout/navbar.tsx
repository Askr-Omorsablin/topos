import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={cn(
        "container mx-auto px-4 h-20",
        "flex items-center justify-between"
      )}>
        <Logo />
        
        {/* ... 其他导航项 ... */}
      </nav>
    </header>
  );
} 