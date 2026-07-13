
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
                    item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const summary = useMemo(() => {
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? 12 : 0;
        const total = subtotal + shipping;

        return { subtotal, shipping, total };
    }, [cartItems]);

    return (
        <section className="min-h-screen bg-[#f7f5ee] px-4 py-10 text-black sm:px-6 lg:px-10">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#8b5e3c]">VERO / cart</p>
                    <h1 className="text-4xl font-semibold sm:text-5xl">Your cart</h1>
                </div>
                <p className="text-sm text-black/70">
                    {cartItems.length > 0 ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} ready to check out.` : "Your bag is empty."}
                </p>
            </div>

            {cartItems.length === 0 ? (
                <div className="rounded-[28px] border border-black/10 bg-white p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-semibold">Nothing in your cart yet</h2>
                    <p className="mt-3 text-sm text-black/70">
                        Add a few statement pieces from the collection to start building your look.
                    </p>
                    <Link
                        to="/collection"
                        className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8b5e3c]"
                    >
                        Visit the collection
                    </Link>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex flex-col gap-4 rounded-[28px] border border-black/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                                <img src={item.image} alt={item.name} className="h-32 w-full rounded-[20px] object-cover sm:w-28" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <h2 className="text-xl font-semibold">{item.name}</h2>
                                            <p className="text-sm text-black/70">
                                                {item.brand} • {item.color} • {item.size}
                                            </p>
                                        </div>
                                        <p className="text-lg font-semibold">${item.price * item.quantity}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center rounded-full border border-black/10 bg-[#f7f5ee] p-1">
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="h-8 w-8 rounded-full text-lg"
                                            >
                                                −
                                            </button>
                                            <span className="min-w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="h-8 w-8 rounded-full text-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-sm text-[#8b5e3c] transition hover:text-[#6f462a]"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <aside className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <div className="mt-5 space-y-3 text-sm text-black/70">
                            <div className="flex items-center justify-between">
                                <span>Subtotal</span>
                                <span>${summary.subtotal}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Shipping</span>
                                <span>{summary.shipping === 0 ? "Free" : `$${summary.shipping}`}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-black/10 pt-3 text-base font-semibold text-black">
                                <span>Total</span>
                                <span>${summary.total}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="mt-6 w-full rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-[#8b5e3c]"
                        >
                            Checkout
                        </button>
                    </aside>
                </div>
            )}
        </section>
    );
}

export default Cart;