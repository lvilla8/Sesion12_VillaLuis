import Form from "react-bootstrap/Form";
import noFoto from "../../../assets/img/noDisponible.png";
import { useState } from "react";
import { PeliculaGenero } from "../../models/PeliculaGenero";
import { ARREGLO_PELICULA_GENERO } from "../../utility/dominios/DomGenero";
import { Pelicula } from "../../models/Pelicula";
import { useNavigate } from "react-router-dom";
import { ARREGLO_PELICULA } from "../../mocks/Pelicula-mocks";
import { useFormulario } from "../../utility/misHooks/useFormulario";
import { ConvertirBase64 } from "../../utility/Funciones/ConvertirBase64";

export const PeliCrear = () => {
  const irsePara = useNavigate();

  type formHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<any>();
  const [imagenMiniatura, setImagenMiniatura] = useState<any>(noFoto);

  const [arregloPelicula] = useState<Pelicula[]>(ARREGLO_PELICULA);
  const [arregloGeneros] = useState<PeliculaGenero[]>(ARREGLO_PELICULA_GENERO);

  let {
    nombrePelicula,
    protagonistaPelicula,
    codGeneroPelicula,
    imagenPelicula,
    dobleEnlace,
    objeto,
  } = useFormulario<Pelicula>(new Pelicula(0, "", "", "", "", ""));

  const enviarFrom = (objForm: formHtml) => {
    objForm.preventDefault();
    const formulario = objForm.currentTarget;

    if (formulario.checkValidity() === false) {
      objForm.preventDefault();
      objForm.stopPropagation();
      setEnProceso(true);
    } else {
      const nuevocod = arregloPelicula.length + 1;
      objeto.codPelicula = nuevocod;
      objeto.imagenPeliculaBase64 = imgBase64
      objeto.imagenPelicula = imagenPelicula.substring(imagenPelicula.lastIndexOf("\\") + 1);
      arregloPelicula.push(objeto);
      setEnProceso(false);
      irsePara("/plistar")
    }
  }

  const cargarImagen = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];
    setImagenMiniatura(URL.createObjectURL(imagen));
    dobleEnlace(e);
    const base64 = await ConvertirBase64(imagen);
    setImgBase64(base64);
};

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-5 mt-5 pb-4">
        <Form noValidate validated={enProceso} onSubmit={enviarFrom}>
          <div className="card">
            <div className="card-header">
              <h5 className=" rojito">Formulario creación</h5>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <Form.Group controlId="nom">
                  <Form.Label>
                    <span className="rojito">*</span> Nombre película
                  </Form.Label>
                  <Form.Control size="sm" required type="text" name="nombrePelicula" value={nombrePelicula} onChange={dobleEnlace} />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="pro">
                  <Form.Label>
                    <span className="rojito">*</span> Protagonista
                  </Form.Label>
                  <Form.Control size="sm" required type="text" name="protagonistaPelicula" value={protagonistaPelicula} onChange={dobleEnlace} />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="gen">
                  <Form.Label>
                    <span className="rojito">*</span> Genero
                  </Form.Label>
                  <Form.Select size="sm" required name="codGeneroPelicula" value={codGeneroPelicula} onChange={dobleEnlace}>
                    <option value="">Seleccione un genero</option>
                    {arregloGeneros.map((miGen: PeliculaGenero) => (
                      <option value={miGen.codGenero} key={miGen.codGenero}>
                        {miGen.nombreGenero}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="fot">
                  <Form.Label>
                    <span className="rojito">*</span> Imágen
                  </Form.Label>
                  <Form.Control size="sm" required type="file" name="imagenPelicula" value={imagenPelicula} onChange={cargarImagen} />
                </Form.Group>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img src={imagenMiniatura} alt="no foto" className="maximoTamanoCreacion" />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Crear película
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div >
  );
};
