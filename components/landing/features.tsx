import { Zap, BarChart3, Sparkles, Lock } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Generate high-quality content in seconds using advanced AI models tailored for your needs.',
  },
  {
    icon: Zap,
    title: 'Instant Publishing',
    description: 'Publish directly to your platforms with optimized formatting and scheduling options.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track engagement metrics and optimize your content strategy with detailed insights.',
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    description: 'Enterprise-grade security ensures your content and data are always protected.',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Creators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and grow your content presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-8 rounded-lg border border-secondary bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors"
              >
                <Icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
