
import { useAuthContext } from "../customHooks/useContext"

import Hero from "../components/Hero"
import { Users , Posts } from "../dummy"
import Postcard from "../components/Postcard"

const Home = () => {

  const followers = Users.slice(1,6)
  const following = Users.reverse().slice(1,10)

  const  { user , dispatch } = useAuthContext()


  return (<main>
    <article className="mt-from-nav relative">
     <Hero />
    </article>
    <section className="bg-[#f4f4f4] mt-[25vh]">
    <div className="flex items-center font-content-spliter">

      <div className="w-[30%] flex justify-evenly border-r-2 border-black">
        <p className="font-bold">{user.following.length} <span className="text-sm font-light">Following</span></p>
        <p className="font-bold">{user.followers.length} <span className="text-sm font-light">Followers</span></p>
      </div>
      
      <p className="w-[70%] text-3xl text-center">Posts</p>
    </div>
   </section>

   <section className="grid grid-cols-3 gap-x-8">
    <div className="h-[80vh] overflow-y-hidden hover:overflow-y-scroll border-r-2 border-gray-100" >
        { following.map(person => (
          <div className="flex items-center gap-2 px-20 py-2" key={person.id}>
            <img className='w-12 h-12 rounded-full' src={person.profilePicture} alt={person.username} />
            <h5 className="font-bold ml-2 font-serif">{ person.username }</h5>
          </div>
        ))
      }
      { following.map(person => (
        <div className="flex items-center gap-2 px-20 py-2" key={person.id}>
          <img className='w-12 h-12 rounded-full' src={person.profilePicture} alt={person.username} />
          <h5 className="font-bold ml-2 font-serif">{ person.username }</h5>
        </div>
      ))
    }
    </div>

    <div className="h-[80vh] overflow-y-hidden hover:overflow-y-scroll col-span-2 grid grid-cols-2 gap-2 mr-8">
      { Posts.map( post => (
        <Postcard post={post} is_mypost={true}/>
      )) }
    </div>
   </section>

   </main>
  )
}

export default Home

//
