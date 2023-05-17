import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo-math-wars.png';

const Header = () => {
  return (
    <div className="w-full bg-green-900 text-white p-4 flex justify-between items-center">
      <div className="w-full md:w-width_49">
        <img src={logo} alt="Logo math wars" width="100" />
      </div>
      <div className="w-full md:w-width_49 flex justify-end">
        <Link
          to="/panel"
          className="borde-enlace uppercase transition-all duration-300 mr-3"
        >
          Panel
        </Link>
        <Link
          to="/panel/agregar-problema"
          className="borde-enlace uppercase transition-all duration-300 mr-3"
        >
          Agregar Pregunta
        </Link>
        <Link
          to="/panel/agregar-categoria"
          className="borde-enlace uppercase transition-all duration-300"
        >
          Categorías
        </Link>
      </div>
    </div>
  );
};

export default Header;
