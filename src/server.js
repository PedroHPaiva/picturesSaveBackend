// require('dotenv').config();
// import express from "express";
// import cors from 'cors';
// import routes from './routes';

// const server = express();

// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
// server.use(cors());
// server.use(routes);
  
// server.get('/liveness_check', (req, res) => {
//     return res.status(200).json({
//         message: 'API alive.',
//     });
// });

// server.listen(8080, () => {
//     console.log("server started on port 8080");
// })

require('dotenv').config();
import express from "express";
import cors from 'cors';
import routes from './routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(routes);

server.get('/liveness_check', (req, res) => {
    return res.status(200).json({
        message: 'API alive.',
    });
});

export default server;
