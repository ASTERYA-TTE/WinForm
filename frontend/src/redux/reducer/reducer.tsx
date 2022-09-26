const initialState = {
  leftSideBarFolder: [],
  selectedLeftSideBarFolder: null,
}
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'Selected_Folder_Success':
      return { ...state, leftSideBarFolder: action.payload }

    case 'Selected_Folder_Error':
      return { ...state, leftSideBarFolder: action.payload }

    case 'Update_Selected_Folder':
      return { ...state, selectedLeftSideBarFolder: action.payload }

    default:
      return state
  }
}

export default reducer
