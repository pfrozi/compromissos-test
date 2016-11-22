var mongoose = require("mongoose");

var CompromissoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    done: Boolean,
    //atividades: [String]
});

mongoose.model('Compromisso', CompromissoSchema);
