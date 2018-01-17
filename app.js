var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash       =require("connect-flash");
    firebase=require('firebase');

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCFS8wmVg-qy3VEXPCr2wooxKPNrZgBG4M",
    authDomain: "gi-india.firebaseapp.com",
    databaseURL: "https://gi-india.firebaseio.com",
    projectId: "gi-india",
    storageBucket: "gi-india.appspot.com",
    messagingSenderId: "901822549863"
  };
  firebase.initializeApp(config);    

  // mongoose.connect("mongodb://localhost/GI_site");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database


//===================   USER SCHEMA =====================================================//
// var UserSchema = new mongoose.Schema({
//     username: String,
//     password: String
// });
// UserSchema.plugin(passportLocalMongoose)
// var User = mongoose.model("User", UserSchema);
//========================================================================================//



//====================== COMMENT SCHEMA ==================================================//
// var commentSchema = mongoose.Schema({
//     text: String,
//     author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         username: String
//     }
// });
// var Comment = mongoose.model("Comment", commentSchema);
//=========================================================================================//



//=========================== GI SCHEMA ===================================================//
// var giSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
//  }); 
// var GI= mongoose.model("GI", giSchema);
//===================================================================================//



// ====================== PASSPORT CONFIGURATION =====================================//
// app.use(require("express-session")({
//     secret: "Once again Rusty wins cutest dog!",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use(function(req, res, next){
//    res.locals.currentUser = req.user;
//    res.locals.error=req.flash("error");
//    res.locals.success=req.flash("success")
//    next();
// });
//===================================================================================//

// GI.create(
//     {
//         name:"Campground",
//         image:"https://media-cdn.tripadvisor.com/media/photo-s/05/17/bf/75/panorama-campsite.jpg",
//         description:"this is best place for rest "
//     }
// )


app.get("/",function(req,res){
    res.render("landing");
})

var gis;
var gisRef = firebase.database().ref('Giproducts');
 gisRef.on('value',function(snapshot){
     gis=snapshot.val();
     console.log(gis);
 });

app.get("/gis",function(req,res){
            res.render("index",{gis:gis});
        });

app.get("/gis/:id",function(req,res){
    GI.findById(req.params.id,function(err,foundGI){
        if(err){
            console.log(err);
        }else{
            res.render("show",{gi:foundGI});
        }
    })
})


app.listen(3000,function(req,res){
    console.log("listening on port number 3000!")
});

