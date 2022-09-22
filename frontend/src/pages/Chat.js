
import  OnlineFriends  from "../components/OnlineFriends"
import  Friends  from "../components/Friends"
import  MessageBox  from "../components/MessageBox"

import { useRef , useEffect , useState } from "react"
import {io} from "socket.io-client"

import {useAuthContext} from "../customHooks/useMyContext"
import {useNotificContext} from "../customHooks/useMyContext"



const Chat = () => {

  const  { user } = useAuthContext()
  const  { set_chatnotifications } = useNotificContext()

  const  [ chatingwith , set_chatingwith ] = useState(null)
  const  [ arrivalmessage , set_arrivalmessage ] = useState(null)


  const socket = useRef()

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
      socket.current.on("getUsers" , users => {
        console.log(users)
      })

  }, [user])


  return (
    <article className="flex">
        <section className="w-[29%] mr-[1%]">
            <OnlineFriends chatingwith={[chatingwith , set_chatingwith]}/>
        </section>
        <section className="w-[50%] mt-from-nav shadow-2xl">
          <MessageBox chatingwith={[chatingwith , set_chatingwith]} socket={socket} arrivalmessage={arrivalmessage} />
        </section>
        <section className="w-[19%] ml-[1%]">
            <Friends chatingwith={[chatingwith , set_chatingwith]} />
        </section>
    </article>
  )
}

export default Chat