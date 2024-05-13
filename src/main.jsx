import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import app from './firebaseCredential';
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Router>
      <AuthProvider>
        
        <ToastContainer />
        <App />
        
      </AuthProvider>
    </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
