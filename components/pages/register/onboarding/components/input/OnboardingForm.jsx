import React from "react";
import { Form, Field } from "formik";
import {
  Field as CustomField,
  FieldButton,
} from "../../../../../general/input/control";
import { Buttons } from "../OnboardingButtons";
import { useBreakpoints } from "../../../../../../hooks/useBreakpoints";

export const OnboardingForm = ({
  values,
  isSubmitting,
  handleChange,
  handleBlur,
  form,
  usePaginationAsSubmission,
  buttons,
}) => {
  const multipleFields = Array.isArray(form);

  if (multipleFields) {
    return (
      <Form className="mx-auto grid w-[90vw] max-w-[495px] grid-cols-6 gap-3">
        {form.map((form) => {
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
                  <div
                    className="h-[400px] bg-red-500"
                    style={{ gridColumn: `span ${6 - form.span}` }}>
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
        })}
        {usePaginationAsSubmission && (
          <Buttons buttons={buttons} asSubmission />
        )}
      </Form>
    );
  } else {
    return (
      <Form className="mx-auto grid w-[90vw] max-w-[495px] grid-cols-6 gap-3">
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
              <div
                style={{
                  gridColumn: `span ${6 - form.span}`,
                }}>
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
        {usePaginationAsSubmission && (
          <Buttons buttons={buttons} asSubmission />
        )}
      </Form>
    );
  }
};
