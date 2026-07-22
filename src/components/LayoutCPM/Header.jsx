import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [navOpen, setNavOpen] = useState(false);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/collection", label: "Collection" },
        { to: "/cart", label: "Cart" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
    ];

    return (
        <header className={`w-full flex flex-col ${isHome ? 'absolute left-0 z-50 ' : 'relative'} bg-transparent text-[#F5F5F5]`}>
            <div className="bg-black w-full h-8 overflow-hidden relative flex items-center">
                <div className="header-scroll-text text-[#F5F5F5] px-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit adipisci dicta repellat animi quas eveniet nesciunt itaque fugiat tempore unde assumenda repudiandae, reiciendis in error possimus expedita consequuntur debitis vitae.
                </div>
            </div>

            <div className={`relative w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 ${isHome ? 'bg-transparent' : 'bg-black'} text-[#F5F5F5]`}>
                {/* Left zone */}
                <div className="flex items-center z-10">
                    <button
                        type="button"
                        onClick={() => setNavOpen(true)}
                        aria-label="Open menu"
                        className="flex justify-center items-center"
                    >
                        <IoMenu className="text-3xl text-[#F5F5F5]" />
                    </button>
                </div>

                {/* Centered logo (truly centered at every breakpoint) */}
                <Link
                    to="/"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl font-bold tracking-wide"
                >
                    VERO
                </Link>

                {/* Right zone — cart always; account + search only in window mode */}
                <div className="flex items-center gap-4 sm:gap-6 z-10">
                    <Link to="/login" aria-label="Account" className="hidden lg:block">
                        <IoPerson className="text-2xl text-[#F5F5F5]" />
                    </Link>
                    <FaSearch className="hidden lg:block text-2xl text-[#F5F5F5] cursor-pointer" />
                    <Link to="/cart" aria-label="Cart">
                        <FaShoppingCart className="text-2xl text-[#F5F5F5]" />
                    </Link>
                </div>
            </div>

            {/* Nav drawer (same on every screen) */}
            {navOpen && (
                <div className="fixed inset-0 z-[60]">
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setNavOpen(false)}
                    />
                    <div className="absolute top-0 left-0 h-full w-72 max-w-[80%] bg-black text-[#F5F5F5] p-6 flex flex-col gap-2 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">VERO</h2>
                            <button
                                type="button"
                                onClick={() => setNavOpen(false)}
                                aria-label="Close menu"
                            >
                                <IoClose className="text-3xl" />
                            </button>
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setNavOpen(false)}
                                className="text-lg py-2 border-b border-white/10 hover:text-red-700 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-4 flex items-center gap-6">
                            <Link
                                to="/login"
                                onClick={() => setNavOpen(false)}
                                aria-label="Account"
                                className="flex items-center gap-2 text-sm hover:text-red-700 transition-colors"
                            >
                                <IoPerson className="text-2xl" /> Account
                            </Link>
                            <button
                                type="button"
                                onClick={() => setNavOpen(false)}
                                aria-label="Search"
                                className="flex items-center gap-2 text-sm hover:text-red-700 transition-colors cursor-pointer"
                            >
                                <FaSearch className="text-2xl" /> Search
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header
