import { useContext } from "react"
import { AuthContext } from "../auth.context.jsx"
import {
    login,
    register,
    logout
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
            if (data?.user) {
                setUser(data.user)
                return { success: true }
            }
            return { success: false, message: "Login failed" }
        } catch (err) {
            const message = err.response?.data?.message || "Invalid email or password"
            return { success: false, message }
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
            if (data?.user) {
                setUser(data.user)
                return { success: true }
            }
            return { success: false, message: "Registration failed" }
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed"
            return { success: false, message }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true)
            await logout()
            setUser(null)
            return { success: true }
        } catch (err) {
            setUser(null)
            return { success: false, message: "Logout failed" }
        } finally {
            setLoading(false)
        }
    }

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