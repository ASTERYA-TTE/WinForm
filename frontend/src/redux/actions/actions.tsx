import axios from 'axios'

export const getFolderTreeSelect = () => (dispatch: any) => {
  axios
    .get('http://localhost:27017/form/list')
    .then((res) => {
      dispatch({ type: 'Selected_Folder_Success', payload: res.data })
    })
    .catch((error) =>
      dispatch({ type: 'Selected_Folder_Error', payload: error })
    )
}

export const updateFolderTreeSelect =
  (selectedFolder: any) => (dispatch: any) => {
    dispatch({
      type: 'Update_Selected_Folder',
      payload: selectedFolder,
    })
  }
