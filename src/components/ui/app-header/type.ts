import { MouseEventHandler } from "react";

export type TAppHeaderUIProps = {
  userName: string | undefined;
  userAvatar: string | undefined;
  thremeVoid: MouseEventHandler;
  logOutHandle: MouseEventHandler;
}