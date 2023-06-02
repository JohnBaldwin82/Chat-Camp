const path = require('path');
const express = require('express');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io')
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

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

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//express.urlencoded() function parses requests and returns an object
// can also use inflate, limit, verify 
app.use(express.urlencoded({ extended: true }));
app.use(routes);


const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('chat message', (message) => {
        console.log('Received message:', message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('You have been disconnected');
    });
});

app.get('/', (req, res) => {
    res.render('homepage', { }); // Pass any data you want to the template
  });

  app.get('/profile', (req, res) => {
    res.render('profile', { }); // Pass any data you want to the template
  });

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

