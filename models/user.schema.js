const userSchema = {
    type: 'object',
    properties: {
      id: { type: 'string', primary: true },
      email: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['id', 'email', 'password'],
  };

  export default userSchema;