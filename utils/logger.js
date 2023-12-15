const bunyan = require('bunyan');

const auditLogger = bunyan.createLogger({ name: "audit", serializers: bunyan.stdSerializers });
const appLogger = bunyan.createLogger({ name: "application" });

module.exports = { auditLogger, logger: appLogger }