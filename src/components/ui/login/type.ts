import { Dispatch, SetStateAction, SyntheticEvent } from "react";

export type LoginUIProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}