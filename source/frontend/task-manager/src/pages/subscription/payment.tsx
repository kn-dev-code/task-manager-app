"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, Wallet, Loader2, Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/hooks/use-auth"
import Dashboard from "@/components/dashboard"
import { useParams } from "react-router-dom"
import { subscriptionCards } from "./subscription"
import { useNavigate } from "react-router-dom"

const paymentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Must be 16 digits"),
  month: z.string().min(1, "Required"),
  year: z.string().min(2, "Required"),
  cvc: z.string().min(3, "Required").max(4),
})

type PaymentValues = z.infer<typeof paymentSchema>

const PaymentPage = () => {
  const navigate = useNavigate()
  const { accessKey } = useParams<{ accessKey: string }>()
  const selectedPlan = accessKey ? (subscriptionCards as any)[accessKey] : null
  const [isProcessing, setIsProcessing] = React.useState(false)
  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { name: "", cardNumber: "", month: "", year: "", cvc: "" },
  })

  const { user, isUpgradingPlan } = useAuth()
  const onSubmit = async (data: PaymentValues) => {
    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await isUpgradingPlan(selectedPlan.accessKey)
      toast.success(`Successfully upgraded to ${selectedPlan?.name}!`)
      navigate("/")
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!user) {
    return <Dashboard />
  }

  if (!selectedPlan) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6 text-center">
          <p>Invalid plan selected.</p>
          <Button onClick={() => navigate("/subscription")}>Go Back</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] p-4 brightness-110">
      <Card className="w-full max-w-lg border-none shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lock className="h-5 w-5 text-green-600" /> Secure Checkout
          </CardTitle>
          <CardDescription>Enter your payment details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Selected Plan
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {selectedPlan?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-500">Total Due</p>
                <p className="text-lg font-bold text-blue-600">
                  {selectedPlan?.price}
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup
                defaultValue="card"
                className="grid grid-cols-2 gap-4"
              >
                <Label className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted p-4 transition-all peer-data-[state=checked]:border-primary hover:bg-slate-50">
                  <RadioGroupItem value="card" className="sr-only" />
                  <CreditCard className="mb-2 h-6 w-6" />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Card
                  </span>
                </Label>
                <Label className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted p-4 transition-all peer-data-[state=checked]:border-primary hover:bg-slate-50">
                  <RadioGroupItem value="paypal" className="sr-only" />
                  <Wallet className="mb-2 h-6 w-6" />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    PayPal
                  </span>
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input
                  {...form.register("name")}
                  id="name"
                  placeholder="John Doe"
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card Number</Label>
                <Input
                  {...form.register("cardNumber")}
                  id="number"
                  placeholder="0000 0000 0000 0000"
                  maxLength={16}
                />
                {form.formState.errors.cardNumber && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 grid gap-2">
                  <Label>Expiration</Label>
                  <div className="flex gap-2">
                    <Input
                      {...form.register("month")}
                      placeholder="MM"
                      maxLength={2}
                    />
                    <Input
                      {...form.register("year")}
                      placeholder="YY"
                      maxLength={2}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>CVC</Label>
                  <Input
                    {...form.register("cvc")}
                    placeholder="CVC"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
            <Button
              disabled={isProcessing}
              type="submit"
              className="h-12 w-full bg-blue-600 text-lg font-semibold transition-colors hover:bg-blue-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Complete Purchase"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t py-4">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" /> Encrypted with 256-bit SSL
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PaymentPage
