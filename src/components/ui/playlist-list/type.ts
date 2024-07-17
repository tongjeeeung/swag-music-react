import { TPlaylist } from "../../../utils/types";
import { Location } from 'react-router-dom';

export type TPlayListList = {
  title: string;
  children: TPlaylist[];
  locationState: { background: Location };
  isAuth: boolean;
}