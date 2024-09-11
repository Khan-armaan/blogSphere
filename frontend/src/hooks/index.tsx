import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
  publishedDate: string
  content: string,
  title : string,
  id: string,
  author: {
    name: string,
    
  }
  createdAt: string
}
export interface User{
  email: string,
  name: string,
  post: number
}
export const useBlog = ({id }: {id: string} ) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>()

  useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then((response) => {
        setBlog(response.data.post)
        setLoading(false)
      })
  }, [])

  return(
    {loading, blog}
  )
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])
    useEffect(() =>  {  // you cannot use async await syntax inside the use effect functional parameter so you ave to use .then syntax

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers:{
            Authorization: localStorage.getItem("token")
          }
        })
         .then((response) => {
            setBlogs(response.data.post) // data base have blogs as posts not blogs since blogs is te response that is coming back
            setLoading(false)
         })
    }, [])
    return(
  {  loading,
    blogs}
)
}
export const useUser = () => {  
  const [loading , setLoading] = useState(true)
  const [user, setUser ] = useState<User>()
   
  useEffect(() => {
     axios.get(`${BACKEND_URL}/api/v1/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
     }).then(( response ) => {
      setUser(response.data.user)
      setLoading(false)
     })
  }, [])
return{loading,user}
}