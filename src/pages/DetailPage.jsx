import RestaurantInfo from '../components/RestaurantInfo'
import { useGetRestaurant } from '../api/RestaurantApi'
import { AspectRatio } from '../components/ui/aspect-ratio'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MenuItem from '../components/MenuItem'
import { Card, CardFooter } from '../components/ui/card'
import OrderSummary from '../components/OrderSummary'
import CheckOutButton from '../components/CheckOutButton'
import { useCreateCheckoutSession } from '../api/OrderApi'

const DetailPage = () => {
    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetRestaurant(restaurantId)
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession()

    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
        return storedCartItems ? JSON.parse(storedCartItems) : []
    })
    
    const addToCart = (menuItem) => {
        setCartItems((prev) => {
            // check if item already exists in the cart
            const existingCartItem = prev.find((cartItem) => cartItem._id === menuItem._id)

            let updatedCartItems

            // if Item is in cart, update the quantity
            if (existingCartItem) {
                updatedCartItems = prev.map((cartItem) => cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
            } else {
                updatedCartItems = [
                    ...prev,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }// if Item is not in cart, add it to the array
            
            // Because if the user refreshes all items will be lost
            // Since I am not using a database, I'll use sessionStorage to preserve the added items
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))

            // finally, return what you want to set as the state
            // in this case it's the array updatedCartItems
            return updatedCartItems
        })
    }

    const removeFromCart = (cartItem) => {
        setCartItems((prev) => {
            const updatedCartItems = prev.filter((item) => {
                return item._id !== cartItem._id
            })

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            return updatedCartItems
        })
    }

    const onCheckOut = async (userFormData) => {
        if (!restaurant) {
            return
        }
        
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString()
            })),
            restaurantId: restaurant._id,
            deliveryDetails:{
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email
            }
        }

        const data = await createCheckoutSession(checkoutData)
        window.location.href = data.url
    }

    if (isLoading || !restaurant) {
        return "Loading..."
    }

    return (
        <div className='flex flex-col gap-10'>
            <AspectRatio ratio={16/9}>
                <img className='rounded-md object-cover h-full w-full' src={restaurant.imageUrl} />
            </AspectRatio>
            <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((item, index) => (
                        <MenuItem key={index} menuItem={item} addToCart={() => addToCart(item)} />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckOutButton disabled={cartItems.length === 0} onCheckOut={onCheckOut} isLoading={isCheckoutLoading} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
