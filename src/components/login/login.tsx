import { FC, SyntheticEvent, useState } from "react";
import { LoginUI } from "../ui";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { loginUserThunk } from "../../services/userSlice";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
    navigate('/home');
  }

  return (<LoginUI email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit}></LoginUI>)
}