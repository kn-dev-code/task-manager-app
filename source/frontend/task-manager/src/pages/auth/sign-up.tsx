import {useForm} from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
const SignUp = () => {


 const SignUpFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

  const SignUpFormData = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })


  const handleSubmit = (values: z.infer<typeof SignUpFormData>) => {
    
  }


  return (
    <div className = "h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] brightness-110 flex flex-col justify-">
      <h1 className = "text-[#EA7474] text-4xl font-bold">Create an Account</h1>
    </div>
  )
}

export default SignUp
