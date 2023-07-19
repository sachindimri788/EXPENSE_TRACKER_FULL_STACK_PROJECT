const  express=require ('express');
const router =require ('./routes/indexRoutes');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config({path:'./env/development.env'})

const port = process.env.PORT || 3000;


app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`listening at port number ${port}`);
});