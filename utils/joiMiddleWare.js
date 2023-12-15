
// Define a function that generates middleware for validating the request body
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details.map((err) => err.message) });
        }

        next();
    };
};

module.exports = validateBody;
