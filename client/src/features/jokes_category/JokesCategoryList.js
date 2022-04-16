import { useSelector, useDispatch } from "react-redux";
import {selectAllCategories, fetchCategories, getCategoriesStatus, getCategoriesError} from "./jokesCategorySlice";
import { useEffect } from "react";

const JokesCategoryList = () => {
    const dispatch = useDispatch();

    const categories = useSelector(selectAllCategories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])


    const content = categories.map((category, index) => <li key={index}>{category}</li>)

    return (
        <section>
            <h2>Jokes Categories</h2>
            <ul>
                {content}
            </ul>
        </section>
    )
}
export default JokesCategoryList
