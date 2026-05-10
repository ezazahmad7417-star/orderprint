import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

function ProtectedRoute({

  children,

  adminOnly = false,

}) {

  const { user } = useAuth()

  // NOT LOGGED IN

  if (!user) {

    return <Navigate to="/login" />

  }

  // ADMIN CHECK

  const adminEmail =
    "admin@orderprint.com"

  if (
    adminOnly &&
    user.email !== adminEmail
  ) {

    return (
      <Navigate to="/dashboard" />
    )

  }

  return children

}

export default ProtectedRoute