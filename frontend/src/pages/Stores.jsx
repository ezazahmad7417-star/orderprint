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

function Stores() {

  const [showModal, setShowModal] = useState(false)

  const [storeName, setStoreName] = useState("")
  const [marketplace, setMarketplace] = useState("")

  const [stores, setStores] = useState([])

  useEffect(() => {

    const fetchStores = async () => {

      const q = query(
        collection(db, "stores"),
        where("userId", "==", auth.currentUser.uid)
      )

      const querySnapshot = await getDocs(q)

      const storesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setStores(storesData)
    }

    fetchStores()

  }, [])

  const handleAddStore = async () => {

    if (!storeName || !marketplace) return

    const newStore = {
      userId: auth.currentUser.uid,
      name: marketplace,
      status: "Active",
      description: `${storeName} connected successfully`,
      button: "Manage Store",
    }

    const docRef = await addDoc(
      collection(db, "stores"),
      newStore
    )
    await addDoc(collection(db, "logs"), {

  userId: auth.currentUser.uid,

  action: `${marketplace} store connected`,

  time: "Just now",

  status: "Success",

  createdAt: Date.now(),

})

    setStores([
      ...stores,
      {
        id: docRef.id,
        ...newStore,
      },
    ])

    setStoreName("")
    setMarketplace("")

    setShowModal(false)
  }

  const handleDeleteStore = async (id) => {

    await deleteDoc(doc(db, "stores", id))

    const updatedStores = stores.filter(
      (store) => store.id !== id
    )

    setStores(updatedStores)
  }

  return (

    <Layout>

      <div className="flex items-start justify-between mb-8">

        <div>

          <h1 className="text-5xl font-bold mb-3 dark:text-white">
            Stores
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage your connected marketplaces
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl"
        >
          + Add Store
        </button>

      </div>

      <div className="grid grid-cols-2 gap-6">

        {stores.map((store) => (

          <div
            key={store.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-7 border border-gray-200 dark:border-slate-700"
          >

            <div className="flex items-start justify-between mb-8">

              <div>

                <h2 className="text-4xl font-bold mb-2 dark:text-white">
                  {store.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                  {store.description}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium

                ${
                  store.status === "Active"
                    ? "bg-green-100 text-green-600"

                    : store.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"

                    : "bg-red-100 text-red-600"
                }

              `}
              >
                {store.status}
              </span>

            </div>

            <div className="flex items-center gap-4">

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl">
                {store.button}
              </button>

              <button
                onClick={() => handleDeleteStore(store.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-800 w-[500px] rounded-3xl p-8">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold dark:text-white">
                Add Store
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
              placeholder="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-5 outline-none"
            />

            <select
              value={marketplace}
              onChange={(e) => setMarketplace(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white mb-8 outline-none"
            >

              <option value="">
                Select Marketplace
              </option>

              <option>
                Amazon
              </option>

              <option>
                Flipkart
              </option>

              <option>
                Myntra
              </option>

              <option>
                Meesho
              </option>

            </select>

            <button
              onClick={handleAddStore}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl"
            >
              Connect Store
            </button>

          </div>

        </div>

      )}

    </Layout>

  )
}

export default Stores