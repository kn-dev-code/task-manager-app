import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import Dashboard from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const Subscription = () => {
  const { user } = useAuth()
  const [isSubscribing, setIsSubscribing] = useState(false)

  const subscriptionCards = {
    free: {
      name: "Free Plan",
      price: "$0/month",
      taskAmount: "Up to 10 tasks",
      gradient: "bg-[linear-gradient(to_right,#303030_0%,#FF6A8B_100%)]",
      buttonTitle: "Get Started",
      accessKey: "free",
    },
    pro: {
      name: "Pro Plan",
      price: "$5/month",
      taskAmount: "Up to 50 tasks",
      gradient: "bg-[linear-gradient(to_right,#3F3F3F_0%,#4DFEE3_100%)]",
      buttonTitle: "Upgrade to Pro",
      accessKey: "pro",
    },
    premium: {
      name: "Premium Plan",
      price: "$10/month",
      taskAmount: "Unlimited tasks",
      gradient: "bg-[linear-gradient(to_right,#3F3F3F_0%,#FFE100_100%)]",
      buttonTitle: "Upgrade to Premium",
      accessKey: "premium",
    },
  }

  const handleSubscription = async () => {
    setIsSubscribing(true)
    setIsSubscribing(false)
  }

  if (!user) {
    return <Dashboard />
  }

  return (
    <div className="flex h-screen flex-row items-center justify-center gap-10 bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] pb-30 brightness-110">
      {Object.entries(subscriptionCards).map(([key, plan]) => {
        const isCurrentPlan = user.planType === plan.accessKey;

        const handleButtonClick = (e: React.MouseEvent) => {
          if (isCurrentPlan) {
            e.preventDefault();
            toast.error("You are already on this plan");
            return;
          }
        };

        return (
          <div className="" key={key}>
            <Card
              className={`h-100 w-90 ${plan.gradient} flex flex-col items-center justify-center rounded-[15px] duration-300 ease-in-out hover:scale-105 hover:cursor-pointer`}
              style={{
                borderImageSource: "linear-gradient(to bottom, #A1A1A1 0%, #818181 43%, #3B3B3B 100%)",
                borderImageSlice: 3,
              }}
            >
              <span className="text-2xl font-bold text-white">{plan.name}</span>
              <span className="text-2xl font-bold text-white">{plan.price}</span>
              <span className="text-xl font-medium text-white/90 mb-4">
                {plan.taskAmount}
              </span>

              <Link to="/subscription-plan" onClick={handleButtonClick}>
                <Button
                  disabled={isCurrentPlan || isSubscribing}
                  onClick={handleSubscription}
                  className={`p-5 duration-300 ease-in-out hover:scale-105 transition-all ${
                    isCurrentPlan 
                      ? "opacity-50 cursor-not-allowed bg-gray-500" 
                      : "hover:bg-[linear-gradient(to_bottom,#A1A1A1_0%,#818181_43%,#3B3B3B_100%)] hover:text-white hover:cursor-pointer"
                  }`}
                >
                  {isCurrentPlan ? "Current Plan" : plan.buttonTitle}
                </Button>
              </Link>
            </Card>
          </div>
        );
      })}
    </div>
  )
}

export default Subscription