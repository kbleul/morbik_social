import {Users} from "../dummy"
import Search from "../components/Search"

const Friends = () => {

    return(<article className="mt-28 ">

    <h3 className="my-4 text-center text-xl font-content-spliter font-bold">Friends</h3>

    <section className="h-[79vh] border-t-2 overflow-y-hidden hover:overflow-y-scroll">
        <Search />
        { Users.map(user => (
            <div key={user.id} className="w-full flex  items-center py-2">
                <img className="w-14 h-14 rounded-full ml-4" src={user.profilePicture} alt={user.username} />
                <p className="w-full text-left text-base pl-4">{user.username}</p>
            </div>
        ))}
    </section>
        
  </article>)
}

export default Friends