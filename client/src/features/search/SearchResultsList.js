import { useSelector, useDispatch } from "react-redux";
import {useEffect, useMemo, useState, useCallback} from "react";
import {Badge, Card, Form, ListGroup} from "react-bootstrap";
import Pagination from "../../components/Pagination";
import {fetchResults, search} from "./searchSlice";
import {escape} from "../../helpers/HTMLEscape";

let PageSize = 10;

const SearchResultsList = () => {
    const dispatch = useDispatch();

    const results = useSelector(search);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(1);

    const currentResultsData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return results.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, results]);

    useEffect(() => {
        dispatch(fetchResults(searchQuery));
    }, [searchQuery, dispatch]);


    const onSearchChange = useCallback(async (event) => {
        setSearchQuery(event.target.value)
    }, [setSearchQuery])

    const content = currentResultsData.map((result, index) => {
        return <ListGroup.Item
            key={index}
            action
            variant="info"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{escape(result.name)}</div>
            </div>
            <Badge bg="primary" pill>
                {result.origin}
            </Badge>
        </ListGroup.Item>
    });

    return (
        <Card>
            <Card.Header>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Type keyword to search"
                            onChange={onSearchChange}
                        />
                        <Form.Text className="text-muted">
                            Search Chuck Norris Jokes or Star Wars People
                        </Form.Text>
                    </Form.Group>
                </Form>
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
                    totalCount={results.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Card.Footer>
        </Card>
    )
}
export default SearchResultsList
