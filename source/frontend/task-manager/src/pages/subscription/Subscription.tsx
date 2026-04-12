import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


const plans = [
    {
        name: "Basic",
        planType: "free",
        price: "Free",
        features: ["5 Tasks", "Basic Features"],
    },
    {
        name: "Pro",
        planType: "pro",
        price: "$5/month",
        features: ["50 Tasks", "Priority Support"],
    },
    {
        name: "Ultra",
        planType: "premium",
        price: "$10/month",
        features: ["Unlimited Tasks", "All Features"],
    }
]

const Subscription = () => {
    const { user, upgradePlan, isUpgrading } = useAuth()

    if(!user) {
      return(
        <div className="min-h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Please log in first</h1>
        </div>
      )
    }
    
    return (
      <div className="min-h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] flex flex-col items-center justify-center gap-8 p-10">
          <h1 className="text-4xl font-bold text-white">Choose Your Plan</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = user.planType === plan.planType

            return (
                <Card key={plan.planType} className="w-80 shadow-xl">
                  <CardHeader>
                     <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-xl font-bold">{plan.price}</p>
                 </CardHeader>

                 <CardContent className="flex flex-col gap-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                         <li key={i}>• {feature}</li>
                      ))}
                 </ul>

                 <Button
                   disabled={isCurrent || isUpgrading}
                   onClick={() => 
                    upgradePlan(plan.planType as "free" | "pro" | "premium")
                  }
                   className={`mt-4 ${
                     isCurrent
                       ? "bg-gray-300 text-black"
                       : "bg-[#EA7474] text-white hover:scale-105"
                   }`}
                 >
                    {isCurrent 
                      ? "Your Plan" 
                      : isUpgrading 
                        ?  "Upgrading..." 
                        : "Select Plan"}
                   </Button>
                  </CardContent>
                 </Card>                
            )
          })}
         </div>
        </div>  
    )
}

export default Subscription