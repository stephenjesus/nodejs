const express = require('express');

const router = express.Router();

const controller = require('../controller'); // Import the controller handling the route logic

// Import the Joi middleware for request body validation
const validateBody = require('../../../utils/joiMiddleWare');

// Import the validator for the request payload
const { revaluatePasswordPayload } = require('../validator/index');

// Route for evaluating passwords
router.post(
    '/evaluate-password',
    validateBody(revaluatePasswordPayload), // Validate the request body using the defined validator
    controller.evaluatePassword // Call the controller function to handle the password evaluation
);

router.get('/fetchSavedPasswords', controller.fetchSavedPasswords); // fetch list of saved passwords

module.exports = router;
