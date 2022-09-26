
import Search from "../Search"
import {useAuthContext} from "../../customHooks/useMyContext"

import { Link } from "react-router-dom"

const TopNav = () => {

  const  { user  } = useAuthContext()

  return (
    <section className="bg-slate-600  flex flex-col md:flex-row justify-center items-center">

          <div  className="hidden md:block w-1/5 text-center font-bold">Logo</div>

          <div className="w-full md:w-8/12 py-1">
           <Search />
          </div>

          <div className="w-full md:w-1/5 flex justify-end md:justify-evenly font-bold pt-4 pb-2" >
            <Link to={"/"} className="mr-4 hover:text-red-500"><button>Feed</button></Link>
            <Link to={`/myhome/${user._id}`} className="mr-4 hover:text-red-500"><button>Home</button></Link>
          </div>

      </section>
  )
}

export default TopNav