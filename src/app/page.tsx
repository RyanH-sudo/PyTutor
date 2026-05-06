import Link from 'next/link';
import { AppShell } from '@/components/shell/app-shell';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Zap, Compass } from 'lucide-react';
import { volumes, totalLessons, totalEstimatedHours } from '@/lib/lessons/volumes';
import { getFirstLesson } from '@/lib/lessons/registry';

export default function HomePage() {
  const firstLesson = getFirstLesson();
  const startHref = firstLesson ? `/lessons/${firstLesson.id}/` : '/lessons/';
  const total = totalLessons();
  const hours = totalEstimatedHours();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="animate-fade-in">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Welcome
          </div>
          <h1 className="font-sans font-bold tracking-tight text-4xl md:text-6xl leading-tight mb-6">
            Learn Python.
            <br />
            <span className="text-muted-foreground italic font-serif font-normal">
              Slowly. Deeply. With patience.
            </span>
          </h1>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mb-8">
            PyTutor is a slow-paced Python learning suite for thoughtful learners.
            Every lesson explains <em>why</em> the words mean what they mean,
            <em>how</em> the concept came to be, and <em>where</em> you'll use
            it as a working engineer. No speed-runs. No watered-down summaries.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Button asChild size="lg" className="gap-2">
              <Link href={startHref}>
                Begin <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/glossary/">Browse glossary</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <Stat label="Volumes" value="13" sublabel="from foundations to capstone" />
            <Stat label="Planned lessons" value={total.toString()} sublabel="paced for understanding" />
            <Stat label="Estimated hours" value={`~${hours}`} sublabel="of patient study" />
          </div>
        </div>

        <section className="border-t border-border pt-16">
          <h2 className="font-sans text-2xl font-semibold tracking-tight mb-8">
            How this is different
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="Etymology built in"
              body="Every key term comes with the story of where the word came from. 'Operator,' 'argument,' 'recursion' — each gets its own card showing its Latin or Greek root, when it entered computing, and why it matters."
            />
            <FeatureCard
              icon={Zap}
              title="Real Python in the browser"
              body="Every code block is editable and runs Python live in your browser. No setup, no terminals, no environment headaches. Just write, run, see what happens."
            />
            <FeatureCard
              icon={Compass}
              title="Built for the work ahead"
              body="The curriculum threads through to applied AI engineering — Claude API, RAG pipelines, evals, MCP servers — and to the FDE mindset. You don't just learn syntax. You learn how to talk about your code."
            />
          </div>
        </section>

        <section className="border-t border-border pt-16 mt-16">
          <h2 className="font-sans text-2xl font-semibold tracking-tight mb-8">
            The thirteen volumes
          </h2>
          <div className="space-y-4">
            {volumes.map((v) => (
              <Link
                key={v.id}
                href={`/lessons/?volume=${v.id}`}
                className="block group"
              >
                <article className="rounded-lg border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="font-mono text-sm text-muted-foreground w-8 shrink-0 pt-1">
                      {String(v.number).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground italic font-serif mb-2">
                        {v.subtitle}
                      </p>
                      <p className="font-serif text-[1rem] leading-relaxed text-foreground/80">
                        {v.description}
                      </p>
                      <div className="text-xs font-mono text-muted-foreground mt-3">
                        {v.lessonCount} lessons · ~{v.estimatedHours} hours
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-3xl font-sans font-bold tracking-tight mt-1">
        {value}
      </div>
      <div className="text-xs text-muted-foreground italic font-serif mt-1">
        {sublabel}
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof BookOpen;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="rounded-md bg-primary/10 p-2 w-fit mb-3">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="font-sans font-semibold mb-2">{title}</h3>
      <p className="font-serif text-[0.95rem] leading-relaxed text-foreground/80">
        {body}
      </p>
    </div>
  );
}
