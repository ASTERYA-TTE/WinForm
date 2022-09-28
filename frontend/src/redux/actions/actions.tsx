import axios from 'axios'

export const getFolderTreeSelect = (folderId:any) => (dispatch: any) => {
  axios
    .post('/form/list', {folder_id:folderId})
    .then((res) => {
      dispatch({ type: 'UPDATE_FORMS', payload: res.data })
      dispatch({type:'UPDATE_SELECTED_FOLDER', payload: folderId})
    })
    .catch((error) =>
      dispatch({ type: 'UPDATE_FORMS_ERROR', payload: error })
    )
}

export const updateFolderTreeSelect =
  (selectedFolder: any) => (dispatch: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_FOLDER',
      payload: selectedFolder,
    })
  }
