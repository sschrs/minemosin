import React from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import Navbar from "./components/shared/Navbar";
import NewListPage from "./pages/NewListPage";
import ImportPage from "./pages/ImportPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/new-list" element={<NewListPage/>} />
        <Route path="/import" element={<ImportPage />} />
      </Routes>

    </div>
  );
}

export default App;
