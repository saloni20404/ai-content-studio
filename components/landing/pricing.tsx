import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    features: [
      '5 content pieces per month',
      'Basic AI models',
      'Standard templates',
      'Email support',
      'Community access',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: '29',
    description: 'For serious creators and teams',
    features: [
      'Unlimited content generation',
      'Advanced AI models',
      'Custom templates',
      'Priority support',
      'Analytics dashboard',
      'Team collaboration',
      'API access',
      'Content scheduling',
    ],
    cta: 'Start Pro Trial',
    featured: true,
  },
];

export function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs. Always flexible to scale with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-8 transition-all ${
                plan.featured
                  ? 'border-accent bg-card ring-2 ring-accent/20'
                  : 'border-secondary bg-card/50 hover:border-accent/50'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  {plan.price !== '0' && <span className="text-muted-foreground">/month</span>}
                </div>
              </div>

              <Link href="/sign-up" className="block mb-8">
                <Button
                  className="w-full"
                  variant={plan.featured ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
