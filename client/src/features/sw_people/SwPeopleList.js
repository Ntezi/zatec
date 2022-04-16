import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {fetchPeople, selectAllPeople} from "./swPeopleSlice";

const SwPeopleList = () => {
    const dispatch = useDispatch();

    const people = useSelector(selectAllPeople);
    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch])


    const content = people.map((p, i) => <li key={i}>{p.name}</li>)

    return (
        <section>
            <h2>Star Wars People</h2>
            <ul>
                {content}
            </ul>
        </section>
    )
}
export default SwPeopleList
