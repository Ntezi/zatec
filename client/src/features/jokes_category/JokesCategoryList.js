import {useSelector, useDispatch} from "react-redux";
import {selectAllCategories, fetchCategories} from "./jokesCategorySlice";
import {useCallback, useEffect, useState, useMemo} from "react";
import {Card, Col, ListGroup, Row, Tab} from "react-bootstrap";
import {fetchJoke, selectJoke} from "../joke/jokesSlice";
import Pagination from "../../components/Pagination";

let PageSize = 10;

const JokesCategoryList = () => {
    const dispatch = useDispatch();

    const categories = useSelector(selectAllCategories);
    const joke = useSelector(selectJoke);

    const [currentPage, setCurrentPage] = useState(1);

    const currentJokeCategoriesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return categories.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    const onJokeCategoryClicked = useCallback(async (event) => {
        await dispatch(fetchJoke(event.target.innerText));
    }, [dispatch])

    const tabContent = currentJokeCategoriesData.map((category, index) => {
        return <ListGroup.Item
            key={index}
            onClick={onJokeCategoryClicked}
            href={`#${category}`}
            action
            variant="primary"
        >
            {category.charAt(0).toUpperCase() + category.slice(1)}
        </ListGroup.Item>
    });

    const content = currentJokeCategoriesData.map((category, index) => {
        return <Tab.Pane
            key={index}
            eventKey={`#${category}`}
        >
            {joke.value}
        </Tab.Pane>
    });
    return (
        <Card>
            <Card.Header>
                <Card.Title>Chuck Norris Jokes</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Animal">
                        <Row>
                            <Col sm={5}>
                                <ListGroup>
                                    {tabContent}
                                </ListGroup>
                            </Col>
                            <Col sm={6}>
                                <Tab.Content>
                                    {content}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={categories.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Card.Footer>
        </Card>
    )
}
export default JokesCategoryList
