import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Pricing } from '@/components/landing/pricing';
import { CTA } from '@/components/landing/cta';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-secondary/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Content<span className="text-accent">Pro</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-foreground hover:text-accent transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-foreground hover:text-accent transition-colors">
              Pricing
            </a>
            <a href="/docs" className="text-foreground hover:text-accent transition-colors">
              Docs
            </a>
          </nav>
          <div className="flex gap-4">
           <Link href="/sign-in">
            <button className="px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent/10 transition-colors font-medium">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium">
              Sign Up
            </button>
          </Link>
          </div>
        </div>
      </header>

      <Hero />

      <section id="features">
        <Features />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <CTA />

      {/* Footer */}
      <footer className="border-t border-secondary/50 bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">ContentPro</h3>
              <p className="text-sm text-muted-foreground">
                Empowering creators with AI-powered content generation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ContentPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
