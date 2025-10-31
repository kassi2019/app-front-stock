import React from "react";
import { useState } from "react";
import { messageSucces, messageErreur } from "../globalComponents/Notification";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../Service/login";
import { useNavigate } from "react-router-dom";
export const useLogiqueLogin = () => {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { status } = useSelector((s) => s.login);
  const navigate = useNavigate();
  const isFormValid = matricule.trim() !== "" && password.trim() !== "";

  const handleChangeMatricule = (e) => setMatricule(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ matricule, password })).unwrap();

      sessionStorage.setItem("shouldReloadHome", "true");
      messageSucces("Connexion reussi");
      navigate(`/PageTableauBord/${1}`, { replace: true });
    } catch (err) {
      messageErreur("Échec de la connexion");

      console.error(err);
    }
  };
  return {
    handleChangeMatricule,
    handleChangePassword,
    handleSubmit,
    isFormValid,
    matricule,
    password,
    status,
  };
};
