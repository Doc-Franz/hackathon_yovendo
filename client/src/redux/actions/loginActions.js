export const GET_USER_ID = "GET_USER_ID";
export const RESET_LOGIN = "RESET_LOGIN"; // quando l'utente esce vengono resettate le credenziali

// salvo l'id dell'azienda che si è loggata
export const getUserID = (id) => ({
  type: GET_USER_ID,
  payload: id
});

export const resetLogin = () => ({
  type: RESET_LOGIN
});
