import {Users} from "../dummy"
import Search from "../components/Search"
import { useEffect , useState } from "react"
import { useAuthContext } from "../customHooks/useMyContext"
import pp from "../assets/placeholder/black.png"
import { useMediaQuery } from 'react-responsive';


const Friends = ({chatingwith , relation , onlineUsers , set_currentpage}) => {

    const  { user  } = useAuthContext()

    const [ chatingWith , set_chatingWith ] = chatingwith
    const [friends, setfriends] = relation
    const [onlineusers] = onlineUsers

    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)", });


const fetchRelationships = async () => {

    const options = {
            method : "GET",
            headers: { "Authorization" : `Bearer ${user.token}` },
    }

    const response = await fetch( `api/following` , options)

    const json = await response.json()
    
    console.log("rel,",response)
            if(response.ok) { setfriends(json) }
}

const handleChatwith =  (id) => {
    set_chatingWith(id)
    console.log("chatingWith",chatingWith)
    set_currentpage && set_currentpage("chatbox")
 }

useEffect(() => { fetchRelationships() }, [])

useEffect(() => {
    setfriends(prev => prev.filter(f => !onlineusers.includes(f._id)))
},[onlineusers ])


    return(<article className={!isMobileDevice && "mt-28 "}>

   {!isMobileDevice && <h3 className="mt-4 mb-2 text-center text-xl font-content-spliter font-bold">Friends</h3>}

    <section className="h-[79vh] border-t-2 overflow-y-hidden hover:overflow-y-scroll">
        <Search />
        { friends.map(tempf => (
            <div key={tempf._id} className={isMobileDevice ? "w-full flex  items-center  ml-12 my-[7%]" : "w-full flex  items-center my-2" }
                onClick={() => handleChatwith(tempf._id)}>
                <img className="w-12 h-12 rounded-full" src={ tempf.profilePicture === "" ? pp : `/public/data/uploads/${tempf.profilePicture}`} alt={tempf.username} />
                <p className="w-full text-left text-base pl-4">{tempf.username}</p>
            </div>
        ))}

    </section>
        
  </article>)
}

export default Friends