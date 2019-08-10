const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/myuploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage,

 }).single('profilepic');

app.set('view engine', 'ejs');

app.use(express.static("./public"));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', (req, res) => {
	upload(req, res,(error) => {
		if (error) {
			res.render('index',{
				message:error
			})
		}else{
			res.render('index',{
				message:'successfully uploaded....',
				filename:'myuploads/'+req.file.filename
			})
		}
	})
})

app.listen(8000, () => console.log("server is running..."));