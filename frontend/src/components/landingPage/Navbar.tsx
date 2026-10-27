"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/src/constants";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-wrapper">
                <div className="nav-container">
                    <Link href="/" className="mobile-logo">
                        <span className="flex h-7 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f7e9]/80">
                            <Image src="/images/Logo1.png" alt="Agroflow Logo" width={28} height={28} priority className="h-7 w-7 object-contain" />
                        </span>
                        <span className="font-bold text-base sm:text-lg text-white truncate">Agroflow</span>
                    </Link>

                    <ul className="desktop-links">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link href={link.href} className="text-white/85 hover:text-[#d9f99d] transition-colors font-medium text-sm lg:text-base whitespace-nowrap">
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link href="/" className="desktop-logo">
                        <span className="flex h-7 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f7e9]/80">
                            <Image src="/images/Logo1.png" alt="Agroflow Logo" width={32} height={32} priority className="h-8 w-8 object-contain" />
                        </span>
                        <span className="font-bold text-lg text-white whitespace-nowrap">Agroflow</span>
                    </Link>

                    <div className="nav-actions">
                        <div className="desktop-auth-buttons hidden md:flex items-center gap-3">
                            <Link
                                href="/sign-in"
                                className="text-white/90 font-medium text-sm lg:text-base px-2.5 py-2 hover:text-[#d9f99d] transition-colors whitespace-nowrap"
                            >
                                Login
                            </Link>
                            <Link
                                href="/sign-up"
                                className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm lg:text-base font-semibold text-[#102b1e] bg-[#d9f99d] rounded-full shadow-sm hover:bg-white transition-all duration-200 ease-in-out hover:shadow-md active:scale-95 whitespace-nowrap"
                            >
                                <span>Get Started</span>
                                <div className="arrow-container rounded-full bg-[#102b1e] w-5 h-5 flex-center text-[#d9f99d]">
                                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"/>
                                </div>
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="hamburger-btn md:hidden text-white focus:outline-none p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="nav-dropdown">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-white font-medium text-lg block hover:text-[#d9f99d] transition-colors"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <hr className="border-white/15" />
                    <div className="dropdown-btns flex flex-col gap-3">
                        <Link
                            href="/sign-in"
                            onClick={() => setIsOpen(false)}
                            className="text-center py-2.5 text-white font-medium border border-white/25 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={() => setIsOpen(false)}
                            className="group inline-flex items-center justify-center gap-2 text-center py-2.5 bg-[#d9f99d] text-[#102b1e] font-semibold rounded-full shadow-sm hover:bg-white transition-colors"
                        >
                            <span>Get Started</span>
                               <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"/>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}