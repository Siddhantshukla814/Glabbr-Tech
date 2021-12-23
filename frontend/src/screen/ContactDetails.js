import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  listContactDetails,
  listContacts,
  updateContact,
} from "../actions/contactActions";
import {
  Container,
  Image,
  Row,
  Col,
  Button,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import Loader from "../components/Loader";
import axios from "axios";

function ContactDetails() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [fav, setFav] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let match = useParams();
  let history = useNavigate();

  const dispatch = useDispatch();

  const contactDetails = useSelector((state) => state.contactDetails);
  const { loading, error, contact } = contactDetails;

  useEffect(() => {
    dispatch(listContactDetails(match.id));

    if (contact) {
      setImage(contact.image);
      setName(contact.name);
      setUserName(contact.username);
      setStatus(contact.status);
      setLocation(contact.location);
      setFav(contact.isFav);

      let tagsString = contact.tags && contact.tags.join();
      setTags(tagsString);
    }
  }, [dispatch, match]);

  const handleDelete = () => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteContact(match.id));
      dispatch(listContacts());
      history("/");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const contactData = {
      image,
      name,
      username,
      status,
      isFav: fav,
      location,
      tags,
    };

    dispatch(updateContact(match.id, contactData));
    handleClose();
    dispatch(listContactDetails(match.id));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        header: {
          "Contact-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <>
      <Container>
        <h3>Contact</h3>
        <Row>
          <Col className="text-center mb-3">
            <Button onClick={() => history("/")}>Go Back</Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-end mb-3">
            <Button variant="info" onClick={handleShow}>
              Edit Contact <Pencil />
            </Button>
          </Col>
          <Col md={6} className="text-start mb-3">
            <Button variant="danger" onClick={handleDelete}>
              Delete Contact <Trash />
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <div>
            <Row className="text-center">
              <Col md={12}>
                <Image src={contact.image} fluid />
              </Col>
              {/* <Col md={12}>
                <h4>{contact.name}</h4>
                <p>{contact.username}</p>
              </Col> */}
            </Row>
            <Row>
              <Col>
                <ListGroup style={{ width: "300px", margin: "auto" }}>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <p>
                          <strong>Name:</strong>
                        </p>
                      </Col>
                      <Col>
                        <p>{contact.name}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <p>
                          <strong>Username:</strong>
                        </p>
                      </Col>
                      <Col>
                        <p>{contact.username}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <p>
                          <strong>Location:</strong>
                        </p>
                      </Col>
                      <Col>
                        <p>{contact.location}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <p>
                          <strong>Status:</strong>
                        </p>
                      </Col>
                      <Col>
                        <p>{contact.status}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <p>
                          <strong>favourite:</strong>
                        </p>
                      </Col>
                      <Col>
                        <p>{contact.isFav === false ? "No" : "Yes"}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        <p>
                          <strong>Tags:</strong>
                        </p>
                      </Col>
                      <Col md={8}>
                        <p>
                          {contact.tags &&
                            contact.tags.map((e, index) => (
                              <Button
                                key={index}
                                variant={
                                  e === "Clients"
                                    ? "info"
                                    : e === "Workshop"
                                    ? "success"
                                    : "secondary"
                                }
                                className="rounded-0 m-2 btn-sm"
                              >
                                {e}
                              </Button>
                            ))}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )}
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type="file"
                id="image-file"
                label="choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fav">
              <Form.Label>Add To Favoraites</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Yes"
                  name="group2"
                  type="radio"
                  id={`inline-radio-3`}
                  value="true"
                  checked={fav === true}
                  onChange={() => setFav(true)}
                />
                <Form.Check
                  inline
                  label="No"
                  name="group2"
                  type="radio"
                  id={`inline-radio-4`}
                  value="false"
                  checked={fav === false}
                  onChange={() => setFav(false)}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="active"
                  name="group1"
                  type="radio"
                  id={`inline-radio-1`}
                  value="active"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                />
                <Form.Check
                  inline
                  label="inactive"
                  name="group1"
                  type="radio"
                  id={`inline-radio-2`}
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={() => setStatus("inactive")}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags (Seprate with ,)</Form.Label>
              <Form.Control
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={(e) => handleEdit(e)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal */}
    </>
  );
}

export default ContactDetails;
