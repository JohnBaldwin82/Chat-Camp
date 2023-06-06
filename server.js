const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io')
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const User = require('./models/User');
const { Configuration, OpenAIApi } = require("openai");
const app = express();

//skt added hdb.js in controllers
// const handlejs = require('./controllers/controlhbs');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

//skt added path to join hbs files and add helpers object
const hbs = exphbs.create({
    helpers
    // defaultLayout: 'main',
    // layoutsDir: path.join(__dirname, 'views/layouts'),
    // partialsDir: path.join(__dirname, 'views'),
    
    
    // helpers: {
    //    userName: function(value){
    // return value;

    //    }
    // }
 });

//  hbs.registerPartials(__dirname + '/views/partials/');

 app.engine('handlebars', hbs.engine);

 const sessionMiddleware = session({
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
});


app.set('view engine', 'handlebars');
app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//express.urlencoded() function parses requests and returns an object
// can also use inflate, limit, verify 
app.use(require('./controllers/'));


const server = http.createServer(app);
const io = socketIo(server);

io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  });

io.on("connection", (socket) => {
  console.log("A user has connected");
  console.log(socket.request.session.user_id);

  if (socket.request.session.user_id) {
    User.findOne({
      where: {
        id: socket.request.session.user_id,
      },
    })
      .then((user) => {
        if (user) {
          console.log("User found:", user.toJSON());
          const username = user.toJSON().name;

          socket.on("chat message", (message) => {
            message.name = username;
            console.log("Received message:", message);
            io.emit("chat message", message);

            if(message.roomName === 'chatGpt'){
                getChatGPTResponse(message.message).then(function(aiResponse){
                    io.emit("chat message", {
                        message: aiResponse,
                        avatar: '/images/ai.png',
                        roomName: 'chatGpt',
                        name: 'Chat GPT'
                    });
                });
            }
          });

          socket.on("disconnect", () => {
            console.log("You have been disconnected");
          });
        } else {
          console.log("User not found.");
        }
      })
      .catch((err) => {
        console.error("Error retrieving user:", err);
      });
  }
  else{
    socket.emit('loginRequest', {})
  }
});


sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

async function getChatGPTResponse (message) {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.API_KEY.split('0000000').join(''),
    })
  );

  try{
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
      });
      return completion.data.choices[0].text;
  }
  catch(e){
    return 'You are not allowed to talk to Chat GPT (bad api key)';
  }
}