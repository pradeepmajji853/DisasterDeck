import { useState } from 'react'
import Card from "./components/Card.jsx"
import Layout from "./Layouts/Layout.jsx";
import Layout2 from './Layouts/Layout2.jsx';
import HomePage from './components/HomePage.jsx';
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
            <div className="LoginPage">
            <Card/>
            <Login/>
            </div>
          </Layout>
        }
        />
        <Route
        path="/Home"
        element={
          <Layout2>
            <div>
            <HomePage/>
            </div>
          </Layout2>
        }
        />
        
      </Routes>
    </Router>
    
    
    </>
  )
}

export default App
