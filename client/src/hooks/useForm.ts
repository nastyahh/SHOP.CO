import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { HOME_ROUTE } from "../utils/consts";

const useForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? (checked ? "ADMIN" : "USER") : value,
    });
  };

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    action: Function
  ) => {
    e.preventDefault();

    try {
      const result = await action(formState).unwrap();
      localStorage.setItem("token", result.token);
      dispatch(
        setAuth({
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          role: result.user.role,
        })
      );
      setTimeout(() => navigate(HOME_ROUTE), 2500);
      return result;
    } catch (error) {
      console.log("Ошибка авторизации:", error);
      return error;
    }
  };

  return { handleForm, handleInput, formState };
};

export default useForm;
