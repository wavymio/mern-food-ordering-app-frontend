import React from 'react'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Trash } from 'lucide-react'

const OrderSummary = ({ restaurant, cartItems, removeFromCart }) => {
    const getTotalCost = () => {
        const totalInCents = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0)
    
        const totalWithDelivery = totalInCents + restaurant.deliveryPrice

        return (totalWithDelivery / 100).toFixed(2)
    }


    
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item, index) => (
                    <div key={index} className='flex justify-between'>
                        <span>
                            <Badge variant="outline" className="mr-2 bg-black text-white">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className='flex items-center gap-1'>
                            <Trash className='cursor-pointer' color='red' size={20} onClick={() => removeFromCart(item)} />
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary
