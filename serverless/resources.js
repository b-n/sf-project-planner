
module.exports.default = (event, context, callback) => {
    console.log(event);
    callback(null, 'success');
};
