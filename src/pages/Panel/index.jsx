import React, { useState, useEffect } from "react";
import Header from "../../components/Panel/Header";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { convertCharCode } from "../../helpers/ResetOptions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import Swal from "sweetalert2";

const Panel = () => {
  const [problemas, setProblemas] = useState([]);
  // const [imagenes, setImagenes] = useState([]);
  const [charCode, setCharCode] = useState(97);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProblemas();
    getCategories();
  }, []);

  const getProblemas = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_URL}/panel`
      );
      const problemasArray = [];
      if (response.status == 200) {
        let newArray = [];
        response.data.data.map((problema) => {
          let opcionesRespuestas = JSON.parse(problema.opciones)
          problemasArray.push({
            id: problema.id,
            planteamiento: problema.planteamiento,
            opciones: opcionesRespuestas,
            respuesta: problema.Respuesta.opcion,
            categoria: problema.categoria.nombre,
          });
        });
        setProblemas(problemasArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_URL}/categories`
      );
      if (response.status == 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Lo sentimos, ha ocurrido un error",
        text: "Intentelo más tarde",
        icon: "error",
      });
    }
  };

  const eliminarProblema = async (id) => {
    Swal.fire({
      title: "¿Desea eliminar este problema?",
      icon: "question",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#166534",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#991b1b",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_SOCKET_URL}/eliminar-ejercicio/${id}`
          );
          if (response.status == 200) {
            Swal.fire({
              title: response.data.msg,
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                setProblemas([]);
                getProblemas();
              }
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: error.response.data.msg,
            icon: "error",
          }).then((result) => {
            if (result.isConfirmed) {
              setProblemas([]);
              getProblemas();
            }
          });
        }
      }
    });
  };

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div>
        <h2 className="text-3xl font-bold text-center my-5 uppercase">
          Preguntas
        </h2>
        <div className="flex flex-wrap w-width_90 mx-auto gap-3 my-3">
          {problemas.map((problema, key) => (
            <div
              className="w-11/12 md:w-5/12 px-6 py-4 mb-5 mx-auto bg-white border rounded-md shadow-md"
              key={key}
            >
              <MathJaxContext>
                <div className="flex justify-between items-center">
                  <h2>
                    <span className="font-bold">Problema:</span>{" "}
                    <MathJax>
                      {problema.planteamiento != ""
                        ? `\\(${problema.planteamiento}\\)`
                        : ""}
                    </MathJax>
                  </h2>
                  <button
                    type="button"
                    className="hover:cursor-pointer text-red-700 text-lg"
                    onClick={() => eliminarProblema(problema.id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </MathJaxContext>
              {/* <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="hover:cursor-pointer text-red-700 text-lg"
                  onClick={() => eliminarProblema(problema.id)}
                /> */}
              <div className="w-full md:flex gap-2 items-center justify-between mt-3 flex-wrap">
                {problema.opciones.map((opcion, key) => (
                  <div key={key} className="my-3 md:my-0">
                    <MathJaxContext>
                      <div className="flex items-center">
                        <span className="font-bold mr-3">
                          {`${convertCharCode(charCode + key)})`}
                        </span>
                        <MathJax className="my-5 mx-auto">
                          {opcion != "" ? `\\(${opcion}\\)` : ""}
                        </MathJax>
                      </div>
                    </MathJaxContext>
                  </div>
                ))}
              </div>
              <div className="mt-3 font-bold">
                Respuesta Correcta:{" "}
                <span className="font-normal">
                  {convertCharCode(charCode + problema.respuesta)}
                </span>
              </div>
              <div className="mt-3 font-bold">
                Categoría:{" "}
                <span className="font-normal">{problema.categoria}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Panel;
