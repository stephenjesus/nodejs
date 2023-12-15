const { Password } = require("../schema/index");

const { strongPasswordChecker } = require("../../../utils/password-checker/index");

const { logger } = require("../../../utils/logger");

/**
 * @name storePassword
 * @async
 * @description Method to Store the Password and Strength
 * @param {object} payload 
 * @returns Return a success response with password data
 */
module.exports.storePassword = async (payload) => {
    return await Password.create(payload);
}

/**
 * @name getAll
 * @async
 * @description Method to fetch the saved password and strength
 * @param {object} payload 
 * @returns Return list of the saved password and strength
 */
module.exports.getAll = async (limit , offset) => {
    const query = Password.find().skip(offset).limit(limit).lean();
    return await query.exec();
}

/**
 * @name evaluatePassword
 * @async
 * @description Method to Evaluate the Password Strength
 * @param {object} payload 
 * @returns Return a success response with evaluated password data
 */
module.exports.evaluatePassword = async ({ password }) => {
    try {

        logger.info(`STARTED EVALUATING THE PASSWORD STRENGTH`);

        const strength = strongPasswordChecker(password);

        const response = await this.storePassword({ password, strength });

        logger.info(`SUCCESSFULLY EVALUATED THE PASSWORD STRENGTH`);

        return response;

    } catch (error) {

        logger.error(`FAILED TO EVALUATE THE PASSWORD STRENGTH AND ERROR ${error.message}`);

        throw new Error(`FAILED TO EVALUATE THE PASSWORD STRENGTH AND ERROR ${error.message}`);
    }
}

