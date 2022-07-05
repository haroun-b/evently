import Stack from '@mui/material/Stack';

const AttendActionBar = ({
  attendanceStatus,
  handleCancel,
  handleAttend,
  handleChat,
}) => {
  let stateAndbuttons = "";
  switch (attendanceStatus) {
    case "pending":
      stateAndbuttons = (
        <>
          <p>Pending</p>
          <button onClick={handleCancel}>Cancel</button>
        </>
      );
      break;
    case "approved":
      stateAndbuttons = (
        <>
          <p>Approved</p>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleChat}>Chat</button>
        </>
      );
      break;
    case "rejected":
      stateAndbuttons = <p>Rejected</p>;
      break;
    case "creator":
      stateAndbuttons = <button onClick={handleChat}>Chat</button>;
      break;
    default:
      stateAndbuttons = <button onClick={handleAttend}>Attend</button>;
      break;
  }

  return (
    <Stack direction="row">
      {/* <p>Free</p> */}

      <div className="attendance">{stateAndbuttons}</div>
    </Stack>
  );
};

export default AttendActionBar;
