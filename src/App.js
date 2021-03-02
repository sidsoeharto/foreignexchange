import React, {useState, useEffect} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, CircularProgress, Card, CardContent, TextField, Typography, Button } from '@material-ui/core';
import axios from './config/axios';
import AddIcon from '@material-ui/icons/Add';
import ExchangeCard from './components/ExchangeCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardBar: {
    minWidth: 275,
    display: 'flex',
    direction: 'column'
  },
  addButton: {
    minWidth: 275
  },
  cardForm: {
    minWidth: 275,
    display: 'flex'
  },
  submitButton: {
    width: 20
  }
});

function App() {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState([
    'IDR',
    'EUR',
    'GBP',
    'SGD'
  ])
  const [rates, setRates] = useState({})
  const [showForm, setShowForm] = useState(false)

  function countryCurrency (code) {
    const list = {
      USD: 'United States Dollar',
      CAD: 'Canada Dollar',
      IDR: 'Indonesia Rupiah',
      GBP: 'British Pound',
      CHF: 'Switzerland Franc',
      SGD: 'Singapore Dollar',
      INR: 'India Rupee',
      MYR: 'Malaysia Ringgit',
      JPY: 'Japan Yen',
      KRW: 'Korea Won',
      EUR: 'Europe Euro'
    }
    return list[code]
  } 

  const handleValueChange = (event) => {
    setValue(Number(event.target.value))
  }

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: '/latest?base=USD'
    })
      .then(response => {
        setRates(response.data.rates)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function renderExchange (rates, selectedCurrency) {
    let renderedExchange = []
    let items = Object.entries(rates)
    selectedCurrency.forEach(currency => {
      items = items.filter(el => {
        if (el[0] === currency) {
          let objRate = {
            code: el[0],
            country: countryCurrency(el[0]),
            rates: el[1]
          }
          renderedExchange.push(objRate)
          return false
        } else {
          return true
        }
      })
    })
    return renderedExchange
  } 

  const classes = useStyles()

  if (loading) {
    return (
      <Grid container spacing={3} justify="center" alignItems="center">
        <CircularProgress></CircularProgress>
      </Grid>
    )
  }
  return (
    <div className="App">
      <CssBaseline />
      <React.Fragment>
        <Grid container spacing={3} justify="center" alignItems="center" alignContent="center" direction='column'>
          <Card className={classes.cardBar}>
            <CardContent>
              <Typography>USD - United States Dollars</Typography>
            </CardContent>
            <CardContent className>
              <Typography>USD</Typography>
              <TextField value={value} onChange={handleValueChange}/>
            </CardContent>
          </Card>
          {renderExchange(rates,selectedCurrency).map(rate => <Grid item><ExchangeCard key={rate.code} rate={rate} value={value}/></Grid>)}
          {showForm ? <Button 
            className={classes.addButton}
            startIcon={<AddIcon></AddIcon>}
            variant="contained"
            onClick={setShowForm(true)}
          >Add More Currency</Button> : <Card>
              <CardContent>
                <TextField></TextField>
                <Button>Submit</Button>
              </CardContent>
            </Card>}
        </Grid>
      </React.Fragment>
    </div>
  );
}

export default App;
