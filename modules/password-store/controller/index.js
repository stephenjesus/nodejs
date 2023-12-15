const HttpStatus = require('http-status-codes');

const { logger } = require('../../../utils/logger');

const { evaluatePassword, getAll } = require('../service/index');

/**
 * @name evaluatePassword
 * @async
 * @description Endpoint to evaluate the password strength
 * @param {object} req 
 * @param {object} res 
 * @returns Return a success response with evaluated password data
 */
module.exports.evaluatePassword = async (req, res) => {
    try {
        logger.info(`STARTED EVALUATING THE PASSWORD STRENGTH`);

        // Evaluate the password strength using the service function
        const evaluatedPasswordData = await evaluatePassword(req.body);

        logger.info(`SUCCESSFULLY EVALUATED THE PASSWORD STRENGTH`);

        // Return a success response with evaluated password data
        return res.status(HttpStatus.OK).json({
            message: 'SUCCESS',
            status: true,
            data: evaluatedPasswordData
        });

    } catch (error) {
        // Log error if password evaluation fails
        logger.error(`FAILED TO EVALUATE THE PASSWORD STRENGTH AND ERROR ${error.message}`);
        // Return an error response if password evaluation fails
        return res.status(HttpStatus.BAD_GATEWAY).json({ status: false, message: "FAILED TO EVALUATE THE PASSWORD STRENGTH", error: error.message });
    }
};

/**
 * @name fetchSavedPasswords
 * @async
 * @description Endpoint fetching the saved passwords
 * @param {object} req 
 * @param {object} res 
 * @returns Return list of fetched saved passwords
 */
module.exports.fetchSavedPasswords = async (req, res) => {
    try {
        logger.info(`STARTED FETCHING THE SAVED PASSWORD WITH STRENGTH`);

        const { limit = 10, offset = 0 } = req.params || {};

        const savedPasswords = await getAll(limit, offset);

        logger.info(`SUCCESSFULLY FETCHED THE SAVED PASSWORD WITH STRENGTH`);

        return res.status(HttpStatus.OK).json({
            message: 'SUCCESS',
            status: true,
            data: savedPasswords
        });

    } catch (error) {

        logger.error(`FAILED TO FETCH THE SAVED PASSWORDS WIH STRENGTH AND ERROR ${error.message}`);

        return res.status(HttpStatus.BAD_GATEWAY).json({ status: false, message: "FAILED TO FETCH THE SAVED PASSWORDS WIH STRENGTH", error: error.message });
    }
}
