import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Dashboard } from "./components/Dashboard";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './components/Home';
import Connect from './components/Connect';
import { Community } from "./components/Community";
import { Companies } from "./components/Companies";
import { About } from "./components/About";

export default function App() {
  return (
  <>
    <header>
        <Dashboard/>
    </header>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/connect" element={<Connect/>}></Route>
        <Route path="/community" element={<Community/>}></Route>
        <Route path="/companies" element={<Companies/>}></Route>
        <Route path="/about" element={<About/>}></Route>
    </Routes>
  </>
  );
}
