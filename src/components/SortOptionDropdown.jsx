import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'

const sort_options = [
    {
        label: "Best match",
        value: "bestMatch"
    },
    {
        label: "Delivery Price",
        value: "deliveryPrice"
    },
    {
        label: "Estimated Delivery Time",
        value: "estimatedDeliveryTime"
    },
]

const SortOptionDropdown = ({ onChange, sortOption }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer'>
                <Button variant="outline" className="w-full">
                    {sort_options.map((option) => {
                        return option.value === sortOption ? `Sort By: ${option.label}` : null
                    })}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {sort_options.map((option) => (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortOptionDropdown
