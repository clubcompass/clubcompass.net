export const validate = async ({ schema, data }) => {
  try {
    await schema.validate(data);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: e.errors[0] };
  }
};
