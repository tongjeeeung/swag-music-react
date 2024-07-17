import { FC } from "react";
import { BlogUI } from "../ui";
import { useSelector } from "../../services/store";
import { getArticles } from "../../services/blogSlice";

export const Blog: FC = () => {
  const articles = useSelector(getArticles);
  return <>{articles.length > 0 && (<BlogUI children={articles}></BlogUI>)}</>
}