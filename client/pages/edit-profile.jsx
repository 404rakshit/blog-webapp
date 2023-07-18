import { jose } from "@/components/Fonts";
import Unaccess from "@/components/Unaccess";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";
// import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {

    return {
        props: {
            data: ctx.req.cookies
        }
    }
}

export default function Edit({ data, }) {
    let clientCookie = data?.data
    let serverCookie = data?.parallelVortex
    // const [cookie, setCookie] = useCookies(["data"])
    if (serverCookie) serverCookie = JSON.parse(data?.parallelVortex?.substring(2))
    if (clientCookie) clientCookie = JSON.parse(data?.data)

    useEffect(() => {
        if (serverCookie?.token && !data?.parallel) {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/user/refresh',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${serverCookie.token}`
                },
                withCredentials: true,
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, [])

    return (
        <>
            <Head>
                <title>Edit Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className={`relative flex max-xl:flex-col  xl:items-start min-h-[90svh] px-4 xl:px-16`}>

                <div className="flex flex-1 max-xl:w-full flex-col items-start gap-4 py-9 xl:pr-7 ">
                    <div className="flex items-center justify-between w-full">
                        <section className="flex flex-col gap-1">
                            <span className={`${jose.className} leading-6 xl:text-3xl text-2xl`}>Hey, {serverCookie?.username || "User"}</span>
                            <span className="text-zinc-500 w-2/3 leading-4 text-sm">Good to have you back, have a look here</span>
                        </section>
                        <section className="flex max-xl:flex-col gap-3">
                            <button className="flex gap-1 items-center justify-center p-2 px-3 rounded-md bg-zinc-800 hover:bg-zinc-900 max-lg:bg-zinc-900 text-white transition-all duration-300 font-semibold"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 max-lg:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                            </svg>Dashboard</button>
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
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>2.5k</span>
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
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>250</span>
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
                                    <span className={`${jose.className} leading-5 font-bold text-4xl`}>122</span>
                                    <span className="text-purple-500 text-opacity-80 font-semibold">comments</span>
                                </section>
                            </div>

                        </section>
                        <span className="font-semibold text-zinc-400 text-opacity-50 text-sm">Click for more info</span>
                    </div>

                    <button onClick={() => {

                    }} className="px-3 py-2 bg-purple-800 text-white font-bold rounded-md">Get Followers</button>
                </div>


                {/* <div className="xl:border-l xl:py-9 xl:pl-9 min-h-screen xl:mr-0 xl:ml-auto flex flex-col gap-10">

                </div> */}
                {!serverCookie?.username ? <Unaccess /> : <></>}
            </main>
        </>
    )
}
