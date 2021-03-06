import axios from "axios";

import {
  GET_ERRORS,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  GET_EVENTS,
  EVENT_LOADING,
  UPDATE_EVENT_FORM,
  CLEAR_EVENT_FORM,
  SET_FORM_COLOR_WITH_TAG
} from "./types";

export const updateEventForm = formData => {
  return {
    type: UPDATE_EVENT_FORM,
    payload: formData
  };
};

export const clearEventForm = () => {
  return {
    type: CLEAR_EVENT_FORM
  };
};

export const addEvent = eventData => dispatch => {
  axios
    .post("/api/events", eventData)
    .then(res => {
      dispatch({ type: ADD_EVENT, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateEvent = (id, eventData) => dispatch => {
  axios
    .post(`/api/events/${id}`, eventData)
    .then(res => {
      dispatch({ type: UPDATE_EVENT, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteEvent = id => dispatch => {
  axios
    .delete(`/api/events/${id}`)
    .then(res => {
      dispatch({ type: DELETE_EVENT, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/api/events")
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

export const setFormColorWithTag = color => {
  return {
    type: SET_FORM_COLOR_WITH_TAG,
    payload: color
  };
};
