import { useEffect, useState } from "react"

import Layout from "../components/Layout"

function Settings() {

  const [autoPrint, setAutoPrint] = useState(
    localStorage.getItem("autoPrint") === "true"
  )

  const [emailNotifications, setEmailNotifications] = useState(
    localStorage.getItem("emailNotifications") === "true"
  )

  const [soundAlerts, setSoundAlerts] = useState(
    localStorage.getItem("soundAlerts") === "true"
  )

  const [defaultPrinter, setDefaultPrinter] = useState(
    localStorage.getItem("defaultPrinter") || "Thermal Printer"
  )

  useEffect(() => {

    localStorage.setItem(
      "autoPrint",
      autoPrint
    )

  }, [autoPrint])

  useEffect(() => {

    localStorage.setItem(
      "emailNotifications",
      emailNotifications
    )

  }, [emailNotifications])

  useEffect(() => {

    localStorage.setItem(
      "soundAlerts",
      soundAlerts
    )

  }, [soundAlerts])

  useEffect(() => {

    localStorage.setItem(
      "defaultPrinter",
      defaultPrinter
    )

  }, [defaultPrinter])

  return (

    <Layout>

      <div className="max-w-5xl">

        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3 dark:text-white">
            Settings
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Configure your OrderPrint preferences
          </p>

        </div>

        <div className="space-y-6">

          {/* AUTO PRINT */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold dark:text-white mb-2">
                Auto Print Orders
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                Automatically print incoming orders
              </p>

            </div>

            <button
              onClick={() =>
                setAutoPrint(!autoPrint)
              }
              className={`w-20 h-10 rounded-full transition-all relative

              ${
                autoPrint
                  ? "bg-green-500"
                  : "bg-gray-300"
              }

            `}
            >

              <div
                className={`w-8 h-8 bg-white rounded-full absolute top-1 transition-all

                ${
                  autoPrint
                    ? "right-1"
                    : "left-1"
                }

              `}
              ></div>

            </button>

          </div>

          {/* EMAIL NOTIFICATIONS */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold dark:text-white mb-2">
                Email Notifications
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                Receive alerts on your email
              </p>

            </div>

            <button
              onClick={() =>
                setEmailNotifications(
                  !emailNotifications
                )
              }
              className={`w-20 h-10 rounded-full transition-all relative

              ${
                emailNotifications
                  ? "bg-green-500"
                  : "bg-gray-300"
              }

            `}
            >

              <div
                className={`w-8 h-8 bg-white rounded-full absolute top-1 transition-all

                ${
                  emailNotifications
                    ? "right-1"
                    : "left-1"
                }

              `}
              ></div>

            </button>

          </div>

          {/* SOUND ALERTS */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold dark:text-white mb-2">
                Sound Alerts
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                Play sound on new order activity
              </p>

            </div>

            <button
              onClick={() =>
                setSoundAlerts(!soundAlerts)
              }
              className={`w-20 h-10 rounded-full transition-all relative

              ${
                soundAlerts
                  ? "bg-green-500"
                  : "bg-gray-300"
              }

            `}
            >

              <div
                className={`w-8 h-8 bg-white rounded-full absolute top-1 transition-all

                ${
                  soundAlerts
                    ? "right-1"
                    : "left-1"
                }

              `}
              ></div>

            </button>

          </div>

          {/* DEFAULT PRINTER */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700">

            <h2 className="text-2xl font-bold dark:text-white mb-5">
              Default Printer
            </h2>

            <select
              value={defaultPrinter}
              onChange={(e) =>
                setDefaultPrinter(
                  e.target.value
                )
              }
              className="w-full p-5 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none"
            >

              <option>
                Thermal Printer
              </option>

              <option>
                A4 Printer
              </option>

            </select>

          </div>

          {/* BACKUP & EXPORT */}

<div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700">

  <h2 className="text-2xl font-bold dark:text-white mb-3">
    Backup & Export
  </h2>

  <p className="text-gray-500 dark:text-gray-400 mb-8">
    Download your OrderPrint settings backup
  </p>

  <button
    onClick={() => {

      const backupData = {

        autoPrint,

        emailNotifications,

        soundAlerts,

        defaultPrinter,

        exportedAt:
          new Date().toISOString(),

      }

      const dataStr =
        JSON.stringify(
          backupData,
          null,
          2
        )

      const blob = new Blob(
        [dataStr],
        {
          type: "application/json",
        }
      )

      const url =
        URL.createObjectURL(blob)

      const link =
        document.createElement("a")

      link.href = url

      link.download =
        "orderprint-backup.json"

      link.click()

    }}
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl text-lg"
  >
    Download Backup
  </button>

</div>
          {/* SAVE BUTTON */}

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl text-lg"
            onClick={() =>
              alert("Settings Saved Successfully")
            }
          >
            Save Settings
          </button>

        </div>

      </div>

    </Layout>

  )
}

export default Settings