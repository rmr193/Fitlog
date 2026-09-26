import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <WorkoutLibrary />
    </div>
  );
}
