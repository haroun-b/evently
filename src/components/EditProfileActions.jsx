import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconButton } from '@mui/material';


const EditProfileActions = ({ editOn, setEditOn, handleEdit, cancelEdit }) => {
  return (
    <>
      {
        editOn
          ?
          <>
            <IconButton
              aria-label="save"
              onClick={handleEdit}
            >
              <CheckCircleOutlineIcon />
            </IconButton>

            <IconButton
              aria-label="cancel"
              onClick={cancelEdit}
            >
              <HighlightOffIcon />
            </IconButton>
          </>
          :
          <IconButton
            aria-label="edit"
            onClick={() => { setEditOn(true) }}
          >
            <EditIcon />
          </IconButton>
      }
    </>
  )
}

export default EditProfileActions