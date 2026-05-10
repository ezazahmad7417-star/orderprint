import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth"

import { auth } from "../firebase"

function Signup() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {

    try {

      await signOut(auth)

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

      await updateProfile(
        userCredential.user,
        {
          displayName: name,
        }
      )

      alert("Account Created Successfully")

      navigate("/dashboard")

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
          Create your account
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 border rounded-xl mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

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
          className="w-full p-4 border rounded-xl mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl"
        >
          Create Account
        </button>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?
        </p>

        <Link to="/login">

          <button className="w-full mt-3 border p-4 rounded-xl dark:border-gray-700 dark:text-white">
            Login
          </button>

        </Link>

      </div>

    </div>

  )
}

export default Signup