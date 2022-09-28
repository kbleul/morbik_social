
import { useEffect , useState } from "react"
import { useParams, Link } from "react-router-dom"

import avatar from "../assets/placeholder/black.png"

import { useAuthContext , usePostContext } from "../customHooks/useMyContext"
import { POST_ACTIONS } from "../contex/postContext"

import Hero from "../components/Hero"
import Postcard from "../components/Postcard"

const Home = () => {

  const  { user  } = useAuthContext()
  const { id } = useParams();

  const  { userposts , dispatch , dispatch_userposts} = usePostContext()
  const [ currentPerson , set_currentPerson ] = useState(null)

  const [ relationlist , set_relationlist ] = useState([])
  const [relation_type , set_relation_type] = useState("following")

  const getUser = async (userid) => {
    const options = {
      method : "GET",
      headers : { "Authorization" : `Bearer ${user.token}` }
    }

    const fetchuser = await fetch(`api/user/${userid}` , options)

    const json = await fetchuser.json()

    if(fetchuser.ok) {
      set_currentPerson(json)
      window.scrollTo(0, 0);
    }

}

  const fetchPost = async () => { 
    const options = {
      method : "GET",
      headers : { "Authorization" : `Bearer ${user.token}` }
    }

    const url = id !== user._id ?
                `api/posts/current/${id}` : `api/posts/current`
    const getpost = await fetch(url, options)

    let json = await getpost.json()

    console.log("json" , json)

    if(getpost.ok) {
      dispatch_userposts({ type : POST_ACTIONS.GETALL , payload : json })
    }

   // fetchRelationships("following")

  }

  const fetchRelationships = async (type) => {
    const options = {
          method : "GET",
          headers: { "Authorization" : `Bearer ${user.token}` },
    }

        const url = id !== user._id ? `api/${type}/${id}` : `api/${type}`
        console.log("url",url)
        const response = await fetch( url , options)

        const json = await response.json()

console.log("rel,",response)
        if(response.ok) { set_relationlist(json) }
        

        set_relation_type(type)

  }

  //get followers and following list

  useEffect(() => { console.log("run")


    if(id !== user._id) {  
      console.log("iddd", id)
      getUser(id)  }
    else { set_currentPerson(user) }

  fetchRelationships("following")
       fetchPost()

  }, [id])

  useEffect(() => {

  },[currentPerson])


  return (<main>
{currentPerson && <article>
    <article className="mt-from-nav relative">
      <Hero user={currentPerson}/>
    </article>

    <section className="bg-[#f4f4f4] mt-[13vh] md:mt-[25vh]">
      <div className="flex items-center font-content-spliter">

        <div className="w-full md:w-[30%] flex justify-evenly md:border-r-2 border-black">
          <p onClick={() => fetchRelationships("following")} className={ relation_type === "following" ? "font-bold w-1/2 text-center border-b-2 border-gray-400 mx-2 hover:cursor-pointer" : "font-bold w-1/2 text-center mx-2 hover:cursor-pointer hover:opacity-75"} ><span className="text-sm font-light">{currentPerson && currentPerson.following.length} Following</span></p>

          <p onClick={() => fetchRelationships("followers")} className={ relation_type === "followers" ?"font-bold w-1/2 text-center border-b-2 border-gray-400 mx-2 hover:cursor-pointer" : "font-bold w-1/2 text-center mx-2 hover:cursor-pointer hover:opacity-75"}
          ><span className="text-sm font-light">{currentPerson && currentPerson.follower.length} Followers</span></p>
        </div>
        
        <p className="w-[70%] text-3xl text-center hidden md:block">Posts</p>
     </div>
   </section>

   <section className="block md:grid grid-cols-3 gap-x-8">
    
   <div className="max-h-[60vh] md:h-[80vh] overflow-y-scroll  md:overflow-y-hidden md:hover:overflow-y-scroll border-r-2 border-gray-100 mt-[5%]" >
      { relationlist.map(person => (
        <Link to={`/myhome/${person._id}`} className="flex items-center gap-2 px-20 py-2 hover:cursor-pointer hover:opacity-60" key={person.id}>
          <img className='w-12 h-12 rounded-full' src={avatar} alt={person.username} />
          <h5 className="font-bold ml-2 font-serif">{ person.username }</h5>
        </Link>
      ))
      }
    </div>

    <p className="w-full text-3xl text-center md:hidden bg-[#f4f4f4] mt-[5vh] font-content-spliter">Posts</p>
    
    <div className="max-h-[60vh] md:h-[80vh] overflow-y-scroll  md:overflow-y-hidden md:hover:overflow-y-scroll md:col-span-2 grid grid-cols-2 gap-2 md:mr-8 border-t md:border-none">
     { userposts.length === 0 && <p className="text-center text-blue-400 text-xl mt-32 col-span-2">No posts yet</p>}

      { userposts.map( post => (
        <Postcard post={post} is_mypost={true}/>
      )) }
    </div>
   </section>
  </article>
}

   </main>
  )
}

export default Home

//
/*





*/