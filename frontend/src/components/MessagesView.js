import { useState , useEffect , useRef } from "react"
import { useAuthContext } from "../customHooks/useMyContext"
import { useMediaQuery } from 'react-responsive';



const MessagesView = ({ chatingwith , allmessages , arrivalmessage , friends , chatingWith_name }) => {

    const { user } = useAuthContext()
    const [ chatingWith , set_chatingWith ] = chatingwith
    const [ messages , set_messages ] = allmessages
    // const [ chatingWith_name , set_chatingWith_name ] = useState(null)


    const scrollRef = useRef();

    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)",  });
  

  useEffect(() => {console.log("friends" , friends)
   // let name = friends?.find(f => f._id === chatingWith ).username
    // friends.length > 0 && set_chatingWith_name(friends?.find(f => f._id === chatingWith ).username)

    if(chatingWith !== null) {
            const getChat = async () => {
        let options = {
            method : "GET",
            headers : { "Authorization": `Bearer ${user.token}` }
            }

       let response = await fetch(`api/conversation/between/${user._id}/${chatingWith}`, options)
  
       let json = await response.json()
  
  
       if(json !== null) {
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


  return(<article className={isMobileDevice ? "h-[68vh] overflow-y-hidden hover:overflow-y-scroll bg-gray-100 relative" : "h-[80%] overflow-y-hidden hover:overflow-y-scroll bg-gray-100 relative"}>

  <h3 className="w-full md:w-1/2 text-center text-xl font-bold text-gray-300 mb-2 font-mono fixed">{chatingWith_name}</h3>
    {!chatingWith && <p className="w-full text-center text-4xl font-bold text-gray-300 mt-20">Pick a friend</p>}
    {(chatingWith && messages.length === 0) && <p className="w-full text-center text-4xl font-bold text-gray-300 mt-20">No messages yet</p>}


    {messages.map(message => (
            <div key={message._id} ref={scrollRef} className={message.sender === user._id ? "flex flex-col items-end mb-3 " : "mb-3 "}>
              <p className={message.sender === user._id ? "w-[80%] px-4 py-3 bg-red-600 text-white  rounded-2xl" : "w-[80%] px-4 py-3 bg-teal-600 text-white rounded-2xl "}>{message.text}</p>
              <p className={message.sender === user._id ? "w-2/5 text-sm text-gray-300 px-2 text-end" : "w-2/5 text-sm text-gray-300 px-2 "}>{message.createdAt}</p>
            </div>
         ))
    }
</article>)
}

export default MessagesView