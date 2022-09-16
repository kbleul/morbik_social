import { useState } from 'react'
import { useAuthContext} from "../customHooks/useMyContext"
import { usePostContext } from "../customHooks/useMyContext"

import { POST_ACTIONS } from "../contex/postContext"

export const useFetchPosts = () => {
    const [ post_error , set_posterror] = useState(null)
    const [post_isloading , set_postisloading] = useState(false)

    const [ sugg_error , set_suggerror] = useState(null)
    const [sugg_isloading , set_suggisloading] = useState(false)


    const  { user } = useAuthContext()
    const  { dispatch : post_dispatch , dispatch_suggested  } = usePostContext()


    const fetchPosts = async () => { 

        set_posterror(null)
        set_suggerror(null)
        set_postisloading(true)
        set_suggisloading(true)

        const options = {
            method : "GET",
            headers : { "Authorization" : `Bearer ${user.token}` }
        }

        let getpost = await fetch(`api/posts/timeline/all`, options)


        let json = await getpost.json()

        if(!getpost.ok) {
            set_posterror(json.error)
            return null
        }

        set_postisloading(false)

        post_dispatch({ type : POST_ACTIONS.GETALL , payload : json })


        //get suggested posts
        getpost = await fetch(`api/posts/timeline/suggested`, options)

        json = await getpost.json()

        if(!getpost.ok) { 
            set_suggerror(json.error)
            return null 
        }

        set_suggisloading(false)

        dispatch_suggested({ type : POST_ACTIONS.GETALL , payload : json })

    }




    return { fetchPosts , post_isloading , post_error, sugg_isloading , sugg_error }
}