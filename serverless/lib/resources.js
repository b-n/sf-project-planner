
export function resources({ event, context, callback }) {
    console.log(event);
    callback(null, 'success');
}
