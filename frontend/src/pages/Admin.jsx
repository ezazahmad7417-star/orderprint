import { useEffect, useState } from "react"

import Layout from "../components/Layout"

import { db } from "../firebase"

import {
  collection,
  getDocs,
} from "firebase/firestore"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

function Admin() {

  const [totalOrders, setTotalOrders] =
    useState(0)

  const [totalPrinters, setTotalPrinters] =
    useState(0)

  const [totalRules, setTotalRules] =
    useState(0)

  const [totalStores, setTotalStores] =
    useState(0)

  useEffect(() => {

    const fetchAnalytics = async () => {

      const ordersSnapshot =
        await getDocs(
          collection(db, "orders")
        )

      setTotalOrders(
        ordersSnapshot.size
      )

      const printersSnapshot =
        await getDocs(
          collection(db, "printers")
        )

      setTotalPrinters(
        printersSnapshot.size
      )

      const rulesSnapshot =
        await getDocs(
          collection(db, "rules")
        )

      setTotalRules(
        rulesSnapshot.size
      )

      const storesSnapshot =
        await getDocs(
          collection(db, "stores")
        )

      setTotalStores(
        storesSnapshot.size
      )

    }

    fetchAnalytics()

  }, [])

  const analyticsData = [

    {
      name: "Orders",
      value: totalOrders,
    },

    {
      name: "Printers",
      value: totalPrinters,
    },

    {
      name: "Rules",
      value: totalRules,
    },

    {
      name: "Stores",
      value: totalStores,
    },

  ]

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
  ]

  return (

    <Layout>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl lg:text-5xl font-bold mb-3 dark:text-white">
          Admin Analytics
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Global OrderPrint system overview
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Orders
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {totalOrders}
          </h2>

        </div>

        <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Printers
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {totalPrinters}
          </h2>

        </div>

        <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Rules
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {totalRules}
          </h2>

        </div>

        <div className="bg-white dark:bg-slate-800 p-7 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Stores
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {totalStores}
          </h2>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

        {/* BAR CHART */}

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">

          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            Platform Analytics
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={analyticsData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[12, 12, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">

          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            System Distribution
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={analyticsData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {

                    analyticsData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* SYSTEM STATUS */}

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">

        <div className="mb-8">

          <h2 className="text-4xl font-bold mb-2 dark:text-white">
            System Status
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Live OrderPrint infrastructure monitoring
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="border border-gray-200 dark:border-slate-700 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

              <h3 className="text-2xl font-bold dark:text-white">
                Firestore
              </h3>

            </div>

            <p className="text-gray-500 dark:text-gray-400">
              Database running normally
            </p>

          </div>

          <div className="border border-gray-200 dark:border-slate-700 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>

              <h3 className="text-2xl font-bold dark:text-white">
                Authentication
              </h3>

            </div>

            <p className="text-gray-500 dark:text-gray-400">
              User sessions active
            </p>

          </div>

          <div className="border border-gray-200 dark:border-slate-700 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>

              <h3 className="text-2xl font-bold dark:text-white">
                Print Engine
              </h3>

            </div>

            <p className="text-gray-500 dark:text-gray-400">
              Automation engine operational
            </p>

          </div>

        </div>

      </div>

    </Layout>

  )
}

export default Admin