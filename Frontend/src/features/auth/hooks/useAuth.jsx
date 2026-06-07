import { useContext , useEffect } from "react"
import { AuthContext } from "../auth.context.jsx"

import {
    login,
    register,
    logout,
    getMe
} from "../services/auth.api.jsx"

export const useAuth = () => {

    const context = useContext(AuthContext)

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context

    const handleLogin = async ({ email, password }) => {

        try {

            setLoading(true)

            const data = await login({ email, password })

            if (!data) return

            setUser(data.user)

        } catch (err) {

            console.log(err)

        } finally {

            setLoading(false)

        }
    }

    const handleRegister = async ({ username, email, password }) => {

        try {

            setLoading(true)

            const data = await register({
                username,
                email,
                password
            })

            if (data) {
                setUser(data.user)
            }

        } catch (err) {

            console.log(err)

        } finally {

            setIsLoading(false)

        }
    }

    const handleLogout = async () => {

        try {

            setIsLoading(true)

            await logout()

            setUser(null)

        } catch (err) {

            console.log(err)

        } finally {

            setIsLoading(false)

        }
    }
   
   useEffect(() => {
    const getAndSetUser = async () => {
        try {
            setLoading(true)

            const data = await getMe()
            setUser(data?.user || null)

        } catch (err) {
            console.log(err)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    getAndSetUser()
}, [])


    return {
        user,
        setUser,
        loading,
        setLoading,
        handleLogin,
        handleRegister,
        handleLogout
    }
}

export default useAuth