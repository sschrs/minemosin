import React from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import Navbar from "./components/shared/Navbar";
import NewListPage from "./pages/NewListPage";
import ImportPage from "./pages/ImportPage";
import ListDetailPage from "./pages/ListDetailPage";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{marginTop: '70px'}}></div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/new-list" element={<NewListPage/>} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/list-detail/:listId" element={<ListDetailPage />} />
        <Route path="/edit-list/:listId" element={<NewListPage />} />
      </Routes>

    </div>
  );
}

export default App;
