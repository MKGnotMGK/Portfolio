import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from '@/components/AnimatedText';
import { InteractiveParticles } from '@/components/InteractiveParticles';

/**
 * About/Marketing Page
 * Features animated tagline and portfolio CTA
 */

export default function About() {
  const [, navigate] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowPortfolio = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/portfolio');
    }, 500);
  };

  return (
    <div
      className={`min-h-screen bg-background tactical-grid relative overflow-hidden transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Interactive Particle Background */}
      <InteractiveParticles />

      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Animated Text Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-16">
            <AnimatedText
              text="Your prediction can be either right or wrong, but betting on me is always the right choice"
              className="font-display text-3xl md:text-5xl text-foreground leading-tight"
              delay={300}
            />
          </Card>
        </div>

        {/* Portfolio Button */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '1500ms', animationFillMode: 'both' }}>
          <Button
            onClick={handleShowPortfolio}
            className="portfolio-button bg-accent text-accent-foreground px-8 py-6 text-lg font-display gap-3 group"
          >
            Show Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-50" />
        <div className="absolute top-32 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-30" />
      </div>
    </div>
  );
}
