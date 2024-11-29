import React from 'react'
import Navbar from './components/Navbar/Navbar'// Mount Navbar component into APP.jsx
import Sidebar from './components/Sidebar/Sidebar'// Mount Sidebar component into APP.jsx
import { Routes, Route } from 'react-router-dom'
// automatically import components by setting up routes within Routes
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';


const App = () => {
  return (
    <div>
      <Navbar/> {/* Mount Navbar component into APP.jsx */}
      <hr />
      <div className="app-content">
      <Sidebar/> {/* Mount Sidebar component into APP.jsx */}  

      {/* Import Routes into App.jsx automatically by Routes tag pair */}
      <Routes>
        {/* Set up routes within Routes and Mounted the component-Add/List/Orders */}
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
