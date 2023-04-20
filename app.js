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




var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

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
app.get("api/guides", guideRoutes);
app.get("api/recherche", rechercheRoutes);
app.get("api/test", userRoutes);
app.get("api/jeu", jeuRoutes);
app.get("api/catjeu", catjeuRoutes);
app.get("api/plateforme",plateformeRoutes);  
app.get("api/catguides", catguideRoutes);
//app.get("api/auth", null);
//require('./app/routes/auth.routes')(app);
//require('./app/routes/user.routes')(app);


module.exports = app;