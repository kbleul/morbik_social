
import {useAuthContext} from "../customHooks/useMyContext"
import { useState , useEffect } from 'react'
import avatar from "../assets/placeholder/black.png"

const SingleOnlineFriend = ({onlineuser_id , chatingwith}) => {
    
    const  { user } = useAuthContext()
    const [  , set_chatingWith ] = chatingwith

    const [ currentuser , set_currentuser ] = useState(null)

const getOnlineUsers = async () => {
    const options = {
        method : "Get",
        headers : { "Authorization": `Bearer ${user.token}` }
        }

    const response = await fetch( `api/${onlineuser_id}`, options)
    const { _id , username, profilePicture } = await response.json()
        
        set_currentuser({ _id , username, profilePicture })
    console.log("json", { _id , username, profilePicture })
}
  
useEffect(() => {  getOnlineUsers()  },[])


 return (  <section  className="w-full">
   { currentuser &&
        <div key={currentuser._id} className="w-full relative flex flex-col items-center" onClick={() => set_chatingWith(currentuser._id)}>
            <img className="w-4/5 h-48 rounded-full " src={avatar} alt={currentuser.username} />
            <p className="text-sm text-center w-full">{currentuser.username}</p>
            <p className="bg-green-400 w-3 h-3 rounded-full absolute top-[80%] left-[70%]"></p>
        </div>
    }
    </section>)
}


export default SingleOnlineFriend