const multer = require("multer");

// Configuration de multer pour le traitement des images
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + "-" +file.originalname);
    }
});

const upload = multer({storage:storage});

// Middleware pour le traitement des images
exports.imageMiddleware = upload.single("image");

