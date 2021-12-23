import React, { useEffect } from "react";
import { Table, Image, Button, Container } from "react-bootstrap";
import { ChatLeftDots, Telephone } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { listContacts } from "../actions/contactActions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Favorite from "../components/Favorite";
import { useParams } from "react-router";
import Paginate from "../components/Paginate";

function Home() {
  let match = useParams();
  const pageNumber = match.pageNumber || 1;

  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, contacts, error, page, pages } = contactList;

  useEffect(() => {
    dispatch(listContacts(pageNumber));
  }, [dispatch, pageNumber]);
  return (
    <>
      <Favorite />

      <Link to="/allcontacts">
        <h4 className="headings">Contacts List</h4>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : contacts.length === 0 ? (
        <h4>No Contacts Found</h4>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>STATUS</th>
              <th>LOCATION</th>
              <th>TAGS</th>
              <th>ACTIONS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.reverse().map((contact) => (
              <tr key={contact._id}>
                <td>
                  <Link className="link" to={"/contact/" + contact._id}>
                    <Image src={contact.image} fluid className="contact-img" />
                  </Link>
                </td>
                <td>
                  <Link className="link" to={"/contact/" + contact._id}>
                    {contact.name}
                    <br />
                    {contact.username}
                  </Link>
                </td>
                <td>
                  <Link className="link" to={"/contact/" + contact._id}>
                    {contact.status}
                  </Link>
                </td>
                <td>
                  <Link className="link" to={"/contact/" + contact._id}>
                    {contact.location}
                  </Link>
                </td>
                <td>
                  {contact.tags.map((e, index) => (
                    <Link
                      className="link"
                      to={"/contact/" + contact._id}
                      key={index}
                    >
                      <Button
                        variant={
                          e === "Clients"
                            ? "info"
                            : e === "Workshop"
                            ? "success"
                            : "secondary"
                        }
                        className="rounded-0 me-2 px-2 py-1"
                      >
                        {e}
                      </Button>
                    </Link>
                  ))}
                </td>
                <td>
                  <Button variant="light">
                    <ChatLeftDots />
                    &nbsp;&nbsp;Send Message
                  </Button>
                </td>
                <td>
                  <Button variant="light">
                    <Telephone />
                    &nbsp;&nbsp;Call
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} />
    </>
  );
}

export default Home;
