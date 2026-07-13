import { Outlet } from "react-router-dom";
import Header from "../components/LayoutCPM/Header";
import Footer from "../components/LayoutCPM/Footer";

function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;