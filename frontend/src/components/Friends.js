import {Users} from "../dummy"
import Search from "../components/Search"
import { useEffect , useState } from "react"
import { useAuthContext } from "../customHooks/useMyContext"
import pp from "../assets/placeholder/black.png"

const Friends = ({chatingwith , relation , onlineUsers}) => {

    const  { user  } = useAuthContext()

    const [ chatingWith , set_chatingWith ] = chatingwith
    const [friends, setfriends] = relation
    const [onlineusers , set_onlineusers] = onlineUsers




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
 }

useEffect(() => { fetchRelationships() }, [])

useEffect(() => {
    console.log("freinds " , friends)
    setfriends(prev => prev.filter(temp => !onlineusers.includes(temp._id)))
    console.log("freinds new " , friends)
},[onlineusers , friends])

    return(<article className="mt-28 ">

    <h3 className="mt-4 mb-2 text-center text-xl font-content-spliter font-bold">Friends</h3>

    <section className="h-[79vh] border-t-2 overflow-y-hidden hover:overflow-y-scroll">
        <Search />
        { friends.map(tempf => (
            <div key={tempf._id} className="w-full flex  items-center py-2"
                onClick={() => handleChatwith(tempf._id)}>
                <img className="w-14 h-14 rounded-full ml-4" src={ tempf.profilePicture === "" ? pp : `/public/data/uploads/${tempf.profilePicture}`} alt={tempf.username} />
                <p className="w-full text-left text-base pl-4">{tempf.username}</p>
            </div>
        ))}

    </section>
        
  </article>)
}

export default Friends