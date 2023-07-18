import Image from "next/image";
import { jose } from "./Fonts";

const ArticleCard = ({ img, title, date, des }) => {
    return (
        <div className="flex flex-col gap-2 xl:w-[400px] rounded-md p-3">
            <div className="relative rounded-md w-full h-56 overflow-hidden">
                {img ? <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300 cursor-pointer" loader={() => img} src={img} fill /> : <Image className="rounded-md shadow object-cover xl:hover:scale-110 transition-all duration-300" loader={() => "https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} src={"https://images.unsplash.com/photo-1496412705862-e0088f16f791?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODk2OTg4Njg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1280"} fill />}
            </div>
            <div className="flex flex-shrink flex-col gap-2">
                {title ? <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>{title}</span> : <span className={`${jose.className} text-xl line-clamp-1 mt-2 px-1 leading-6`}>Title</span>}
                {date ? <span className={`text-zinc-400 font-semibold px-1 -translate-y-2`}>{date}</span> : <span className={`text-zinc-400 font-semibold px-1 -translate-y-2`}>1 January, 2077</span>}
                {des ? <p className="px-1 text-zinc-500 line-clamp-3">{des}</p> : <p className="px-1 text-zinc-500 line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae exercitationem molestias repellat ducimus! Quidem, fuga reiciendis sapiente voluptatum quibusdam repellendus. Ea et ratione possimus odio amet ducimus in officiis nisi!</p>}
                <span className="p-1 flex gap-2">
                    <button className="rounded-md p-2 border-2 border-dashed border-zinc-800 group hover:bg-zinc-950 transition-all duration-200 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-105">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    </button>
                    <button className="flex-1 rounded-md py-2 bg-zinc-950 text-white">Back to Draft</button>
                    <button className="rounded-md p-2 border-2 border-dashed border-zinc-800 group hover:bg-zinc-950 transition-all duration-200 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-105">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    </button>
                </span>
            </div>
        </div>
    );
}

export default ArticleCard;