import React from "react";
import { Form, Field } from "formik";
import {
  Field as CustomField,
  FieldButton,
} from "../../../../../general/input/control";
import { Buttons } from "../OnboardingButtons";
export const OnboardingForm = ({
  values,
  isSubmitting,
  handleChange,
  handleBlur,
  form,
  usePaginationAsSubmission,
  buttons,
}) => {
  return (
    <Form className="w-full grid grid-cols-6 gap-3 items-center">
      {Array.isArray(form) ? (
        form.map((form) => {
          if (!form.custom) {
            return (
              <React.Fragment key={form.name}>
                <div style={{ gridColumn: `span ${form.span}` }}>
                  <Field
                    label={form.label}
                    id={`${form.name}-input`}
                    name={form.name}
                    type={form.type}
                    component={form.custom ? form.component : CustomField}
                    value={values[form.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...form.customProps}
                  />
                </div>
                {form.button && (
                  <div style={{ gridColumn: `span ${6 - form.span}` }}>
                    <FieldButton
                      primary={form.button.primary}
                      disabled={form.button.disabled}
                      label={form.button.label}
                      loading={isSubmitting}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          } else {
            return (
              <div key={form.name} style={{ gridColumn: `span ${form.span}` }}>
                {form.component}
              </div>
            );
          }
        })
      ) : (
        <>
          {form.custom ? (
            <div style={{ gridColumn: `span ${form.span}` }}>
              {form.component}
            </div>
          ) : (
            <React.Fragment>
              <div style={{ gridColumn: `span ${form.span}` }}>
                <Field
                  label={form.label}
                  id={`${form.name}-input`}
                  name={form.name}
                  type={form.type}
                  component={
                    form.option === "custom" ? form.component : CustomField
                  }
                  value={values[form.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {form.button && (
                <div style={{ gridColumn: `span ${6 - form.span}` }}>
                  <FieldButton
                    primary={form.button.primary}
                    disabled={form.button.disabled}
                    label={form.button.label}
                    loading={isSubmitting}
                  />
                </div>
              )}
            </React.Fragment>
          )}
        </>
      )}
      {usePaginationAsSubmission && <Buttons buttons={buttons} asSubmission />}
    </Form>
  );
};
