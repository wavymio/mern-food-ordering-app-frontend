import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import LoadingButton from './LoadingButton'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import UserProfileForm from '../forms/user-profile-form/UserProfileForm'
import { useGetMyUser } from '../api/MyUserApi'

const CheckOutButton = ({ onCheckOut, disabled, isLoading }) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if (!isAuthenticated) {
        return <Button onClick={onLogin} className="bg-orange-500 flex-1">Login to check out</Button>
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">
                    Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm currentUser={currentUser} onSave={onCheckOut} isLoading={isGetUserLoading} title='Confirm Delivery Details' buttonText='Continue to payment' />
            </DialogContent>
        </Dialog>
    )
}

export default CheckOutButton
