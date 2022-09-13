import { Users } from "../dummy"

const Postcard = ({ post , issuggestion , is_mypost }) => {

   //const user = Users.filter(user => post.id === user.id)[0]

  return (
    <section className={ is_mypost ? "h-[60vh] mt-2 shadow-md" : "h-[60vh] w-[70%] ml-[15%] my-12"} >
   

    { !is_mypost && <section>
      <div className="flex items-center justify-between ">
        <div className="flex justify-between items-center">
          <img src={"/public/data/uploads/" +post.profilePicture} alt={post.username} className='w-10 h-10 rounded-full'/>
          <h5 className="font-bold ml-2 font-serif">{post.username}</h5>

          {issuggestion && <button className="ml-4 text-[crimson]">+ Follow</button>}
        </div>
          <p className="text-gray-300 text-sm">{post.date}</p>
      </div>

      <p className="p-2 max-h-[55vh] overflow-y-hidden hover:overflow-y-scroll">{post.desc}</p>
      </section>
    }

   { post.img !== ""  && <img src={"/public/data/uploads/" +post.img} alt={post.desc} className="w-full h-[80%]"/>}

      <div className={is_mypost ? "flex justify-between w-[80%] ml-[10%]" : "flex justify-between"}>
          <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
              <p className="ml-2">{post.likes.length}</p>
          </div>

          <div className="flex items-center justify-center">
            <p>{`10`}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.45em" height="1.45em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50"><path fill="currentColor" d="M15 42h-2l1.2-1.6c.8-1.1 1.3-2.5 1.6-4.2C10.8 33.9 8 29.6 8 24c0-8.6 6.5-14 17-14s17 5.4 17 14c0 8.8-6.4 14-17 14h-.7c-1.6 1.9-4.4 4-9.3 4zm10-30c-9.4 0-15 4.5-15 12c0 6.4 3.9 9.4 7.2 10.7l.7.3l-.1.8c-.2 1.6-.5 3-1.1 4.2c3.3-.4 5.2-2.1 6.3-3.5l.3-.4H25c13.5 0 15-8.4 15-12C40 16.5 34.4 12 25 12z"/></svg>
          </div>

      </div>

      { is_mypost &&  <div>
          <p className="p-2">{post.desc}</p>
          <div className="flex justify-between items-center">
            <p className="px-2 text-gray-400 text-sm">{post.date}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="gray"/><circle cx="16" cy="16" r="2" fill="gray"/><circle cx="16" cy="24" r="2" fill="gray"/></svg>
          </div>
        </div>
      }
    </section>
  )
}

export default Postcard

//#F44336

/*


 
      { !is_mypost && <section>
        <div className="flex items-center justify-between ">
          <div className="flex justify-between items-center">
            <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full'/>
            <h5 className="font-bold ml-2 font-serif">{user.username}</h5>

            {issuggestion && <button className="ml-4 text-[crimson]">+ Follow</button>}
          </div>
            <p className="text-gray-300 text-sm">{post.date}</p>
        </div>

        <p className="p-2">{post.desc}</p>
        </section>
      }

        <img src={post.photo} alt={post.desc} className="w-full h-[80%]"/>

        <div className={is_mypost ? "flex justify-between w-[80%] ml-[10%]" : "flex justify-between"}>
            <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                <p className="ml-2">{post.like}</p>
            </div>

            <div className="flex items-center justify-center">
              <p>{`${post.comment} `}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.45em" height="1.45em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50"><path fill="currentColor" d="M15 42h-2l1.2-1.6c.8-1.1 1.3-2.5 1.6-4.2C10.8 33.9 8 29.6 8 24c0-8.6 6.5-14 17-14s17 5.4 17 14c0 8.8-6.4 14-17 14h-.7c-1.6 1.9-4.4 4-9.3 4zm10-30c-9.4 0-15 4.5-15 12c0 6.4 3.9 9.4 7.2 10.7l.7.3l-.1.8c-.2 1.6-.5 3-1.1 4.2c3.3-.4 5.2-2.1 6.3-3.5l.3-.4H25c13.5 0 15-8.4 15-12C40 16.5 34.4 12 25 12z"/></svg>
            </div>

        </div>

        { is_mypost &&  <div>
            <p className="p-2">{post.desc}</p>
            <div className="flex justify-between items-center">
              <p className="px-2 text-gray-400 text-sm">{post.date}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="gray"/><circle cx="16" cy="16" r="2" fill="gray"/><circle cx="16" cy="24" r="2" fill="gray"/></svg>
            </div>
          </div>
        }


  */