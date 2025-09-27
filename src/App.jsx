import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToastProvider from "./globalComponents/ToastProvider";
// import Principal from "./components/principal";

import AppRoutes from "./Routes/AppRoutes";
// import Login from "./components/login";
// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
