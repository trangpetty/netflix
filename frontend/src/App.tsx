import React from "react";
import Home from '../src/pages/home/Home'
import { Routes, Route } from "react-router-dom";
import Login from '../src/pages/login/Login'
import Admin from '../src/pages/admin/Admin'
import {ModalProvider} from "./components/context/ModalProvider.tsx";

function App() {

  return (
    <div>
        <Routes>
            <Route
                path="/"
                element={
                    <ModalProvider>
                        <Home />
                    </ModalProvider>
                }
            />
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin/*' element={<Admin/>}/>
        </Routes>
    </div>
  )
}

export default App
