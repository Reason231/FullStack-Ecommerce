import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate,} from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email:"",
  password:""
}

function AuthLogin() {
  
  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
    

    function onSubmit(){
      event.preventDefault()
      dispatch(loginUser(formData)).then((data) => {
        if(data?.payload?.success) {
          // we have written the navigation to the check-auth.jsx file.
          console.log(data)
        toast(data.payload.message);

      }
      else{
       toast.error(data.payload.message) 
        }
      })

    }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an acccount
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">Sign Up</Link>
        </p>
      </div>

      {/* src => components => common => form.jsx where we created the form Inputs*/}
      <CommonForm formControls={loginFormControls} buttonText={"Sign In"} formData={formData} setFormData={setFormData} onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
