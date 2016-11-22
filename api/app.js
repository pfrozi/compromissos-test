var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override'); // used to manipulate POST
var path            = require('path');

var exports = module.exports = {};

// db variables
var db           = require("./models/db");
// mongoose schemas
var compromisso  = require('./models/compromissos');

// app
var app          = express();

var directory = path.join(__dirname, "../public");

app.use(express.static(directory + '/'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(methodOverride());


// route index
app.get('/', function(req, res) {
    res.sendFile(path.join(directory + '/index.html'));
});

// api
var Compromissos = mongoose.model('Compromisso');

app.get('/api/compromissos', function(req,res){

        Compromissos.find({ "done" : false }, function (err, compromissos) {
              if (err) {
                  res.send(err);
              } else {
                  res.json(compromissos);
              }
        });
    }
);

app.post('/api/compromissos', function(req, res) {
    console.log(req.body);
        // create a todo, information comes from AJAX request from Angular
        Compromissos.create({
                titulo : req.body.titulo,
                descricao : req.body.descricao,
                done: false
            }, function(err, compromisso) {
                if (err){
                    res.send(err);
                }

                Compromissos.find({ "done" : false }, function(err, compromissos) {
                    if (err)
                        res.send(err)
                    res.json(compromissos);
                });
        });
    }
);

app.post('/api/compromissos/:compromisso_id/remove', function(req, res) {

    Compromissos.findByIdAndUpdate(req.params.compromisso_id
        , { "done" : true }
        , function (err, compromissoUpdated) {
            if (err)
                res.send(err);

            // retorna os compromissos ainda nao realizados
            Compromissos.find({ "done" : false }, function(err, compromissos) {
                if (err){
                    res.send(err)
                }
                res.json(compromissos);
            });
        });

});

var server = app.listen(3000);

exports.closeServer = function(){
    server.close();
};


console.log("App listening on port 3000");
