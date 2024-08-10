import { useState } from 'react'
import Card from "./components/Card.jsx"
import Layout from "./Layouts/Layout.jsx";
import Layout2 from './Layouts/Layout2.jsx';
import HomePage from './components/HomePage.jsx';
import KnowledgeHub from "./components/KnowledgeHub.jsx"
import PreparednessChecklist from './components/PreparednessChecklist.jsx';
import Emergency from './components/Emergency.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register.jsx';
import Login from "./components/Login.jsx"
import RecentDisasters from './components/RecentDisasters.jsx';
import Dos from './components/Dos.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route
        path="/"
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
            <RecentDisasters/>
            <HomePage/>
            
            </div>
          </Layout2>
        }
        />
         <Route
        path="/Emergency"
        element={
          <Layout2>
            <div>
              <Emergency/>
            </div>
          </Layout2>
        }
        />
         <Route
        path="/KnowledgeHub"
        element={
          <Layout2>
            <div>
            <KnowledgeHub/>
            </div>
          </Layout2>
        }
        />
        
         <Route
        path="/preparedness-checklist"
        element={
          <Layout2>
            <div>
              <PreparednessChecklist/>
            </div>
          </Layout2>
        }
        />
        <Route
        path="/Dos"
        element={
          <Layout2>
            <div>
            <Dos/>
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
