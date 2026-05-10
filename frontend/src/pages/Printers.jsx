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
} from "firebase/firestore"

function Printers() {

  const [showModal, setShowModal] = useState(false)

  const [printerName, setPrinterName] = useState("")
  const [printerType, setPrinterType] = useState("")

  const [printers, setPrinters] = useState([])

  const [showPrintPreview, setShowPrintPreview] =
    useState(false)

  const [selectedPrinter, setSelectedPrinter] =
    useState(null)

  useEffect(() => {

    const fetchPrinters = async () => {

      const q = query(
        collection(db, "printers"),
        where("userId", "==", auth.currentUser.uid)
      )

      const querySnapshot = await getDocs(q)

      const printersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPrinters(printersData)

    }

    fetchPrinters()

  }, [])

  const handleAddPrinter = async () => {

    if (!printerName || !printerType) return

    const newPrinter = {

      userId: auth.currentUser.uid,

      name: printerName,

      type: printerType,

      status: "Online",

      active: true,

      defaultPrinter: printers.length === 0,

    }

    const docRef = await addDoc(
      collection(db, "printers"),
      newPrinter
    )

    await addDoc(collection(db, "logs"), {

      userId: auth.currentUser.uid,

      action: `${printerName} printer connected`,

      time: "Just now",

      status: "Success",

      createdAt: Date.now(),

    })

    setPrinters([
      ...printers,
      {
        id: docRef.id,
        ...newPrinter,
      },
    ])

    setPrinterName("")
    setPrinterType("")

    setShowModal(false)

  }

  const handleDeletePrinter = async (id) => {

    await deleteDoc(doc(db, "printers", id))

    const updatedPrinters = printers.filter(
      (printer) => printer.id !== id
    )

    setPrinters(updatedPrinters)

  }

  const handleTogglePrinter = (id) => {

    const updatedPrinters = printers.map((printer) => {

      if (printer.id === id) {

        return {
          ...printer,
          active: !printer.active,
        }

      }

      return printer

    })

    setPrinters(updatedPrinters)

  }

  const handleSetDefault = (id) => {

    const updatedPrinters = printers.map((printer) => ({

      ...printer,

      defaultPrinter: printer.id === id,

    }))

    setPrinters(updatedPrinters)

  }

  const handleTestPrinter = (printer) => {

    setSelectedPrinter(printer)

    setShowPrintPreview(true)

  }

  const handlePrintNow = () => {

    window.print()

  }

  return (

    <Layout>

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-10">

        <div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-3 dark:text-white">
            Printers
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage connected printers & print simulations
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl transition-all hover:scale-105"
        >
          + Add Printer
        </button>

      </div>

      {/* PRINTERS GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {

          printers.map((printer) => (

            <div
              key={printer.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-7 border border-gray-200 dark:border-slate-700 shadow-sm"
            >

              <div className="flex items-start justify-between mb-8">

                <div>

                  <div className="flex items-center gap-3 mb-3">

                    <h2 className="text-3xl font-bold dark:text-white">
                      {printer.name}
                    </h2>

                    {

                      printer.defaultPrinter && (

                        <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">

                          Default

                        </span>

                      )

                    }

                  </div>

                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    {printer.type}
                  </p>

                  <p className="text-sm text-gray-400">
                    Real-time print simulation enabled
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium

                  ${
                    printer.active
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }

                `}
                >

                  {printer.active ? "Online" : "Offline"}

                </span>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap items-center gap-4">

                <button
                  onClick={() =>
                    handleTestPrinter(printer)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition-all hover:scale-105"
                >
                  Print Preview
                </button>

                <button
                  onClick={() =>
                    handleTogglePrinter(printer.id)
                  }
                  className={`px-5 py-3 rounded-2xl text-white transition-all hover:scale-105

                  ${
                    printer.active
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }

                `}
                >

                  {

                    printer.active
                      ? "Disable"
                      : "Enable"

                  }

                </button>

                <button
                  onClick={() =>
                    handleSetDefault(printer.id)
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-2xl transition-all hover:scale-105"
                >
                  Set Default
                </button>

                <button
                  onClick={() =>
                    handleDeletePrinter(printer.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl transition-all hover:scale-105"
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        }

      </div>

      {/* ADD PRINTER MODAL */}

      {

        showModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white dark:bg-slate-800 w-full max-w-[500px] rounded-3xl p-8">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold dark:text-white">
                  Connect Printer
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 text-2xl"
                >
                  ×
                </button>

              </div>

              <input
                type="text"
                placeholder="Printer Name"
                value={printerName}
                onChange={(e) =>
                  setPrinterName(e.target.value)
                }
                className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-5 outline-none"
              />

              <select
                value={printerType}
                onChange={(e) =>
                  setPrinterType(e.target.value)
                }
                className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-8 outline-none"
              >

                <option value="">
                  Select Printer Type
                </option>

                <option>
                  Thermal Printer
                </option>

                <option>
                  A4 Printer
                </option>

              </select>

              <button
                onClick={handleAddPrinter}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl"
              >
                Connect Printer
              </button>

            </div>

          </div>

        )

      }

      {/* PRINT PREVIEW MODAL */}

      {

        showPrintPreview && (

          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

            <div className="bg-white dark:bg-slate-800 w-full max-w-[600px] rounded-3xl p-10">

              <div className="text-center mb-8">

                <div className="text-7xl mb-5">
                  🖨️
                </div>

                <h2 className="text-4xl font-bold mb-3 dark:text-white">
                  Print Preview
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                  Simulated printing document preview
                </p>

              </div>

              <div className="bg-gray-100 dark:bg-slate-700 rounded-3xl p-8 mb-8">

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span className="text-gray-500 dark:text-gray-400">
                      Printer
                    </span>

                    <span className="font-semibold dark:text-white">
                      {selectedPrinter?.name}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500 dark:text-gray-400">
                      Type
                    </span>

                    <span className="font-semibold dark:text-white">
                      {selectedPrinter?.type}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500 dark:text-gray-400">
                      Status
                    </span>

                    <span className="text-green-600 font-semibold">
                      Ready To Print
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={handlePrintNow}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all hover:scale-105"
                >
                  Print Now
                </button>

                <button
                  onClick={() =>
                    setShowPrintPreview(false)
                  }
                  className="flex-1 bg-gray-200 dark:bg-slate-700 dark:text-white p-4 rounded-2xl transition-all hover:scale-105"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )

      }

    </Layout>

  )
}

export default Printers