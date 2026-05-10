import { useState } from "react"

import { useNavigate, Link } from "react-router-dom"

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"

import { auth } from "../firebase"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert("Login Successful")

      navigate("/dashboard")

    } catch (error) {

      alert("Invalid Email or Password")

    }

  }

  const handleForgotPassword = async () => {

    if (!email) {

      alert("Please enter your email first")

      return
    }

    try {

      await sendPasswordResetEmail(auth, email)

      alert("Password reset email sent successfully")

    } catch (error) {

      alert(error.message)

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center dark:bg-gray-950">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-2 text-black dark:text-white">
          OrderPrint
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border rounded-xl mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border rounded-xl mb-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        {/* FORGOT PASSWORD */}

        <div className="flex justify-end mb-6">

          <button
            onClick={handleForgotPassword}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Forgot Password?
          </button>

        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-500">
          Don’t have an account?
        </p>

        <Link to="/">

          <button className="w-full mt-3 border p-4 rounded-xl dark:border-gray-700 dark:text-white">
            Create Account
          </button>

        </Link>

      </div>

    </div>

  )
}

export default Login