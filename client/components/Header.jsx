import Image from "next/image";
import { jose, oswald } from "./Fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { popUp } from "./Modal";
import { useRouter } from "next/router";
import { unrevel } from "./UserLog";
import { useCookies } from "react-cookie";

export default function Header() {
    const [profile, setProfile] = useState(false)
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["data"])

    useEffect(() => {
        setProfile(cookie.data?.profile)
    }, [])

    return (<>
        <div className={`relative flex items-center gap-3 justify-between p-4 xl:px-16`}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 cursor-pointer xl:hover:scale-110 transition-all duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <Link href={"/"} className={`${oswald.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-semibold uppercase text-2xl`}>Reader</Link>

            <section className="flex items-center gap-5">

                <span onClick={() => {
                    popUp("Error Occured while fetching data...")
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </span>

                {profile ? <span className="relative group rounded-full border border-zinc-600 p-[1px]">
                    <Link href={"/dashboard"}>
                        <div className="relative overflow-hidden h-8 w-8 rounded-full">
                            <Image loader={() => profile} src={profile} fill />
                        </div>
                    </Link>
                    <div className="absolute max-xl:hidden pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-1 z-10 w-40 -left-14 bg-zinc-200 shadow-md rounded-md transition-all duration-200 translate-y-5 p-1">
                        <Link href={"/logout"} className="bg-zinc-800 flex justify-center gap-2 hover:bg-zinc-900 transition-colors duration-150 text-white text-center font-semibold py-1 w-full rounded-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>Logout</Link>
                    </div>
                </span> :
                    <svg onClick={() => {
                        unrevel()
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-9 h-9 transition-all duration-200 cursor-pointer lg:hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>}

                <Link href={"#"} className="flex max-xl:hidden items-center gap-1 px-4 pb-1 pt-2 transition-all duration-200 border group xl:hover:border-zinc-500 border-zinc-300 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-all duration-200 stroke-zinc-500 xl:group-hover:stroke-zinc-700 -translate-y-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span className={`${jose.className} transition-all duration-200 text-zinc-500 xl:group-hover:text-zinc-700 font-semibold text-xs`}>Write</span>
                </Link>

            </section>

        </div>
        <hr />
    </>
    );
}