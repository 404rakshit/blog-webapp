import Image from "next/image";
import { jose } from "./Fonts";

export default function Article({ data }) {
    let date = new Date(data?.createdAt || "2012").toString().split(" ")
    return (
        <div className="border-t border-zinc-300 flex flex-col gap-4 py-5 w-full">
            <div className="flex justify-between items-center">
                <section className="flex gap-2">
                    {data?.author.profile ? <Image loader={() => data.author.profile} src={data.author.profile} className="rounded-full object-cover" width={55} height={55} /> : <span className="h-14 w-14 animate-pulse bg-zinc-100 rounded-full"></span>}
                    <section className="flex justify-center flex-col p-1">
                        {data?.author.name ? <span className={`${jose.className} flex items-center text-lg leading-[0px]`}>{data.author.name} ·<label className="px-2 text-sm text-zinc-400">{date[1] + ' ' + date[2]}</label></span> : <span className="bg-zinc-100 animate-pulse w-20 h-6 rounded-md"></span>}
                        <section className="flex gap-1">
                            {data?.author.designation ? <span className="text-zinc-400 text-sm">{data.author.designation || NaN}</span> : <span className="bg-zinc-100 animate-pulse w-40 h-6 rounded-md"></span>}
                            {data?.author.company ? <span className="text-zinc-400 text-sm">at {data.author.company || NaN}</span> : <></>}
                        </section>
                    </section>
                </section>

                <span className="p-0.5 rounded-full opacity-70 h-fit transition-all duration-200 xl:hover:opacity-100 xl:hover:bg-zinc-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </span>

            </div>

            <section className="flex max-xl:flex-col-reverse gap-3 items-start justify-between">
                <div className="flex flex-col py-3 gap-2 w-full">
                    {data?.title ? <h3 className={`${jose.className} text-2xl leading-6`}>{data.title}</h3> : <span className="h-10 w-96 animate-pulse bg-zinc-100 rounded-md"></span>}
                    {data?.description ? <p className="text-zinc-400 text-sm">{data.description}</p> : <><span className="h-8 w-full animate-pulse bg-zinc-100 rounded-md"></span><span className="h-8 w-full animate-pulse bg-zinc-100 rounded-md"></span></>}
                </div>

                {data?.cover ? <Image loader={() => data.cover} src={data.cover} width={270} height={180} className="rounded-lg object-cover max-xl:w-full " /> : <div className="h-40 w-72 max-xl:w-full max-xl:h-80 bg-zinc-100 rounded-lg animate-pulse"></div>}
                
            </section>

            <div className="flex justify-between items-center">
                <section className="flex gap-3">
                    {data?.tags ? <><span className="rounded-full bg-zinc-100 px-5 py-3 text-xs max-xl:text-sm transition-all cursor-pointer duration-300 xl:hover:bg-zinc-200 xl:hover:text-zinc-400 text-zinc-400 font-medium">{data?.tags[0]}</span><span className="rounded-full bg-zinc-100 px-5 py-3 text-xs max-xl:text-sm transition-all cursor-pointer duration-300 xl:hover:bg-zinc-200 xl:hover:text-zinc-400 text-zinc-400 font-medium">3 min read</span></> : <><span className="rounded-full bg-zinc-100 px-5 py-3 w-28 animate-pulse"></span><span className="rounded-full bg-zinc-100 px-5 py-3 w-28 h-10 animate-pulse"></span></> }
                </section>

                <span className="flex gap-2">
                    <span className="p-1 opacity-30 h-fit transition-all duration-200 xl:hover:opacity-70 group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7 xl:group-hover:scale-105 transition-all duration-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </span>
                    <span className="p-1 opacity-30 h-fit transition-all duration-200 xl:hover:opacity-70 group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7 xl:group-hover:scale-105 transition-all duration-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                </span>
            </div>
        </div>
    );
}