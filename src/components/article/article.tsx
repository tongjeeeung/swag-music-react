import { FC, useEffect } from "react";
import { ArticleHeaderUI, Preloader } from "../ui";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import { getArticle, getArticleThunk, getIsLoadint } from "../../services/blogSlice";

export const Article: FC = () => {
  const articleId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleThunk(`${articleId.id}`));
  }, [])

  const isLoading = useSelector(getIsLoadint);
  const article = useSelector(getArticle);

  return <>{isLoading ? (<Preloader></Preloader>) : (<ArticleHeaderUI name={article.name} titleFir={article.title} titleSec={article.subtitle ? article.subtitle : ''} imgFir={article.image} imgSec={article.image_2 ? article.image_2 : ''}></ArticleHeaderUI>)}</>
}