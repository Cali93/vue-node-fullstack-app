exports.courseSchema = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    programme: { type: 'string' },
    date: { type: 'string' }
  },
  required: ['name', 'type'],
  additionalProperties: false
};
