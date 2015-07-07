module.exports = {

  friendlyName: 'Sanitize',

  description: 'Sanitize some json data against a schema.',

  extendedDescription: 'Schema-Inspector is a powerful tool to sanitize and validate JS objects. It\'s designed to work both client-side and server-side and to be scalable with allowing asynchronous and synchronous calls.',

  moreInfoUrl: 'https://www.npmjs.com/package/schema-inspector#s_type',

  inputs: {

    schema: {
      description: 'The JSON-schema to sanitize against',
      required: true,
      example: {}
    },

    data: {
      description: 'The data to sanitize (i.e. the "JSON instance")',
      required: true,
      example: '*'
    }

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      friendlyName: 'then',
      description: 'Send back the data sanitized.',
      getExample: function (inputs, env) {
        var mapping = {
          'string': 'abc',
          'number': 9.99,
          'integer': 23,
          'array': [],
          'object': {},
          'boolean': true,
          'null': null,
          'date': new Date(),
          'any': '*',
        };
        var schema = inputs.schema || {};
        if (schema.type !== 'object')
          return mapping[schema.type];
        var data = {};
        for (var key in schema.properties) {
          data[key] = mapping[schema.properties[key].type] || inputs.data[key] || 'abc';
        }
        return data;
      }
    }

  },

  fn: function(inputs, exits) {
    var inspector = require('schema-inspector');
    var schema = { type: "object", properties: { data: inputs.schema } };
    inspector.sanitize(schema, inputs, function (err, result) {
      if (err) {
        return exits.error(err);
      }
      // inputs.data updated
      return exits.success(inputs.data);
    });
  },

};
