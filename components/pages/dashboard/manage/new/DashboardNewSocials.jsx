import { useMutation, useQuery } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import React from "react";
import Link from "next/link";
import { useAuthContext, useToastContext } from "../../../../../context";
import { ADD_LINK, DELETE_LINK, GET_CLUB_LINKS } from "../../../../../lib/docs";
import { addLinkSchema } from "../../../../../server/utils/validation/schemas/link/addLinkSchema";
import { CustomTitle } from "../../../../general/CustomTitle";
import { ModalProvider, useModalContext } from "../../../../general/Modal";
import {
  DashboardField as CustomField,
  DashboardDropdown as CustomDropdown,
  DashboardLinkType,
} from "../components";
import { BiLink } from "react-icons/bi";

export const DashboardNewSocials = () => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();

  const {
    data: { getClubLinks: links } = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_CLUB_LINKS, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
    variables: {
      clubId: "cl1kbbu9220686pv5sccz6gmd",
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
      addToast({
        type: "error",
        title: "An unexpected error occurred",
        message: "Error fetching links. Try again later.",
        duration: 10000,
      });
    },
  });

  const [deleteLink, { loading: deleteLoading }] = useMutation(DELETE_LINK, {
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: async (data) => {
      addToast({
        type: "info",
        title: "Successfully deleted link",
        message: "Removed link from your club.",
        duration: 5000,
      });
      return await refetch();
    },
    onError: (err) => {
      addToast({
        type: "error",
        title: "An unexpected error occurred",
        message: "Failed to remove link. Please try again later.",
        duration: 10000,
      });
    },
  });

  const handleDelete = async ({ id }) => {
    await deleteLink({
      variables: {
        clubId: "cl1kbbu9220686pv5sccz6gmd",
        data: {
          linkId: id,
        },
      },
    });
  };

  if (loading) return <p>Loading invites...</p>;
  if (error)
    return <p>There was a problem fetching your links. Try again later.</p>;

  return (
    <>
      <ModalProvider>
        <OpenModal />
        <ActionPage refetch={refetch} />
      </ModalProvider>
      <div className="flex flex-col justify-items-center gap-6 md:grid md:grid-cols-dashboardCards">
        {links.map((link, i) => (
          <div
            key={i}
            className="flex w-full flex-col gap-2 rounded-lg border px-4 py-4">
            <h5 className="text-xl font-semibold">{link.name}</h5>
            <p className="text-gray-400">{link.link}</p>
            <div className="mt-1 flex justify-between">
              <Link href={link.link}>
                <a target="_blank">
                  <DashboardLinkType type={link.type} />
                </a>
              </Link>
              <button
                onClick={() => handleDelete({ id: link.id })}
                className="rounded-md border px-3 text-gray-600 ">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className="flex w-fit flex-row items-center gap-2 rounded-lg border border-[#E4E4E4] bg-white px-5 py-2.5 text-[#727272] shadow-md shadow-black/[0.04] transition duration-200 hover:border-[#b3b3b3] hover:text-black"
      type="button">
      <BiLink size={19} />
      Add Link
    </button>
  );
};

const ActionPage = ({ refetch }) => {
  const { user } = useAuthContext();
  const { closeModal } = useModalContext();
  const { addToast } = useToastContext();

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
        clubId: "cl1kbbu9220686pv5sccz6gmd",
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
              className="rounded-md bg-black py-2 text-white"
              type="submit">
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
