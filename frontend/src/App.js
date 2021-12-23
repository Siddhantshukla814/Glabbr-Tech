import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Home from "./screen/Home";
import ContactDetails from "./screen/ContactDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactModal from "./components/ContactModal";
import FavouriteScreen from "./screen/FavouriteScreen";
import AllContactsScreen from "./screen/AllContactsScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ContactModal />
      <Container className="py-4">
        <Routes>
          <Route path="/favourites" element={<FavouriteScreen />} />
          <Route path="/allcontacts" element={<AllContactsScreen />} />
          <Route
            path="/allcontacts/page/:pageNumber"
            element={<AllContactsScreen />}
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/page/:pageNumber" element={<Home />} />
          <Route path="/" element={<Home />} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
