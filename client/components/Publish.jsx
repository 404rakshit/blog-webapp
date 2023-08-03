import { jose } from "./Fonts";
import { popUp } from "./Modal";

export function publishModal(msg) {
    document.getElementById("publishBg").classList.replace("opacity-0", "opacity-100")
    document.getElementById("publishBg").classList.remove("pointer-events-none")
    document.getElementById("publish").classList.remove("scale-0")
}

export default function Publish() {

    function success(title, link){
        document.getElementById('publish').innerHTML = `<span class="relative text-xl text-center bg-lime-200 text-lime-600 py-2 w-full rounded-lg"}>Article Uploaded!</span>
        <span class="text-lg flex items-center gap-2">Visit: <a class="px-2 border bg-blue-200 rounded-full max-w-sm line-clamp-1" href=${link}>${title}</a></span>
        section`
    }

    return (
        <div id="publishBg" className="fixed flex items-center justify-center z-30 min-h-[100svh] min-w-[100svw] bg-black bg-opacity-50 transition-all duration-200 opacity-0 pointer-events-none">
            <div id="publish" className={`${jose.className} flex flex-col items-center gap-4 p-3 min-h-[15rem] xl:w-[500px] w-[90svw] bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.75_0px_10px_15px] transition-all duration-500 scale-0`}>
                <span className={`${jose.className} relative text-xl text-center bg-lime-200 py-2 w-full rounded-lg`}>Upload Article
                    <button onClick={(e) => {
                        document.getElementById("publishBg").classList.replace("opacity-100", "opacity-0")
                        document.getElementById("publishBg").classList.add("pointer-events-none")
                        document.getElementById("publish").classList.add("scale-0")
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 top-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </span>
                <div className="pt-3 flex items-center gap-2">
                    <label className={`${jose.className} text-xl leading-none`}>Tags: </label>
                    <input onKeyUp={(e) => {
                        if (e.keyCode < 65 && e.keyCode > 90) e.isDefaultPrevented()
                    }} onPaste={(e) => e.preventDefault()} className={`${jose.className} border-b border-zinc-400 px-1`} type="text" placeholder="e.g. UI, UX, Web" maxLength={70} />
                </div>
                {/* <label className={`${jose.className} text-zinc-400`}>Comma Seperated </label> */}
                <ol className={`${jose.className} grid list-disc`}>
                    <li className="list-item">Title must be long</li>
                    <li className="list-item">Description must be provided</li>
                    <li className="list-item">Article must contain a body</li>
                </ol>
                <button onClick={(e)=>{
                    e.target.innerText = "Publishing..."
                    e.target.disabled = true
                    setTimeout(() => {
                        // popUp("Article Not Published")
                        // e.target.innerText = "Publish"
                        // e.target.disabled = false
                        success("This is a title asd asdasjbdhsha","https://google.com/")
                    }, 2000);
                }} className={`${jose.className} rounded-full bg-zinc-900 py-1 px-8 text-white transition-all duration-300 disabled:animate-pulse disabled:cursor-not-allowed`}>Publish</button>
            </div>
        </div>
    );
}