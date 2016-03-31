'use strict'
const _get = (v) => v.toUpperCase();
const _set = (v) => v.toLowerCase();
const _validate = (v) => v.length > 3;
const Field = {
    type: String,
    get: _get,
    set: _set,
    validate: [_validate, 'Name must be more than 3 chars'],
    required: true,
    index: false
}
module.exports = Field