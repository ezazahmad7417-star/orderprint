import { useState } from "react"

import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({ children }) {

  const [darkMode, setDarkMode] = useState(false)

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  return (

    <div className={darkMode ? "dark" : ""}>

      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

        {/* MOBILE OVERLAY */}

        {

          sidebarOpen && (

            <div
              onClick={() =>
                setSidebarOpen(false)
              }
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            ></div>

          )

        }

        {/* SIDEBAR */}

        <div
          className={`fixed lg:static z-50 top-0 left-0 h-full transition-all duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

        `}
        >

          <Sidebar />

        </div>

        {/* MAIN CONTENT */}

        <div className="flex-1 flex flex-col min-w-0">

          {/* MOBILE HEADER */}

          <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-5 py-4 flex items-center justify-between">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="text-3xl dark:text-white"
            >
              ☰
            </button>

            <h1 className="text-2xl font-bold text-blue-600">
              OrderPrint
            </h1>

          </div>

          {/* TOPBAR */}

          <Topbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* PAGE CONTENT */}

          <div className="p-4 lg:p-10 text-gray-900 dark:text-white">

            {children}

          </div>

        </div>

      </div>

    </div>

  )
}

export default Layout