import {IUserOrderAddressDetails} from "../../models/User/Order/UserOrder.js";
import User from "../../models/User/User.js";
import UserOrderService from "./Order/UserOrderService.js";
import UserCartService from "./UserCartService.js";


export interface CheckoutData {
    orderNotes: string;
    shipToBillingAddress: boolean;
    billingAddress: IUserOrderAddressDetails;
    shippingAddress?: IUserOrderAddressDetails;
}

export default {
    async checkout(userID: string, data: CheckoutData) {
        // TODO : Stripe, Paypal after frontend
        const order = await UserOrderService.createUserOrder(userID, data);
        await UserCartService.clearUserCart(userID);

        return order;
    }
};