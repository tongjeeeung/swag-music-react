import { Dispatch, MouseEventHandler, SetStateAction, SyntheticEvent } from "react"
import { Location } from 'react-router-dom';
import { TPlaylist } from "../../../utils/types";

export type ProfileUIProps = {
  name: string,
  setName: Dispatch<SetStateAction<string>>,
  email: string,
  setEmail: Dispatch<SetStateAction<string>>,
  avatar: string,
  setAvatar: Dispatch<SetStateAction<string>>,
  editHadnle: MouseEventHandler,
  edit: boolean,
  handleSubmit: (e: SyntheticEvent) => void;
  userAlbums: TPlaylist[];
  locationState: { background: Location };
}