import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"



export const Delete = ({id}: {id : string}) => {
    
    
    const navigate = useNavigate()
    return(
        
        <div>
            <button onClick={() => {
                axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`,{ // since this request also goes through the middleware hence need the token of authorization to be send with the delete request
                    
                    headers: {
                        Authorization: localStorage.getItem("token"), // Replace 'token' with your actual token variable
                    }
                } 

                )
                navigate('/blogs')
            }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
             focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
             dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>


        </div>
    )
}