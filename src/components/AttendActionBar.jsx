import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const AttendActionBar = ({
  attendanceStatus,
  handleCancel,
  handleAttend,
  openChat,
}) => {
  let stateAndbuttons = "";

  switch (attendanceStatus) {
    case "pending":
      stateAndbuttons = (
        <>
          <Typography variant="subtitle1" component="p">
            Pending
          </Typography>
          <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </>
      );
      break;
    case "approved":
      stateAndbuttons = (
        <>
          <Typography variant="subtitle1" component="p">
            Approved
          </Typography>
          <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={openChat}>Chat</Button>
        </>
      );
      break;
    case "rejected":
      stateAndbuttons = <>
      <Typography variant="subtitle1" component="p">
        Rejected
      </Typography>
      <Button variant="contained" disabled onClick={handleAttend}>Attend</Button>
      </>;
      break;
    case "creator":
      stateAndbuttons = <Button variant="contained" onClick={openChat}>Chat</Button>;
      break;
    default:
      stateAndbuttons = <Button variant="contained" onClick={handleAttend}>Attend</Button>;
      break;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      spacing={2}
    >
      {stateAndbuttons}
    </Stack>
  );
};

export default AttendActionBar;
