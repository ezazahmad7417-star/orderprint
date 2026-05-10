import { useState, useEffect } from "react"

import Layout from "../components/Layout"

import { db, auth } from "../firebase"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore"

import { motion } from "framer-motion"

function Rules() {

  const [showModal, setShowModal] =
    useState(false)

  const [platform, setPlatform] =
    useState("")

  const [documentType, setDocumentType] =
    useState("")

  const [printer, setPrinter] =
    useState("")

  const [rules, setRules] = useState([])

  useEffect(() => {

    const fetchRules = async () => {

      const q = query(
        collection(db, "rules"),
        where(
          "userId",
          "==",
          auth.currentUser.uid
        )
      )

      const querySnapshot =
        await getDocs(q)

      const rulesData =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

      setRules(rulesData)

    }

    fetchRules()

  }, [])

  const handleAddRule = async () => {

    if (
      !platform ||
      !documentType ||
      !printer
    ) return

    const newRule = {

      userId:
        auth.currentUser.uid,

      platform,

      document:
        documentType,

      printer,

      status: "Active",

      automation:
        "Enabled",

      createdAt:
        Date.now(),

    }

    const docRef =
      await addDoc(
        collection(db, "rules"),
        newRule
      )

    await addDoc(
      collection(db, "logs"),
      {

        userId:
          auth.currentUser.uid,

        action:
          `${platform} automation rule created`,

        time: "Just now",

        status: "Success",

        createdAt:
          Date.now(),

      }
    )

    setRules([
      ...rules,
      {
        id: docRef.id,
        ...newRule,
      },
    ])

    setPlatform("")
    setDocumentType("")
    setPrinter("")

    setShowModal(false)

  }

  const handleDeleteRule =
    async (id) => {

      await deleteDoc(
        doc(db, "rules", id)
      )

      const updatedRules =
        rules.filter(
          (rule) =>
            rule.id !== id
        )

      setRules(updatedRules)

    }

  const toggleRuleStatus =
    async (rule) => {

      const newStatus =
        rule.status === "Active"
          ? "Inactive"
          : "Active"

      await updateDoc(
        doc(db, "rules", rule.id),
        {
          status: newStatus,
        }
      )

      const updatedRules =
        rules.map((item) => {

          if (
            item.id === rule.id
          ) {

            return {
              ...item,
              status: newStatus,
            }

          }

          return item

        })

      setRules(updatedRules)

    }

  return (

    <Layout>

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-3 dark:text-white">
            Smart Rules
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Automate printing workflows with intelligent routing
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl transition-all hover:scale-105"
        >
          + Create Rule
        </button>

      </div>

      {/* RULES GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {

          rules.map((rule) => (

            <motion.div
              key={rule.id}
              whileHover={{
                scale: 1.02,
              }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-7 border border-gray-200 dark:border-slate-700 shadow-sm"
            >

              <div className="flex items-start justify-between mb-8 gap-5">

                <div>

                  <h2 className="text-3xl font-bold mb-3 dark:text-white">
                    {rule.platform}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mb-2">

                    Document:

                    <span className="font-medium ml-2 text-black dark:text-white">

                      {rule.document}

                    </span>

                  </p>

                  <p className="text-gray-500 dark:text-gray-400 mb-2">

                    Printer:

                    <span className="font-medium ml-2 text-black dark:text-white">

                      {rule.printer}

                    </span>

                  </p>

                  <p className="text-gray-500 dark:text-gray-400">

                    Automation:

                    <span className="font-medium ml-2 text-green-600">

                      {rule.automation}

                    </span>

                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium

                  ${
                    rule.status ===
                    "Active"

                      ? "bg-green-100 text-green-600"

                      : "bg-red-100 text-red-600"
                  }

                `}
                >

                  {rule.status}

                </span>

              </div>

              {/* SMART ENGINE */}

              <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-slate-600">

                <h3 className="font-bold text-lg dark:text-white mb-3">

                  Smart Routing Engine

                </h3>

                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">

                  If platform is
                  {" "}
                  <span className="font-semibold text-blue-600">

                    {rule.platform}

                  </span>

                  {" "}and document is{" "}

                  <span className="font-semibold text-yellow-600">

                    {rule.document}

                  </span>

                  {" "}then automatically print using{" "}

                  <span className="font-semibold text-green-600">

                    {rule.printer}

                  </span>

                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    toggleRuleStatus(rule)
                  }
                  className={`px-6 py-4 rounded-2xl text-white transition-all hover:scale-105

                  ${
                    rule.status ===
                    "Active"

                      ? "bg-yellow-500 hover:bg-yellow-600"

                      : "bg-green-500 hover:bg-green-600"
                  }

                `}
                >

                  {
                    rule.status ===
                    "Active"

                      ? "Disable"

                      : "Enable"
                  }

                </button>

                <button
                  onClick={() =>
                    handleDeleteRule(
                      rule.id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl transition-all hover:scale-105"
                >
                  Delete
                </button>

              </div>

            </motion.div>

          ))

        }

      </div>

      {/* MODAL */}

      {

        showModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="bg-white dark:bg-slate-800 w-full max-w-[500px] rounded-3xl p-8"
            >

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold dark:text-white">
                  Create Smart Rule
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-gray-500 text-3xl"
                >
                  ×
                </button>

              </div>

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-5 outline-none"
              >

                <option value="">
                  Select Platform
                </option>

                <option>
                  Amazon
                </option>

                <option>
                  Flipkart
                </option>

                <option>
                  Meesho
                </option>

              </select>

              <select
                value={documentType}
                onChange={(e) =>
                  setDocumentType(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-5 outline-none"
              >

                <option value="">
                  Select Document
                </option>

                <option>
                  Shipping Label
                </option>

                <option>
                  Invoice
                </option>

                <option>
                  Packing Slip
                </option>

              </select>

              <select
                value={printer}
                onChange={(e) =>
                  setPrinter(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-8 outline-none"
              >

                <option value="">
                  Select Printer
                </option>

                <option>
                  Thermal Printer
                </option>

                <option>
                  A4 Printer
                </option>

              </select>

              <button
                onClick={
                  handleAddRule
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all hover:scale-[1.02]"
              >
                Save Smart Rule
              </button>

            </motion.div>

          </div>

        )

      }

    </Layout>

  )
}

export default Rules