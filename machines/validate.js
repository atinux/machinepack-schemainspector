module.exports = {

  friendlyName: 'Validate',

  description: 'Validate some json data against a schema.',

  extendedDescription: 'Schema-Inspector is a powerful tool to sanitize and validate JS objects. It\'s designed to work both client-side and server-side and to be scalable with allowing asynchronous and synchronous calls.',

  moreInfoUrl: 'https://www.npmjs.com/package/schema-inspector',

  inputs: {

    schema: {
      typeclass: 'dictionary',
      description: 'The JSON-schema to validate against',
      required: true,
      example: '*'
    },

    data: {
      typeclass: 'dictionary',
      description: 'The data to validate (i.e. the "JSON instance")',
      required: true,
      example: '*'
    }

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },
    invalid: {
      description: 'Provided data and schema are not compatible.',
      example: 'Property @.type: must be equal to "email", but is equal to "sms"\
                Property @.to[0]: must be a string, but is number\
                Property @.dolor[4]: must match [email], but is equal to "test"'
    },
    success: {
      description: 'OK.'
    }

  },

  fn: function(inputs, exits) {
    var inspector = require('schema-inspector');
    inspector.validate(inputs.schema, inputs.data, function (err, result) {
      if (err) {
        return exits.error(err);
      }
      if (!result.valid) {
        return exits.invalid(result.format());
      }
      return exits.success(inputs.data);
    });
  },

};
