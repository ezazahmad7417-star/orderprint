import {
  Link,
  useLocation,
} from "react-router-dom"

function Sidebar() {

  const location = useLocation()

  const menus = [

    {
      path: "/dashboard",
      icon: "📊",
      label: "Dashboard",
    },

    {
      path: "/stores",
      icon: "🏪",
      label: "Stores",
    },

    {
      path: "/printers",
      icon: "🖨️",
      label: "Printers",
    },

    {
      path: "/rules",
      icon: "⚙️",
      label: "Rules",
    },

    {
      path: "/orders",
      icon: "🛒",
      label: "Orders",
    },

    {
      path: "/logs",
      icon: "📜",
      label: "Logs",
    },

    {
      path: "/profile",
      icon: "👤",
      label: "Profile",
    },

    {
      path: "/settings",
      icon: "⚙️",
      label: "Settings",
    },

    {
      path: "/admin",
      icon: "👑",
      label: "Admin",
    },

  ]

  return (

    <div className="w-72 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 min-h-screen p-6 transition-all duration-300 overflow-y-auto">

      {/* LOGO */}

      <div className="mb-10">

        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">

          OrderPrint

        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">

          Smart Printing Automation

        </p>

      </div>

      {/* MENU */}

      <div className="space-y-3">

        {

          menus.map((menu) => {

            const active =
              location.pathname === menu.path

            return (

              <Link
                key={menu.path}
                to={menu.path}
              >

                <button
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left

                  ${
                    active

                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"

                      : "hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white hover:translate-x-1"
                  }

                `}
                >

                  <span className="text-2xl">
                    {menu.icon}
                  </span>

                  <span className="font-semibold text-lg">
                    {menu.label}
                  </span>

                </button>

              </Link>

            )

          })

        }

      </div>

      {/* FOOTER */}

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-slate-700">

        <div className="bg-blue-50 dark:bg-slate-700 rounded-3xl p-5">

          <h3 className="text-lg font-bold mb-2 dark:text-white">
            🚀 OrderPrint Pro
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">

            Smart automation system for
            labels, invoices & thermal printing.

          </p>

        </div>

      </div>

    </div>

  )
}

export default Sidebar