import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import taskImg from "../../assets/tasksheet-img.png"
import { useNavigate } from "react-router-dom"
import { toast} from "sonner"

const SignUp = () => {
  const { register, isSigningUp } = useAuth()
  const navigate = useNavigate()

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
    },
  })

  const handleSubmit = async(values: z.infer<typeof SignUpFormSchema>) => {
     if (isSigningUp) return;
    try {
      await register(values)
      setTimeout(() => {
        navigate("/")
      }, 2000);
    } catch (e) {
        console.error("Sign up error:", e);
        toast.error("Failed to create account. Please try again.");
      }
    }

  return (
    <div className="flex h-screen flex-col justify-start bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] pt-30 pl-30 brightness-110">
      <h1 className="pb-6 pl-7 text-4xl font-bold text-[#EA7474]">
        Create an Account
      </h1>
      <Form {...SignUpFormData}>
        <form
          onSubmit={SignUpFormData.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-6 px-8"
        >
          <FormField
            control={SignUpFormData.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold text-white">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-md h-10 w-[90%] cursor-pointer bg-[#D9D9D9]! font-bold text-black placeholder:font-bold placeholder:text-[#A8A8A8] focus:text-black"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={SignUpFormData.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-md h-10 w-[90%] cursor-pointer bg-[#D9D9D9]! font-bold text-black placeholder:font-bold placeholder:text-[#A8A8A8] focus:text-black"
                    placeholder="test@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={SignUpFormData.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-md h-10 w-[90%] cursor-pointer bg-[#D9D9D9]! font-bold text-black placeholder:font-bold placeholder:text-[#A8A8A8] focus:text-black"
                    placeholder="test123456"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isSigningUp}
            type="submit"
            className="ml-9 h-10 w-70 cursor-pointer rounded-2xl bg-linear-to-r from-[#4d4d4d] to-[#000000] px-12 py-4 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            {isSigningUp && <Spinner />} Sign Up
          </Button>
        </form>
      </Form>
      <div className="fixed bottom-0 ml-162 flex flex-col items-end justify-center">
        <img className="h-screen max-w-2xl" src={taskImg} />
      </div>
    </div>
  )
}

export default SignUp
