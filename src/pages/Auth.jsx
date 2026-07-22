import { useState } from "react";
import { Link } from "react-router-dom";
import pic1 from "../assets/pic1.png";
import LazyImage from "../components/LazyImage";

function Auth() {
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const isLogin = mode === "login";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Front-end only: no backend wired yet — just bounce to the collection.
        window.location.href = "/collection";
    };

    return (
        <section className="min-h-screen w-full bg-black lg:flex">
            {/* Left: black brand panel */}
            <div className="flex flex-col justify-between gap-8 bg-black px-6 py-10 text-white sm:px-10 lg:w-1/2 lg:py-16">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    VERO
                </Link>
                <div className="hidden lg:block">
                    <h1 className="text-5xl font-semibold leading-tight">
                        {isLogin ? "WELCOME BACK" : "JOIN VERO"}
                    </h1>
                    <p className="mt-4 max-w-md text-white/70">
                        {isLogin
                            ? "Sign in to track orders, save favorites, and check out faster."
                            : "Create an account to unlock a faster checkout and your personal wishlist."}
                    </p>
                </div>
                <LazyImage
                    src={pic1}
                    alt=""
                    className="hidden max-h-64 w-full rounded-[28px] object-cover lg:block"
                />
            </div>

            {/* Right: white form panel */}
            <div className="flex items-center justify-center bg-white px-6 py-12 text-black sm:px-10 lg:w-1/2 lg:py-16">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-red-700 sm:text-4xl">
                        {isLogin ? "Sign in" : "Create account"}
                    </h2>

                    <div className="mt-6 inline-flex rounded-full border border-black/15 p-1">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={
                                "rounded-full px-5 py-2 text-sm font-medium transition " +
                                (isLogin
                                    ? "bg-black text-white"
                                    : "text-black/70 hover:text-black")
                            }
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("register")}
                            className={
                                "rounded-full px-5 py-2 text-sm font-medium transition " +
                                (!isLogin
                                    ? "bg-black text-white"
                                    : "text-black/70 hover:text-black")
                            }
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {!isLogin && (
                            <input
                                required
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                            />
                        )}
                        <input
                            required
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                        />
                        <input
                            required
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            {isLogin ? "Sign in" : "Create account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-black/70">
                        {isLogin ? "New to VERO? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setMode(isLogin ? "register" : "login")}
                            className="font-medium text-red-700 hover:underline"
                        >
                            {isLogin ? "Create an account" : "Sign in"}
                        </button>
                    </p>

                    <p className="mt-4 text-center text-sm text-black/70">
                        <Link to="/" className="hover:text-red-700">
                            ← Back to home
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Auth;
