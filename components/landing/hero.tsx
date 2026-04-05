import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background pt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary/50 border border-accent/30 rounded-full">
          <p className="text-sm font-medium text-accent">Launch your creative potential</p>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Create Compelling
          <span className="block text-accent">Content Effortlessly</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Harness the power of AI to generate, edit, and publish professional content in minutes. Perfect for creators, marketers, and teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/sign-up">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started Free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-accent/30 text-foreground hover:bg-secondary">
            View Demo
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required • 7-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
