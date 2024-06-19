import { useState } from 'react'
import './App.css'
import { set, useForm } from "react-hook-form";
import axios from "axios";

import toast, {Toaster} from 'react-hot-toast';
import Loading from './component/loader/Loading';
import { FaEye } from "react-icons/fa";


function App() {

  const [loading, setLoading] = useState(false)
  const [regError, setRegError] = useState("")
const [show, setShow] = useState(false)

  const {register, handleSubmit, watch, formState: {errors}, reset, } = useForm();

  const onSubmit= async (formData)=>{
   try {
    setLoading(true)
     console.log(formData);
     const res = await axios.post("https://form-handling.onrender.com/api/v1/auth/register", formData)
     console.log(res);
     setLoading(false)
    reset()
   } catch (error) {
    setLoading(false)
    console.log(error); 
    setRegError(error.response.data.message)
    
   }

  }


  const password = watch("password", "");
  // const [count, setCount] = useState(0)
  const toggleShow = show ? "text" : "password"
  const toggleeye = ()=> {setShow(!show)}

  return (
    <>
      <section>
        {/* <Loading /> */}
        <div className=" ">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col"></div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl mt-10"
            >
              {regError && (
                <p className="text-red-500 font-normal">{regError}</p>
              )}

              <div>
                <h2 className="lg:text-4xl text-lg text-bold text-black">
                  Reset password
                </h2>
              </div>

              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    {...register("firstname", {
                      required: "Firstname is required",
                    })}
                    type="text"
                    placeholder="first Name"
                    className={`block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.firstname ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />

                  {errors.firstname && (
                    <p className="text-red-500 text-center">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    {...register("lastname", {
                      required: "Lastname is required",
                    })}
                    type="text"
                    placeholder="Last Name"
                    className={`block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.lastname ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />

                  {errors.lastname && (
                    <p className="text-red-500 text-center">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    id="Email"
                    type="Email"
                    placeholder="Email"
                    className={`block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />

                  {errors.firstname && (
                    <p className=" text-red-500 text-start text-[10px] w-11/12 mx-5 mt-1 h-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full relative">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
                      },
                    })}
                    id="password"
                    type={`${toggleShow}`}
                    placeholder="******"
                    className={`block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />
                  <FaEye onClick={toggleeye} className='absolute right-6 top-12'/>

                  {errors.firstname && (
                    <p className=" text-red-500 text-start text-[10px] w-11/12 mx-5 mt-1 h-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-3 text-sm font-medium text-gray-600 text-left pl-5"
                  >
                    Confirm password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: " Confirm your password",

                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    className={`block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-start text-[10px] w-11/12 mx-5 mt-1 h-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:bg-red-500 hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    {loading ? <Loading /> : "Submit your request"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default App
