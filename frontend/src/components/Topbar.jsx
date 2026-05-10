import { useEffect, useState } from "react"

import {
  useNavigate,
  useLocation,
} from "react-router-dom"

import { signOut } from "firebase/auth"

import { auth } from "../firebase"

function Topbar() {

  const navigate = useNavigate()

  const location = useLocation()

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [showNotifications, setShowNotifications] =
    useState(false)

  const [user, setUser] = useState(null)

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || ""
  )

  useEffect(() => {

    setUser(auth.currentUser)

  }, [])

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark")

      localStorage.setItem("theme", "dark")

    } else {

      document.documentElement.classList.remove("dark")

      localStorage.setItem("theme", "light")

    }

  }, [darkMode])

  const handleLogout = async () => {

    await signOut(auth)

    navigate("/login")

  }

  // PAGE TITLE

  const getPageTitle = () => {

    switch (location.pathname) {

      case "/dashboard":
        return "Dashboard"

      case "/stores":
        return "Stores"

      case "/printers":
        return "Printers"

      case "/rules":
        return "Rules"

      case "/orders":
        return "Orders"

      case "/logs":
        return "Logs"

      case "/profile":
        return "Profile"

      case "/settings":
        return "Settings"

      case "/admin":
        return "Admin Analytics"

      default:
        return "OrderPrint"

    }

  }

  return (

    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-10 py-6 flex items-center justify-between relative">

      {/* LEFT */}

      <div>

        <h1 className="text-4xl font-bold dark:text-white">
          {getPageTitle()}
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Welcome back to OrderPrint
        </p>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* DARK MODE */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-100 dark:bg-slate-700 dark:text-white px-5 py-3 rounded-2xl"
        >

          {darkMode ? "🌙 Dark" : "☀️ Light"}

        </button>

        {/* NOTIFICATIONS */}

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="bg-gray-100 dark:bg-slate-700 dark:text-white px-5 py-3 rounded-2xl relative"
          >

            🔔

            <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              8
            </span>

          </button>

          {

            showNotifications && (

              <div className="absolute right-0 top-16 w-[350px] bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 p-5 z-50">

                <h2 className="text-2xl font-bold mb-5 dark:text-white">
                  Notifications
                </h2>

                <div className="space-y-4">

                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-2xl">

                    <p className="font-semibold dark:text-white">
                      New Amazon order received
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Shipping label printed successfully
                    </p>

                  </div>

                </div>

              </div>

            )

          }

        </div>

        {/* PROFILE */}

        <div className="flex items-center gap-4 bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-2xl">

          {

            avatar ? (

              <img
                src={avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />

            ) : (

              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">

                {user?.email?.charAt(0).toUpperCase()}

              </div>

            )

          }

          <div>

            <h3 className="font-semibold dark:text-white">
              {user?.displayName || "User"}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  )
}

export default Topbar