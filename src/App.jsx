import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout.jsx";

import EnlaceWifi from "./pages/telecomunicaciones/EnlaceWifi";
import EnlaceRadio from "./pages/telecomunicaciones/EnlaceRadio";

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
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
