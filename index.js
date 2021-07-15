const express = require("express");
const cors = require("cors");
const errorHandlers = require("./middlewares/errorHandlers");
const camelcaseReq = require("./middlewares/camelCaseReq");
const auth = require("./middlewares/auth");
const morgan = require('morgan');
const logger = require('./utils/logUtil');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./open-api.json');

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(camelcaseReq);
app.use(
  morgan('combined', {
    stream: {
      write: message => {
        logger.info(message);
      },
    },
  }),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
})

app.use(auth);

require('./routers')(app);
require('./models/mongoose');
app.use(errorHandlers);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
