/** Mongoose Configuration
 * @module connection/mongoose
 */

/** 
* @namespace mongooseConfiguration
*/


/**
 * Configuring .env file for env variables
 */
 require("dotenv").config();

 /**
 * Requiring Mongoose
 * @const
 */
 const mongoose = require("mongoose");
 
 /**
 * Requiring Logger
 * @const
 */
const { logger } = require("../utils/logger");
 
 /**
  * @typedef {Object} options
  * @property {Boolean} useNewUrlParser To parser MongoDB connection strings
  * @property {Boolean} useCreateIndex Ask MongoDB to be able to identify unique fields
  */
 const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 };
 
 /**
  * Opening Mongoose Connection
  * @name connect
  * @function
  * @memberof module:connection/mongoose~mongooseConfiguration
  * @inner
  * @param {string} mongoURI - MongoDB Connection URL
  * @param {object} connectionOptions - MongoDB Connection Options 
  */
 mongoose.connect(process.env.mongoURI, options);
 
 /**
  * Connected Handler
  * @name connected
  * @function
  * @memberof module:connection/mongoose~mongooseConfiguration
  * @inner
  * @param {string} connected - Connection Event
  * @param {callback} middleware - Middleware
  */
 mongoose.connection.on("connected", () => {
   logger.info(" Mongoose connected successfully") 
 });
 
 
 /**
  * Error Handler
  * @name error
  * @function
  * @memberof module:connection/mongoose~mongooseConfiguration
  * @inner
  * @param {string} error - Connection Event
  * @param {callback} middleware - Middleware
  */
 mongoose.connection.on("error", error => {
   logger.error("Error in mongoose connection", error);
 });
 
 /**
  * Disconnected Handler
  * @name disconnected
  * @function
  * @memberof module:connection/mongoose~mongooseConfiguration
  * @inner
  * @param {string} disconnected - Connection Event
  * @param {callback} middleware - Middleware
  */
  mongoose.connection.on("disconnected", (message) => {
   logger.warn(`Mongoose connection is disconnected`, message);
 });
 
 /**
  * Unexpected Shutdown Handler
  * @name SIGINT
  * @function
  * @memberof module:connection/mongoose~mongooseConfiguration
  * @inner
  * @param {string} SIGINT - Connection Event
  * @param {callback} middleware - Middleware
  */
 process.on("SIGINT", function () {
   mongoose.connection.close(() => {
     process.exit(0);
   });
 });
 