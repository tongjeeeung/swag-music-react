import { FC, useEffect } from "react";
import { Forgot } from "../../components";

export const ForgotPage: FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="main">
      <Forgot></Forgot>
    </main>
  );
};
