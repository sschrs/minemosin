import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import Navbar from "./components/shared/Navbar";
import NewListPage from "./pages/NewListPage";
import ImportPage from "./pages/ImportPage";
import ListDetailPage from "./pages/ListDetailPage";
import LearnPage from "./pages/LearnPage";
import SettingsPage from "./pages/SettingsPage";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  useEffect(()=>{
    setLanguage();
  },[])

  const setLanguage = async () => {
    const lang = await window.electron.getLanguage();
    i18n.changeLanguage(lang);
  }

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
        <Route path="/learn/:listId" element={<LearnPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
