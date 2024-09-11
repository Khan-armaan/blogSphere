import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { Blog } from "../pages/Blog"
import { useUser } from "../hooks"

export const Appbar = () => {
    const {user} = useUser()
    return(
        <div className="border-b flex justify-between px-10 py-4">
           
            
            <Link className="flex flex-col justify-center cursor-pointer" to={'/blogs'}>
            BlogSphere
                </Link>
          
          
            <div className="flex space-x-5 ">
                <div className="">
                    <Link to={"/publish"}> 
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800
             focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2
           ">New</button></Link></div>

              <div className="cursor-pointer" >
             
            <Link to={"/info"}>   <Avatar  size={"big"} name={`${user?.name}`} /> </Link> 
                </div>
            </div>
    
        </div>
    )
}