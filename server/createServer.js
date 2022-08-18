export default function createServer(app, port) {
    app.listen(port, () => {
        console.log(`Escuchando en el puerto ${port} - PID WORKER ${process.pid}`)
    })
}