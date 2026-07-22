import { useMemo, useState } from "react";
import { Link, } from "react-router-dom";
import LazyImage from "../components/LazyImage";

function Checkout() {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window === "undefined") return [];
        const saved = window.localStorage.getItem("vero-cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [placed, setPlaced] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        card: "",
    });

    const summary = useMemo(() => {
        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const shipping = subtotal > 0 ? 12 : 0;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }, [cartItems]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const placeOrder = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;
        setPlaced(true);
        window.localStorage.removeItem("vero-cart");
        setCartItems([]);
    };

    if (placed) {
        return (
            <section className="min-h-screen bg-black px-4 py-20 text-center text-white sm:px-6 lg:px-10">
                <h1 className="text-4xl font-semibold sm:text-5xl">Order confirmed</h1>
                <p className="mt-3 text-white/70">
                    Thanks, {form.name || "friend"}! A confirmation is on its way to your inbox.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <Link
                        to="/collection"
                        className="rounded-full bg-red-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-800"
                    >
                        Keep shopping
                    </Link>
                    <Link
                        to="/"
                        className="rounded-full border border-white/40 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
                    >
                        Home
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* White: checkout form */}
            <section className="min-h-screen w-full bg-white px-4 py-12 text-black sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-red-700">
                        VERO / checkout
                    </p>
                    <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Checkout</h1>

                    {cartItems.length === 0 ? (
                        <div className="mt-10 rounded-[28px] border border-black/10 bg-white p-10 text-center shadow-sm">
                            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                            <p className="mt-3 text-sm text-black/70">
                                Add a few pieces before checking out.
                            </p>
                            <Link
                                to="/collection"
                                className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                Visit the collection
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                            {/* Form */}
                            <form onSubmit={placeOrder} className="space-y-5">
                                <div>
                                    <h2 className="mb-3 text-lg font-semibold text-red-700">
                                        Contact
                                    </h2>
                                    <div className="space-y-3">
                                        <input
                                            required
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Full name"
                                            className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                                        />
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-3 text-lg font-semibold text-red-700">
                                        Shipping address
                                    </h2>
                                    <div className="space-y-3">
                                        <input
                                            required
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            placeholder="Street address"
                                            className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                                        />
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <input
                                                required
                                                name="city"
                                                value={form.city}
                                                onChange={handleChange}
                                                placeholder="City"
                                                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                                            />
                                            <input
                                                required
                                                name="zip"
                                                value={form.zip}
                                                onChange={handleChange}
                                                placeholder="ZIP code"
                                                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-3 text-lg font-semibold text-red-700">
                                        Payment
                                    </h2>
                                    <input
                                        required
                                        name="card"
                                        value={form.card}
                                        onChange={handleChange}
                                        placeholder="Card number"
                                        className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-red-700"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full  bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700"
                                >
                                    Place order · ${summary.total}
                                </button>
                            </form>

                            {/* Black: order summary */}
                            <aside className="h-fit  bg-black p-6 text-white shadow-sm">
                                <h2 className="text-xl font-semibold">Order summary</h2>
                                <div className="mt-5 space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.lineId || item.id}
                                            className="flex items-center gap-3"
                                        >
                                            <LazyImage
                                                src={item.image}
                                                alt={item.name}
                                                className="h-16 w-14  object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-white/60">
                                                    {item.size} · Qty {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold">
                                                ${item.price * item.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm text-white/70">
                                    <div className="flex items-center justify-between">
                                        <span>Subtotal</span>
                                        <span>${summary.subtotal}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Shipping</span>
                                        <span>
                                            {summary.shipping === 0
                                                ? "Free"
                                                : `$${summary.shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                                        <span>Total</span>
                                        <span>${summary.total}</span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    )}
                </div>
            </section>

            {/* Black: reassurance strip */}
            <section className="w-full bg-black px-4 py-10 text-white sm:px-6 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 text-sm text-white/70">
                    <p>Free delivery on orders over $150</p>
                    <p>·</p>
                    <p>30-day returns</p>
                    <p>·</p>
                    <p>Secure checkout</p>
                </div>
            </section>
        </>
    );
}

export default Checkout;
