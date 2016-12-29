
module.exports.hello = (event, context, callback) => {
    console.log(event);
    callback(null, 'success');
};
