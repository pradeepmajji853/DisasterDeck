import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layouts/Layout.jsx";
import Layout2 from './Layouts/Layout2.jsx';
import HomePage from './components/HomePage.jsx';
import KnowledgeHub from "./components/KnowledgeHub.jsx"
import PreparednessChecklist from './components/PreparednessChecklist.jsx';
import Emergency from './components/Emergency.jsx';
import RecentDisasters from './components/RecentDisasters.jsx';
import Dos from './components/Dos.jsx';
import About from "./components/About.jsx";
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

function App() {
  const { isSignedIn } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-up/*" element={
          !isSignedIn ? (
            <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <SignUp routing="path" path="/sign-up" />
            </Layout>
          ) : (
            <Navigate to="/Home" replace />
          )
        } />
        <Route path="/sign-in/*" element={
          !isSignedIn ? (
            <Layout>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                
              <SignIn routing="path" path="/sign-in"  />

              </div>
            </Layout>
          ) : (
            <Navigate to="/Home" replace />
          )
        } />

        {/* Protected Routes */}
        <Route path="/Home" element={
          <ProtectedRoute>
            <Layout2>
              <div>
                <RecentDisasters/>
                <HomePage/>
              </div>
            </Layout2>
          </ProtectedRoute>
        } />
        <Route path="/Emergency" element={
          <ProtectedRoute>
            <Layout2>
              <Emergency/>
            </Layout2>
          </ProtectedRoute>
        } />
        <Route path="/KnowledgeHub" element={
          <ProtectedRoute>
            <Layout2>
              <KnowledgeHub/>
            </Layout2>
          </ProtectedRoute>
        } />
        <Route path="/preparedness-checklist" element={
          <ProtectedRoute>
            <Layout2>
              <PreparednessChecklist/>
            </Layout2>
          </ProtectedRoute>
        } />
        <Route path="/Dos" element={
          <ProtectedRoute>
            <Layout2>
              <Dos/>
            </Layout2>
          </ProtectedRoute>
        } />

        {/* About Route */}
        <Route path="/about" element={
          <Layout2>
            <About />
          </Layout2>
        } />

        {/* Root Route */}
        <Route path="/" element={
          isSignedIn ? (
            <Navigate to="/Home" replace />
          ) : (
            <Navigate to="/sign-in" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
