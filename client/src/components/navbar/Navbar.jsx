import React, { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    context.setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <span className="nav-icon">
        <img
          src="https://media.licdn.com/dms/image/v2/C4D0BAQGoOBqYjdUUjQ/company-logo_200_200/company-logo_200_200/0/1630479397724/boltinsight_logo?e=1735776000&v=beta&t=1ULZJVXlfiP9B5WB14lx8VPxHIIhiQju-6mLVWpuRLU"
          alt=""
          width={30}
        />{" "}
        <Link>Bolt-Insight</Link>
      </span>
      <span>
        {context.user ? (
          <Link
            to="/login"
            style={{ marginRight: "2rem" }}
            onClick={handleClick}
          >
            Çıkış Yap
          </Link>
        ) : (
          <Link to="/login" style={{ marginRight: "2rem" }}>
            Giriş Yap
          </Link>
        )}{" "}
      </span>
    </div>
  );
};

export default Navbar;
