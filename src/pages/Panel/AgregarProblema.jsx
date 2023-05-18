import React, { useState, useEffect } from "react";
import Header from "../../components/Panel/Header";
import Formulario from "../../components/Panel/Formulario";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";

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
  const [post, setPost] = React.useState(null);

  /** --- AQUI SE OBTIENE EL ID DEL LINK --- **/
  const { id } = useParams();
  console.log(id);
 
    
  
    useEffect(()=>{
      if(id){
        //  getQuestion();
        question();
        
      }
      
    }, []);

    // function getQuestion()  {
    //   axios.get(`${process.env.REACT_APP_SOCKET_URL}/panel/editar-problema/${id}`).then((response)=>{
    //     console.log(response);
    //     // setOptions(response.data);
    //     // setErrorOptions(response.data);
    //     // setProblem(response.data);
    //     // setPreviewImage(response.data);
    //     // setCorrectAnswer(response.data);
    //     // setEcuacion(response.data);
    //     // setCategories(response.data);
    //     // setCategory(response.data);

        
    //   });
    // }
    

    const question = async () =>{
      try{
        const response =  await axios.get(`${process.env.REACT_APP_SOCKET_URL}/panel/editar-problema/${id}`);
        console.log(response.data);

        document.querySelector('#problem').value = `${response.data.problem}`;
        document.querySelector('#correct').value = `${response.data.correct}`;
        document.querySelector('#category').value = `${response.data.category}`;
        

         
        
      }catch(error){
        console.log(error);
      }
      

    }

  useEffect(() => {
    getCategories();
  }, []);

  // const handleChangeImage = (e) => {
  //   const array = [];
  //   const arrayOptions = [];
  //   Object.values(e.files).forEach((file, key) => {
  //     arrayOptions.push(file);
  //     setOptions(arrayOptions);
  //     const image = URL.createObjectURL(e.files[key]);
  //     array.push(image);
  //   });
  //   return setPreviewImage(array);
  // };

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
        // const formData = new FormData();
        // options.forEach(option => {
        //     formData.append('options', option);
        // });
        // const response = await axios({
        //     method: 'POST',
        //     url: `${import.meta.env.VITE_BACKEND}/guardarImagen-ejercicio/${saveAnswer.data.problema}`,
        //     data: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "Accept": "json/application"
        //     }
        // });
        // setLoading(false);
        // if (response.status == 201) {
        //     setOptions([]);
        //     setProblem({ value: '', error: '' });
        //     setPreviewImage({ value: '', error: '' });
        //     setCorrectAnswer({ value: '', error: '' });
        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'success',
        //         title: response.data.msg,
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // } else {
        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'error',
        //         title: 'Lo sentimos, ha habido un error',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // }
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
      />
    </div>
  );
};

export default AgregarProblema;
