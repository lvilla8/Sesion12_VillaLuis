import { useState } from "react";
import { Pelicula } from "../../models/Pelicula";
import { ARREGLO_PELICULA } from "../../mocks/Pelicula-mocks";
import { ARREGLO_PELICULA_GENERO } from "../../utility/dominios/DomGenero";
import { PeliVerImagen } from "./PeliVerImagen";

export const PeliListado = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [objPeli, setObjPeli] = useState<Pelicula>(new Pelicula(0, "", "", "", "", ""));

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
          {/* <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav> */}
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-danger">
                <th style={{ width: "10%" }}>Nro</th>
                <th style={{ width: "30%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Genero</th>
                <th style={{ width: "30%" }}>Protagonista</th>
                <th style={{ width: "10%" }}>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {arrPeliculas.map((miPeli: Pelicula) => (
                <tr key={miPeli.codPelicula}>
                  <td>{miPeli.codPelicula} </td>
                  <td>{miPeli.nombrePelicula}</td>
                  <td>{obtenerNombreGenero(miPeli.codGeneroPelicula)}</td>
                  <td>{miPeli.protagonistaPelicula}</td>
                  <td>
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalShow(true);
                        setObjPeli(miPeli);
                      }}
                    >
                      <img src={miPeli.imagenPeliculaBase64} alt="" className="imagenListado" />
                    </a>
                    <div className="">{miPeli.imagenPelicula}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PeliVerImagen show={modalShow} onHide={()=>{setModalShow(false); }} obj={objPeli}/>


        </div>
      </div>
    </>
  );
};
