import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout.jsx";

import EnlaceWifi from "./pages/telecomunicaciones/EnlaceWifi";
import EnlaceRadio from "./pages/telecomunicaciones/EnlaceRadio";

import LentesConvergentes from "./pages/fisica/LentesConvergentes";
import LentesDivergentes from "./pages/fisica/LentesDivergentes";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
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
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
