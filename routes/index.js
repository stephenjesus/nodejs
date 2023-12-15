module.exports = app => {
    app.use("/v1", require("../modules/password-store/route/index"));
};