import pic2 from "../assets/pic2.png"
import pic4 from "../assets/pic4.png"
import { AiOutlineRuby } from "react-icons/ai";
import { PiCoatHangerBold } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
function About() {
    return (
        <div>
            <section className="min-h-screen w-full bg-black flex items-center flex-col lg:flex-row">
                <div className="flex flex-col justify-center items-start gap-5 w-full lg:w-[50%] h-full pl-4 sm:pl-10 py-16 text-white">
                    <h1>ABOUT US</h1>
                    <h6 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">CLOTHING <br />MADE FOR <br />EVERY VERSION <br />OF YOU</h6>
                    <p>At VERO, we believe style is more than what you wear- it's how you carry yourself. Our pieces are designed to empower confidence, express individuality, and elevate everyday moments.</p>
                </div>
                <div className="w-full lg:w-[50%] h-[40vh] lg:h-full">
                    <img src={pic2} alt="" className="w-full h-full object-cover" />
                </div>
            </section>
            <section className="min-h-screen w-full bg-white flex items-center flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-[50%] h-[40vh] lg:h-full">
                    <img src={pic4} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center items-start gap-5 w-full lg:w-[50%] h-full pl-4 sm:pl-10 py-16 text-black">
                    <h1>OUR STORY</h1>
                    <h6 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-red-700 leading-tight">SIMPLE IDEAS. <br />MEANINGFUL DESIGNS.</h6>
                    <p>VERO was founded with a simple idea: create timpless clothing that fits real life.</p>
                    <p>From the perfect fit to the finest fabrics, every detail is carefully considered so you can focus on what matters most being yourself</p>
                </div>
            </section>
            <div className="w-full flex flex-wrap justify-center items-stretch gap-y-8 bg-white py-10">
                <div className="w-full sm:w-1/2 lg:w-auto flex justify-center items-center px-4">
                    <div className="flex justify-center items-center">
                        <AiOutlineRuby className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50">
                            <h1 className="text-1xl text-left mb-1 text-red-700">EXCLUSIVE DESIGNS</h1>
                            <h1 className="text-1xl text-left text-black">Unique styles crafted with elegance.</h1>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block w-px bg-black self-stretch"></div>
                <div className="w-full sm:w-1/2 lg:w-auto flex justify-center items-center px-4">
                    <div className="flex justify-center items-center">
                        <PiCoatHangerBold className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50">
                            <h1 className="text-1xl text-left mb-1 text-red-700">PREMIUM QUALITY</h1>
                            <h1 className="text-1xl text-left text-black">Finest fabrics for comfort and luxury.</h1>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block w-px bg-black self-stretch"></div>
                <div className="w-full sm:w-1/2 lg:w-auto flex justify-center items-center px-4">
                    <div className="flex justify-center items-center">
                        <TbWorld className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50">
                            <h1 className="text-1xl text-left mb-1 text-red-700">EXPERT CRAFTSMANSHIP</h1>
                            <h1 className="text-1xl text-left text-black">Atention to detail in every stitch.</h1>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block w-px bg-black self-stretch"></div>
                <div className="w-full sm:w-1/2 lg:w-auto flex justify-center items-center px-4">
                    <div className="flex justify-center items-center">
                        <IoIosPeople className="text-5xl text-black" />
                        <div className="flex flex-col justify-center items-start ml-5 w-50">
                            <h1 className="text-1xl mb-1 text-red-700">TIMELESS BEAUTY</h1>
                            <h1 className="text-1xl text-black">Designed to be cherished for years.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About