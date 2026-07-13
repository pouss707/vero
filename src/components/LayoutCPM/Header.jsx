import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { IoMenu } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
    const location = useLocation();

    const isHome = location.pathname === "/";


    return (
        <header className={`w-screen flex flex-col ${isHome ? 'absolute left-0 z-50 ' : 'relative'} bg-transparent  text-[#F5F5F5]`}>
            <div className="bg-black w-full h-8 overflow-hidden relative flex items-center">
                <div className="header-scroll-text text-[#F5F5F5] px-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit adipisci dicta repellat animi quas eveniet nesciunt itaque fugiat tempore unde assumenda repudiandae, reiciendis in error possimus expedita consequuntur debitis vitae.
                </div>
            </div>
            <div className={`w-screen  flex justify-between items-top px-5   left-0  ${isHome ? 'bg-transparent' : 'bg-black'}  text-[#F5F5F5]`}>
                <button className="flex justify-center items-center">
                    <IoMenu className="text-3xl text-[#F5F5F5]" />
                </button>
                <Link to="/"><h2 className="text-bold text-3xl ml-21">VERO</h2></Link>
                <div className="flex justify-between items-center w-[8%]">
                    <Link to="/auth"><IoPerson className="text-2xl text-[#F5F5F5]" /></Link>
                    <FaSearch className="text-2xl text-[#F5F5F5]" />
                    <Link to="/cart"><FaShoppingCart className="text-2xl text-[#F5F5F5]" /></Link>
                </div>
            </div>
        </header>
    )
}

export default Header