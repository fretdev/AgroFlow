export default function Hero(){
    return (
        <section className="relative bg-[url('/images/HeroImage.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center before:absolute before:inset-0 before:bg-slate-900/5">
            <div className="hero-content absolute top-45">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-agro-green leading-[1.05] max-w-5xl">
                    <span className="block text-agro-green">The digital layer</span>
                    <span className="block text-agro-green sm:pl-24 lg:pl-36 mt-2">of agricultural logistics.</span>
                </h1>
                {/* <p className="">Connecting farmers, transporters, and buyers in a single unified pipeline to eliminate post-harvest crop spoilage.</p> */}
            </div>
        </section>
    )
}