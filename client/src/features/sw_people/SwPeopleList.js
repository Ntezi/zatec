import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {fetchPeople, selectAllPeople} from "./swPeopleSlice";
import {Badge, Card, ListGroup} from "react-bootstrap";

const SwPeopleList = () => {
    const dispatch = useDispatch();

    const people = useSelector(selectAllPeople);
    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch])

    const content = people.map((p, index) => {
        return <ListGroup.Item
            key={index}
            action
            variant="secondary"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{p.name}</div>
                <a href={p.url} target={"_blank"}>Read More</a>
            </div>
            <Badge bg="primary" pill>
                Number of movies: {p.films.length}
            </Badge>
        </ListGroup.Item>
    })

    return (
        <section>
            <Card>
                <Card.Body>
                    <Card.Title>Star Wars People</Card.Title>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </section>
    )
}
export default SwPeopleList
