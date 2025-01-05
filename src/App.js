import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ErrorBoundary from "./components/Global/ErrorBoundary";

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <div className="bg-gray-50 min-h-screen">
          {/* Header */}
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-center text-xl font-bold">Employee Management</h1>
          </header>

          {/* Routes */}
          <main className="p-4">
            <Routes>
              {/* Redirect "/" to "/dashboard" */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddEmployee />} />
              <Route path="/edit/:id" element={<EditEmployee />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>© 2024 Employee Management. All rights reserved.</p>
          </footer>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
