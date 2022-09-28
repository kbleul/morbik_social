
import  OnlineFriends  from "../components/OnlineFriends"
import  Friends  from "../components/Friends"
import  MessageBox  from "../components/MessageBox"

import { useRef , useEffect , useState } from "react"
import {io} from "socket.io-client"
import { useMediaQuery } from 'react-responsive';


import {useAuthContext} from "../customHooks/useMyContext"
import {useNotificContext} from "../customHooks/useMyContext"



const Chat = () => {

  const  { user } = useAuthContext()
  const  { set_chatnotifications } = useNotificContext()

  const  [ chatingwith , set_chatingwith ] = useState(null)
  const  [ arrivalmessage , set_arrivalmessage ] = useState(null)
  const  [ onlineusers , set_onlineusers ] = useState([])
  const  [ friends, setfriends ] = useState([])
  

  const socket = useRef()
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

  const addNotification = async(senderId) => {
   const options = {
      method : "Get",
      headers : { "Authorization": `Bearer ${user.token}` }
    }

    const response = await fetch(`api/${senderId}` , options)

    if(response.ok) {
      const {username} = await response.json()
      set_chatnotifications(prev => [...prev , `${username} send you a message`])
      console.log( `${username} send you a message`)
    }
  }


useEffect(() => { 
  socket.current = io("ws://localhost:8900")  
  socket.current.on("getMessage", data => {
    set_arrivalmessage({
      sender : data.senderId,
      text : data.text,
      createdAt : Date.now()
    })
    addNotification(data.senderId)
  })

}, [])

useEffect(() => {
      socket.current.emit("addUser" , user._id)

      socket.current.on("getUsers", (users) => {
        console.log("userss", users)
        let temp = []
        users.forEach(u => temp.push(u.userId))
        set_onlineusers(temp.filter(t => user.following.includes(t)));
        
      });

}, [user])


  return (<main className=""> { isMobileDevice ? 
    <article>
       <MobileVersion_Chat chatingwith={chatingwith} set_chatingwith={set_chatingwith} socket={socket} arrivalmessage={arrivalmessage} onlineusers={onlineusers} set_onlineusers={set_onlineusers} friends={friends} setfriends={setfriends}/> 
    </article>
            :
    <article className="flex">
        <section className="w-[29%] mr-[1%]">
          <OnlineFriends chatingwith={[chatingwith , set_chatingwith]} onlineusers={onlineusers} relation={[friends, setfriends]}/>
        </section>
        <section className="w-[50%] mt-from-nav shadow-2xl">
          <MessageBox chatingwith={[chatingwith , set_chatingwith]} socket={socket} arrivalmessage={arrivalmessage} />
        </section>
        <section className="w-[19%] ml-[1%]">
          <Friends chatingwith={[chatingwith , set_chatingwith]} relation={[friends, setfriends]} onlineUsers={[onlineusers , set_onlineusers]}/>
        </section>
    </article>
    }
    </main>
  )
}


const MobileVersion_Chat = ({ chatingwith , set_chatingwith , socket , arrivalmessage , onlineusers , set_onlineusers , friends, setfriends}) => {

  const [ currentpage , set_currentpage ] = useState("chatbox")
  return (
    <article className="mt-[9.1rem]">
        <section className="font-content-spliter flex pb-2">
          <button className={currentpage==="online" ? "w-1/2 text-center text-red-400 cursor-pointer" : "cursor-pointer w-1/2 text-center"} onClick={() => set_currentpage("online")} >
            {onlineusers.length} Online</button>
          <button className={currentpage==="friends" ? "w-1/2 text-center text-red-400 cursor-pointer": "cursor-pointer w-1/2 text-center"} onClick={() => set_currentpage("friends")}>
            {friends.length} Friends</button>
        </section>

        <section className="w-dull  shadow-2xl">
         { currentpage === "chatbox" && 
         <MessageBox chatingwith={[chatingwith , set_chatingwith]} socket={socket} arrivalmessage={arrivalmessage} /> }

         { currentpage === "friends" && 
         <Friends chatingwith={[chatingwith , set_chatingwith]} relation={[friends, setfriends]} onlineUsers={[onlineusers , set_onlineusers]} set_currentpage={set_currentpage}/> }

         { currentpage === "online" && 
         <OnlineFriends chatingwith={[chatingwith , set_chatingwith]} onlineusers={onlineusers} relation={[friends, setfriends]} set_currentpage={set_currentpage}/> }
        </section>
    </article>
  )
} 


export default Chat

/*
 <section className="w-[29%] mr-[1%]">
            <OnlineFriends chatingwith={[chatingwith , set_chatingwith]} onlineusers={onlineusers} relation={[friends, setfriends]}/>
  </section>

  <section className="w-[19%] ml-[1%]">
        <Friends chatingwith={[chatingwith , set_chatingwith]} relation={[friends, setfriends]} onlineUsers={[onlineusers , set_onlineusers]}/>
  </section>
*/