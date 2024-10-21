const { name } = require('eslint-plugin-prettier/recommended');
const { z } = require('zod');

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  preset: z.string(),
});
