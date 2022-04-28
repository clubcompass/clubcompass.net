import React from "react";
import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { useAuthContext, useToastContext } from "../../../../../../context";
import { useModalContext } from "../../../../../general/Modal";
import { ADD_LINK } from "../../../../../../lib/docs";
import { addLinkSchema } from "../../../../../../server/utils/validation/schemas/link/addLinkSchema";
import { CustomTitle } from "../../../../../general/CustomTitle";
import {
  DashboardField as CustomField,
  DashboardDropdown as CustomDropdown,
} from "../../components";
import { CgSpinner } from "react-icons/cg";
import { useManagementContext } from "../../context";

export const LinkAddForm = ({ refetch }) => {
  const { user } = useAuthContext();
  const { closeModal } = useModalContext();
  const { addToast } = useToastContext();
  const { clubId } = useManagementContext();

  //   console.log(user);

  const [addLink, { loading }] = useMutation(ADD_LINK, {
    context: {
      headers: { authorization: `Bearer ${user.token}` },
    },
    onCompleted: (data) => {
      addToast({
        type: "info",
        title: "Successfully added link",
        message: "Added link to your club.",
        duration: 5000,
      });
    },
    onError: (error) => {
      addToast({
        type: "error",
        title: "An unexpected error occurred",
        message: "Failed to add link. Please try again later.",
        duration: 10000,
      });
    },
  });

  const handleSubmission = async ({ name, link, type }) => {
    await addLink({
      variables: {
        clubId,
        data: {
          name,
          link,
          type,
        },
      },
    });
    closeModal();
    return await refetch();
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <CustomTitle
        title="Add Link"
        subtitle="This link will be viewable for visitors of your club page."
      />
      <Formik
        initialValues={{
          name: "",
          link: "",
          type: "",
        }}
        onSubmit={async (values, { setFieldError }) => {
          await handleSubmission(values);
        }}
        validationSchema={addLinkSchema}>
        <Form className="grid w-full gap-6">
          <Field
            name="name"
            label="Link Name"
            placeholder="Website"
            span={1}
            required
            component={CustomField}
          />
          <Field
            name="link"
            label="Link URL"
            placeholder="https://www.clubcompass.net"
            span={1}
            required
            component={CustomField}
          />
          <Field
            name="type"
            label="Link Type"
            required
            component={CustomDropdown}
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={closeModal}
              className="rounded-md bg-gray-200 py-2">
              Cancel
            </button>
            <button
              disabled={loading}
              className={
                loading
                  ? `disabled rounded-md bg-gray-500 py-2 text-white`
                  : `rounded-md bg-black py-2 text-white`
              }
              type="submit">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <CgSpinner className="animate-spin" /> Adding...
                </span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
