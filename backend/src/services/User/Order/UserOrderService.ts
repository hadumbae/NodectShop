import User, {ICartItem} from "../../../models/User/User.js";
import {IProductSKUImage} from "../../../models/Product/ProductSKUImage.js";

import createError from "http-errors";
import UserOrderItem, {IUserOrderItem} from "../../../models/User/Order/UserOrderItem.js";
import UserOrder, {IUserOrderAddressDetails} from "../../../models/User/Order/UserOrder.js";
import ProductSKU from "../../../models/Product/ProductSKU.js";

export default {
    async createUserOrder(userID: string, data) {
        const user = await User.findById(userID).lean();
        if (!user) throw createError(404, 'User not found.');
        if (user.cart.length <= 0) throw createError(500, 'User cart empy.');

        const orderItems = await this.createOrderItemsFromCart(user.cart);
        const {totalPrice, totalQuantity} = this.calculateTotals(orderItems);

        const order = new UserOrder({
            user: userID,
            orderNo: Math.floor(100000000 + Math.random() * 900000000),
            orderDate: new Date(),
            orderNotes: data.orderNotes,
            orderStatus: "Pending",
            items: orderItems,
            totalPrice,
            totalQuantity,
            shippingCharge: data.shippingCharge ? data.shippingCharge : 50,
            shipToBillingAddress: data.shipToBillingAddress,
            billingAddress: data.billingAddress,
            shippingAddress: data.shipToBillingAddress ? null : data.shippingAddress,
        });

        await order.save();
        return order;
    },

    async createOrderItemsFromCart(userCart: ICartItem[]) {
        const orderItems = [];

        for (const item of userCart) {
            const sku: any = await ProductSKU.findById(item.sku).populate('product');
            const skuImage: IProductSKUImage = sku.primaryImage();

            const data: IUserOrderItem = {
                title: sku.product.title,
                description: sku.product.description,
                unitPrice: sku.unitPrice,
                quantity: item.quantity,
                image: skuImage ? skuImage.secure_url : null,
                skuNo: sku.code,
                sku: sku._id
            }

            const orderItem = new UserOrderItem(data);
            await orderItem.save();

            orderItems.push(orderItem);
        }

        return orderItems;
    },

    calculateTotals(orderItems: IUserOrderItem[]) {
        let totalPrice = 0;
        let totalQuantity = 0;

        for (const item of orderItems) {
            totalPrice += item.quantity * item.unitPrice;
            totalQuantity += item.quantity;
        }

        return {totalPrice: totalPrice, totalQuantity: totalQuantity};
    }
};