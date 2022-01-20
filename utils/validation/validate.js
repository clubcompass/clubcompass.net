export const validate = async ({ schema, data }) => {
  try {
    const r = await schema.validate(data);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: e.message };
  }
};
