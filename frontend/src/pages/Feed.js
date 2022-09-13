
import Post from "../components/Post"
import Postcard from "../components/Postcard"

import { useNewUserContext } from "../customHooks/useMyContext"
import { usePostContext } from "../customHooks/useMyContext"

import AddDetails from "../components/AddDetails"


const Feed = () => {
    const  { isnew  } = useNewUserContext()
  const  { feedposts , dispatch : post_dispatch  } = usePostContext()


  return (
    <article>

    { isnew ?  <AddDetails />
      :
      <article>
      <section className="mt-from-nav flex">
         <p className="mt-8 w-1/2 font-content-spliter text-[1.3rem] font-bold self-end border-l-4 border-orange-500 pl-2 ml-20">My Feed</p>

        <Post />

            <p className="mt-8 w-1/2 font-content-spliter text-[1.3rem] font-bold self-end border-r-4 border-green-600 pr-2 mr-20 text-right">Suggested</p>
      </section>

      <section className="grid grid-cols-2 gap-1">
        <div className="h-[100vh] overflow-hidden hover:overflow-y-scroll border-t-2 border-orange-500 mt-2">
          { feedposts.map(post => (
            <Postcard key={post._id} post={post} />
          ))}
         </div>
        
      </section>
    </article>
    }
  
    </article>
  )
}

export default Feed



/*

 

    */