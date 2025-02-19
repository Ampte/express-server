const bodyParser = require("body-parser");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});

const data_file = 'data.json';

// Load existing data
let formData = [];
if (fs.existsSync(data_file)) {
    const fileContent = fs.readFileSync(data_file, 'utf8');
    formData = fileContent ? JSON.parse(fileContent) : [];
};

app.post('/add-name', (req, res) => {
    const newEntry = req.body;
    formData.push(newEntry);

// Save to json file
    fs.writeFile(data_file, JSON.stringify(formData, null, 2), (err) => {
        if(err){
            res.send("Error");
        } else{
            res.status(201).send("Data submitted sucessfully");
        }
    });

    console.log(newEntry);
});

