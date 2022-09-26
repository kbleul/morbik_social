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
    setfriends(prev => prev.filter(f => !onlineusers.includes(f._id)))
},[onlineusers ])

    return(<article className="mt-28 ">

    <h3 className="mt-4 mb-2 text-center text-xl font-content-spliter font-bold">Friends</h3>

    <section className="h-[79vh] border-t-2 overflow-y-hidden hover:overflow-y-scroll">
        <Search />
        { friends.map(tempf => (
            <div key={tempf._id} className={chatingWith === tempf._id ?  "w-full flex items-center my-2 bg-slate-200" : "w-full flex  items-center my-2"}
                onClick={() => handleChatwith(tempf._id)}>
                <img className="w-12 h-12 rounded-full" src={ tempf.profilePicture === "" ? pp : `/public/data/uploads/${tempf.profilePicture}`} alt={tempf.username} />
                <p className="w-full text-left text-base pl-4">{tempf.username}</p>
            </div>
        ))}

    </section>
        
  </article>)
}

export default Friends