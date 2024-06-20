import { Form } from '../../components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DetailsSection from './DetailsSection'
import CuisinesSection from './CuisinesSection'
import { Separator } from '../../components/ui/separator'
import MenuSection from './MenuSection'
import ImageSection from './ImageSection'
import LoadingButton from '../../components/LoadingButton'
import { Button } from '../../components/ui/button'

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }), 
    city: z.string({
        required_error: "City is required"
    }), 
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number"
    }), 
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Must be a valid number"
    }), 
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "Price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or Image file must be provided",
    path: ["imageFile"]
})

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    })

    useEffect(() => {
        if (!restaurant) {
            return
        }

        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2))

        const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
            ...menuItem,
            price: parseInt((menuItem.price / 100).toFixed(2))

        }))

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        }

        form.reset(updatedRestaurant)
    }, [form, restaurant])

    const onSubmit = (formDataJson) => {
        // convert form data from json to a new form data object
        const formData = new FormData()
        
        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)

        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())
    
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })
        formDataJson.menuItems.forEach((menuItem, index) =>{
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`,(menuItem.price * 100).toString())
        })

        if (formDataJson.imageFile) {
            formData.append("imageFile", formDataJson.imageFile)
        } 
        
        onSave(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm
