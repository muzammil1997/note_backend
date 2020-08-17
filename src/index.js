require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(bodyparser.json());
app.use(authRoutes); 

  const mongoUri = 'mongodb+srv://admin:admin@cluster0.juplh.mongodb.net/<dbname>?retryWrites=true&w=majority';
//const mongoUri = 'mongodb://127.0.0.1:27017/pos';
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', ()=>{
    console.log("Db connected!");
});

mongoose.connection.on('error', (err)=>{
    console.error('error connected with db', err);
});

app.listen(4000,()=>console.log("listen on port 4000")); 