import Image from "next/image";
import { jose, oswald } from "./Fonts";
import Link from "next/link";

export default function Header() {
    return (<>
        <div className="relative flex items-center gap-3 justify-between p-4 xl:px-16">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 cursor-pointer xl:hover:scale-110 transition-all duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <span className={`${oswald.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-semibold uppercase text-2xl`}>Reader</span>

            <section className="flex items-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>

                <span className="rounded-full border border-zinc-600 p-[1px]">
                    <div className="relative overflow-hidden h-8 w-8 rounded-full">
                        <Image loader={() => "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Oreo"} src={"https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Oreo"} fill />
                    </div>
                </span>

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