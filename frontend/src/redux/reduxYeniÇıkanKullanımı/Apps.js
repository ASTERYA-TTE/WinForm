import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  folder_success,
  folder_error,
  update_folder,
  extraReducers,
} from './counter/counterSlice'
function Apps() {
  const counts = useSelector((state) => state.forms.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(extraReducers())
  }, [])

  return (
    <div>
      {counts}
      <button onClick={() => dispatch()}>increment</button>
      <button onClick={() => dispatch()}>Descement</button>
    </div>
  )
}

export default Apps
