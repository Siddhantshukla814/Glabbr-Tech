import axios from "axios";
import {
  CONTACT_CREATE_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_FAVOURITELIST_FAIL,
  CONTACT_FAVOURITELIST_REQUEST,
  CONTACT_FAVOURITELIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_UPDATE_FAIL,
  CONTACT_UPDATE_REQUEST,
  CONTACT_UPDATE_SUCCESS,
} from "../constants/contactConstants";

export const listContacts =
  (pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: CONTACT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/contacts?pageNumber=${pageNumber}`
      );

      dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CONTACT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const favouriteListContacts = () => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_FAVOURITELIST_REQUEST });

    const { data } = await axios.get("/api/contacts/favourite");

    dispatch({ type: CONTACT_FAVOURITELIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_FAVOURITELIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listContactDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_DETAILS_REQUEST });

    const { data } = await axios.get("/api/contacts/" + id);

    dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_DELETE_REQUEST });

    await axios.delete("/api/contacts/" + id);

    dispatch({ type: CONTACT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createContact = (contact) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(contact);

    const { data } = await axios.post("/api/contacts", contact, config);

    dispatch({ type: CONTACT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateContact = (id, contact) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/contacts/" + id, contact, config);

    dispatch({ type: CONTACT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
