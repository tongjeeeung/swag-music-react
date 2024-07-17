import { Dispatch, SetStateAction, SyntheticEvent } from "react";

export type RegistrationUIProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}