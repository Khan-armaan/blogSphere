import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import {  useNavigate } from "react-router-dom"


export const Publish = () => {
    const [title, setTitle] = useState("")
    const [description , setDescription] = useState("")
    const Navigate = useNavigate()
    const token = localStorage.getItem("token");

  
    
    return(
        <div>
            <Appbar />
        <div className="flex justify-center pt-8"> 
     <div className="w-1/2 ">
       
        <textarea onChange={(e) => {
            setTitle(e.target.value)
        }} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
        border border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-12 "
          placeholder="Title..."></textarea>
          <TextArea onChange={(e) =>{
            setDescription(e.target.value)
          }

          } />
          <button onClick={async () => {
            const response =  await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
     content: description,
    
        
    },{
        headers: {
            Authorization: token
        }
    }
)
    Navigate(`/blog/${response.data.id}`)
   }} type="submit" className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Publish post
   </button>
     </div>
     </div>
     </div>
    )
}
function TextArea({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement> ) => void}) {
    return(
        <div>
           <div className="w-full mb-4 mt-7">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
           <label  className="sr-only">Publish post</label>
           <textarea onChange={onChange} id="editor" rows={8} className=" focus:outline-none block w-full px-0
            text-sm text-gray-800 bg-white border-0 pl-2 " placeholder="Write an article..." required ></textarea>
       </div>
       </div>
       
   
   
   </div>
   </div>

    )
}
