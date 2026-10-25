export default function Hero(){
    return (
        <section className="relative bg-[url('/images/HeroImage.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center before:absolute before:inset-0 before:bg-slate-900/5">
            <div className="hero-content absolute top-45">
                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-agro-dark leading-[1.05] max-w-5xl">
                    <span className="block text-agro-dark">The digital layer</span>
                    <span className="block text-agro-dark pl-2 lg:pl-36 mt-2">of agricultural logistics.</span>
                </h1>
                <p className="text-white text-lg   lg:text-3xl font-bold tracking-tight leading-[1.05] md:pl-150 mt-5">
                    <span className="md:block">Connecting farmers,traders,</span>
                    <span className="md:block">transporters, and buyers in</span>
                    <span className="md:block">a single unified pipeline to</span>
                    <span>eliminate post-harvest crop</span>
                    <span className="md:block">spoilage</span>
                </p>
            </div>
        </section>
    )
}