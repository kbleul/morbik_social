
import logo from "../../assets/logo/logoligh.png"
import Search from "../Search"

const TopNav = () => {
  return (
    <section className="bg-slate-600  flex justify-center items-center">

          <div  className="w-1/5 text-center font-bold">Logo</div>

          <div className="w-8/12 py-1">
           <Search />
          </div>

          <div className="w-1/5 flex justify-evenly font-bold" >
            <button>Feed</button>
            <button>Home</button>
          </div>

      </section>
  )
}

export default TopNav