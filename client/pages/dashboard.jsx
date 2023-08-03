import { jose } from "@/components/Fonts";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Refesh } from "@/components/Refesh"
// import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {

    let cookie = ctx.req.cookies?.parallelVortex
    let userData = null;

    if (cookie) {
        userData = (await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/user`,
            headers: {
                'Authorization': `Bearer ${cookie}`,
            }
        })).data
    }

    return {
        props: {
            data: ctx.req.cookies,
            userData
        }
    }
}

export default function Dashboard({ data, userData }) {
    let clientCookie = data?.data
    let serverCookie = data?.parallelVortex
    if (clientCookie) clientCookie = JSON.parse(data?.data)

    Refesh(data?.parallelVortex, data?.parallel)

    const ArticleCard = (img, title, date, des) => {
        date = new Date(date).toString().split(" ")
        return (
            <div className="flex flex-col gap-3 xl:w-[400px] rounded-md p-2">
                <div className="relative rounded-md w-full h-56 overflow-hidden bg-zinc-200">
                    {img ? <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300 cursor-pointer" loader={() => img} src={img} fill /> : <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300" loader={() => "https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} src={"https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} fill />}
                </div>
                <div className="flex flex-shrink flex-col gap-2">
                    {title ? <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>{title}</span> : <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>Title</span>}
                    {date ? <span className={`text-zinc-300 font-semibold px-1 -translate-y-2`}>{date[1] + " " + date[2]}</span> : <span className={`text-zinc-300 font-semibold px-1 -translate-y-2`}>1 January, 2077</span>}
                    {des ? <p className="px-1 text-zinc-500 line-clamp-3">{des}</p> : <p className="px-1 text-zinc-500 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae exercitationem molestias repellat ducimus! Quidem, fuga reiciendis sapiente voluptatum quibusdam repellendus. Ea et ratione possimus odio amet ducimus in officiis nisi!</p>}
                    <span className="p-1 flex gap-2">
                        <button className="rounded-md p-2 px-4 border-2 border-dashed border-zinc-800 group hover:bg-zinc-950 transition-all duration-200 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-105">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                        </button>
                        <button className="flex-1 rounded-md py-2 bg-zinc-950 text-white">Back to Draft</button>
                        <button className="rounded-md p-2 px-4 border-2 border-dashed border-zinc-800 group hover:bg-zinc-950 transition-all duration-200 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-105">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        </button>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className={`relative flex max-xl:flex-col xl:items-start min-h-[90svh] px-4 xl:px-16`}>

                <div className="flex flex-1 max-xl:w-full flex-col items-start gap-4 py-9">
                    <div className="flex items-center justify-between w-full">
                        <section className="flex flex-col gap-1">
                            <span className={`${jose.className} leading-6 xl:text-3xl text-2xl`}>Hey, {userData?.name || "----"}</span>
                            <span className="text-zinc-500 w-2/3 leading-4 text-sm">Good to have you back, have a look here</span>
                        </section>
                        <section className="flex max-xl:flex-col gap-3">
                            <Link href={"/edit-profile"} className="flex gap-1 items-center justify-center p-2 px-5 xl:px-8 rounded-md bg-zinc-900 hover:bg-zinc-950 max-lg:bg-zinc-950 text-white transition-all duration-300 font-semibold"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 max-lg:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                            </svg>Edit Profile</Link>
                        </section>
                    </div>

                    <div className="flex flex-col gap-1 items-center w-full">
                        <section className="flex items-center max-lg:justify-between w-full gap-2 xl:gap-3">

                            <div className="flex-1 flex max-xl:w-full max-xl:justify-evenly items-center justify-center bg-zinc-100 rounded max-xl:p-5 xl:h-28 gap-3 shadow xl:hover:shadow-lg xl:hover:scale-105 transition-all duration-300 cursor-pointer">
                                <span className="max-lg:hidden p-2 rounded-full bg-lime-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-lime-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                    </svg>
                                </span>
                                <section className="flex flex-col items-center pt-3">
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>{userData?.visits || 0}</span>
                                    <span className="text-lime-500 text-opacity-80 font-semibold">visited</span>
                                </section>
                            </div>

                            <div className="flex-1 flex max-xl:w-full max-xl:justify-evenly items-center justify-center bg-zinc-100 rounded max-xl:p-5 xl:h-28 gap-3 shadow xl:hover:shadow-lg xl:hover:scale-105 transition-all duration-300 cursor-pointer">
                                <span className="max-lg:hidden p-2 rounded-full bg-sky-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-sky-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </span>
                                <section className="flex flex-col items-center pt-3">
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>{userData?.followers.length || 0}</span>
                                    <span className="text-sky-500 text-opacity-80 font-semibold">followers</span>
                                </section>
                            </div>

                            <div className="flex-1 flex max-xl:w-full max-xl:justify-evenly items-center justify-center bg-zinc-100 rounded max-xl:p-5 xl:h-28 gap-3 shadow xl:hover:shadow-lg xl:hover:scale-105 transition-all duration-300 cursor-pointer">
                                <span className="max-lg:hidden p-2 rounded-full bg-purple-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-purple-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                </span>
                                <section className="flex flex-col items-center pt-3">
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>{userData?.comments || 0}</span>
                                    <span className="text-purple-500 text-opacity-80 font-semibold">comments</span>
                                </section>
                            </div>

                        </section>
                        <span className="font-semibold text-zinc-400 text-opacity-50 text-sm">Click for more info</span>
                    </div>

                    <span className="bg-zinc-200 w-full rounded-md p-1 flex gap-1">
                        <Link href={"/draft"} className="bg-white w-full rounded-md flex gap-2 justify-center p-2 xl:text-xl font-semibold text-zinc-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 max-xl:hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>Drafted Articles</Link>
                        <button className="bg-white w-full rounded-md flex gap-2 justify-center p-2 xl:text-xl font-semibold text-zinc-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 max-xl:hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>Saved Articles</button>
                    </span>

                    <div className="flex flex-col gap-2 w-full">
                        <section className="flex justify-between">
                            <span className={`${jose.className} text-2xl`}>Published Articles</span>
                            {userData?.articles?.length > 4 ? <button className="flex gap-1 items-center px-4 text-sm font-bold text-zinc-400">See More <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            </button> : <></>}
                        </section>
                        <section className="flex flex-wrap gap-2">
                            {userData?.articles?.length > 0 ? userData.articles.map(e => {
                                return (
                                    ArticleCard(e.cover, e.title, e.createdAt, e.description)
                                )
                            }) : <div className="flex items-center justify-center bg-zinc-200/20 rounded-md w-full min-h-[300px]">
                                <span className={`${jose.className} flex gap-2 text-lg text-zinc-600 px-2 py-1 rounded-md bg-slate-200 cursor-pointer`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>Write New Articles</span>
                            </div>}
                        </section>
                    </div>
                </div>


                {/* <div className="xl:border-l xl:py-9 xl:pl-9 min-h-screen xl:mr-0 xl:ml-auto flex flex-col gap-10">

                </div> */}
                {!serverCookie ? <Unaccess /> : <></>}
            </main>
        </>
    )
}
