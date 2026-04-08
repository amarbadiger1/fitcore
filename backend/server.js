import http from "http"
import app from "./src/app.js"
import chalk from 'chalk';
import config from "./src/config/config.js"
const server = http.createServer(app)

const port = config.PORT || 5000
server.listen(port, () => {
    console.log(chalk.bgGreen("Server is running at:", port));
})