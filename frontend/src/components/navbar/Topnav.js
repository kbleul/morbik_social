
import Search from "../Search"
import {useAuthContext} from "../../customHooks/useMyContext"

import { Link } from "react-router-dom"

const TopNav = () => {

  const  { user  } = useAuthContext()

  return (
    <section className="bg-slate-600  flex justify-center items-center">

          <div  className="w-1/5 text-center font-bold">Logo</div>

          <div className="w-8/12 py-1">
           <Search />
          </div>

          <div className="w-1/5 flex justify-evenly font-bold" >
            <Link to={"/"}><button>Feed</button></Link>
            <Link to={`/myhome/${user._id}`}><button>Home</button></Link>
          </div>

      </section>
  )
}

export default TopNav