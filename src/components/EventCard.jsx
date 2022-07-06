import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const EventCard = (
  {
    _id,
    title,
    price,
    imageUrl,
    description,
    startAt,
    endAt,
    creator,
    address: { city }
  }
) => {
  startAt = startAt.slice(0, -8);
  endAt = endAt.slice(0, -8);

  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "100%", textAlign: `left`, margin: `1.8rem 3rem` }}>
      <CardActionArea
        onClick={() => { navigate(`/events/${_id}`) }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CardHeader
            sx={{ maxWidth: `100%` }}
            title={title}
            subheader={`${startAt} - ${endAt}`}
          />
          <CardHeader
            title={price || 'Free'}
            subheader={city}
          />
        </Stack>

        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt={title}
        />

        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActionArea>

      <CardActions
        onClick={() => { navigate(`/${creator.username}`)}}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          spacing={1}
          marginLeft="auto"
          sx={{cursor: `pointer`}}
        >
          <Typography variant="button" display="block" gutterBottom>
            {creator.name}
          </Typography>
          <Avatar alt={creator.name} src={creator.imageUrl} />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default EventCard