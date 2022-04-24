const Constants = require('../constants/appConstants');
const STRING = 'string';
const INT = 'int';
const DOUBLE = 'double';
const OBJECT = 'object';
const ARRAY = 'array';

const AnyOfStringNull = [
  { type: STRING },
  { type: null },
];

const AnyOfDoubleNull = [
  { type: DOUBLE },
  { type: null },
];

const AnyOfIntNull = [
  { type: INT },
  { type: null },
];

const AnyOfArrayNull = [
  { type: ARRAY },
  { type: null },
];

module.exports = {
  SAVE_STORE_CONFIG: {
    id: '/store',
    type: 'object',
    required: ['store_hash'],
    properties: {
      store_hash: { type: 'string' },
    }
  },
  UPDATE_STORE_CONFIG: {
    id: '/store/{store_hash}',
    type: 'object',
    required: ['store_hash'],
    properties: {
      store_hash: { type: 'string' },
    }
  }
};
