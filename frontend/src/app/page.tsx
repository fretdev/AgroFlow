import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Navbar from "@/src/components/Navbar";

gsap.registerPlugin(ScrollTrigger,SplitText)
export default function LandingPage() {
  return (
      <>
        <header>
          <Navbar />
        </header>
     </>
  );
}