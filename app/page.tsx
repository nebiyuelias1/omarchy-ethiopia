import { Hero } from "@/components/Hero";
import { Sponsors } from "@/components/Sponsors";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#08090c]">
      {/* 1. Snapping Hero Section */}
      <Hero />

      {/* 2. Snapping Partners & Footer Section */}
      <section
        id="partners"
        className="min-h-screen w-full snap-start snap-always flex flex-col justify-between bg-[#08090c] pt-20"
      >
        <div className="mx-auto w-full max-w-4xl px-6 my-auto">
          <Sponsors />
        </div>

        <Footer />
      </section>
    </div>
  );
}
