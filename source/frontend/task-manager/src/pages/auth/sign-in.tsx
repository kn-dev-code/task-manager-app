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

const SignIn = () => {
  const { login, isLoggingIn } = useAuth()
  const navigate = useNavigate()

  const SignInFormSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

  const SignInFormData = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async(values: z.infer<typeof SignInFormSchema>) => {
     if (isLoggingIn) return;
    try {
      await login(values)
      toast.success("Account created successfully! Redirecting...")
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
      <h1 className="pb-6 text-4xl font-bold text-[#EA7474] pl-18">
      Welcome back!
      </h1>
      <Form {...SignInFormData}>
        <form
          onSubmit={SignInFormData.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-6 px-8"
        >
          <FormField
            control={SignInFormData.control}
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
            control={SignInFormData.control}
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
            disabled={isLoggingIn}
            type="submit"
            className="ml-9 h-10 w-70 cursor-pointer rounded-2xl bg-linear-to-r from-[#4d4d4d] to-[#000000] px-12 py-4 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            {isLoggingIn && <Spinner />} Log In
          </Button>
        </form>
      </Form>
      <div className="fixed bottom-0 ml-162 flex flex-col items-end justify-center">
        <img className="h-screen max-w-2xl" src={taskImg} />
      </div>
    </div>
  )
}

export default SignIn

