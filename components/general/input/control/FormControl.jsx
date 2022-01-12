import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Field as CustomField, FieldButton as Button } from ".";

export const FormControl = ({ config }) => {
  return (
    <MainContainer>
      {config.map((config, index) => (
        <CustomForm key={index} {...config} />
      ))}
    </MainContainer>
  );
};

const MainContainer = ({ children }) => (
  <div className="w-[495px] flex flex-col gap-3">{children}</div>
);

const FormContainer = ({ children }) => (
  <div className="grid grid-cols-6 gap-3">{children}</div>
);

const CustomForm = ({ forms, action, validationSchema, button }) => {
  return (
    <Formik
      initialValues={forms.map((form) => ({ [form.name]: "" }))}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        // action();
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { values, isSubmitting, handleChange, handleBlur } = props;
        return (
          <Form>
            <FormContainer>
              {forms.map((form) => (
                <div key={form.name} className="col-span-6">
                  <Field
                    label={form.label}
                    id={`${form.name}-input`}
                    name={form.name}
                    component={CustomField}
                    value={values[form.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              ))}
              {/* <div className="col-span-6">
                <Button {...button} />
              </div> */}
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

// import { Field, FieldButton as Button } from ".";
// export const FormControl = ({ config }) => {
//   return (
//     <div className="w-[495px] flex flex-col gap-3">
//       {config[0].general.split ? (
//         <div className="grid grid-cols-2 gap-3">
//           <Field {...config[0].form} />
//           <Field {...config[1].form} />
//         </div>
//       ) : (
//         config.map((config, index) => <ControlGroup key={index} {...config} />)
//       )}
//     </div>
//   );
// };

// const ControlGroup = ({ general, form, button }) => {
//   return (
//     <Container {...general}>
//       <Field {...form} />
//       <Button {...button} />
//     </Container>
//   );
// };

// const Container = ({ children, visible, layout, justForm }) => {
//   const [field, button] = children;
//   return (
//     <div
//       className={`w-full ${
//         visible ? "grid grid-cols-6 gap-3 items-center" : "hidden"
//       } `}
//     >
//       <div
//         className={`${
//           layout === "1/2"
//             ? "col-span-3"
//             : layout === "3/4"
//             ? "col-span-4"
//             : layout === "full"
//             ? "col-span-6"
//             : "col-span-6"
//         }`}
//       >
//         {field}
//       </div>
//       {!justForm && (
//         <div
//           className={`${
//             layout === "1/2"
//               ? "col-span-3"
//               : layout === "3/4"
//               ? "col-span-2"
//               : layout === "full"
//               ? "col-span-6"
//               : "col-span-6"
//           }`}
//         >
//           {button}
//         </div>
//       )}
//     </div>
//   );
// };
