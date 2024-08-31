import React from "react";

interface ExperienceProps {
  company: string;
  role: string;
  duration: string;
  description: React.ReactNode;
}

export default function Experience({
  company,
  role,
  duration,
  description,
}: ExperienceProps) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-gray-500 shadow-sm hover:shadow transition-all">
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{company}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{duration}</p>
        <div className="flex-1 my-4 text-sm/relaxed">{description}</div>
      </div>
    </div>
  );
}
