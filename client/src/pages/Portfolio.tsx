import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github, Mail } from 'lucide-react';

/**
 * Portfolio Page
 * Showcases projects and skills
 */

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'World Cup Match Predictor',
    description: 'Interactive prediction platform with live countdown timer, confetti animations, and smooth page transitions. Built with React and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Animations'],
    link: '/',
  },
  {
    title: 'Premium UI Components',
    description: 'A collection of reusable, accessible UI components with smooth animations and dark mode support. Built with shadcn/ui and Tailwind CSS.',
    tags: ['React', 'shadcn/ui', 'Accessibility', 'Design System'],
  },
  {
    title: 'Tactical Board Design System',
    description: 'Custom design system inspired by professional sports analytics tools. Features premium dark aesthetic with strategic gold accents.',
    tags: ['Design', 'Tailwind CSS', 'OKLCH Colors', 'Responsive'],
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
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">
            My Work
          </h1>
          <p className="text-muted-foreground text-lg">
            A selection of projects and skills that showcase my expertise in building premium, interactive web experiences.
          </p>
        </div>

        {/* Projects Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="font-display text-3xl text-foreground mb-8">Featured Projects</h2>
          <div className="space-y-6">
            {PROJECTS.map((project, index) => (
              <Card
                key={index}
                className="match-card-shadow bg-card border border-border/50 p-6 md:p-8 hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                  </div>
                  {project.link && (
                    <Button
                      onClick={() => {
                        if (project.link) window.location.href = project.link;
                      }}
                      variant="outline"
                      size="sm"
                      className="gap-2 whitespace-nowrap"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 rounded-full bg-secondary/50 text-accent text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="font-display text-3xl text-foreground mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((skillGroup, index) => (
              <Card
                key={index}
                className="match-card-shadow bg-card border border-border/50 p-6"
              >
                <h3 className="font-display text-xl text-accent mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl text-foreground mb-4">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
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
        <div className="mt-20 text-center text-muted-foreground text-sm">
          <p>© 2026 Your Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
