import {useAuthContext} from "../customHooks/useMyContext"
import SingleOnlineFriend from "../components/SingleOnlineFreinds"
import { useMediaQuery } from 'react-responsive';



const OnlineFriends = ({chatingwith ,  onlineusers , relation , set_currentpage}) => {

    const  { user } = useAuthContext()
    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)", });

return(
    <article className={isMobileDevice ? 
        "h-[88vh] overflow-y-hidden hover:overflow-y-scroll" : "mt-24 h-[88vh] overflow-y-hidden hover:overflow-y-scroll"}>
       { !isMobileDevice && 
          <h3 className="my-4 text-center text-xl font-content-spliter font-bold">Online</h3>}
        
        <section className="grid grid-cols-2 gap-4 items-center">

            { onlineusers.map(tempuser => (<article className="w-full" key={tempuser}>
                <SingleOnlineFriend  onlineuser_id={tempuser}  chatingwith={chatingwith} set_currentpage={set_currentpage}/>
            </article>
            ))}
        </section>
     </article>
)
}

export default OnlineFriends