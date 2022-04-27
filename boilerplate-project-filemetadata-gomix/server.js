require('dotenv').config()
var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const upload =  multer().single('upfile')

app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload, (req,res)=>{
  if(req.file){
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({
      name,
      type,
      size
    });
  }
  else{
    res.json({error: 'Non file selected'})
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
