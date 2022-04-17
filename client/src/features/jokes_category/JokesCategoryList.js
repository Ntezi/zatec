import {useSelector, useDispatch} from "react-redux";
import {selectAllCategories, fetchCategories} from "./jokesCategorySlice";
import {useCallback, useEffect, useState} from "react";
import {Card, Col, ListGroup, Row, Tab} from "react-bootstrap";
import {fetchJoke, selectJoke} from "../joke/jokesSlice";

const JokesCategoryList = () => {
    const dispatch = useDispatch();

    const onJokeCategoryClicked = useCallback(async (event) => {
        await dispatch(fetchJoke(event.target.innerText));
    }, [dispatch])


    const categories = useSelector(selectAllCategories);
    const joke = useSelector(selectJoke);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])


    const tabContent = categories.map((category, index) => {
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

    const content = categories.map((category, index) => {
        return <Tab.Pane
            key={index}
            eventKey={`#${category}`}
        >
            {joke.value}
        </Tab.Pane>
    });
    return (
        <section>
            <Card>
                <Card.Body>
                    <Card.Title>Jokes Categories</Card.Title>
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
            </Card>
        </section>
    )
}
export default JokesCategoryList
