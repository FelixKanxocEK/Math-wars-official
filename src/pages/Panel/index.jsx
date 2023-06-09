import React, { useState, useEffect } from "react";
import Header from "../../components/Panel/Header";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { convertCharCode } from "../../helpers/ResetOptions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import Swal from "sweetalert2";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link, useParams } from "react-router-dom";

const Panel = () => {
  const [problemas, setProblemas] = useState([]);
  const charCode = 97;
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [copyProblems, setCopyProblems] = useState([]);

  useEffect(() => {
    getProblemas();
    getCategories();
  }, []);

  useEffect(() => {
    filter(filterCategory);
  }, [filterCategory]);

  

  const getProblemas = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_URL}/panel`
      );
      const problemasArray = [];
      if (response.status === 200) {
        response.data.data.map((problema) => {
          let opcionesRespuestas = JSON.parse(problema.opciones);
          problemasArray.push({
            id: problema.id,
            planteamiento: problema.planteamiento,
            opciones: opcionesRespuestas,
            respuesta: problema.Respuesta.opcion,
            categoria: problema.categoria.nombre,
            id_categoria: problema.id_categoria
          });
          return opcionesRespuestas;
        });
        setProblemas(problemasArray);
        setCopyProblems(problemasArray);
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
      console.log(error);
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

  const filter = (idCategory) => {
    if(idCategory == ''){
      setProblemas([...copyProblems]);
    }else {
      const filterCategory = copyProblems.filter(category => category.id_categoria == idCategory);
      setProblemas(filterCategory);
    }
  };

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div>
        <h2 className="text-3xl font-bold text-center my-5 uppercase">
          Preguntas
        </h2>
        <div className="flex mb-6 w-11/12 mx-auto justify-between items-center">
          <div className="flex flex-col">
            <label htmlFor="category" className="font-bold">
              Filtrar Categoria
            </label>
            <select
              name="category"
              id="category"
              className="border-2 py-2 px-1 mt-2 rounded-md outline-none focus:border-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">-- Selecciona una opción --</option>
              {categories.map((category, key) => (
                <option value={category.id} key={key}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Link className="border shadow bg-green-600 hover:bg-green-700 transition-all duration-300 py-2 px-3 rounded-md text-white" to="/panel/seleccionar-categoria-juego">Seleccionar Categoria a jugar</Link>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto gap-3 my-3">
          {problemas.length > 0 ? (
            <>
            {problemas.map((problema, key) => (
              <div
                className="w-11/12 md:w-5/12 px-6 py-4 mb-5 mx-auto bg-white border rounded-md shadow-md"
                key={key}
              >
                <div className="flex justify-between flex-col relative">
                  <div>
                    <span className="font-bold">Problema:</span>{" "}
                    <span className="preview-mathjax">
                      <MathJaxContext>
                        <MathJax className="mt-3">
                          {problema.planteamiento != ""
                            ? `\\(${problema.planteamiento}\\)`
                            : ""}
                        </MathJax>
                      </MathJaxContext>
                    </span>
                  </div>
                  <div>
                  <Link
                      to={`/panel/editar-problema/${problema.id}`}
                      className="hover:cursor-pointer text-blue-700 text-lg absolute top-0 right-10"
                    >
                      <ModeEditIcon />
                    </Link>
                  <button
                    type="button"
                    className="hover:cursor-pointer text-red-700 text-lg absolute top-0 right-0"
                    onClick={() => eliminarProblema(problema.id)}
                  >
                    <DeleteOutlineIcon />
                  </button>

                  </div>
                </div>
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
            </>
          ) : (
            <div className="w-11/12 mx-auto">
              <h2 className="text-3xl text-gray-500 text-center font-bold">No hay resultados</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
