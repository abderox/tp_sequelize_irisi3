const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
// const init = require("./api/init");
const cookieSession = require("cookie-session");
// const sequelize = require("./api/config/db.seq");
// const initial =  require('./api/init/initSeq')
const connectDB = require("./api/config/db.gose");
const initialGose =  require('./api/init/init.gose');
const routesGose = require('./api/routes/routes.gose');
// const plantsRoutes = require("./api/routes");
// const booksRoutes = require("./api/routes/routes.seq");
// const authRoutes = require("./api/routes/auth.seq");
const authRoutesGose = require("./api/routes/auth.gose");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Header",
      "Origin; X-Requested-With, Content-Type, Accept, Authorization,x-access-token"
    );
    if (res.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST,PATCH, DELE, GET");
      return res.status(200).json({});
    }
    next();
  });


  app.use(
    cookieSession({
      name: "bookery-session",
      secret: "COOKIE_SECRET", 
      httpOnly: true,
    })
  );


// (async () => {
//     await init();
// })();
 
connectDB().then(()=>{
  initialGose();
  console.log("DB connected")
}).catch(err=>console.log(err))

// auth
app.use("/apiv2/auth", authRoutesGose);
// routes
app.use("/apiv2/books", routesGose);

// (async () => {
//     await  sequelize.authenticate()
//     .then(() => {
//       console.log('Connected to database');
//       // sequelize.sync({ force: true }).then(() => {
//           sequelize.sync({ force: false }).then(() => {
//           console.log('Database synchronized');
//           initial();
//       }
//       );
//   }).catch((error) => {
//       console.error('Unable to connect to the database', error);
//   });
// })();


// app.get("/", (req, res) => {
//     res.json({ message: "testing routes" });
// });

// app.use("/api/auth", authRoutes);

// app.use(fileUpload());
// // app.use("/api/books", plantsRoutes);
// app.use("/api/books", booksRoutes);





const PORT =  8085
const HOST = 'localhost';

app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });

