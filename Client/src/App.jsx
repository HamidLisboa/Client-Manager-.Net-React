import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Client from "./Components/Client/Client";
import { Routes, Route } from "react-router-dom";
import ClientForm from "./Components/Client/ClientForm";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Navbar />
      <Toaster />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/client" element={<Client />} />
        <Route path="/clientForm" element={<ClientForm />} />
        {/* <Route path="/clientList" element={<ClientList />} /> */}
      </Routes>
    </div>
  );
};

export default App;
