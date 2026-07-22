import { Link } from "react-router-dom";


import { LuBanknote } from "react-icons/lu";
import { FaTruck, FaWallet } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";


const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 px-6 md:px-10 relative">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:justify-between lg:items-start">
                <div className="max-w-md">
                    <h2 className="mb-3 text-2xl font-semibold text-red-700">VERO</h2>
                    <p className="text-sm leading-6 text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde magni id,
                        numquam voluptas soluta eveniet explicabo quo, natus ut assumenda fugit
                        nam nobis est nihil veniam! Error facilis nam nisi?
                    </p>
                </div>
                <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
                    <nav>
                        <h1 className="mb-3 text-lg text-red-700">Categories</h1>
                        <ul className="space-y-2 text-sm text-white flex flex-col justify-center items-start">
                            <Link>T-shirts</Link>
                            <Link>Hoodies</Link>
                            <Link>Jackets</Link>
                            <Link>Pants</Link>
                        </ul>
                    </nav>
                    <nav>
                        <h1 className="mb-3 text-lg text-red-700">Quick Links</h1>
                        <ul className="space-y-2 text-sm text-white flex flex-col justify-center items-start">
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/collection">Collection</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>


                        </ul>
                    </nav>

                    <div className="flex flex-col justify-start items-start ">
                        <h1 className="text-red-700 text-lg ">Contact</h1>
                        <ul className="text-white text-sm mt-2 flex flex-col gap-1">
                            <li className="flex items-center gap-1"><MdOutlineMail className="text-red-700 text-lg" /> <span href="mailto:info@timelesselegance.com" >info@timelesselegance.com</span></li>
                            <li className="flex items-center gap-1"><FiPhone className="text-red-700 text-lg" /> <span href="tel:+1234567890" >+1 (234) 567-890</span></li>
                            <li className="flex items-center gap-1"><IoLocationOutline className="text-red-700 text-lg" /> <span >123 Elegance St, Fashion City, USA</span></li>
                        </ul>
                        <h1 className="text-red-700 text-lg mt-4">Follow us</h1>
                        <div className="flex gap-4 mt-4">
                            <a href="https://www.instagram.com" className="text-red-700 text-2xl ">
                                <FaInstagram />
                            </a>
                            <a href="https://www.facebook.com" className="text-red-700 text-2xl">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.pinterest.com" className="text-red-700 text-2xl">
                                <FaPinterest />
                            </a>
                            <a href="https://www.tiktok.com" className="text-red-700 text-2xl">
                                <FaTiktok />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-gray-800 pt-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
                    <p className="flex items-center gap-2">
                        <FaTruck /> Free Delivery
                    </p>
                    <p className="flex items-center gap-2">
                        <LuBanknote /> Money Back Guarantee
                    </p>
                    <p className="flex items-center gap-2">
                        <FaWallet /> Secure Payments
                    </p>
                </div>
                <p className="text-center text-sm text-white">© 2025 All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer