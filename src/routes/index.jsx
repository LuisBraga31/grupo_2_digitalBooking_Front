import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { FormPage } from "../pages/FormPage";
import { LoginPage } from "../pages/LoginPage";
import { DetailProductPage } from "../pages/DetailProductPage";
import { ReservaPage } from "../pages/ReservaPage";
import { AdminPage } from "../pages/AdminPage";
import { ListaReservasPage } from "../pages/ListaReservasPage";

import TemaContextProvider from "../contexts/globalContext";

export function RouteList() {

    return (
        <>
            <BrowserRouter>
            <TemaContextProvider>
                
                <Routes>

                    <Route path="/" element={<Home/>} />
                    <Route path="/form" element={<FormPage />} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/produto/:id" element={<DetailProductPage />} />
                    <Route path="/produto/:id/reserva" element={<ReservaPage />} />
                    <Route path="/administracao" element={<AdminPage />} />
                    <Route path="/reservas/:id" element={<ListaReservasPage />} />

                </Routes>

            </TemaContextProvider>
            </BrowserRouter>
        
        </>
    )

}