import React, { useState } from "react";
import { convertCharCode } from "../../helpers/ResetOptions";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Loader from "./Loader";
import Latex from "react-latex";

const Formulario = ({
  handleSubmit,
  messageError,
  options,
  setOptions,
  deleteOption,
  correctAnswer,
  setCorrectAnswer,
  loading,
  problem,
  setProblem,
  errorOptions,
  ecuacion,
  setEcuacion,
  categories,
  category,
  setCategory,
}) => {
  const [charCode, setCharCode] = useState(97);

  const handleAddAnswer = () => {
    setOptions([...options, ecuacion]);
    setEcuacion("");
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="border-2 rounded-md shadow-md w-1/2 my-10 py-5 px-4 bg-white"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col">
          <label htmlFor="problem" className="font-bold mb-1">
            Problema:{" "}
          </label>
          <input
            id="problem"
            name="problem"
            type="text"
            placeholder="Escribe el problema..."
            className="border-2 py-2 px-1 rounded-md outline-none focus:border-blue-500"
            value={problem.value}
            onChange={(e) => setProblem({ value: e.target.value, error: "" })}
          />
          <div className="mt-6 flex justify-center">
            <Latex>{problem.value != "" ? `$$${problem.value}$$` : ""}</Latex>
          </div>
          {problem.error ? (
            <p className="p-2 bg-red-600 text-white text-center rounded mt-3">
              {problem.error}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="option" className="font-bold mb-1">
            Respuesta:
          </label>
          {options.length < 3 ? (
            <>
              <textarea
                value={ecuacion}
                onChange={(e) => setEcuacion(e.target.value)}
                className="border-2 py-2 px-1 rounded-md outline-none focus:border-blue-500"
              />
              <div className="mt-6 mb-6 flex justify-center">
                <Latex>
                  {ecuacion != "" ? `$$${ecuacion}$$` : ""}
                </Latex>
              </div>
              <button
                type="button"
                className="border rounded py-1 px-2 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAddAnswer}
              >
                Agregar Respuesta
              </button>
            </>
          ) : null}
        </div>
        {messageError ? (
          <div>
            <p className="text-sm bg-red-600 text-white text-center p-2 rounded mt-4">
              {messageError}
            </p>
          </div>
        ) : null}
        <div className="flex flex-col mt-4">
          <ol>
            {options.map((option, key) => (
              <li className="flex justify-between items-center my-4" key={key}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    <span className="font-bold mr-3">
                      {`${convertCharCode(charCode + key)})`}
                    </span>
                    <MathJaxContext>
                      <MathJax>{option ? `\\(${option}\\)` : ""}</MathJax>
                    </MathJaxContext>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="bg-red-600 rounded-full text-white"
                      onClick={() => deleteOption(key)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 m-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {options.length >= 2 ? (
          <>
            <div className="mb-2">
              <label htmlFor="correct" className="font-bold mb-1">
                Selecciona la respuesta correcta
              </label>
              <select
                name="correct"
                id="correct"
                className="border-2 py-2 px-1 mt-2 rounded-md outline-none focus:border-blue-500 w-full"
                value={correctAnswer.value}
                onChange={(e) =>
                  setCorrectAnswer({ value: e.target.value, error: "" })
                }
              >
                <option value=""> --- Seleccione una opcion --- </option>
                {options.map((op, key) => (
                  <option key={key} value={key}>
                    Opción {convertCharCode(charCode + key)}
                  </option>
                ))}
              </select>
              {correctAnswer.error ? (
                <p className="p-2 bg-red-600 text-white text-center rounded mt-3">
                  {correctAnswer.error}
                </p>
              ) : null}
            </div>
            <div className="mb-2">
              <label htmlFor="category" className="font-bold mb-1">
                Selecciona la categoría
              </label>
              <select
                name="category"
                id="category"
                className="border-2 py-2 px-1 mt-2 rounded-md outline-none focus:border-blue-500 w-full"
                value={category.value}
                onChange={(e) =>
                  setCategory({ value: e.target.value, error: "" })
                }
              >
                <option value=""> --- Seleccione una opcion --- </option>
                {categories.map((op, key) => (
                  <option key={key} value={op.id}>
                    {op.nombre}
                  </option>
                ))}
              </select>
              {category.error ? (
                <p className="p-2 bg-red-600 text-white text-center rounded mt-3">
                  {category.error}
                </p>
              ) : null}
            </div>
            {loading && (
              <div>
                <Loader />
              </div>
            )}
            {errorOptions && (
              <p className="p-2 bg-red-600 text-white text-center rounded mt-3">
                {errorOptions}
              </p>
            )}
            <div className="flex w-full">
              <button
                type="submit"
                className="w-full px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 transition-all duration-300 text-white mt-3 hover:cursor-pointer"
              >
                Registrar Problema
              </button>
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
};

export default Formulario;
