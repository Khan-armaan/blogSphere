import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL, } from "../config"

export interface Blog {
  publishedDate: string
  content: string,
  title : string,
  id: string,
  author: {
    name: string,
    id: string
    
  }
  createdAt: string
}
export interface User{
  id: string,
  email: string,
  name: string,
  posts: Array<string>[]
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
export const useUserPost = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/user/userposts`, {
      headers: {
        Authorization : localStorage.getItem("token")
      }
    }).then(respone => {
      setUser(respone.data)
      setLoading(false)
    })
  },[])
 
  return{ loading, user }
}



interface Post {
  id: string;
  title: string;
}

interface UserPosts {
  posts: Post[]; // `posts` is an array inside this object
}

interface FetchResult {
  data: UserPosts | null; // Now `data` is a single object, not an array
  loading: boolean;
  error: string | null;
}

export const useFetchUserPosts = (token: string | null): FetchResult => {
  const [data, setData] = useState<UserPosts | null>(null); // Single object, not an array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserPosts>(`${BACKEND_URL}/api/v1/user/userposts`, {
          headers: {
            Authorization: `${token}`, // Ensure Bearer token is used
          },
        });
        setData(response.data); // Store the single `UserPosts` object
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return { data, loading, error };
};
