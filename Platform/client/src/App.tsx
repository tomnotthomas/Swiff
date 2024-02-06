import './App.css';
import { useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import { AppContextProvider } from './AppContext.tsx';

import Home from './components/home/HomePage/HomePage.tsx';
import SteamLogin from './components/auth/LoginPage/SteamLoginPage.tsx';
import Login from './components/auth/LoginPage/LoginPage.tsx';
import RegistrationPage from './components/auth/RegistrationPage/RegistrationPage.tsx';
import ProtectedRoutes from './components/auth/ProtectedRoutes.tsx';
import Preloader from './components/preloader/preloader.tsx';
import PaymentPage from './components/auth/payment-page/payment-page.tsx';
import Vmstatus from './components/vmstatus-component/vmstatus-component.tsx';


function App() {
  const [loading, setLoading] = useState(true)
  const [loggedSteam, setLoggedSteam] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3300);
  }, [])

  if (loading) return <Preloader />;

  return (
    <AppContextProvider>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home loggedSteam={loggedSteam} setLoggedSteam= {setLoggedSteam} />} />
          </Route>
          <Route path="/subscribe" element={ <PaymentPage /> } />
          <Route path="/vmstatus" element={<Vmstatus active={true} />} />
          <Route path="/auth/steam/return" element={<Navigate to="/" replace={true} />} />
          <Route path="/login" element={ <Login setLoggedSteam={setLoggedSteam} /> } />
          <Route path="/steam-login" element={ <SteamLogin/> } />
          <Route path="/register" element={ <RegistrationPage/> } />
        </Routes>
      </div>
    </AppContextProvider>
  )
}
//added temporary route for payment
export default App;
