import React from "react";

interface ExperienceProps {
  company: string;
  role: string;
  duration: string;
  description: React.ReactNode;
  isTimeline?: boolean;
  logo?: string;
}

export default function Experience({
  company,
  role,
  duration,
  description,
  isTimeline = false,
  logo,
}: ExperienceProps) {
  if (isTimeline) {
    return (
      <div className="relative flex items-start">
        {/* Timeline dot */}
        <div className="absolute left-6 flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
        </div>

        {/* Experience card */}
        <div className="ml-16 flex-1">
          <div className="group flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-secondary/5 hover:bg-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6 flex-1 flex flex-col relative">
              {/* Duration at absolute top right */}
              <p className="absolute top-4 right-4 text-sm text-muted-foreground/80 font-medium bg-secondary/20 px-3 py-1 rounded-full">
                {duration}
              </p>

              {logo && (
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={logo}
                    alt={company}
                    className="rounded-full w-12 h-12"
                  />
                </div>
              )}

              <div className="pr-24 mb-4">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary/90 transition-colors">
                  {company}
                </h3>
                <p className="text-base text-muted-foreground mt-1">{role}</p>
              </div>

              <div className="text-base leading-relaxed text-foreground/90">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-secondary/5 hover:bg-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6 flex-1 flex flex-col relative">
        {/* Duration at absolute top right */}
        <p className="absolute top-4 right-4 text-sm text-muted-foreground/80 font-medium bg-secondary/20 px-3 py-1 rounded-full">
          {duration}
        </p>

        {logo && (
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt={company} className="rounded-full w-12 h-12" />
          </div>
        )}

        <div className="pr-24 mb-4">
          <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary/90 transition-colors">
            {company}
          </h3>
          <p className="text-base text-muted-foreground mt-1">{role}</p>
        </div>

        <div className="flex-1 text-base leading-relaxed text-foreground/90">
          {description}
        </div>
      </div>
    </div>
  );
}
