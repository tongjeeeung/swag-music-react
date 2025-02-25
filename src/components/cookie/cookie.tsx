import { FC, useState } from "react";
import { CookieUI } from "../ui";

export const Cookie: FC<{ isCookie: boolean }> = ({ isCookie }) => {
  const [isShowCookie, setShowCookie] = useState(true);

  const acceptCookie = () => {
    setShowCookie(false);
  };

  if (!isCookie && isShowCookie)
    return <CookieUI acceptCookie={acceptCookie}></CookieUI>;
  return <></>;
};
