const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// ▼▼▼▼ body-parser ▼▼▼▼, теперь его не нужно импортировать отдельно, достаточно написать такой код:
app.use(express.urlencoded({
  extended: true
}));

const https = require('https');

// html
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 
app.post("/", (req, res) => {
  
  const query = req.body.cityName;
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=6e9d4f293b4ca6125a76f18e2ec4cf22&units=metric';
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const weatherIconUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<h2>The weather is currently - " + weatherDescription + "<img src=" + '"' + weatherIconUrl + '"' + ">" + "</h2>");
      // res.write("<img src=" + weatherIconUrl + ">");
      res.send();
    });

  });
});




// // ▼▼▼▼ подключил css ▼▼▼▼
// app.use(express.static(__dirname + '/public'));