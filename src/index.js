import server from './server';

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
