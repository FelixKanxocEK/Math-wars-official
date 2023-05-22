import React, { useState, useEffect } from "react";
import Header from "../../components/Panel/Header";
import Formulario from "../../components/Panel/Formulario";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AgregarProblema = () => {
  const [options, setOptions] = useState([]);
  const [errorOptions, setErrorOptions] = useState("");
  const [problem, setProblem] = useState({ value: "", error: "" });
  const [previewImage, setPreviewImage] = useState([]);
  const [messageError, setMessageError] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);

  const [ecuacion, setEcuacion] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ value: "", error: "" });
  const navigate = useNavigate()

  /** --- AQUI SE OBTIENE EL ID DEL LINK --- **/
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getCategories();
    if (id) {
      getQuestion();
    }
  }, []);

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_URL}/panel/${id}`
      );
      console.log(response.data);
      if (response.status == 200) {
        console.log(response.data.problema.categoria);
        setProblem({ value: response.data.problema.planteamiento, error: "" });
        setOptions(JSON.parse(response.data.problema.opciones));
        setCorrectAnswer({
          value: response.data.problema.respuestaCorrecta,
          error: "",
        });
        setCategory({ value: response.data.problema.categoria, error: "" });
      }

      // document.querySelector("#problem").value = `${response.data.problem}`;
      // document.querySelector("#correct").value = `${response.data.correct}`;
      // document.querySelector("#category").value = `${response.data.category}`;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOption = (option) => {
    setPreviewImage(previewImage.filter((op, key) => key !== option));
    setOptions(options.filter((op, key) => key !== option));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (options.length < 2) {
      setErrorOptions("Deben haber al menos 2 respuestas");
    }
    if (id) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_SOCKET_URL}/panel/${id}`,
          {
            problem: problem.value,
            answers: options,
            correct: correctAnswer.value,
            id_categoria: category.value,
          }
        );
        if (response.status == 200) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: response.data.msg,
          }).then(result => {
            if(result.isConfirmed){
              navigate('/panel');
            }
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response.status == 400) {
          setProblem({ ...problem, error: error.response.data.errors.problem });
          setCorrectAnswer({
            ...correctAnswer,
            error: error.response.data.errors.correct,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SOCKET_URL}/registrar-ejercicio`,
          {
            problem: problem.value,
            answers: options,
            correct: correctAnswer.value,
            id_categoria: category.value,
          }
        );
        setLoading(false);
        if (response.status == 201) {
          console.log(response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
          setProblem({ value: "", error: "" });
          setCorrectAnswer({ value: "", error: "" });
          setErrorOptions("");
          setOptions([]);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response.status == 400) {
          setProblem({ ...problem, error: error.response.data.errors.problem });
          setCorrectAnswer({
            ...correctAnswer,
            error: error.response.data.errors.correct,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.response.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
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
      Swal.fire({
        title: "Lo sentimos, ha ocurrido un error",
        text: "Intentelo más tarde",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <div className="w-full mt-10 mb-3 text-center">
        <h2 className="text-3xl font-bold uppercase">{id ? 'Editar Problema' : 'Agregar Problema'}</h2>
      </div>
      <div className="flex justify-end items-end w-full px-5">
        <a className="rounded-lg bg-blue-500 hover:bg-blue-700 transition-all duration-300 px-4 py-3 text-white" href="https://www.hostmath.com/Default.aspx" target={"_blank"}>¿Como crear problema?</a>
      </div>

      <Formulario
        handleSubmit={handleSubmit}
        previewImage={previewImage}
        messageError={messageError}
        options={options}
        setOptions={setOptions}
        deleteOption={deleteOption}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
        loading={loading}
        problem={problem}
        setProblem={setProblem}
        errorOptions={errorOptions}
        ecuacion={ecuacion}
        setEcuacion={setEcuacion}
        categories={categories}
        category={category}
        setCategory={setCategory}
        id={id}
      />
    </div>
  );
};

export default AgregarProblema;
