import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup.string().email().required("Email alanı zorunludur"),
    password: yup.string().required("Şire alanı zorunludur"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:8800/auth/login",
          values
        );
        context.setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data);
        navigate("/");

        // navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: validationSchema,
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://emotionapi.onrender.com/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center  border-2 m-2 relative bg-white h-[32rem] rounded-xl">
      <form
        onSubmit={formik.handleSubmit}
        className="p-8 flex justify-center flex-col  gap-4 "
      >
        <h1 className="flex justify-center	text-2xl items-center">
          Bilgisayar Mühendisliği Staj Otomasyonu
        </h1>

        <TextField
          id="email"
          name="email"
          label="E-mail"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Box className="flex flex-col">
          <TextField
            id="password"
            name="password"
            label="Şifre"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />{" "}
          <Link className="mt-2" component="a" href="/password-change">
            Şifremi unuttum
          </Link>
        </Box>

        <Box className="flex flex-col">
          <Button
            className="p-3"
            type="submit"
            color="primary"
            variant="outlined"
          >
            Gönder
          </Button>
          <Link className="mt-2" component="a" href="/register">
            Kayıt Ol
          </Link>
        </Box>
      </form>
    </div>
  );
}

export default Login;
