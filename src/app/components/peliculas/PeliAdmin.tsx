/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ARREGLO_PELICULA } from "../../mocks/Pelicula-mocks";
import { Pelicula } from "../../models/Pelicula";
import { ARREGLO_PELICULA_GENERO } from "../../utility/dominios/DomGenero";
import { NavLink } from "react-router-dom";
import { PeliVerImagen } from "./PeliVerImagen";
import { Modal } from "react-bootstrap";

export const PeliAdmin = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [objPeli, setObjPeli] = useState<Pelicula>(new Pelicula(0, "", "", "", "", ""));

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };

  const eliminarPelicula = (codigo: number) => {
    const cantidad = arrPeliculas.length;

    for (let i = 0; i < cantidad; i++) {
      const comparar = arrPeliculas[i].codPelicula;

      if (comparar == codigo) {
        arrPeliculas.splice(i, 1);
      }
    }
  };

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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="#">Peliculas</NavLink>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Admin
          </li>
        </ol>
      </nav>
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
                  <td className="text-center">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                        setObjPeli(miPeli);
                      }}
                    >
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
          <PeliVerImagen
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
            obj={objPeli}
          />
          {/* Modal para confirmar eliminación */}
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminar Película</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>¿Está seguro de eliminar la película {objPeli.nombrePelicula}?</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-danger"
                onClick={() => {
                  eliminarPelicula(objPeli.codPelicula);
                  handleClose();
                }}
              >
                Eliminar
              </button>
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancelar
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
