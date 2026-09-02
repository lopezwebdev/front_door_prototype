import { Globe, Home, Mail, ShieldCheck } from 'lucide-react';
import { LuxeTopBar } from '@/components/LuxeTopBar';
import { LuxeClientExperience } from '@/components/LuxeClient';

function App() {
  return (
    <div className="min-h-screen bg-cream-50">
      <LuxeTopBar />
      <main className="py-6 sm:py-10">
        <LuxeClientExperience />
      </main>
      <LuxeFooter />
    </div>
  );
}

function LuxeFooter() {
  return (
    <footer className="border-t border-cream-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900">
              <Home className="h-4 w-4 text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy-900">GoGaijin × TokyoLuxe</p>
              <p className="text-xs text-navy-400">Housing guidance for your move to Japan</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-400">
            <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> English-language support</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Works with email + LINE</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-navy-300">
          Your information is shared with TokyoLuxe solely to arrange and prepare for your consultation. This is not a property application, a guarantee of housing, or a real-estate contract.
        </p>
      </div>
    </footer>
  );
}

export default App;
