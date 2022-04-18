import { useSelector, useDispatch } from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {fetchPeople, selectAllPeople} from "./swPeopleSlice";
import {Badge, Card, ListGroup} from "react-bootstrap";
import Pagination from "../../components/Pagination";

let PageSize = 10;

const SwPeopleList = () => {
    const dispatch = useDispatch();

    const people = useSelector(selectAllPeople);
    const [currentPage, setCurrentPage] = useState(1);

    const currentPeopleData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return people.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, people]);

    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch]);

    const content = currentPeopleData.map((p, index) => {
        return <ListGroup.Item
            key={index}
            action
            variant="secondary"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{p.name}</div>
            </div>
            <Badge bg="primary" pill> {p.films.length === 1 ? p.films.length + " movie" : p.films.length + " movies"}
            </Badge>
        </ListGroup.Item>
    });

    return (
        <Card>
            <Card.Header>
                <Card.Title>Star Wars People</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={people.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Card.Footer>
        </Card>
    )
}
export default SwPeopleList
