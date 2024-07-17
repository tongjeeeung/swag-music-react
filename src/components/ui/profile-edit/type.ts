import { Dispatch, SetStateAction, SyntheticEvent } from "react";

export type ProfileEditUIProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  avatar: string,
  setAvatar: Dispatch<SetStateAction<string>>;
}