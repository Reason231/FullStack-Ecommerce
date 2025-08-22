import Address from "@/components/shopping-view/address"
import accImg from "../../assets/account.jpg"
import { Tabs,TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Orders from "@/components/shopping-view/orders"

function ShoppingAccount(){
    return (
        // Image section
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={accImg} className="h-full w-full object-cover object-center"/>
            </div>

            
            <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                    {/* DefaultValue means, the orders will open at the first time page load */}
                    <Tabs defaultValue="orders">
                        <TabsList>
                            {/* Button */}
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <Orders></Orders>
                        </TabsContent>
                         <TabsContent value="address">
                            <Address></Address>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

export default ShoppingAccount