import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"

import Dashboard from "./pages/Dashboard"
import Stores from "./pages/Stores"
import Printers from "./pages/Printers"
import Rules from "./pages/Rules"
import Logs from "./pages/Logs"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import Settings from "./pages/Settings"
import Admin from "./pages/Admin"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* STORES */}

        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />

        {/* PRINTERS */}

        <Route
          path="/printers"
          element={
            <ProtectedRoute>
              <Printers />
            </ProtectedRoute>
          }
        />

        {/* RULES */}

        <Route
          path="/rules"
          element={
            <ProtectedRoute>
              <Rules />
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* LOGS */}

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App