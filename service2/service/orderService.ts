import { Order } from '../model/Order'



export const createOrder = async () => {

    const newOrder = new Order({
        productId: '123edaedwq3e2113',
        name: 'angpaogudplies',
        price: 12314123
    });

    return newOrder.save();

}


export const showOrder = (id: string) => {
    return Order.findById(id);
}