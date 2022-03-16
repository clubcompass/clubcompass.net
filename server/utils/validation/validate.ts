import { SchemaOf, ValidationError } from "yup";

interface ValidateOptions<T> {
  schema: SchemaOf<T>;
  data: Record<SchemaOf<T>["_type"], any> | (string | number);
  // data should be keys of schema._type
}

export const validate = async <T>({
  schema,
  data,
}: ValidateOptions<T>): Promise<{
  valid: boolean;
  errors: ValidationError[] | null;
}> => {
  schema.validate;
  try {
    await schema.validate(data);
    return { valid: true, errors: null };
  } catch ({ errors }) {
    return { valid: false, errors: errors as ValidationError[] };
  }
};
