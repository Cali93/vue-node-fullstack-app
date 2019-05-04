exports.productSchema = {
  properties: {
    name: { type: 'string' },
    category: { type: 'string' },
    brand: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['name', 'category'],
  additionalProperties: false
};
