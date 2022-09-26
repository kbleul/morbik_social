import bg1 from "../assets/logo/bg1.jpg"
import { useState } from "react"
import { Link } from "react-router-dom"
import loading from "../assets/loading/loading2.gif"

import { useLogin } from "../customHooks/useLogin"

const Login = () => {

    const {login , isloading , error } = useLogin()
    const [username_or_passw, set_username_or_passw] = useState("")
    const [password, set_password] = useState("")

    
const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username_or_passw , password)
}

  return (
    <article className="h-[100vh] block md:grid grid-cols-3">
        <section className="col-span-2 bg-gradient-to-r  hover:bg-gradient-to-l from-gray-500 to-gray-900 text-white h-[100%]">
            <h2 className="md:ml-16 ml-4 md:mt-12 pl-4 font-bold text-3xl border-l-4 border-amber-300">Morbik Social</h2>

            <div className="md:hidden flex justify-center mt-[35%]">
              <p>Register for new account <Link to="/signup" className="text-red-500 hover:text-red-600 font-bold pl-2 underline">here</Link></p>
            </div>

            <form onSubmit={e => handleSubmit(e)} className="flex flex-col mt-[5%] md:mt-[20%]">
                <input className="md:w-3/5 w-4/5 ml-[10%] md:ml-[20%] md:py-4 py-3 px-4 md:px-8 mt-12 md:mt-8 rounded-full text-black" 
                    type="text" value={username_or_passw} placeholder="Email / Username" 
                      onChange={ e => set_username_or_passw(e.target.value) } />

                <input className="md:w-3/5 w-4/5 ml-[10%] md:ml-[20%] md:py-4 py-3 px-4 md:px-8 mt-12 md:mt-8 rounded-full text-black" 
                  type="password" value={password} min="6" placeholder="Password" 
                    onChange={ e => set_password(e.target.value) }/>

                    { error && <p className="text-yellow-400 text-sm w-3/5 ml-[24%] pt-[1%]">! {error}</p>}

                    { isloading && 
                      <div className="flex justify-center items-center w-3/5  ml-[20%]">
                        <img className="w-16 h-24 py-4" src={loading} alt="loading"/>
                      </div>
                    }

                <button className="md:w-1/5 w-1/2 md:ml-[40%] ml-[25%] mt-16 mb-4 py-2 px-4 bg-black hover:bg-gray-800
                 text-white text-xl font-bold rounded-full">Log in</button>

            </form>

        </section>

        <section className="text-center hidden md:block md:col-span-1 bg-sky-700">
          <img src={bg1} className="h-[100vh] w-full"/>

          <div className="absolute top-[40%] text-white w-[33.33%] text-center ">
            <h2 className="font-bold text-6xl">New Here ?</h2>
            <p className="py-4 font-bold">Join and hangout with all your friends and family</p>
            <Link to="/signup">
              <button className="mt-12 py-2 px-8 bg-white hover:bg-transparent text-black hover:text-white hover:border-2 font-bold  rounded-full">Sign Up</button>
            </Link>
          </div>
        </section>

    </article>
  )
}

export default Login