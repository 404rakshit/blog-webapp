import ArticleCard from "@/components/ArticleCard"
import { jose, oswald } from "@/components/Fonts"
import Head from "next/head"
import Image from "next/image"

export async function getServerSideProps({ params }) {

    const data = await fetch(`${process.env.SERVER_URL}/user/${params.user}`).then(res => res.json())

    return {
        props: {
            data
        }
    }
}

export default function User({ data }) {
    let cover = "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTY4OTg1ODIwMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"
    let profile = "https://images.unsplash.com/photo-1612213467906-20440d15bdb8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8aHVtYW58fHx8fHwxNjg5Nzk2NjU5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000"
    let date = new Date(data.joined).toString().split(" ")
    return (
        <>
            <Head>
                <title>{data?.username ? `${data.name} - Reader` : "User Not Found"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className={`relative flex max-xl:w-full flex-col xl:items-start min-h-[90svh] gap-4`}>
                <div className="absolute h-60 max-xl:h-40 w-full bg-slate-300">
                    <Image loader={() => cover} src={cover} fill className="object-cover" />
                    <div className="absolute -bottom-1/4 left-5 xl:left-10 p-1 rounded-full bg-white flex items-center justify-center shadow shadow-slate-600">
                        <span className="relative h-28 w-28 xl:h-36 xl:w-36 rounded-full overflow-hidden">
                            <Image loader={() => data?.profile || profile} src={data?.profile || profile} fill className="object-cover" />
                        </span>
                        <div className="rounded-full h-3 w-3 bg-transparent absolute top-[58%] -left-1 -translate-x-1 -translate-y-1"></div>
                    </div>
                </div>
                <div className="xl:mt-64 mt-40"></div>

                <div className="relative flex w-full max-xl:flex-col xl:items-start justify-start pt-12 px-4 xl:px-16 xl:gap-10 gap-5">
                    <button className="absolute flex gap-1 top-0 right-5 p-2 rounded-full bg-zinc-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg><span className={`${oswald.className} max-xl:hidden text-zinc-600`}>Report</span>
                    </button>

                    <div className="flex flex-col gap-1">
                        <span className={`xl:text-lg text-zinc-500 font-light`}>@{data.username}</span>
                        <span className={`${jose.className} text-2xl xl:text-3xl font-medium`}>{data.name}</span>
                        <span className={`flex gap-2 text-lg items-center text-zinc-900`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>{data.email}</span>
                        <span className={`flex gap-2 text-lg items-start text-zinc-900`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>{data.designation} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>{data.company}</span>
                        <span className={`xl:text-lg text-zinc-500/70 font-bold`}>12 Followers</span>
                        <button onClick={(e) => {
                            e.target.classList.remove("text-white")
                            e.target.classList.replace("bg-zinc-800", "border")
                            e.target.innerText = "Following"
                        }} className={`${jose.className} leading-7 rounded-full py-1 pt-2 px-5 my-2 text-xl text-white bg-zinc-800 w-fit border-zinc-800`}>Follow</button>
                    </div>
                    <div className="flex-1 xl:px-10 flex flex-col gap-2">
                        <span className={`${jose.className} text-2xl xl:text-3xl font-medium flex gap-2 `}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>About</span>
                        <p className="text-base text-zinc-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore tenetur cum est quia porro fugiat voluptatem accusantium nihil, exercitationem placeat ut fugit adipisci cumque reprehenderit tempore amet earum cupiditate atque.</p>
                        <span className={`${jose.className} leading-8 xl:text-lg text-zinc-500 font-light flex gap-2`}>Joined on {date[1] + " " + date[2]}</span>
                    </div>
                </div>

                <div className="flex w-full flex-col py-2 px-4 xl:px-16 gap-3 min-h-[100px]">
                    <span className={`${jose.className} text-2xl xl:text-3xl`}>Published Articles</span>
                    <div className="flex flex-wrap w-full max-xl:flex-col">

                    </div>
                    {data.articles.length > 0 ? data.articles.map(e =>{
                        return (
                            <ArticleCard title={e.title} des={e.description} img={e.cover} date={e.createdAt} />
                        )
                    }) : <div className="flex items-center justify-center bg-zinc-200/20 rounded-md w-full min-h-[300px]">
                    <span className={`${jose.className} flex gap-2 text-lg text-zinc-600 px-2 py-1 rounded-md bg-slate-200`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>No Article Yet</span>
                </div>}
                </div>

            </main>
        </>
    )
}