import Image from "next/image";
import { jose, oswald } from "./Fonts";
import Link from "next/link";

export default function Header() {
    function unrevel() {
        document.querySelector("#model").classList.replace("opacity-0", "opacity-100")
        document.querySelector("#model").classList.remove("pointer-events-none")
    }

    function revel() {
        document.querySelector("#model").classList.replace("opacity-100", "opacity-0")
        document.querySelector("#model").classList.add("pointer-events-none")
    }
    return (<>
        <div id="model" className="fixed flex flex-col gap-5 items-center pt-20 opacity-0 pointer-events-none z-20 bg-white bg-opacity-100 min-h-screen w-screen transition-opacity duration-300">

            <h3 className={`${jose.className} text-4xl py-3 pt-10 max-lg:py-10`}>Sign in Here.</h3>

            {/* Sign In with Google */}
            <section className="flex flex-col gap-2">
                <Link href={"#"} className="px-5 bg-white py-4 shadow-lg rounded-md flex justify-center gap-3 active:shadow-inner lg:hover:scale-105 transition-all w-[370px]">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" alt="" width={25} />
                    Sign in with Google
                </Link>
                <Link href={"#"} className="px-5 bg-white py-4 shadow-lg rounded-md flex justify-center gap-3 active:shadow-inner lg:hover:scale-105 transition-all w-[370px]">
                    <img className="rounded" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3AABABkAAwApADlhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAF5jcHJ0AAABXAAAAAt3dHB0AAABaAAAABRia3B0AAABfAAAABRyWFlaAAABkAAAABRnWFlaAAABpAAAABRiWFlaAAABuAAAABRyVFJDAAABzAAAAEBnVFJDAAABzAAAAEBiVFJDAAABzAAAAEBkZXNjAAAAAAAAAANjMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0ZXh0AAAAAEZCAABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAAADFgAAAzMAAAKkWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPY3VydgAAAAAAAAAaAAAAywHJA2MFkghrC/YQPxVRGzQh8SmQMhg7kkYFUXdd7WtwegWJsZp8rGm/fdPD6TD////bAEMABAMDBAMDBAQDBAUEBAUGCgcGBgYGDQkKCAoPDRAQDw0PDhETGBQREhcSDg8VHBUXGRkbGxsQFB0fHRofGBobGv/bAEMBBAUFBgUGDAcHDBoRDxEaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGv/CABEIAMgAyAMBIgACEQEDEQH/xAAcAAEBAQEAAwEBAAAAAAAAAAAABwgGAwQFAQL/xAAaAQEAAwEBAQAAAAAAAAAAAAAABAUGAwIH/9oADAMBAAIQAxAAAAHkh9CwoAAAAAAAAAAAAAB0/aQpckdrxUjgHXmAAAAAAAAA6Tm6lDlVf+zE7BELfwVhBiA2WTAAAAAAAAAdRy7n71X+wPtcnpqPF/FwFlAC+pQAAAAAAAAB9nx6+MtitsImtk+7cuUO+kx+BWxAmxNU5bNifjvO9iyIM0f6kaRntUppZV/gEngAAA6jl+oj99CDC7NF7RF7Stndhj1hu6eljIarmvm9t+yI4R5AD4P3nrxl/wBOxxza5EJcYAB1HL9RH76EGF2aL2iL2lbO7DHrDd09LGQ1TxeWJyov2+Z4pqs3Z6LlPQNNbdWKS49bL+qcz39H8saOhAAdRy/UR++hBhdmi9oi9pWzuwx6w3dPSxkNV/GWtRZY0NF+jQ0SnzCkwJtjGM1rNGl80XlL8oabPgAOo5fqI/fQgwuzRe0Re0rZ3YY9YbunpYyGq8OWNT5Y0VD+jQUakzakwZtjGL1rNGl80XlL8oabPgAOo5fqI/fQgwuzRe0Re0rZ3YY9YbunpYyGq8OWNT5Y0VD+jQUakzakwZtjGL1rNGl80XlL8oabPgAOo5fy8ump2Z2fvNMRfj/TlxvXsMe9yfB1AzOpbfSWWPq/Ls68LKvUqa+zH76jZnUVzpjNP8/NsIP8i1rQAAAAAAAAAAAAAAAAAAAAAAAAAAP/xAApEAAABAUDBAIDAQAAAAAAAAADBAUGAAECEDQVIDURFjNAEhMwMWBQ/9oACAEBAAEFAv49NQjSlKTMo6KDZNEqfVQ07Uj9NMqKbOhMpJmfUZnT53d3TS/UQFCScflPrKzrUaTI/qpbiMp1MniV+Kg6hzNP+cklKDyh2gRjtAjHaBGF9NCSzMICIXVAe0CMdoEYVW2VIp/7gg1jRqRdrp4MtGISgVvJwsjzQnTIUEQAT8Dd5m7xz4ZuLZfpmIkIiAGn07VNKAUwjZUQmY3t3mbvHPhm4v4nan/YX3t3mbvHPhm4txBKQqDzvppn3Uo9Up0UGhLmAZGAKqZ0Vbm7zN3jnwzcW7oU6jBq7ePzPJ11KXRR3N3mbvHPhm4tqp/GkSuYld2aJP7bqnJbm7zN3jnwzcWwvj2M3LuqclubvM3eOfDNxbC+PYzcu6pyW5u8zd458M3FsL49jNy7qnJbm7zN3jnwzcWwvj2M3LuqclubvM3eOfDNxbC+PYzcq6pyW5u8zd458M3FsJ49jNyrqnJbgxKwq9TOxqZ2NTOwKOKYnAJscvLUzsamdjUjm0EwKXnqZ2NTOxqZ2Kqp11fx3//EACwRAAECBAMHBAMBAAAAAAAAAAIBAwAEBRAREjQTFSAwMjNxITFCUkBRgUH/2gAIAQMBAT8B57co86mIpDjRtLgacuUBHHhFbTraGwuP+cts1bJCSG59k09VwidnRcHZt8sRUyQUjdz8OybrI5ihponiyjG7n4eYNgspQ1IPOevtC0tz9pDsu4z1pwsd4fKWqGnWKfqEsrAk7tFuQoaYFEyzsHFHgY7w+UtUNOsU/UJaYfSXDMsHOPmuOaJGbJ1ch+9qoPoJcDHeHylqhp1in6hLVX42kdQNqp0DwMd4fKWqGnWKfqEtVfj/AG0lqBtVOgeBjvD5S1Q06xT9Qlqr8f7aS1A2qnQPA2WQ0L9RvQPrEzPC+3kRIlnkYczrG9A+sTc0kzhgntZhzYuIaxvQPrE3NjMiiIn5v//EAC0RAAEDAgQDCAIDAAAAAAAAAAIBAwQABRAREjQVIHETMDEyM0FSgRQhIkBR/9oACAECAQE/Ae/cmsNLpIqbdB5MwXPu5jitMEQ4W9xW5CZe/duAjoKBe9OW58CyRM6gwCaLtHO7IkAVJfauKR6ZnMvnoGnnRYDWVcUj0xICQOoKduLDX6zz6Ul2a9xWmZLT6fwXlkeifRcLZuUq5bZcEkGLXZJiBk2WoaiP/kNIfJI9E+i4WzcpVy2y4RY6yXNKUEGOCZaauEIWU7RvwwtBfsh5JHon0XC2blKuW2XCzp5/rCftiwtHnLkkeifRcLZuUq5bZcLP4H9YTtsWFo85ckj0T6LhbNylXLbLhZ/A/rCdtjwtHnLkdHWCj/tcIP5VEt5R3darUplZDSglcIP5VCiLF1ZrnnhIaV5pQT3rhB/KoUIopKqr/d//xAA8EAABAgMFAwcKBQUAAAAAAAABAgMABCAQEXFzsRIxwSEzNGGSk9ETFCIwMkBBUWJyBVJggZEjUFOhov/aAAgBAQAGPwL9H7aAG2fzq4Ryzar/ALILjd0w2N+yOUft7sltfNJ9JeEBKRcBuAtS+wNlt7ePkr3Wc/NcnjQm/f5UXf791CnDc04NhfV1xeLUSzJvSz7R+r3YNqHl2RuSTyjAxysPX/tBblU+boPxvvV/b2WHSQhd9+zhHOP9oeEc4/2h4Rzj/aHhDbcuVkKRtekeux5cwpwFCrhsmOcf7Q8I5x/tDwh59pbpWi668j5xyQFzJ82R1i9X8R6aFPH5rVHQ2exHRko60G6Cr8Pd2voc8YLbyChY3g+plcToaGMnibJnMGlswlAKlK2QAPuEB2YAXNH/AIwq2XRcsewsbxC2HxctB9RK4nQ0MZPE2TOYNPVpm0D0muRf2+olcToaGMnibJnMGlCluqCEJ3kwUyDXlPrXu/iL9pvDYhLM6kMuK3KHsnwocaX7K0lJhSVb0m41yuJ0NDGTxNkzmDSgyrZ/os+11qoSXDe436CuuibA/wAyta5XE6GhjJ4myZzBpaT8oUtW9RvNE038ClKqJvOVrXK4nQ0MZPE2TOYNLV4UzGWNaJvOVrXK4nQ0MZPE2TOYNLV4UzOWNaJvOVrXK4nQ0MZPE2TOYNLV4UzOWNaJvOVrXK4nQ0MZPE2TOYNLV4UzOWNaJvOVrXK4nQ0MZPE2TOYNLV4UzOWNaJvOVrXK4nQ0MZPE2TOYNLV4UzOWNaJvOVrWFtKKFjcQbo6W/wB4Y6W/3hjpb/eGL33FukfFRvsIYecaB37Kro6W/wB4Y6W/3hjpb/eGklh1bRO/ZVdHS3+8MdLf7wx0t/vDBUslSjykn9H/AP/EACkQAAECAgkFAQEBAAAAAAAAAAEAEVHwICExQEFhgbHBEDBxkaFg0VD/2gAIAQEAAT8h/HjWiWfDFex8C26NbW5NCif4uwHCz5ww1PKBCHYBgBDqAK7ZsBb7t93UXmR8UASTC6q+0hBhoPKAIgINYI6ulcSKwwaDe7BCYIpSxGOHhDx7dWfuGuB5w/zyBoAiY1EeKAgQIdutERLuGAy6CYJahUz4g9RAgV6SA4VgIZoAkADk1AIYAtgcOGqAs1rYMEBmHpI+BIiNqLEbCB0/pWSr2xFyjJKNzyI5JNQgnkd7RkzZ0itlqlW8jJVCgDAwIyNxjJKM9vYBC6sSPB3uUZJQPQHPYAIDZkcF4tbKFOjujo4Y+sgXoKz7VAK3ankFVxjJKFTgjAD538We6Dzjum1lh9NQFZAbq4RklHQwOivOebMl6A3PACRzQksVwjJKfV2WHYcksVwjJKfV2WHYUksVwjJKfV2WHYEksVwjJKfV2WHYAksVwjJKfV2WHYQksVwjJIfd2WHYQksVPFQ4waqRuVI3KkblDI5MCyA16Erg4HcdFI3KkblE4YkBmtoghCxGcNFI3KkblSNyjyRcHJMfx/8A/9oADAMBAAIAAwAAABAAAAAAAAAAAAAAAAIEAAAAAAAAAAKBIAAAAAAAAABE84AAAAAAAAAAY04E0kc8MAAAAIBVUBsABOkAAAIBVUAPEEAcAAAIBVUD4BIBcAAAIBVUDwAABcAAAIBVUDwBQBcAAAI1hM3AAA00AAAAAAAAAAAAAAAAAAAAAAAAAAAD/8QAJhEAAQIEBQUBAQAAAAAAAAAAAQARECGhsTFRYZHwIDBBccHRQP/aAAgBAwEBPxDv4NurC6kGHt4PL2DoBkbcUw7eL2C6BS8yKKJgOJ+Dt4wBIG60xujltvaEcYrTG6AMUh5IHIzX8xQIlW/EbZjXxv08pmIVguqQ2gKDcgMNJkv7nE9E4KP43EeuS6OUzEKwXVIbQPZxwAzKmwGgkEdHfEDnAWemOjlMxCsF1SG0CMvv5AiGNbGFYbdHKZiFYLqkNoYuXiFZ8MKw26OUzEKwXVIbQxcvEKz4YVht0DPTcDsXWs3COSQ7IRA4DrWbhGngmq35AYQ4C1m4RwAY/wBv/8QAJxEAAQIEBQUBAQEAAAAAAAAAAQARECGhsTFRYZHwIDBBcdGBwUD/2gAIAQIBAT8Q7+NwMnNk3cHNu3iVAXLf1YoMlKQ807eDADI+ZfBHzwh2WRgP6e3hgASfxap2QAUv6RZghap2RI4wLTlzFGjMfquCLMht9TyfOXnbp5jIwpDZVovAzKwJc6yAb1L9iAEYjyg+cwPvk+jmMjCkNlWi8AwzDEnIJvgOpmeekKAYixGWogfLSN+jmMjCkNlWi8ATcYwAF/S4hTi/RzGRhSGyrReHC9wpxcQpxfo5jIwpDZVovDhe4UwuIU4v0FHlmEbhlo9ig4UgA+M0cJiWoVo9ihYCkYaP9gZ5j9OtHsUAeXDS/wBv/8QAKRABAAECBAYDAAIDAAAAAAAAAREQIQAxUfAgMEFhcaFAgZFQYLHB4f/aAAgBAQABPxD+nrRDF8hzgv52O+DkZG48vDL3geJKQDNMyd0xp8YpE+O0gCfSQPGBi+kAiABYA6VeSUbF2gdAtmp8VIkQPVfP3HA1Iw7+b3qfi3T0PJEfABPZwCGwhIjkjUai7JSRDW8PdHT41h96wNLkHcIdIxZCesPp/wAYDmWH2oAD6y6JhVVbr/BQ4h5YXvkCDQomY6cEaNGGo8UrEQWgUIn0HqKnNS1jRniZLKpIFyXXDlHACVXIDq4M+4wz/B909sQRsukLvLOLVDuj+uEBHJGfqP0w1tuGT2ECewPOHfbC/wBDR6JZ6cpcZV9BQ3TTU6iQIYAdVcXluCJf1Or6kGfCTd8E/wC4zVnsw4yeeGTmrqEJ55K4yr6ChummqMgbzfkAzmGF7Qvl/HpyVxlX0FDdNPA2GJEbqrlg/Y0E7oEI7r4YUtc5t/SbveBCgey7AKUuV0dTrU4STBNmJ9zg2IAu4r2PIXGVfQUN008BnQ2AWbUTgay0irS12sgL91yeqPAZkAhyJcZV9BQ3TTUA0io8E/6wnpCOqF7eCZCkDRB+g/OY+XGVfQUN0012PVgyeD4BL5cZV9BQ3TTXY9WDJ4PgAvlxlX0FDdNNdj1YMng+Ai+XGVfQUN0012PVgyeDgHMO+XGVfQUN0012PVgyeD4D75MV9BQ3bTXc9WDJ4ODZ9fLfMvlVpYjAuWU4CRIleuF2hYFMEqx3oCqxbIgURLFSRJICERhThD+o2SZBUSTwEiRJOgViTKluq9f6f//Z" alt="" width={25} />
                    Sign in with Linkedin
                </Link>
            </section>

            <hr className="my-4 border-gray-300 w-40" />

            <form onSubmit={(e) => {
                e.preventDefault()
            }} className="flex flex-col items-center gap-4" action="">
                <div className="flex gap-2">
                    <input id="email" className={`${jose.className} text-xl leading-none outline-none py-2 max-xl:py-3 px-4 bg-gray-200 rounded-md focus:border-black bg-transparent w-80`} type="email" placeholder="Enter your email" />
                    <button className="rounded-full p-3 bg-blue-600 lg:hover:bg-blue-700" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-white">
                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>
                    </button>
                </div>
                <span>No account? <Link className="font-bold text-blue-600 lg:hover:text-blue-800" href={"#"}>Create one</Link></span>
            </form>

            <button onClick={() => {
                revel()
            }} className="absolute right-5 top-5 group"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:group-hover:scale-125 transition-all duration-200 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="h-40"></div>

            <p className="text-center text-gray-400 absolute bottom-10 max-xl:bottom-20 text-xs w-[450px]">Click “Sign In” to agree to Reader's Terms of Service and acknowledge that Reader's Privacy Policy applies to you.</p>
        </div>
        <div className="relative flex items-center gap-3 justify-between p-4 xl:px-16">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 cursor-pointer xl:hover:scale-110 transition-all duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <span className={`${oswald.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-semibold uppercase text-2xl`}>Reader</span>

            <section className="flex items-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>

                {false ? <span className="rounded-full border border-zinc-600 p-[1px]">
                    <div className="relative overflow-hidden h-8 w-8 rounded-full">
                        <Image loader={() => "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Oreo"} src={"https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Oreo"} fill />
                    </div>
                </span> :
                    <svg onClick={() => {
                        unrevel()
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8 transition-all duration-200 cursor-pointer lg:hover:scale-110">
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