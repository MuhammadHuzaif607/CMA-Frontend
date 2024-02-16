import {
  ADD_CONTACT,
  CURRENT_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  GET_CONTACT,
  SEARCH_CONTACT,
} from '../type';
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      // return { ...state, contacts: [action.payload, ...state.contacts] };
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case CURRENT_CONTACT:
      return { ...state, currentContact: action.payload };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((data) => {
          if (data._id === action.payload._id) {
            return action.payload;
          }
          return data;
        }),
        currentContact: null,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (data) => data._id !== action.payload.id
        ),
      };
    case SEARCH_CONTACT:
      const regex = new RegExp(`${action.payload}`, 'gi');
      return {
        ...state,
        filterdContacts: state.contacts.filter((data) => {
          return (
            data.name.includes(data.name.match(regex)) ||
            data.email.includes(data.email.match(regex))
          );
        }),
      };
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
