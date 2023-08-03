import { poppins } from "./Fonts";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal";
import Publish from "./Publish";
import UserLog from "./UserLog";

export default function Layout({ children }) {
    return (
        <div className={`${poppins.className} `}>
            <Modal/>
            <UserLog />
            <Publish />
            <Header />
            <div className="max-w-[2000px] mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    );
}