import { Link } from "react-router-dom";


import video from '../../assets/video.mp4';
import { FaArrowRight } from "react-icons/fa";



function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Video background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={video}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay panel */}
            <div className="absolute top-0 left-0 h-full w-full flex items-center">
                <div
                    className=" p-8 pl-10 pt-20 w-full text-[#F5F5F5] "
                >
                    <h1 className="text-2xl text-left  mb-4">WELCOME TO</h1>
                    <h2 className="text-9xl font-extrabold text-left text-[170px] mb-4 hero-slide-in text-red-700">Fashion</h2>
                    <h2 className="text-9xl font-extrabold text-left text-[170px] mb-4 hero-slide-in text-red-700"
                        style={{ animationDelay: "300ms" }}
                    >
                        World
                    </h2>
                    <Link to="/collection">
                        <button
                            type="button"
                            className="relative flex justify-center gap-5 items-center bg-black border-2 border-[#F5F5F5] px-5 py-3 cursor-pointer hover:text-black hover:bg-[#F5F5F5]"
                        >
                            <h1 className="text-xl text-left ">BROWSE</h1>
                            <FaArrowRight className='mx-auto' />
                        </button>
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default Hero