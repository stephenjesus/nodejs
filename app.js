const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();

// Logger and unique request ID setup
const { auditLogger , logger } = require('./utils/logger');
const uuid = require('uuid');

// Middleware for logging and request/response handling
app.use((req, res, next) => {
    // Assign a unique request ID and create a child logger for the request
    req.log = auditLogger.child({ req_id: uuid.v4() }, true);

    // Log the incoming request details
    req.log.info({ req });

    // Log the response details once the request is finished
    res.on('finish', () => req.log.info({ res }));

    next();
});

// Common middleware setup
app.use(helmet()); // Enhances security by setting various HTTP headers
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses HTTP responses for better performance
app.use(bodyParser.json({ limit: '50mb' })); // Parses incoming JSON requests with a size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Parses URL-encoded data
app.use(cookieParser()); // Parses cookies attached to the request

// Establish database connection
require('./connection/mongoose');

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server Running Successfully' });
});

// Configure routes
require('./routes')(app);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
