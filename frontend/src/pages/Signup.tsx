import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return(
        <div className="grid grid-cols-1  sm:grid-cols-12">


       <div className="col-span-7 hidden sm:block">
            <Quote/>  
            </div>

       <div className=" col-span-5">
            <Auth type="signup"/>
         
            </div>

         
        </div>
    )
}  