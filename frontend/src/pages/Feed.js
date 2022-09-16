
import { useEffect } from "react"

import loading from "../assets/loading/loading2.gif"

import Post from "../components/Post"
import Postcard from "../components/Postcard"

import { useNewUserContext } from "../customHooks/useMyContext"
import { usePostContext } from "../customHooks/useMyContext"
import { useFetchPosts } from "../customHooks/useFetchPosts"

import AddDetails from "../components/AddDetails"


const Feed = () => {
    const  { isnew  } = useNewUserContext()
  const  { feedposts , feedposts_suggested  } = usePostContext()

  const { fetchPosts , post_isloading , post_error , sugg_isloading , sugg_error } = useFetchPosts()

  useEffect(() => { fetchPosts() }, [])


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
          { post_isloading && 
              <div className="w-full flex justify-center mt-20 items-center">
                <img src={loading} alt="loading" className="w-12 h-12"/>
              </div>
          }

          { post_error && <h4 className="text-red-600 mt-64 text-center">Loading error</h4> }

          { feedposts.map(post => (
            <Postcard key={post._id} post={post} />
          ))}
         </div>

         <div className="h-[100vh] overflow-hidden hover:overflow-y-scroll border-t-2 border-green-500 mt-2">
         { sugg_isloading && 
              <div className="w-full flex justify-center mt-20 items-center">
               <img src={loading} alt="loading" className="w-12 h-12"/>
              </div>
         }

          { sugg_error && <h4 className="mt-64 text-red-600 text-center">Loading error</h4> }

          { feedposts_suggested.map(post => (
            <Postcard key={post._id} post={post} issuggestion/>
          ))}
         </div>
        
      </section>
    </article>
    }
  
    </article>
  )
}

export default Feed

