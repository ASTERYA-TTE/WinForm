import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'Selected_Folder_Success':
//       return { ...state, leftSideBarFolder: action.payload }

//     case 'Selected_Folder_Error':
//       return { ...state, leftSideBarFolder: action.payload }

//     case 'Update_Selected_Folder':
//       return { ...state, selectedLeftSideBarFolder: action.payload }

//     default:
//       return state
//   }
// }

// export const getFolderTreeSelect = () => (dispatch: any) => {
//   axios
//     .get('http://localhost:27017/form/list')
//     .then((res) => {
//       dispatch({ type: 'Selected_Folder_Success', payload: res.data })
//     })
//     .catch((error) =>
//       dispatch({ type: 'Selected_Folder_Error', payload: error })
//     )
// }

// export const updateFolderTreeSelect =
//   (selectedFolder: any) => (dispatch: any) => {
//     dispatch({
//       type: 'Update_Selected_Folder',
//       payload: selectedFolder,
//     })
//   }

const initialState = {
  value: 0,
  leftSideBarFolder: [],
  selectedLeftSideBarFolder: null,
}

export const updateSelectedFolderTree = createAsyncThunk(
  'form/updateSelectedFolderTree',
  () => {
    return axios
      .get('http://localhost:27017/form/list')
      .then((response) => response.data.map((data) => data.id))
  }
)

export const counterSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },

    folder_success: (state, action) => {
      state.leftSideBarFolder = [
        ...state.leftSideBarFolder,
        { leftSideBarFolder: action.payload.leftSideBarFolder },
      ]
    },

    folder_error: (state, action) => {
      state.Selected_Folder_Error = [
        ...state.leftSideBarFolder,
        { leftSideBarFolder: action.payload.leftSideBarFolder },
      ]
    },

    update_folder: (state, action) => {
      state.selectedLeftSideBarFolder = [
        ...state.selectedLeftSideBarFolder,
        { selectedLeftSideBarFolder: action.payload.selectedLeftSideBarFolder },
      ]
    },

    extraReducers: (builder) => {
      builder.addCase(updateSelectedFolderTree.pending, (state) => {
        state.loading = true
      })
      builder.addCase(updateSelectedFolderTree.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.error = ''
      })
      builder.addCase(updateSelectedFolderTree.rejected, (state, action) => {
        state.loading = false
        state.users = []
        state.error = action.error.message
      })
    },

    // decrement: (state) => {
    //   state.value -= 1
    // },
  },
})

// Action creators are generated for each case reducer function
export const { folder_success, folder_error, update_folder, extraReducers } =
  counterSlice.actions

export default counterSlice.reducer
