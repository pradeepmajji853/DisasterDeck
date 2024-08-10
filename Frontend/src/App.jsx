import { useState } from 'react'
import Card from "./components/Card.jsx"
import Layout from "./Layouts/Layout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register.jsx';
import Login from "./components/Login.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route
        path="/Register"
        element={
          <Layout>
            <div className="RegisterPage">
            <Card/>
            <Register/>
            </div>

          </Layout>
        }
        />
        <Route
        path="/Login"
        element={
          <Layout>
            <Card/>
            <Login/>
          </Layout>
        }
        />
      </Routes>
    </Router>
    
    
    </>
  )
}

export default App
