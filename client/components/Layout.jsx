import { poppins } from "./Fonts";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div className={`${poppins.className} `}>
            <Header />
            <div className="max-w-[2000px] mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    );
}