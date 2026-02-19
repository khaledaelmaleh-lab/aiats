"use client";

import Image from "next/image";

const features = [
  {
    title: "Role Assessment",
    description:
      "Assess candidate skills and fit for specific roles using AI-driven insights.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Candidate Scoring & Ranking",
    description:
      "AI-driven scoring and ranking to surface the best fits for your team instantly.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Pre-Screening Filters",
    description:
      "Customizable question filters that automatically qualify or disqualify candidates.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
  },
  {
    title: "Basic Reporting",
    description:
      "Gain insights into your hiring pipeline with clear, actionable reports.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    title: "Automated Voice Interview",
    description:
      "Conduct AI-powered voice interviews to assess communication skills around the clock.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "Candidate Dashboard",
    description:
      "A personalized dashboard for candidates to track status and receive feedback.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

function FeatureCard({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="group relative flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/5 p-6 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/10 animate-fade-up"
      style={{ animationDelay: `${0.6 + index * 0.08}s` }}
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-foreground transition-colors group-hover:bg-primary/20">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-foreground/60">{description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="relative mx-auto mb-3 w-12 h-12">
            <div className="absolute inset-0 rounded-full bg-white blur-lg scale-[1.5] animate-fade-up" style={{ animationDelay: "0.05s", opacity: "0.3 !important" }} />
            <Image
              src="/logo-animated.gif"
              alt="Bona"
              width={48}
              height={48}
              className="relative w-full h-full animate-fade-up"
              style={{ animationDelay: "0.05s" }}
              unoptimized
            />
          </div>
          <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground">
            Features
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Hire Faster
          </h2>
          <p className="mt-4 text-lg text-foreground/90">
            Powerful AI tools designed specifically for customer service
            recruitment — from screening to onboarding.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
