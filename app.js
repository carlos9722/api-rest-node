// Configuración Inicial
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")
const morganBody = require("morgan-body")
const openApiConfigration = require("./docs/swagger")
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require('./config/mongo')
const {
    dbConnectMysql
} = require("./config/mysql")
const app = express()
const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))
morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400 //TODO 2xx, 3xx - lo omite
    }
})
const port = process.env.PORT || 3000

/**
 * Definir ruta de documentación
 */

app.use('/documentation',
    swaggerUI.serve,
    swaggerUI.setup(openApiConfigration));


//Aqui se envian las rutas

app.use("/api", require("./routes"))

if (NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log("Tu app esta lista por http://localhost:" + port)
    });
}


(ENGINE_DB === 'nosql') ? dbConnectNoSql(): dbConnectMysql();


// para fines de testing

module.exports = app;