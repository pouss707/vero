import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";

function Cart() {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window === "undefined") {
            return [];
        }

        const savedCart = window.localStorage.getItem("vero-cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        window.localStorage.setItem("vero-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const updateQuantity = (id, change) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.lineId === id
                        ? { ...item, quantity: Math.max(0, item.quantity + change) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.lineId !== id));
    };

    const summary = useMemo(() => {
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? 12 : 0;
        const total = subtotal + shipping;

        return { subtotal, shipping, total };
    }, [cartItems]);

    return (
        <>
            {/* Black: cart */}
            <section className="min-h-screen w-full bg-white px-4 py-12 text-white sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-red-700">VERO / cart</p>
                    <h1 className="mt-2 text-4xl font-semibold sm:text-5xl text-black">Your cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="mt-10  border border-white/10 bg-black p-10 text-center">
                            <h2 className="text-2xl font-semibold">Nothing in your cart yet</h2>
                            <p className="mt-3 text-sm text-white/70">
                                Add a few statement pieces from the collection to start building your look.
                            </p>
                            <Link
                                to="/collection"
                                className="mt-6 inline-flex  bg-red-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-800"
                            >
                                Visit the collection
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.lineId || item.id}
                                        className="flex flex-col gap-4  border border-white/10 bg-black p-4 sm:flex-row sm:items-center"
                                    >
                                        <LazyImage
                                            src={item.image}
                                            alt={item.name}
                                            className="h-32 w-full  object-cover sm:w-28"
                                        />
                                        <div className="flex-1 space-y-2">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div>
                                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                                    <p className="text-sm text-white/70">
                                                        {item.brand} • {item.color} • {item.size}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-semibold">
                                                    ${item.price * item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center  border border-white/15 bg-black p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.lineId || item.id, -1)}
                                                        className="h-8 w-8  text-lg"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="min-w-8 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.lineId || item.id, 1)}
                                                        className="h-8 w-8  text-lg"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.lineId || item.id)}
                                                    className="text-sm text-red-700 transition hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <aside className="h-fit  border border-white/10 bg-black p-6">
                                <h2 className="text-xl font-semibold">Summary</h2>
                                <div className="mt-5 space-y-3 text-sm text-white/70">
                                    <div className="flex items-center justify-between">
                                        <span>Subtotal</span>
                                        <span>${summary.subtotal}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Shipping</span>
                                        <span>
                                            {summary.shipping === 0 ? "Free" : `$${summary.shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                                        <span>Total</span>
                                        <span>${summary.total}</span>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="mt-6 block w-full  bg-red-700 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-red-800"
                                >
                                    Checkout
                                </Link>
                                <Link
                                    to="/collection"
                                    className="mt-3 block text-center text-sm text-white/70 transition hover:text-white"
                                >
                                    Continue shopping
                                </Link>
                            </aside>
                        </div>
                    )}
                </div>
            </section>

            {/* White: reassurance strip */}
            <section className="w-full bg-white px-4 py-10 text-black sm:px-6 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 text-sm text-black/70">
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

export default Cart;
