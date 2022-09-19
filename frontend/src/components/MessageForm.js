import { useState } from "react"

const MessageForm = () => {
    
    const [ message , set_message] = useState("")

    return(<article className="h-[20%] flex">
             <textarea value={message} onChange={e => set_message(e.target.value)} placeholder="Message ..." className="text-xl py-2 border-b-2 focus:outline-0 outline-0 w-11/12 h-full px-2 mr-2 border" />

             <button className="bg-green-700 border-none hover:bg-green-800 rounded-full w-12 h-12 flex justify-center items-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="white" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576L6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76l7.494-7.493Z"/></svg>
             </button>
        </article>)
}

export default MessageForm