import OrderItemCard from '../components/OrderItemCard'
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from '../api/MyRestaurantApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm'
import React from 'react'

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    
    const { orders } = useGetMyRestaurantOrders()

    const isEditing = !!restaurant

    return (
        <Tabs defaultValue="orders">
            <TabsList className="mb-5">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 p-10 bg-gray-50 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
                {orders?.map((order, index) => <OrderItemCard order={order} key={index} />)}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant : createRestaurant} isLoading={isCreateLoading || isUpdateLoading} />
            </TabsContent>
        </Tabs>
    )
}

export default ManageRestaurantPage
