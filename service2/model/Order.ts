import mongoose from 'mongoose'
import { ADDRGETNETWORKPARAMS } from 'dns';

interface OrderAttrs {
    productId: string
    name: string
    price: number
}

interface OrderDoc extends mongoose.Document {
    productId: string
    name: string
    price: number
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
}

const OrderSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number
})

const Order = mongoose.model<OrderDoc, OrderModel>('orders', OrderSchema);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs)
}

export { Order };


