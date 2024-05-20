import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { Ruteo } from "./app/utility/routes/Ruteo";

import { Cabecera } from "./app/components/container/Cabecera";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Cabecera />

        <div className="pt-3">
          <Ruteo />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
