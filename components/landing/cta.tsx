import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Ready to Transform Your Content Strategy?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators already using our platform to save time and create better content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Your Free Trial
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-accent/30">
            Schedule Demo
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Questions? <a href="mailto:hello@example.com" className="text-accent hover:underline">Contact us</a>
        </p>
      </div>
    </section>
  );
}
