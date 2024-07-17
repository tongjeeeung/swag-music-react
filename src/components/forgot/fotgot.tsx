import { FC, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { changePasswordThunk } from "../../services/userSlice";
import { ForgotUI } from "../ui";

export const Forgot: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changePasswordThunk({ email, password }));
    navigate('/login');
  }

  return (
    <ForgotUI email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit}></ForgotUI>
  );
};