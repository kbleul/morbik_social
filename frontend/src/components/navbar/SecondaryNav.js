import { useState } from 'react'
import pp from "../../assets/placeholder/black.png"

import { AUTH_ACTIONS } from "../../contex/authContext"
import { useAuthContext } from "../../customHooks/useMyContext"



const SecondaryNav = () => {

  const { user , dispatch } = useAuthContext()

  const [ menuon , set_menuon] = useState(false)


    const logout = () => {
      localStorage.removeItem("user")
 // update auth context
     dispatch({ type : AUTH_ACTIONS.LOGOUT })
    }

  return (<article>
    <section className="flex justify-center">

        <div className="w-1/2 py-2 flex ">

          <button onClick={() => set_menuon(prev_menuon => !prev_menuon)} >
            <svg  className="ml-8" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 8h24M4 16h24M4 24h24"/></svg>
          </button>

          <svg className="ml-16" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="white" d="M32.51 27.83A14.4 14.4 0 0 1 30 24.9a12.63 12.63 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.63 12.63 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93a1 1 0 0 0-.34.75v1.36a1 1 0 0 0 1 1h27.8a1 1 0 0 0 1-1v-1.36a1 1 0 0 0-.34-.75ZM5.13 28.94a16.17 16.17 0 0 0 2.44-3a14.24 14.24 0 0 0 1.65-5.85v-4.94a8.74 8.74 0 1 1 17.47 0v4.94a14.24 14.24 0 0 0 1.65 5.85a16.17 16.17 0 0 0 2.44 3Z" className="clr-i-outline clr-i-outline-path-1"/><path fill="white" d="M18 34.28A2.67 2.67 0 0 0 20.58 32h-5.26A2.67 2.67 0 0 0 18 34.28Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg>

  
        </div>

        <div className="w-1/2 flex justify-end items-center">
           <p className="w-4/5 justify-self-end text-white font-bold text-end pr-[2%]">{user.username}</p>
           <img src={ user.profilePicture === "" ? pp : `/public/data/uploads/${user.profilePicture}`} alt="profile" className='w-10 h-10 rounded-full mr-16'/>
        </div>

    </section>
    
    { menuon &&
    <ul className="w-1/6 ml-[2%] bg-slate-500 text-center">
      <li className="px-4 py-2 w-full border-b border-gray-400 cursor-pointer"
          onClick={logout}>Logout</li>
    </ul>}
  </article>


    )
}

export default SecondaryNav