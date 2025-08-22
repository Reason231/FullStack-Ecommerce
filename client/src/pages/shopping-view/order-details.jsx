import { useState } from "react";
import { DialogContent } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const initialFormData = {
  status: "",
};

function ShoppingOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    event.preventDefault();
  }

    function getStatusBadgeClass(status) {
    if(status == "confirmed") {
       return "bg-green-500"
    }
    else if(status== "rejected"){
      return "bg-red-500"
    }
    else if(status == "inProcess"){
      return "bg-yellow-500"
    }
    else if(status == "inShipping"){
      return "bg-blue-500"
    }
    else if(status == "delivered"){
      return "bg-teal-500"
    }
  }

  const { user } = useSelector((state) => state.auth);
  console.log(orderDetails)

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              {" "}
              <Badge
                className={`py-1 px-3 ${
                getStatusBadgeClass(orderDetails?.orderStatus)
                } `}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.payMethod}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
        </div>

        {/* Order Details */}
        <Separator></Separator>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li className="grid grid-cols-3" key={item.key}>
                      <span>
                        <span className="font-bold">{index + 1}.</span> Title:{" "}
                        {item?.title}
                      </span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>Price: {item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <Separator></Separator>

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold">Shipping Info</div>
            <div className="grid gap-4 text-muted-foreground grid-cols-2">
              <p>
                <span className="font-bold">UserName: </span> {user.userName}
              </p>
              <p>
                <span className="font-bold">Address: </span>{" "}
                {orderDetails?.addressInfo?.address}
              </p>
              <p>
                <span className="font-bold">City: </span>{" "}
                {orderDetails?.addressInfo?.city}
              </p>
              <p>
                <span className="font-bold">Pincode: </span>{" "}
                {orderDetails?.addressInfo?.pincode}
              </p>
              <p>
                <span className="font-bold">Phone: </span>{" "}
                {orderDetails?.addressInfo?.phone}
              </p>
              <p>
                <span className="font-bold">Notes: </span>{" "}
                {orderDetails?.addressInfo?.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
