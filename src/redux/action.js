import { del, get, patch, post } from "../fetch";

export function getCards() {
  return (dispatch) => {
    get("/card")
      .then((res) => {
        dispatch({
          type: "GET_CARDS",
          payload: res.data,
        });
      })
      .catch();
  };
}

export function setDemoCards() {
  return (dispatch) => {
    post("/card/demo")
      .then(() => {
        dispatch(getCards());
      })
      .catch();
  };
}

export function deleteAllCards() {
  return (dispatch) => {
    del("/card/all")
      .then(() => {
        dispatch(setDemoCards());
      })
      .catch();
  };
}

export function addCard(card) {
  return (dispatch) => {
    post("/card", card)
      .then(() => {
        dispatch(getCards());
      })
      .catch();
  };
}

export function deleteCard({ cardId }) {
  return (dispatch) => {
    del("/card/" + cardId)
      .then(() => {
        dispatch(getCards());
      })
      .catch();
  };
}

export function updateCard({ cardId, data }) {
  return (dispatch) => {
    patch("/card/" + cardId, data)
      .then(() => {
        dispatch(getCards());
      })
      .catch();
  };
}

export function changeCardColumn(params) {
  const { card, columns = [], direction } = params;
  const colStatuses = columns.map((el) => el.status);
  let status;

  switch (direction) {
    case "right":
      status = colStatuses[colStatuses.indexOf(card.status) + 1];
      break;
    case "left":
      status = colStatuses[colStatuses.indexOf(card.status) - 1];
      break;
    default:
      return;
  }

  return (dispatch) => {
    patch("/card/" + card._id, { status })
      .then(() => {
        dispatch({
          type: "CHANGE_COLUMN",
          payload: { card, newStatus: status },
        });
      })
      .catch();
  };
}

export function changeCardColumnDrop(params) {
  const { card, column } = params;

  return (dispatch) => {
    patch("/card/" + card._id, { status: column.status })
      .then(() => {
        dispatch({
          type: "CHANGE_COLUMN",
          payload: { card, newStatus: column.status },
        });
      })
      .catch();
  };
}

export function openModal(params) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { modal: { ...params, visible: true } },
    });
  };
}

export function closeModal() {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { modal: { visible: false } },
    });
  };
}
