const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

function showSection(section) {

    document.getElementById('household-section').style.display = 'none';
    document.getElementById('cars-section').style.display = 'none';
    document.getElementById('bikes-section').style.display = 'none';
  

    document.getElementById(`${section}-section`).style.display = 'block';
  }
  
  function calculateCarCarbonFootprint() {

    const carModel = document.getElementById('car-model').value;
    const carMileage = parseFloat(document.getElementById('car-mileage').value);
  

    if (isNaN(carMileage)) {
      alert('Please enter a valid numeric value for car mileage.');
      return;
    }
  

    const carCarbonFootprint = carMileage * 0.2; 

    document.getElementById('cars-result').innerText = `Your car's carbon footprint: ${carCarbonFootprint} kg CO2e`;
  }
  
  function calculateBikeCarbonFootprint() {

    const bikeModel = document.getElementById('bike-model').value;
    const bikeMileage = parseFloat(document.getElementById('bike-mileage').value);
  

    if (isNaN(bikeMileage)) {
      alert('Please enter a valid numeric value for bike mileage.');
      return;
    }
  
    
    const bikeCarbonFootprint = bikeMileage * 0.1; 

    document.getElementById('bikes-result').innerText = `Your bike's carbon footprint: ${bikeCarbonFootprint} kg CO2e`;
  }
  
function calculateCarbonFootprint() {

    const country = document.getElementById('country').value;
    const electricity = parseFloat(document.getElementById('electricity').value);
    const electricityUnit = document.getElementById('electricity-unit').value;
    const naturalGas = parseFloat(document.getElementById('natural-gas').value);
    const lpg = parseFloat(document.getElementById('lpg').value);
  

    if (isNaN(electricity) || isNaN(naturalGas) || isNaN(lpg)) {
      alert('Please enter valid numeric values for electricity, natural gas, and LPG.');
      return;
    }
  

    fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, electricity, electricityUnit, naturalGas, lpg }),
    })
      .then(response => response.json())
      .then(data => {

        document.getElementById('household-result').innerText = data.result;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while calculating the carbon footprint. Please try again.');
      });
  }
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.post('/calculate', (req, res) => {
  const { country, electricity, electricityUnit, naturalGas, lpg } = req.body;

  const carbonFootprint = electricity * 0.5 + naturalGas * 2 + lpg * 1.5;

  res.json({ result: `Your carbon footprint in ${country}: ${carbonFootprint} kg CO2e` });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
