import { FC, SyntheticEvent, useState } from "react";
import { RegistrationUI } from "../ui";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { registerUserThunk } from "../../services/userSlice";

export const Registration: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ name, email, password }));
    navigate('/home');
  }

  return (<RegistrationUI name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit}></RegistrationUI>)
}