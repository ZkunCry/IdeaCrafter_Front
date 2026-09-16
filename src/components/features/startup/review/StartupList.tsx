"use client";
import type { StartupResponse } from "../types";
import StartupCard from "../create/StartupCard";
const StartupList = ({ data }: { data: StartupResponse }) => {
  const startups = data?.items ?? [];

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-6 flex-1 content-baseline">
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  );
};

export default StartupList;
