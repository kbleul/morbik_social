import MessagesView from "./MessagesView"
import MessageForm from "./MessageForm"

import { useState } from "react"
import { useMediaQuery } from 'react-responsive';


const MessageBox = ({ chatingwith , socket , arrivalmessage , friends , chatingWith_name }) => {

    const [ chatingWith , set_chatingWith ] = chatingwith
    const [ messages , set_messages ] = useState([])
    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 768px)",
      });

    return(<article className={isMobileDevice ? "h-[78vh]" : "h-[87.2vh]"}>
            <MessagesView chatingwith={chatingwith} allmessages = {[messages , set_messages]} arrivalmessage={arrivalmessage} friends={friends}  chatingWith_name={chatingWith_name}/>
            <MessageForm chatingwith={chatingwith} allmessages = {[messages , set_messages]} socket={socket}/>
        </article>)
}

export default MessageBox