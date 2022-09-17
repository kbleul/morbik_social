
import { useEffect , useState } from "react"
import avatar from "../assets/placeholder/black.png"

import { useAuthContext , usePostContext } from "../customHooks/useMyContext"
import { POST_ACTIONS } from "../contex/postContext"

import Hero from "../components/Hero"
import Postcard from "../components/Postcard"

const Home = () => {

  const  { user  } = useAuthContext()
  const  { feedposts , dispatch , dispatch_userposts} = usePostContext()

  const [ relationlist , set_relationlist ] = useState([])
  const [relation_type , set_relation_type] = useState("followers")

  const fetchPost = async () => { console.log("lll")
    const options = {
      method : "GET",
      headers : { "Authorization" : `Bearer ${user.token}` }
    }

    const getpost = await fetch(`api/posts/current`, options)

    let json = await getpost.json()
    console.log(getpost)

    if(getpost.ok) {
      dispatch_userposts({ type : POST_ACTIONS.GETALL , payload : json })
    }
  }

  const fetchRelationships = async (type) => {
      console.log(type)
    const options = {
          method : "GET",
          headers: { "Authorization" : `Bearer ${user.token}` },
    }

        const response = await fetch(`api/${type}`, options)

        const json = await response.json()

        if(response.ok) { set_relationlist(json) }

        set_relation_type(type)

  }

  //get followers and following list

  useEffect(() => { 
    fetchPost()
    fetchRelationships("following")
  }, [])


  return (<main>
    <article className="mt-from-nav relative">
     <Hero />
    </article>
    <section className="bg-[#f4f4f4] mt-[25vh]">
    <div className="flex items-center font-content-spliter">

      <div className="w-[30%] flex justify-evenly border-r-2 border-black">
        <p onClick={() => fetchRelationships("following")}className={ relation_type === "following" ? "font-bold w-1/2 text-center border-b-2 border-gray-400 mx-2 cursor-pointer" : "font-bold w-1/2 text-center mx-2 cursor-pointer hover:opacity-75"} ><span className="text-sm font-light">{user.following.length} Following</span></p>

        <p onClick={() => fetchRelationships("followers")} className={ relation_type === "followers" ?"font-bold w-1/2 text-center border-b-2 border-gray-400 mx-2 cursor-pointer" : "font-bold w-1/2 text-center mx-2 cursor-pointer hover:opacity-75"}
        ><span className="text-sm font-light">{user.follower.length} Followers</span></p>
      </div>
      
      <p className="w-[70%] text-3xl text-center">Posts</p>
    </div>
   </section>

   <section className="grid grid-cols-3 gap-x-8">
    
   <div className="h-[80vh] overflow-y-hidden hover:overflow-y-scroll border-r-2 border-gray-100 mt-[5%]" >
      { relationlist.map(person => (
        <div className="flex items-center gap-2 px-20 py-2" key={person.id}>
          <img className='w-12 h-12 rounded-full' src={avatar} alt={person.username} />
          <h5 className="font-bold ml-2 font-serif">{ person.username }</h5>
        </div>
      ))
      }
    </div>

    

    <div className="h-[80vh] overflow-y-hidden hover:overflow-y-scroll col-span-2 grid grid-cols-2 gap-2 mr-8">
      { feedposts.map( post => (
        <Postcard post={post} is_mypost={true}/>
      )) }
    </div>
   </section>

   </main>
  )
}

export default Home

//
/*





*/