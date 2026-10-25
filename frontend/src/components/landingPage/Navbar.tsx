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
                    <Link href="/frontend/public" className="mobile-logo">
                        <Image src="/images/Logo1.png" alt="Agroflow Logo" width={32} height={32} priority className="w-8 h-8 object-contain" />
                        <span className="font-bold text-base sm:text-lg text-agro-dark truncate">Agroflow</span>
                    </Link>

                    <ul className="desktop-links">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link href={link.href} className="text-slate-600 hover:text-agro-green transition-colors font-medium text-sm lg:text-base whitespace-nowrap">
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link href="/frontend/public" className="desktop-logo">
                        <Image src="/images/Logo1.png" alt="Agroflow Logo" width={38} height={38} priority className="w-9 h-9 object-contain" />
                        <span className="font-bold text-lg text-agro-dark whitespace-nowrap">Agroflow</span>
                    </Link>

                    <div className="nav-actions">
                        <div className="desktop-auth-buttons hidden md:flex items-center gap-3">
                            <Link
                                href="/sign-in"
                                className="text-agro-dark font-medium text-sm lg:text-base px-2.5 py-2 hover:text-agro-green transition-colors whitespace-nowrap"
                            >
                                Login
                            </Link>
                            <Link
                                href="/sign-up"
                                className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm lg:text-base font-medium text-white bg-agro-dark rounded-full shadow-sm hover:bg-agro-green transition-all duration-200 ease-in-out hover:shadow-md active:scale-95 whitespace-nowrap"
                            >
                                <span>Get Started</span>
                                <div className="arrow-container rounded-full bg-white w-5 h-5 flex-center text-agro-dark">
                                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"/>
                                </div>
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="hamburger-btn md:hidden text-slate-700 focus:outline-none p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
                                    className="text-slate-700 font-medium text-lg block hover:text-agro-green transition-colors"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <hr className="border-slate-200" />
                    <div className="dropdown-btns flex flex-col gap-3">
                        <Link
                            href="/sign-in"
                            onClick={() => setIsOpen(false)}
                            className="text-center py-2.5 text-agro-dark font-medium border border-agro-dark/20 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={() => setIsOpen(false)}
                            className="group inline-flex items-center justify-center gap-2 text-center py-2.5 bg-agro-dark text-white font-medium rounded-full shadow-sm hover:bg-agro-green transition-colors"
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