import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AuthRoutes() {
    const { user } = useAuth()
    
  return (
    user ? <Outlet /> : <Navigate to="/" />
  )
}

export default AuthRoutes