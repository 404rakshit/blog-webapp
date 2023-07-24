import { useState } from "react";
import { jose } from "./Fonts";
import Link from "next/link";
import axios from "axios";
import { popUp } from "./Modal";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export function unrevel() {
    document.body.style.overflow = "hidden"
    document.querySelector("#model").classList.replace("opacity-0", "opacity-100")
    document.querySelector("#model").classList.remove("pointer-events-none")
}

export function revel() {
    document.body.style.overflow = "auto"
    document.querySelector("#model").classList.replace("opacity-100", "opacity-0")
    document.querySelector("#model").classList.add("pointer-events-none")
}

export default function UserLog({ state }) {
    const [form, setForm] = useState(state || true)
    const [cookie, setCookie] = useCookies(["data"])
    const router = useRouter();

    return (
        <div id="model" className="fixed opacity-0 pointer-events-none z-20 bg-white bg-opacity-100 min-h-screen w-screen transition-opacity duration-300">

            {form ?
                <div className="flex flex-col gap-5 items-center pt-20">
                    <h3 className={`${jose.className} text-4xl py-3 max-lg:py-10`}>Log In Here.</h3>

                    {/* Log In with Google */}
                    <section className="flex flex-col gap-2">
                        <Link href={"#"} className="px-5 bg-white py-4 shadow-lg rounded-md flex justify-center gap-3 active:shadow-inner lg:hover:scale-105 transition-all w-[370px] max-w-[90svw]">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" alt="" width={25} />
                            Log In with Google
                        </Link>
                        <Link href={"#"} className="px-5 bg-white py-4 shadow-lg rounded-md flex justify-center gap-3 active:shadow-inner lg:hover:scale-105 transition-all w-[370px] max-w-[90svw]">
                            <img className="rounded" src="data:image/jpeg;base64,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" alt="" width={25} />
                            Log In with Linkedin
                        </Link>
                    </section>

                    <hr className="my-4 border-zinc-300 w-40" />

                    <form onSubmit={(e) => {
                        document.getElementById("loginBtn").disabled = true;
                        e.preventDefault()

                        let data = {
                            "username": document.getElementById("email").value,
                            "password": document.querySelector("#password").value
                        };

                        let config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: `${process.env.SERVER_URL}/login`,
                            withCredentials: true,
                            data: data
                        };

                        axios.request(config)
                            .then((response) => {
                                // console.log(response.data);
                                popUp(response?.data?.message);
                                // console.log(response)
                                setCookie("data", JSON.stringify({
                                    name: response?.data?.name,
                                    username: response?.data?.username,
                                    email: response?.data?.email,
                                    profile: response?.data?.profile
                                }), {
                                    maxAge: 30 * 24 * 60 * 60
                                })
                                router.reload()
                            })
                            .catch((error) => {
                                document.getElementById("loginBtn").disabled = false
                                popUp(error.message + " (" + error?.response?.data?.message + ")");
                                console.log(error);
                            });

                    }} className="flex flex-col items-center gap-4">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex flex-col gap-2">
                                <input id="email" onKeyDown={(event) => {
                                    var key = event.keyCode;
                                    if (key === 32) {
                                        event.preventDefault();
                                    }
                                }} className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-200 rounded-md focus:border-black bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="text" placeholder="Username or Email" required />
                                <input id="password" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-200 rounded-md focus:border-black bg-transparent w-[370px] max-w-[90svw]`} type="password" placeholder="Password" required />
                            </div>
                            <button id="loginBtn" className="relative rounded-full flex p-3 xl:py-2 bg-blue-600 lg:hover:bg-blue-700 disabled:opacity-50 w-full transition-all duration-200" type="submit">
                                <span className={`${jose.className} duration-200 transition-opacity text-white text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>Login</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-0 ml-auto stroke-white flex-shrink-0">
                                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                </svg>
                            </button>
                        </div>
                        <span>No account? <button onClick={() => setForm(!form)} className="font-bold text-blue-600 lg:hover:text-blue-800" >Create one</button></span>
                    </form>

                    <button onClick={() => {
                        revel()
                    }} className="absolute right-5 top-5 group"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:group-hover:scale-125 transition-all duration-200 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="h-20"></div>

                    <p className="text-center text-zinc-400 absolute bottom-10 max-xl:bottom-20 text-xs w-[450px] max-w-[90svw]">Click “Log In” to agree to Reader's Terms of Service and acknowledge that Reader's Privacy Policy applies to you.</p>
                </div> :
                <div className="flex flex-col gap-5 items-center pt-20">
                    <h3 className={`${jose.className} text-4xl py-3 max-lg:py-10`}>New Sign Up.</h3>

                    {/* Log In with Google */}
                    <section className="flex flex-col gap-2">
                        <Link href={"#"} className="px-5 bg-white py-4 shadow-lg rounded-md flex justify-center gap-3 active:shadow-inner lg:hover:scale-105 transition-all w-[370px] max-w-[90svw]">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" alt="" width={25} />
                            Sign Up with Google
                        </Link>
                        <Link href={"#"} className="px-5 bg-white py-4 shadow-lg rounded-md flex justify-center gap-3 active:shadow-inner lg:hover:scale-105 transition-all w-[370px] max-w-[90svw]">
                            <img className="rounded" src="data:image/jpeg;base64,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" alt="" width={25} />
                            Sign Up with Linkedin
                        </Link>
                    </section>

                    <hr className="my-4 border-zinc-300 w-40" />

                    <form id="form" onSubmit={(e) => {
                        e.preventDefault()
                        document.querySelector("input").disabled = true
                        document.querySelector("button").disabled = true
                        document.querySelector("#load").classList.remove("opacity-0")

                        let data = JSON.stringify({
                            "email": document.querySelector("#user").value
                        });

                        let config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: `${process.env.SERVER_URL}/signup/mail`,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios.request(config)
                            .then((response) => {
                                // console.log(JSON.stringify(response.data));
                                popUp(response.data?.message)
                                document.querySelector("#load").classList.add("opacity-0")
                                document.querySelector("#done").classList.remove("opacity-0")
                            })
                            .catch((error) => {
                                // console.log(error);
                                popUp(error.message + " (" + error.response?.data + ")")
                                setTimeout(() => {
                                    document.querySelector("input").disabled = false
                                    document.querySelector("button").disabled = false
                                    document.querySelector("#err").classList.add("opacity-0")
                                }, 2000);
                                document.querySelector("#load").classList.add("opacity-0")
                                document.querySelector("#err").classList.remove("opacity-0")
                            });

                    }} className="flex flex-col items-center gap-4">
                        <div className="flex gap-2 items-center max-xl:max-w-[370px]">
                            <input id="user" className={`${jose.className} text-xl leading-none outline-none py-3 max-xl:py-4 px-4 bg-zinc-200 rounded-md focus:border-black disabled:opacity-70 disabled:cursor-not-allowed bg-transparent w-[370px] max-w-[90svw]`} autoComplete="off" type="email" placeholder="Email" required />
                            <button className="relative rounded-full flex xl:p-2 p-2 px-3 bg-blue-600 lg:hover:bg-blue-700 transition-all duration-200 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>

                                <span id="load" className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 transition-all duration-200 opacity-0">
                                    <svg width="22px" height="22px" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color="blue"><circle cx="12.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"><animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle></svg>
                                </span>

                                <span id="err" className="bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 transition-all duration-200 opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                </span>

                                <span id="done" className="bg-lime-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 transition-all duration-200 opacity-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </span>

                            </button>
                        </div>
                        <span>Already Have an Account? <button onClick={() => setForm(!form)} className="font-bold text-blue-600 lg:hover:text-blue-800" href={"#"}>Log In</button></span>
                    </form>

                    <button onClick={() => {
                        revel()
                    }} className="absolute right-5 top-5 group"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:group-hover:scale-125 transition-all duration-200 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="h-20"></div>

                    <p className="text-center text-zinc-400 absolute bottom-10 max-xl:bottom-20 text-xs w-[450px] max-w-[90svw]">Click “Sign Up” to agree to Reader's Terms of Service and acknowledge that Reader's Privacy Policy applies to you.</p>
                </div>}
        </div>
    );
}