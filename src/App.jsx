import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout.jsx";

import EnlaceWifi from "./pages/telecomunicaciones/EnlaceWifi";
import EnlaceRadio from "./pages/telecomunicaciones/EnlaceRadio";

import LentesConvergentes from "./pages/fisica/LentesConvergentes";
import LentesDivergentes from "./pages/fisica/LentesDivergentes";

import TxRxUART from "./pages/digital/TxRxUART";
import TxRxI2C from "./pages/digital/TxRxI2C";

import HomePage from "./pages/HomePage";
import Laboratorios from "./pages/Laboratorios";

import TableQueryPaginated from "./components/common/TableQueryPaginated.jsx";

const session = {
  user: {
    name: "Nombre Apellido",
    id: 2
  }
}

function App() {
  return (
    <BrowserRouter>
      <RootLayout session={session}>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="/telecomunicaciones/enlace-wifi"
            element={<EnlaceWifi />}
          ></Route>
          <Route
            exact
            path="/telecomunicaciones/enlace-radio"
            element={<EnlaceRadio />}
          ></Route>
          <Route
            exact
            path="/fisica/lentes-convergentes"
            element={<LentesConvergentes />}
          ></Route>
          <Route
            exact
            path="/fisica/lentes-divergentes"
            element={<LentesDivergentes />}
          ></Route>
          <Route exact path="/digital/uart" element={<TxRxUART />}></Route>
          <Route exact path="/digital/i2c" element={<TxRxI2C />}></Route>

          <Route exact path="/laboratorios" element={<Laboratorios />}></Route>


          <Route exact path="/query" element={
              <TableQueryPaginated 
                idLaboratorio={1} 
                idUsuario={2}
              />
          }></Route>
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
