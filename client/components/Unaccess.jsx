import { jose } from "./Fonts";
import { unrevel } from "./UserLog";

export default function Unaccess() {
    return (
        <div className="absolute flex flex-col items-center justify-center gap-2 bg-white bg-opacity-40 backdrop-blur-md min-h-[90svh] w-full -translate-x-16 max-xl:-translate-x-4 max-w-[2000px]">
            <span className={`font-semibold text-2xl`}>You are not logged in</span>
            <button onClick={()=>{
                unrevel()
            }} className={`${jose.className} text-2xl uppercase px-16 leading-6 py-3 rounded-md bg-zinc-800 text-white`}>Login</button>
        </div>
        // <></>
    );
}