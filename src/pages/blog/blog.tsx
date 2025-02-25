import { FC, useEffect } from "react";
import { Blog } from "../../components";
import { useSelector } from "../../services/store";
import { getIsLoadint } from "../../services/blogSlice";
import { Preloader } from "../../components/ui";

export const BlogPage: FC = () => {
  const isLoadingBlog = useSelector(getIsLoadint);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {isLoadingBlog ? (
        <Preloader></Preloader>
      ) : (
        <main className="main">
          <Blog></Blog>
        </main>
      )}
    </>
  );
};
