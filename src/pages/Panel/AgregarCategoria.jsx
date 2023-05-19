import React, { useState, useEffect } from "react";
import Header from "../../components/Panel/Header";
import Loader from "../../components/Panel/Loader";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import Swal from "sweetalert2";

const AgregarCategoria = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({ value: "", error: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

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
        position: "top-end",
        icon: "error",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SOCKET_URL}/categories`,
        {
          name: category.value,
        }
      );

      if (response.status == 201) {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        setCategory({ value: "", error: "" });
        setCategories([]);
        getCategories();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.status == 400) {
        setCategory({ ...category, error: error.response.data.errors.name });
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

  const deleteCategory = (id) => {
    Swal.fire({
        title: '¿Desea eliminar esta categoría?',
        icon: 'question',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#166534',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#991b1b'
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`${process.env.REACT_APP_SOCKET_URL}/categories/${id}`);
            if (response.status == 200) {
              Swal.fire({
                title: response.data.msg,
                icon: 'success'
              }).then(result => {
                if (result.isConfirmed) {
                  setCategories([]);
                  getCategories();
                }
              });
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: error.response.data.msg,
              icon: 'error'
            }).then(result => {
              if (result.isConfirmed) {
                setCategories([]);
                getCategories();
              }
            });
          }
        }
      });
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex justify-center items-center">
        {categories.length > 0 ? (
          <div className="border-2 rounded-md shadow-md w-1/2 mt-10 py-5 px-4 bg-white border-gray-200">
            <h2 className="text-lg font-bold text-center">Lista Categorías</h2>
            {categories.map((category, key) => (
              <div className="w-full flex justify-between items-center mr-4 p-2 border mb-2 rounded-md shadow border-gray-200" key={key}>
                <div className="flex">
                  <span className="font-bold mr-2">{key + 1}.-</span>
                  <p>{category.nombre}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="hover:cursor-pointer text-red-700 text-lg"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex justify-center items-center">
        <form
          className="border-2 rounded-md shadow-md w-1/2 my-10 py-5 px-4 bg-white border-gray-200"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col">
            <label htmlFor="category" className="font-bold mb-1">
              Categoría:{" "}
            </label>
            <div>
              <input
                id="problem"
                name="problem"
                type="text"
                placeholder="Ej. Quimica"
                className="w-full border-2 py-2 px-1 rounded-md outline-none focus:border-blue-500 border-gray-200"
                value={category.value}
                onChange={(e) =>
                  setCategory({ value: e.target.value, error: "" })
                }
              />
              {category.error ? (
                <p className="p-2 bg-red-600 text-white text-center rounded mt-3">
                  {category.error}
                </p>
              ) : null}
            </div>
          </div>

          {loading && (
            <div>
              <Loader />
            </div>
          )}

          <div className="flex flex-col">
            <input
              type="submit"
              value="Crear"
              className="w-full px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 transition-all duration-300 text-white mt-3 hover:cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarCategoria;
