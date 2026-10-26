"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { Activity, Route, Sprout } from "lucide-react";

export default function Hero() {
    useGSAP(() => {
        const heroTitleSplit = new SplitText(".title", { type: "chars,words" });
        const heroSubtitleSplit = new SplitText(".subtitle", { type: "lines" });

        heroTitleSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        const tl = gsap.timeline();

        tl.fromTo(heroTitleSplit.chars, 
            { opacity: 0, yPercent: 100 },
            { opacity: 1, yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.02 }
        )
        .fromTo(heroSubtitleSplit.lines, 
            { opacity: 0, yPercent: 40 },
            { opacity: 1, yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.06 }, 
            "-=0.6"
        )
        .fromTo(".metric-card", 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, 
            "-=0.5"
        )
        .fromTo(".scroll-indicator", 
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
            "-=0.4"
        );

        return () => {
            heroTitleSplit.revert();
            heroSubtitleSplit.revert();
        };
    }, []);

    return (
        <section className="relative min-h-[100svh] flex flex-col justify-between bg-[url('/images/HeroImage.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-slate-900/5 pb-6">
            <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-32">
                <h1 className="title text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-agro-dark leading-[1.05] max-w-5xl">
                    <span className="block text-agro-dark">The digital layer</span>
                    <span className="block text-agro-dark pl-2 sm:pl-8 lg:pl-36 mt-1 sm:mt-2">of agricultural logistics.</span>
                </h1>
                
                <p className="subtitle mt-4 sm:mt-5 md:ml-auto md:mr-8 max-w-md sm:max-w-lg border-l-2 border-agro-green pl-4 sm:pl-5 text-base md:text-lg font-semibold leading-relaxed text-[#234d20]">
                    Connecting farmers, traders, transporters, and buyers in one unified pipeline to eliminate post-harvest crop spoilage.
                </p>

                <div className="mt-8 sm:mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-5xl">
                    <article className="metric-card group rounded-3xl border border-white/80 bg-[#fffdf7]/90 p-4 sm:p-5 shadow-[0_18px_50px_-25px_rgba(27,63,24,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_55px_-25px_rgba(27,63,24,0.45)]">
                        <div className="mb-4 flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf4e8] text-agro-green">
                                <Sprout aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#58714c]">For every harvest</span>
                        </div>
                        <dl>
                            <dd className="font-serif text-3xl font-medium tracking-[-0.06em] text-agro-dark sm:text-4xl">99.4%</dd>
                            <dt className="mt-1.5 text-sm font-semibold text-[#234d20]">of each harvest protected</dt>
                            <dd className="mt-1 text-xs leading-relaxed text-slate-600">More of the hard work makes it to market.</dd>
                        </dl>
                    </article>

                    <article className="metric-card group rounded-3xl border border-white/80 bg-[#fffdf7]/90 p-4 sm:p-5 shadow-[0_18px_50px_-25px_rgba(27,63,24,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_55px_-25px_rgba(27,63,24,0.45)]">
                        <div className="mb-4 flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f0df] text-[#8b6b27]">
                                <Route aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#756643]">Closer together</span>
                        </div>
                        <dl>
                            <dd className="font-serif text-3xl font-medium tracking-[-0.06em] text-agro-dark sm:text-4xl">450+</dd>
                            <dt className="mt-1.5 text-sm font-semibold text-[#234d20]">logistics corridors</dt>
                            <dd className="mt-1 text-xs leading-relaxed text-slate-600">Helping growers and buyers find their way.</dd>
                        </dl>
                    </article>

                    <article className="metric-card group rounded-3xl border border-white/80 bg-[#fffdf7]/90 p-4 sm:p-5 shadow-[0_18px_50px_-25px_rgba(27,63,24,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_55px_-25px_rgba(27,63,24,0.45)]">
                        <div className="mb-4 flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf1e9] text-agro-dark">
                                <Activity aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#58714c]">Every step, in view</span>
                        </div>
                        <dl>
                            <dd className="font-serif text-3xl font-medium tracking-[-0.06em] text-agro-dark sm:text-4xl">Real-Time</dd>
                            <dt className="mt-1.5 text-sm font-semibold text-[#234d20]">pipeline visibility</dt>
                            <dd className="mt-1 text-xs leading-relaxed text-slate-600">A clearer picture from farm to market.</dd>
                        </dl>
                    </article>
                </div>
            </div>

            <div className="scroll-indicator relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-center mt-auto pt-6">
                <div className="w-6 h-10 rounded-full border-2 border-[#326729]/50 flex items-start justify-center p-1 bg-white/70 backdrop-blur-md shadow-sm">
                    <div className="w-1.5 h-2.5 bg-[#326729] rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}