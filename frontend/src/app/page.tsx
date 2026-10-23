import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Navbar from "@/src/components/landingPage/Navbar";
import Hero from "../components/landingPage/Hero";

gsap.registerPlugin(ScrollTrigger,SplitText)
export default function LandingPage() {
  return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
            <Hero />
        </main>
     </>
  );
}