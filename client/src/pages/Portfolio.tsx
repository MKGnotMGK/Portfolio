import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github, Mail } from 'lucide-react';

/**
 * Portfolio Page
 * Modern grid layout showcasing projects with interactive hover effects
 */

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  category?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'World Cup Match Predictor',
    description: 'Interactive prediction platform with live countdown timer, confetti animations, and smooth page transitions. Built with React and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Animations'],
    link: '/',
    category: 'Web App',
  },
  {
    title: 'Premium UI Components',
    description: 'A collection of reusable, accessible UI components with smooth animations and dark mode support. Built with shadcn/ui and Tailwind CSS.',
    tags: ['React', 'shadcn/ui', 'Accessibility', 'Design System'],
    category: 'Design System',
  },
  {
    title: 'Tactical Board Design System',
    description: 'Custom design system inspired by professional sports analytics tools. Features premium dark aesthetic with strategic gold accents.',
    tags: ['Design', 'Tailwind CSS', 'OKLCH Colors', 'Responsive'],
    category: 'Design',
  },
  {
    title: 'Interactive Data Dashboard',
    description: 'Real-time analytics dashboard with charts, filters, and responsive design. Showcases data visualization and user interaction patterns.',
    tags: ['React', 'Recharts', 'TypeScript', 'Performance'],
    category: 'Web App',
  },
  {
    title: 'E-commerce Product Page',
    description: 'High-conversion product page with image galleries, reviews, and smooth checkout flow. Optimized for mobile and desktop.',
    tags: ['React', 'E-commerce', 'UX Design', 'Responsive'],
    category: 'Web App',
  },
  {
    title: 'Animation Library',
    description: 'Collection of reusable animation components and utilities. Includes entrance animations, transitions, and micro-interactions.',
    tags: ['Framer Motion', 'React', 'Animation', 'Library'],
    category: 'Library',
  },
];

const SKILLS = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
  { category: 'Design', items: ['UI/UX', 'Animation', 'Responsive Design', 'Accessibility'] },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code', 'Chrome DevTools'] },
];

export default function Portfolio() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background tactical-grid relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Back button */}
        <div className="mb-12">
          <Button
            onClick={() => navigate('/about')}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="max-w-5xl mx-auto mb-20">
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">
            My Work
          </h1>
          <p className="text-muted-foreground text-lg">
            A selection of projects and skills that showcase my expertise in building premium, interactive web experiences.
          </p>
        </div>

        {/* Projects Grid Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12">Featured Projects</h2>
          
          {/* Grid Layout */}
          <div className="projects-grid">
            {PROJECTS.map((project, index) => (
              <Card
                key={index}
                className="project-card match-card-shadow bg-card border border-border/50 p-6 md:p-8 flex flex-col h-full"
              >
                {/* Category Badge */}
                {project.category && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 mb-6">
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="project-tag px-3 py-1 rounded-full bg-secondary/50 text-accent text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                {project.link && (
                  <Button
                    onClick={() => {
                      if (project.link) window.location.href = project.link;
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((skillGroup, index) => (
              <Card
                key={index}
                className="match-card-shadow bg-card border border-border/50 p-6 md:p-8 hover:border-accent/50 transition-all duration-300"
              >
                <h3 className="font-display text-xl text-accent mb-6">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-foreground flex items-center gap-3 text-sm md:text-base"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12 text-center hover:border-accent/50 transition-all duration-300">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base">
              Interested in collaborating? Let's discuss your next project and how I can help bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
              <Button
                variant="outline"
                className="gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p>© 2026 Your Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
