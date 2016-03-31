'use strict'
const _validate = (v) => v.length >= 6 && v.length <= 15;
const Field = {
    type: String,
    validate: [_validate, 'Password must be between 6 and 15 chars'],
    required: true,
    index: false
}
module.exports = Field