import { poppins } from "./Fonts";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div className={`${poppins.className}`}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}