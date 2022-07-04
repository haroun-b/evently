import { Button, Stack } from "@chakra-ui/react";

const AttendActionBar = ({attendanceStatus}) => {
  let stateAndButtons = '';
  switch (attendanceStatus) {
    case 'pending':
      stateAndButtons = <>
      <p>Pending</p>
      <Button>Cancel</Button>
      </>
      break;
    case 'approved':
      stateAndButtons = <>
        <p>Approved</p>
        <Button>Cancel</Button>
        <Button>Chat</Button>
      </>
      break;
    case 'rejected':
      stateAndButtons = <p>Rejected</p>
      break;
    default:
      stateAndButtons = <Button>Attend</Button>
      break;
  }

  return (
    <Stack direction='row'>
      <p>Free</p>

      <div className="attendance">
        {stateAndButtons}
      </div>
    </Stack>
  );
}

export default AttendActionBar;