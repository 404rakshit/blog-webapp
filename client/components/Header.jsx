import Image from "next/image";
import { jose, oswald } from "./Fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { popUp } from "./Modal";
import { useRouter } from "next/router";
import { unrevel } from "./UserLog";
import { useCookies } from "react-cookie";
import { publishModal } from "./Publish";

export default function Header() {
    const [profile, setProfile] = useState(false)
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["data"])

    const [hide, setHide] = useState(true)

    useEffect(() => {
        setProfile(cookie.data?.profile)
    }, [])

    function sidebar() {
        setHide(!hide)
    }

    return (<>
        <div className={`fixed w-full bg-white flex items-center gap-3 justify-between p-4 xl:px-16 border-b-[1px] z-20 shadow`}>

            <svg onClick={() => {
                sidebar()
            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 cursor-pointer xl:hover:scale-110 transition-all duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <Link href={"/"} className={`${oswald.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-semibold uppercase text-2xl`}>Reader</Link>

            {(router.asPath == "/write-new") || (router.asPath.split("/")[1] == "draft" && router.asPath.split("/").length == 3) ? <section className="flex items-center gap-5">
                <button onClick={() => {
                    if (!cookie.data?.username) return null
                    if (document.getElementById("title") && document.getElementById("edit")) publishModal()
                }} className={`${jose.className} flex items-center gap-1 px-4 pt-2 py-1 transition-all duration-200 border group bg-zinc-800 xl:bg-zinc-900 text-white border-zinc-300 rounded-xl`}>Publish</button>
            </section> : <section className="flex items-center gap-5">
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
                            <Image className="object-cover" loader={() => profile} src={profile} fill />
                        </div>
                    </Link>
                    <div className="absolute max-xl:hidden pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-1 z-10 w-40 -left-14 bg-zinc-200 shadow-md rounded-md transition-all duration-200 translate-y-5 p-1">
                        <Link href={"/logout"} className="bg-zinc-800 flex justify-start gap-2 px-3 hover:bg-zinc-900 transition-colors duration-150 text-white text-center font-semibold py-1 w-full rounded-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>Logout</Link>
                    </div>
                </span> :
                    <svg onClick={() => {
                        unrevel()
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-9 h-9 transition-all duration-200 cursor-pointer lg:hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>}

                <Link href={"/write-new"} className="flex max-xl:hidden items-center gap-1 px-4 pb-1 pt-2 transition-all duration-200 border group xl:hover:border-zinc-500 border-zinc-300 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-all duration-200 stroke-zinc-500 xl:group-hover:stroke-zinc-700 -translate-y-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span className={`${jose.className} transition-all duration-200 text-zinc-500 xl:group-hover:text-zinc-700 font-semibold text-xs`}>Write</span>
                </Link>
            </section>}
        </div>
        <div className="bg-white h-[4.2rem]"></div>
        {/* <hr /> */}
        <div className={`fixed flex min-h-[94svh] w-full z-10 bg-black bg-opacity-20 transition-all duration-300 ${hide ? "pointer-events-none opacity-0" : null}`}>
            <div className={`${jose.className} flex flex-col gap-1 p-2 w-56 bg-white h-[94svh] transition-all duration-300 ${hide ? "-translate-x-56" : null}`}>
                <Link onClick={(e) => { if (!profile) e.preventDefault(), unrevel() }} href={"/write-new"} className="flex justify-start gap-2 px-3 rounded border border-zinc-400 text-lg p-3 w-full lg:hover:shadow-md transition-all duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>Write New</Link>
                <Link onClick={(e) => { if (!profile) e.preventDefault(), unrevel() }} href={"/dashboard"} className="flex justify-start gap-2 px-3 rounded bg-zinc-50 text-lg p-3 w-full lg:hover:bg-zinc-100 lg:hover:shadow-md max-lg:bg-zinc-100 transition-all duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                    </svg>Dashboard</Link>
                <Link onClick={(e) => { if (!profile) e.preventDefault(), unrevel() }} href={"/draft"} className="flex justify-start gap-2 px-3 rounded bg-zinc-50 text-lg p-3 w-full lg:hover:bg-zinc-100 lg:hover:shadow-md max-lg:bg-zinc-100 transition-all duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                    </svg>Quick Draft</Link>
                <Link onClick={(e) => { if (!profile) e.preventDefault(), unrevel() }} href={"#"} className="flex justify-start gap-2 px-3 rounded bg-zinc-50 text-lg p-3 w-full lg:hover:bg-zinc-100 lg:hover:shadow-md max-lg:bg-zinc-100 transition-all duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>Saved Blog</Link>
                <Link onClick={(e) => { if (!profile) e.preventDefault(), unrevel() }} href={"/edit-profile"} className="flex justify-start gap-2 px-3 rounded bg-zinc-50 text-lg p-3 w-full lg:hover:bg-zinc-100 lg:hover:shadow-md max-lg:bg-zinc-100 transition-all duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>Edit Profile</Link>
                <span className="mt-auto mb-1 lg:mb-5">
                    <Link onClick={(e) => { if (!profile) e.preventDefault(), unrevel() }} href={"/logout"} className="flex justify-center gap-2 px-3 rounded bg-zinc-800 text-white text-lg p-3 w-full lg:hover:bg-zinc-100 lg:hover:shadow-md lg:hover:text-zinc-900 lg:hover:border-zinc-900 border transition-all duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>Logout</Link>
                </span>
            </div>
            <div onClick={() => { sidebar() }} className="flex-1 transition-all duration-300 "></div>
        </div >
    </>
    );
}