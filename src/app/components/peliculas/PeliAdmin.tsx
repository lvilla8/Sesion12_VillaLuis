/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ARREGLO_PELICULA } from "../../mocks/Pelicula-mocks";
import { Pelicula } from "../../models/Pelicula";
import { ARREGLO_PELICULA_GENERO } from "../../utility/dominios/DomGenero";
import { NavLink } from "react-router-dom";

export const PeliAdmin = () => {
  const [arrPeliculas] = useState<Pelicula[]>(ARREGLO_PELICULA);

  const obtenerNombreGenero = (valor: string) => {
    for (const objGen of ARREGLO_PELICULA_GENERO) {
      if (objGen.codGenero == valor) {
        return objGen.nombreGenero;
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-danger">
                <th style={{ width: "10%" }}>Código</th>
                <th style={{ width: "30%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Genero</th>
                <th style={{ width: "20%" }}>Protagonista</th>
                <th style={{ width: "10%" }}>Imagen</th>
                <th style={{ width: "10%" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {arrPeliculas.map((miPeli: Pelicula) => (
                <tr className="align-middle">
                  <td>{miPeli.codPelicula}</td>
                  <td>{miPeli.nombrePelicula}</td>
                  <td>{miPeli.codGeneroPelicula}</td>
                  <td>{miPeli.protagonistaPelicula}</td>
                  <td>
                    <img
                      src={miPeli.imagenPeliculaBase64}
                      alt=""
                      className="imagenListado"
                    />
                    <div className="text-info">{miPeli.imagenPelicula}</div>
                  </td>
                  <td className="text-center">
                    <a href="/#">
                      <i className="fa-solid fa-trash-can rojito"></i>
                    </a>{" "}
                    <NavLink to={"/pactual/" + miPeli.codPelicula}>
                      <i className="fa-regular fa-pen-to-square verde"></i>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};