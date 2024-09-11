import { SigninInput } from '@armaankhan0/common'
import { SignupInput } from '@armaankhan0/common'
import axios from 'axios'
import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import { Signup } from '../pages/Signup'
// trpc on tyoe a
export const Auth = ({type}: {type: "signup" | "signin"}) => {
 const [postInputs, setPostInputs] = useState<SignupInput>({ //signininput is just a subset if singup
    email: "",
    password: "",
    name: ""
 })
 const Navigate = useNavigate()
async function sendRequst(){

    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup":"signin"}`, postInputs)
        const jwt = response.data; // we ave to use response .data in axios request
        localStorage.setItem("token", jwt)
       Navigate("/blogs")

    }catch(e){
        //alert the user 
        alert("Error while Signing up")
    }

 }
    return(
        <div className="h-screen flex justify-center flex-col border shadow-2xl ">
            {/*JSON.stringify(postInputs)*/}
            <div className="flex justify-center  ">
                <div className='px-10 '>
                    <div className="text-3xl font-bold">
                        {type == "signin" ? " Sign In" : "Create an Account"}
                    </div>
                    <div className="text-slate-400 pb-4 pt-2">
                    {type == 'signin' ? "Don't have an account?" : "Already have an account?"}
                    <Link to = {type == "signin" ? "/signup": "/signin"} className='underline'>{type == "signin" ? "  create" : "  login"} </Link>
                </div>
            { type == "signup"  ?   <LabelledInput label='Name' placeholder='Name' onChange={(e) => {
                   setPostInputs({
                    ...postInputs, // retain existing username and password 
                    name: e.target.value
                   } )     
                }}/> : null }
                  <LabelledInput label='Email' placeholder='Email' onChange={(e) => {
                   setPostInputs({
                    ...postInputs, // retain existing username and password 
                    email: e.target.value
                   } )     
                }}/>
                      <LabelledInput label='Password' type={'password'} placeholder='*********' onChange={(e) => {
                   setPostInputs({
                    ...postInputs, // retain existing username and password 
                    password: e.target.value
                   } )     
                }}/>
            <button onClick={sendRequst} type="button" className =" w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
            dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Sign up" : "Sign in"}</button>

            </div>
            
        </div>
    </div>
    )
} 
interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void,
    type? : string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
    return(
        <div>
            <label  className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}