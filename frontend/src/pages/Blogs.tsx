import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton"
import { useBlogs } from "../hooks/index"
export const  Blogs = () => {
    const {loading, blogs} = useBlogs()
    

   


    if(loading){
        return<div >
         <Appbar />
     <div className="flex justify-center me-7">
        <div>
     <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/></div> 
      </div>
      
        </div>



    }
    return (
    <div>
        <Appbar />
    <div className="flex justify-center"> 
        <div className=''>
            {blogs.map((blog) => (

                    <BlogCard  id={blog.id}  authorName={blog.author.name || "Anonymous"}
                    title={blog.title }
                    content={blog.content}
                    />
            ))}
          
                
                
            
        </div>
        </div>
        </div>
    )
}