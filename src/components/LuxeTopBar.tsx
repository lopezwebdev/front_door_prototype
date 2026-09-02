import { Home } from 'lucide-react';

export function LuxeTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
            <Home className="h-5 w-5 text-gold-400" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col leading-none text-left">
            <span className="text-[15px] font-bold tracking-tight text-navy-900">
              GoGaijin × TokyoLuxe
            </span>
            <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-wider text-navy-400 sm:block">
              Start Your Japan Housing Plan
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
