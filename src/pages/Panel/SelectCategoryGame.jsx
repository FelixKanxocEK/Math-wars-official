import React, { useState, useEffect } from "react";
import Header from "../../components/Panel/Header";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";

const SelectCategoryGame = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategoryGame, setSelectCategoryGame] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    selectCategoryToGame(selectCategoryGame);
  }, [selectCategoryGame]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SOCKET_URL}/categories`);
      console.log(response);
      if (response.status === 200) {
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

  const selectCategoryToGame = async (id) => {
    if (id !== "") {
      console.log(id);
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_SOCKET_URL}/playing-category/${id}`
        );
        console.log(response);
        if (response.status === 200) {
            setSelectCategoryGame("");
            setCategories([]);
            Swal.fire({
                title: response.data.msg,
                icon: 'success',
            }).then(result => {
                if(result.isConfirmed){
                    getCategories();
                }
            })
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.msg,
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            setCategories([]);
            setSelectCategoryGame('');
            getCategories();
          }
        });
      }
    }
  };

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div>
        <h2 className="text-3xl font-bold text-center my-5 uppercase">
          Categorias para jugar
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col px-3">
            <label htmlFor="category" className="font-bold">
              Selecciona la categoría para mostrar en el juego
            </label>
            <select
              name="category"
              id="category"
              className="border-2 py-2 px-1 mt-2 rounded-md outline-none focus:border-blue-500"
              value={selectCategoryGame}
              onChange={(e) => setSelectCategoryGame(e.target.value)}
            >
              <option value="">-- Selecciona una opción --</option>
              {categories.map((category, key) => (
                <option value={category.id} key={key}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap mx-auto gap-3 my-10 w-11/12 justify-center">
          <div className="py-2 px-3 shadow">
            {categories.map((category, key) => (
              <div key={key}>
                {category?.playing == true ? (
                  <div className="mx-3 py-3 px-5 shadow-md rounded-md bg-green-600 my-2 text-white flex justify-between items-center gap-4">
                    <p>{category.nombre}</p>
                    <button 
                        onClick={() => selectCategoryToGame(category.id)}
                    className="text-red-600 bg-white rounded-full hover:bg-gray-300 transition-all duration-300">
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryGame;
