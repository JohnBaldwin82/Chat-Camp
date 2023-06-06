const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io')
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
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

 const sess = {
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
};


app.set('view engine', 'handlebars');
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//express.urlencoded() function parses requests and returns an object
// can also use inflate, limit, verify 
app.use(require('./controllers/'));


const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user has connected');
    // console.log(socket);

    socket.on('chat message', (message) => {
        console.log('Received message:', message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('You have been disconnected');
    });
});


sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

