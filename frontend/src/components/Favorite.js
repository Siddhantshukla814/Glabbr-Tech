import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favouriteListContacts } from "../actions/contactActions";
import { Star, StarFill, ChatLeftDots, Telephone } from "react-bootstrap-icons";
import Loader from "./Loader";
import { Card, Button, Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function Favorite() {
  const dispatch = useDispatch();

  const contactFavouriteList = useSelector(
    (state) => state.contactFavouriteList
  );
  const { loading, contacts, error } = contactFavouriteList;

  useEffect(() => {
    dispatch(favouriteListContacts());
  }, [dispatch]);

  return (
    <>
      <Link to="/favourites">
        <h4 className="headings">Favorite List</h4>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <h4>{error}</h4>
      ) : (
        <div id="wrapper">
          <div className="py-4 scrollbar" id="style-7">
            <Row className="flex-nowrap">
              {contacts.length !== 0 ? (
                contacts.map((fav) => (
                  <Col md={3} key={fav._id}>
                    <Link to={"/contact/" + fav._id}>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={4}>
                              <Image src={fav.image} rounded fluid />
                            </Col>
                            <Col md={6}>
                              <h6>
                                <strong>{fav.name}</strong>
                              </h6>
                              <h6>{fav.username}</h6>
                            </Col>
                            <Col md={2}>
                              <StarFill size={20} style={{ color: "gold" }} />
                            </Col>
                          </Row>
                          <hr />
                          <Card.Text>
                            <strong>{fav.status}</strong>
                            <br />
                            {fav.location}
                          </Card.Text>

                          <Row>
                            <Col>
                              <Button variant="light">
                                <ChatLeftDots />
                                &nbsp;&nbsp;Message
                              </Button>
                            </Col>
                            <Col>
                              <Button variant="light">
                                <Telephone />
                                &nbsp;&nbsp;Call
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              ) : (
                <p>No Favorites Found</p>
              )}
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default Favorite;
