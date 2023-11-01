const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//configuración conexión mongo
const NODE_ENV = process.env.NODE_ENV;

const dbConnect = async () => {
  const DB_URI = (NODE_ENV === 'test')? process.env.DB_URI_TEST : process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
        if(!err){
            console.log('**** CONEXION CORRECTA ****')
        }else{
            console.log('**** ERROR DE CONEXION ****')
        }
    }
  );
};

module.exports = dbConnect;

//mongodb+srv://u20202193754:Carlos.9700@cluster0.50nxgou.mongodb.net/dbapi?retryWrites=true&w=majority