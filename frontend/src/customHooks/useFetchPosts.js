import { useState } from 'react'
import { useAuthContext} from "../customHooks/useMyContext"
import { usePostContext } from "../customHooks/useMyContext"

import { POST_ACTIONS } from "../contex/postContext"

export const useFetchPosts = () => {
    const [ post_error , set_posterror] = useState(null)
    const [post_isloading , set_postisloading] = useState(null)

    const  { user } = useAuthContext()
    const  { dispatch : post_dispatch  } = usePostContext()


    const fetchPosts = async () => { 

        set_posterror(null)
        set_postisloading(true)

        const options = {
            method : "GET",
            headers : { "Authorization" : `Bearer ${user.token}` }
        }

        let getpost = await fetch(`api/posts/timeline/all`, options)


        const json = await getpost.json()

        if(!getpost.ok) {
            set_postisloading(false)
            set_posterror(json.error)
            return null
        }

        post_dispatch({ type : POST_ACTIONS.GETALL , payload : json })

    }




    return { fetchPosts , post_isloading , post_error  }
}