import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  currency: {
    fontSize: 21,
  },
  pos: {
    marginBottom: 12,
  },
  minButton: {
    width: 20
  }
});

function ExchangeCard (props) {
  const classes = useStyles()
  return(
    <Card className={classes.root} variant="outlined" m={8}>
      <CardContent>
        <Typography className={classes.currency}>{props.rate.code}</Typography>
        <Typography className={classes.conversion}>{props.value * props.rate.rates}</Typography>
      </CardContent>
      <CardContent>
        <Typography className={classes.currencyCountry}>{props.rate.code} - {props.rate.country}</Typography>
        <Typography className={classes.conversionRate}>1 USD = {props.rate.code} {props.rate.rates * 1}</Typography>
      </CardContent>
      <Button 
        className={classes.minButton}
        startIcon={<DeleteIcon />}
      />
    </Card>
  )
}

export default ExchangeCard