import { FC } from "react";
import { Blog } from "../../components";
import { useSelector } from "../../services/store";
import { getIsLoadint } from "../../services/blogSlice";
import { Preloader } from "../../components/ui";

export const BlogPage: FC = () => {
  const isLoadingBlog = useSelector(getIsLoadint);

  return <>{isLoadingBlog ? (<Preloader></Preloader>) : (
    <main className='main'>
      <Blog></Blog>
    </main>
  )}</>
}