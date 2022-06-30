import Navbar from "components/Navbar";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

export default DefaultLayout;
