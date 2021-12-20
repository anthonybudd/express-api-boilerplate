module.exports = (data, meta, status) => ({
    data,
    meta: Object.assign({}, meta),
    status: status || 'ok',
})
