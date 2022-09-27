const initialState = {
  forms: [],
  selectedLeftSideBarFolder: null,
  update_error:null
}
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_FORMS':
      return { ...state, forms: action.payload }

    case 'UPDATE_FORMS_ERROR':
      return { ...state, update_error: action.payload }

    case 'UPDATE_SELECTED_FOLDER':
      return { ...state, selectedLeftSideBarFolder: action.payload }

    default:
      return state
  }
}

export default reducer
