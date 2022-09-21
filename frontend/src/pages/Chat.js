
import  OnlineFriends  from "../components/OnlineFriends"
import  Friends  from "../components/Friends"
import  MessageBox  from "../components/MessageBox"

import { useRef , useEffect , useState } from "react"
import {io} from "socket.io-client"

import {useAuthContext} from "../customHooks/useMyContext"


const Chat = () => {

  const  { user  } = useAuthContext()
  const  [ chatingwith , set_chatingwith ] = useState(null)
  const  [ arrivalmessage , set_arrivalmessage ] = useState(null)


  const socket = useRef()

  useEffect(() => { 
    socket.current = io("ws://localhost:8900")  
    socket.current.on("getMessage", data => {
      set_arrivalmessage({
        sender : data.senderId,
        text : data.text,
        createdAt : Date.now()
      }
      )

    console.log("get message")

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