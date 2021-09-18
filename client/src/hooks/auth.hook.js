import { useCallback, useEffect, useState } from "react"

const userData = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(userData, JSON.stringify({token, userId}))
    }, [token, userId])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(userData)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userData))

        if(data && data.token){
            login(data.token, data.id)
        }
    }, [login])

    return {login, logout, token, userId}
}