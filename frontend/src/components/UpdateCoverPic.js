import { useState } from "react"
import blackimg from "../assets/placeholder/black.png"
import { AUTH_ACTIONS } from "../contex/authContext"
import { useAuthContext } from "../customHooks/useMyContext"

const UpdateCoverPic = ( { set_currenttask } ) => {

    const  { user , dispatch } = useAuthContext()

    const [ file , set_file ] = useState(null)
    const [ src , set_src ] = useState(null)

    const getImgData = (uploaded) => {
        if (uploaded) { 
          const fileReader = new FileReader();
  
          fileReader.readAsDataURL(uploaded);
          fileReader.addEventListener("load", function () {
            set_src(this.result)
          });    
        }
      }

    const postCoverPicture = async (e) => {
        e.preventDefault()
        
        if(file){
          const formData = new FormData();
  
              formData.append('cover', file);
  
          fetch(`/api/user/cover/updateCover/${user._id}`,
            {    
              method: 'PUT',   
              body: formData,
              headers : { "Authorization" : `Bearer ${user.token}`}
            }
      
          ).then((response) => response.json())
            .then((result) => {  
              dispatch( { type : AUTH_ACTIONS.UPDATE_INFO , payload : {...user, coverPicture : result.coverPicture}})
                set_currenttask("others")
                set_src(null)
                set_file(null)
                console.log(user)
            })
              .catch((error) => {  console.error('Error:', error);  });
      }
      }

    return (<form  onSubmit={e => postCoverPicture(e)} className="flex flex-col w-1/2 ml-[25%]">
        <label className="text-center">Set cover picture</label>
        <input type="file" name="cover" accept=".png, .jpg, .jpeg" 
        onChange={e => {
                set_file(e.target.files[0])
                getImgData(e.target.files[0]);
            }  }/>

        <div className="w-1/2 ml-[25%] flex justify-end items-center">
        { src ? <div className="w-full relative flex justify-center" >
            <img className="w-full h-[70vh] mt-12 " src={src} alt="cover picture"/>
            <p className="absolute top-0 left-[47%] text-4xl text-red-600 rounded-full hover:text-red-400 " 
            onClick={() => { set_file(null); set_src("")}}>x</p>
            </div> : 
            <div className="w-full relative flex justify-center" >
            <img className="w-64 h-64 rounded-full " src={blackimg} alt="default profile"/>
            </div>
        }
        </div>

        <button>Submit</button>
        <button onClick={e =>{ e.preventDefault();  set_currenttask("others")}}>skip</button>
</form>)
}

export default UpdateCoverPic