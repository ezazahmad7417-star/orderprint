import { useEffect, useState } from "react"

import Layout from "../components/Layout"

import { db, auth } from "../firebase"

import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore"

import jsPDF from "jspdf"

function Logs() {

  const [logs, setLogs] = useState([])

  useEffect(() => {

    const q = query(
      collection(db, "logs"),
      where("userId", "==", auth.currentUser.uid)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {

        const logsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setLogs(logsData)

      }
    )

    return () => unsubscribe()

  }, [])

  const handleDeleteLog = async (id) => {

    await deleteDoc(doc(db, "logs", id))
  }

  const handleClearAllLogs = async () => {

    const q = query(
      collection(db, "logs"),
      where("userId", "==", auth.currentUser.uid)
    )

    const snapshot = await getDocs(q)

    snapshot.forEach(async (logDoc) => {

      await deleteDoc(doc(db, "logs", logDoc.id))

    })

  }

  const handleDownloadPDF = () => {

    const pdf = new jsPDF()

    pdf.setFontSize(20)

    pdf.text("OrderPrint Activity Logs", 20, 20)

    let y = 40

    logs.forEach((log, index) => {

      pdf.setFontSize(12)

      pdf.text(
        `${index + 1}. ${log.action} | ${log.status} | ${log.time}`,
        20,
        y
      )

      y += 10

    })

    pdf.save("orderprint-logs.pdf")
  }

  return (

    <Layout>

      <div className="flex items-start justify-between mb-10">

        <div>

          <h1 className="text-5xl font-bold mb-3 dark:text-white">
            Logs
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Monitor all printing activities
          </p>

        </div>

        <div className="flex gap-4">

          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl"
          >
            Download PDF
          </button>

          <button
            onClick={handleClearAllLogs}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl"
          >
            Clear Logs
          </button>

        </div>

      </div>

      <div className="space-y-5">

        {logs.length === 0 && (

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-10 text-center">

            <h2 className="text-3xl font-bold mb-3 dark:text-white">
              No Activity Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              Your recent actions will appear here
            </p>

          </div>

        )}

        {logs.map((log) => (

          <div
            key={log.id}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-6 flex items-center justify-between"
          >

            <div>

              <h2 className="text-2xl font-semibold mb-2 dark:text-white">
                {log.action}
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                {log.time}
              </p>

            </div>

            <div className="flex items-center gap-4">

              <span
                className={`px-5 py-2 rounded-full text-sm font-medium

                ${
                  log.status === "Success"
                    ? "bg-green-100 text-green-600"

                    : log.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"

                    : "bg-red-100 text-red-600"
                }

              `}
              >
                {log.status}
              </span>

              <button
                onClick={() => handleDeleteLog(log.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </Layout>

  )
}

export default Logs