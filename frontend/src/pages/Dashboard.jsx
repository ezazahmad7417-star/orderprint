import { useEffect, useState } from "react"

import Layout from "../components/Layout"

import { db, auth } from "../firebase"

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { motion } from "framer-motion"

function Dashboard() {

  const [storesCount, setStoresCount] = useState(0)
  const [printersCount, setPrintersCount] = useState(0)
  const [rulesCount, setRulesCount] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)

  useEffect(() => {

    const storesQuery = query(
      collection(db, "stores"),
      where("userId", "==", auth.currentUser.uid)
    )

    const unsubscribeStores = onSnapshot(
      storesQuery,
      (snapshot) => {

        setStoresCount(snapshot.size)

      }
    )

    const printersQuery = query(
      collection(db, "printers"),
      where("userId", "==", auth.currentUser.uid)
    )

    const unsubscribePrinters = onSnapshot(
      printersQuery,
      (snapshot) => {

        setPrintersCount(snapshot.size)

      }
    )

    const rulesQuery = query(
      collection(db, "rules"),
      where("userId", "==", auth.currentUser.uid)
    )

    const unsubscribeRules = onSnapshot(
      rulesQuery,
      (snapshot) => {

        setRulesCount(snapshot.size)

      }
    )

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", auth.currentUser.uid)
    )

    const unsubscribeOrders = onSnapshot(
      ordersQuery,
      (snapshot) => {

        setOrdersCount(snapshot.size)

      }
    )

    return () => {

      unsubscribeStores()
      unsubscribePrinters()
      unsubscribeRules()
      unsubscribeOrders()

    }

  }, [])

  const analyticsData = [

    {
      name: "Stores",
      value: storesCount,
    },

    {
      name: "Printers",
      value: printersCount,
    },

    {
      name: "Rules",
      value: rulesCount,
    },

    {
      name: "Orders",
      value: ordersCount,
    },

  ]

  const pieData = [

    {
      name: "Orders",
      value: ordersCount,
    },

    {
      name: "Printers",
      value: printersCount,
    },

    {
      name: "Stores",
      value: storesCount,
    },

  ]

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
  ]

  return (

    <Layout>

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >

        <h1 className="text-4xl lg:text-5xl font-bold mb-3 dark:text-white">
          Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Welcome back to OrderPrint
        </p>

      </motion.div>

      {/* STATS */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10"
      >

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm"
        >

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Stores
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {storesCount}
          </h2>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm"
        >

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Printers
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {printersCount}
          </h2>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm"
        >

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Active Rules
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {rulesCount}
          </h2>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm"
        >

          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Total Orders
          </p>

          <h2 className="text-5xl font-bold dark:text-white">
            {ordersCount}
          </h2>

        </motion.div>

      </motion.div>

      {/* CHARTS */}

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10"
      >

        {/* BAR CHART */}

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm">

          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            System Analytics
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
            Print Distribution
          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {

                    pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))

                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </motion.div>

      {/* LIVE STATUS */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm"
      >

        <div className="mb-8">

          <h2 className="text-4xl font-bold mb-2 dark:text-white">
            Live System Status
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Real-time OrderPrint monitoring
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
              Real-time database connected
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
              Firebase user session active
            </p>

          </div>

          <div className="border border-gray-200 dark:border-slate-700 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>

              <h3 className="text-2xl font-bold dark:text-white">
                Printing Engine
              </h3>

            </div>

            <p className="text-gray-500 dark:text-gray-400">
              Ready for automation rules
            </p>

          </div>

        </div>

      </motion.div>

    </Layout>
  )
}

export default Dashboard