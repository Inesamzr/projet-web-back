const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models");
const Role = db.role;
const app = express();

//Routeurs
const guideRoutes = require('./app/routes/guide.routes')
const rechercheRoutes = require('./app/routes/recherche.routes')
const userRoutes = require('./app/routes/user.routes')
const jeuRoutes = require('./app/routes/jeu.routes')
const catjeuRoutes = require('./app/routes/catjeu.routes')
const plateformeRoutes = require('./app/routes/plateforme.routes')
const catguideRoutes = require('./app/routes/catguide.routes')
const authRoutes = require('./app/routes/auth.routes')





app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "Alesio-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);



db.mongoose
  .connect(`mongodb+srv://inesamzert:Violettadu34@clusterprojetweb.z9cahgb.mongodb.net/Ines?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  
  
  
//routes
app.use("/api/guides", guideRoutes);
app.use("/api/recherche", rechercheRoutes);
app.use("/api/test", userRoutes);
app.use("/api/jeu", jeuRoutes);
app.use("/api/catjeu", catjeuRoutes);
app.use("/api/plateforme",plateformeRoutes);  
app.use("/api/catguides", catguideRoutes);
app.use("/api/auth", authRoutes);
//require('./app/routes/auth.routes')(app);
//require('./app/routes/user.routes')(app);


module.exports = app;