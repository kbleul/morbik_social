import {Users} from "../dummy"

const OnlineFriends = () => {

    return(<article className="mt-24 h-[88vh] overflow-y-hidden hover:overflow-y-scroll">
        <h3 className="my-4 text-center text-xl font-content-spliter font-bold">Online</h3>
        
        <section className="grid grid-cols-2 gap-4 items-center">

            { Users.map(user => (
                <div key={user.id} className="w-full relative flex flex-col items-center">
                    <img className="w-4/5 h-48 rounded-full " src={user.profilePicture} alt={user.username} />
                    <p className="text-sm text-center w-full">{user.username}</p>
                    <p className="bg-green-400 w-3 h-3 rounded-full absolute top-[80%] left-[70%]"></p>

                </div>
            ))}
        </section>
        </article>)
}

export default OnlineFriends