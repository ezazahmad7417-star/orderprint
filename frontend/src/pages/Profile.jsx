import { useState } from "react"

import Layout from "../components/Layout"

import { auth } from "../firebase"

import { updateProfile } from "firebase/auth"

function Profile() {

  const user = auth.currentUser

  const [name, setName] = useState(
    user?.displayName || ""
  )

  const [loading, setLoading] = useState(false)

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || ""
  )

  const handleUpdateProfile = async () => {

    try {

      setLoading(true)

      await updateProfile(user, {
        displayName: name,
      })

      alert("Profile Updated Successfully")

      setLoading(false)

      window.location.reload()

    } catch (error) {

      alert(error.message)

      setLoading(false)

    }

  }

  const handleAvatarChange = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {

      setAvatar(reader.result)

      localStorage.setItem(
        "avatar",
        reader.result
      )

      window.location.reload()

    }

    reader.readAsDataURL(file)
  }

  return (

    <Layout>

      <div className="max-w-5xl">

        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3 dark:text-white">
            Profile Settings
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage your OrderPrint account
          </p>

        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* PROFILE CARD */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700">

            <div className="flex flex-col items-center text-center">

              <div className="relative">

                {

                  avatar ? (

                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
                    />

                  ) : (

                    <div className="w-36 h-36 bg-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-blue-500">

                      {
                        user?.email
                          ?.charAt(0)
                          .toUpperCase()
                      }

                    </div>

                  )

                }

                <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer text-white text-xl shadow-lg">

                  📷

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                </label>

              </div>

              <h2 className="text-3xl font-bold dark:text-white mt-6 mb-2">

                {user?.displayName || "User"}

              </h2>

              <p className="text-gray-500 dark:text-gray-400 break-all">

                {user?.email}

              </p>

            </div>

          </div>
{/* ACCOUNT STATUS */}

<div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700">

  <h2 className="text-3xl font-bold dark:text-white mb-8">
    Account Activity
  </h2>

  <div className="space-y-5">

    {/* ONLINE STATUS */}

    <div className="flex items-center justify-between border border-gray-200 dark:border-slate-700 rounded-2xl p-5">

      <div>

        <h3 className="text-xl font-semibold dark:text-white mb-1">
          Current Status
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          Your account session is active
        </p>

      </div>

      <div className="flex items-center gap-3">

        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

        <span className="text-green-600 font-semibold">
          Online
        </span>

      </div>

    </div>

    {/* ACCOUNT CREATED */}

    <div className="flex items-center justify-between border border-gray-200 dark:border-slate-700 rounded-2xl p-5">

      <div>

        <h3 className="text-xl font-semibold dark:text-white mb-1">
          Account Created
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          Firebase account creation date
        </p>

      </div>

      <span className="font-medium dark:text-white">

        {
          new Date(
            user?.metadata?.creationTime
          ).toLocaleDateString()
        }

      </span>

    </div>

    {/* LAST LOGIN */}

    <div className="flex items-center justify-between border border-gray-200 dark:border-slate-700 rounded-2xl p-5">

      <div>

        <h3 className="text-xl font-semibold dark:text-white mb-1">
          Last Login
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          Most recent login activity
        </p>

      </div>

      <span className="font-medium dark:text-white">

        {
          new Date(
            user?.metadata?.lastSignInTime
          ).toLocaleString()
        }

      </span>

    </div>

    {/* USER ID */}

    <div className="flex items-center justify-between border border-gray-200 dark:border-slate-700 rounded-2xl p-5">

      <div>

        <h3 className="text-xl font-semibold dark:text-white mb-1">
          User ID
        </h3>

        <p className="text-gray-500 dark:text-gray-400">
          Unique Firebase user identifier
        </p>

      </div>

      <span className="font-medium dark:text-white text-sm break-all max-w-[300px] text-right">

        {user?.uid}

      </span>

    </div>

  </div>

</div>
          {/* SETTINGS */}

          <div className="col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-10 border border-gray-200 dark:border-slate-700">

            <div className="space-y-6">

              <div>

                <label className="block mb-3 text-lg font-medium dark:text-white">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-5 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white outline-none"
                />

              </div>

              <div>

                <label className="block mb-3 text-lg font-medium dark:text-white">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full p-5 rounded-2xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 outline-none cursor-not-allowed"
                />

              </div>

              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl"
              >

                {

                  loading
                    ? "Updating..."
                    : "Save Changes"

                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  )
}

export default Profile