import MessagesView from "./MessagesView"
import MessageForm from "./MessageForm"

import { useState } from "react"


const MessageBox = ({ chatingwith , socket , arrivalmessage }) => {

    const [ chatingWith , set_chatingWith ] = chatingwith
    const [ messages , set_messages ] = useState([])


    return(<article className="h-[87.2vh]">
            <MessagesView chatingwith={chatingwith} allmessages = {[messages , set_messages]} arrivalmessage={arrivalmessage} />
            <MessageForm chatingwith={chatingwith} allmessages = {[messages , set_messages]} socket={socket}/>
        </article>)
}

export default MessageBox