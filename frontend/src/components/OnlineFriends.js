import {Users} from "../dummy"
import { useEffect , useState } from "react"
import {useAuthContext} from "../customHooks/useMyContext"
import SingleOnlineFriend from "../components/SingleOnlineFreinds"


const OnlineFriends = ({chatingwith ,  onlineusers , relation}) => {

    const  { user } = useAuthContext()


return(
    <article className="mt-24 h-[88vh] overflow-y-hidden hover:overflow-y-scroll">
        <h3 className="my-4 text-center text-xl font-content-spliter font-bold">Online</h3>
        
        <section className="grid grid-cols-2 gap-4 items-center">

            { onlineusers.map(tempuser => (<article className="w-full" key={tempuser}>
                <SingleOnlineFriend  onlineuser_id={tempuser}  chatingwith={chatingwith}/>
            </article>
            ))}
        </section>
     </article>
)
}

export default OnlineFriends