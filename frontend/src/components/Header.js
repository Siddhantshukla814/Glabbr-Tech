import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Modal, Form } from "react-bootstrap";
import { Filter, Search } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { createContact, listContacts } from "../actions/contactActions";
import Loader from "./Loader";
import axios from "axios";

function Header() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      image,
      name,
      username: userName,
      status,
      location,
      tags,
    };

    dispatch(createContact(contactData));
    dispatch(listContacts());
    handleClose();
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
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">DOZ Pharmacy - Contacts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="secondary" className="me-3" onClick={handleShow}>
                Add Contact
              </Button>
              <Button variant="light" className="me-3">
                <Filter size={20} />
              </Button>
              <Button variant="info" className="me-3">
                <Search size={15} />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
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
                  onClick={(e) => setStatus("active")}
                  required
                />
                <Form.Check
                  inline
                  label="inactive"
                  name="group1"
                  type="radio"
                  id={`inline-radio-2`}
                  value="inactive"
                  onClick={(e) => setStatus("inactive")}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags (Seprate with ,)</Form.Label>
              <Form.Control
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
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

export default Header;
