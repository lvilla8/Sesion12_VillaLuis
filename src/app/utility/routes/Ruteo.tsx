import { Route, Routes } from "react-router-dom";

import { Inicio } from "../../components/container/Inicio";
import { PeliCrear } from "../../components/peliculas/PeliCrear";
import { PeliAdmin } from "../../components/peliculas/PeliAdmin";
import { PeliListado } from "../../components/peliculas/PeliListado";
import { PeliActualizar } from "../../components/peliculas/PeliActualizar";

import { AcercaDe } from "../../components/others/Acercade";

import { NoEncontrado } from "../../components/container/NoEncontrado";

export const Ruteo = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route path="/pcrear" element={<PeliCrear />} />
      <Route path="/padmin" element={<PeliAdmin />} />
      <Route path="/plistar" element={<PeliListado />} />
      <Route path="/pactual/:codigo" element={<PeliActualizar />} />

      <Route path="/acerca" element={<AcercaDe />} />

      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
};
