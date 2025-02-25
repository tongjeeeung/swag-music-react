import { useEffect } from "react";
import { Profile } from "../../components";

export const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="main">
      <Profile></Profile>
    </main>
  );
};
