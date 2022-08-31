import { Users } from "../dummy"

const Postcard = ({ post , issuggestion }) => {

    const user = Users.filter(user => post.id === user.id)[0]

  return (
    <section className="h-[60vh] w-[70%] ml-[15%] my-12">
    
        <div className="flex items-center justify-between ">
          <div className="flex justify-between items-center">
            <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full'/>
            <h5 className="font-bold ml-2 font-serif">{user.username}</h5>

            {issuggestion && <button className="ml-4 text-[crimson]">+ Follow</button>}
          </div>
            <p className="text-gray-300 text-sm">{post.date}</p>
        </div>

        <p className="p-2">{post.desc}</p>

        <img src={post.photo} alt={post.desc} className="w-full h-[80%]"/>


        <div className="flex justify-between">
            <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                <p className="ml-2">{post.like}</p>
            </div>

          <p>{`${post.comment} Comments`}</p>

        </div>
    
    </section>
  )
}

export default Postcard

//#F44336