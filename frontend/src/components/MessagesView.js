import { useEffect , useRef } from "react"
import { useAuthContext } from "../customHooks/useMyContext"


const MessagesView = ({ chatingwith , allmessages , arrivalmessage }) => {

    const { user } = useAuthContext()
    const [ chatingWith , set_chatingWith ] = chatingwith
    const [ messages , set_messages ] = allmessages

    const scrollRef = useRef();

  useEffect(() => {
    console.log("11",chatingWith === null)
    if(chatingWith !== null) {
            const getChat = async () => {
        let options = {
            method : "GET",
            headers : { "Authorization": `Bearer ${user.token}` }
            }
       
  
       let response = await fetch(`api/conversation/between/${user._id}/${chatingWith}`, options)
  
       let json = await response.json()
  
  
       if(json !== null) {
    console.log("11",json)

        response = await fetch(`api/message/${json._id}` , options)

        if(response.ok) {
            json = await response.json()
            set_messages(json)
        }
        } else {   set_messages([])   }
     }

        getChat()

    }

  },[chatingWith])

useEffect(() => { 
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

useEffect(() => { console.log("arraival messages" , arrivalmessage)
    arrivalmessage &&  chatingWith === arrivalmessage.sender &&
    set_messages(prev => [...prev , arrivalmessage])
    
},[arrivalmessage , chatingWith])


return(<article className="h-[80%] overflow-y-hidden hover:overflow-y-scroll bg-gray-100">
    {messages.map(message => (
            <div key={message._id} ref={scrollRef}>
                <p className={message.sender === user._id ? "w-4/5 px-4 py-2 bg-pink-400 text-white" : "w-4/5 px-4 py-2 bg-blue-200 text-white"}>{message.text}</p>
                <p className="w-1/5 text-sm text-gray-300 ">{message.createdAt}</p>
            </div>
         ))
    }
</article>)
}

export default MessagesView