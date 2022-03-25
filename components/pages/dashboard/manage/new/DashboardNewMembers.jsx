import { useState, useEffect, useCallback, Children } from "react";
import { useLazyQuery } from "@apollo/client";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { GET_USER } from "../../../../../lib/docs";
import {
  FieldButton,
  Field as CustomField,
  FieldSelect as Select,
} from "../../../../general/input/control";
import { CgSpinner } from "react-icons/cg";
import { MdPersonSearch } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

export const DashboardNewMembers = ({ initialValues }) => {
  //! Need to check which users selected to filter them out of the list of users
  //# get email from user, set president to user

  const sections = [
    {
      content: {
        header: "Advisor",
        description:
          "Invite a teacher by their ccid to be your club advisor. You can have up to 2 advisors.",
        // responsibilities: "...", // TODO: add responsibilities?
      },
      input: {
        type: "TEACHER",
        label: "Teacher CCID",
        // help section?
        // extra item for about the role or description
      },
      role: {
        name: "advisor",
        color: "#cadaff",
      },
    },
    {
      content: {
        header: "Vice President",
        description:
          "Invite a student by their ccid to be your club vice president. You can have up to 3 vice presidents.",
        // responsibilities: "...", // TODO: add responsibilities?
      },
      input: {
        type: "STUDENT",
        label: "Student CCID",
      },
      role: {
        name: "vice president",
        color: "#FFEAB4",
      },
    },
    {
      content: {
        header: "Secretary",
        description:
          "Invite a student by their ccid to be your club secretary. You can have up to 3 secretaries.",
        // responsibilities: "...", // TODO: add responsibilities?
      },
      input: {
        type: "STUDENT",
        label: "Student CCID",
      },
      role: {
        name: "secretary",
        color: "#FFDCE5",
      },
    },
    {
      content: {
        header: "Treasurer",
        description:
          "Invite a student by their ccid to be your club treasurer. You can have up to 3 treasurers.",
        // responsibilities: "...", // TODO: add responsibilities?
      },
      input: {
        type: "STUDENT",
        label: "Student CCID",
      },
      role: {
        name: "treasurer",
        color: "#F3DCFE",
      },
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-7 flex flex-col gap-2">
        <h2 className="text-lg font-bold">Invite your advisor and leaders.</h2>
        <p className="text-sm text-[#5D5E5E]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
          malesuada turpis.
        </p>
      </div>
      {/* <div className="grid w-fit grid-flow-row grid-cols-2 content-start gap-4"> */}
      {/* side by side grid ^ */}
      <div className="flex flex-col gap-4">
        {sections.map(({ content, input, role }, i) => (
          <InviteSectionContainer key={i} content={content}>
            <InviteMember {...input} />
            <OutgoingInvites role={role} />
          </InviteSectionContainer>
        ))}
      </div>
    </div>
  );
};

const OutgoingInvites = ({ role }) => {
  // get time of invite as sent
  const Invite = ({ invite }) => {
    const statusColors = {
      PENDING: "#ffeb52",
      ACCEPTED: "#76fe61",
      DECLINED: "#FF5252",
    };

    // if (userLoading)
    // loading skeleton
    // );
    if (invite) {
      const { user, status } = invite;
      const initials = (user.firstname[0] + user.lastname[0]).toUpperCase();
      return (
        <div className="w-fit rounded-lg border border-[#E6E6E6] bg-white p-2 shadow-md  shadow-gray-200/50">
          <div className="flex flex-row gap-2">
            <div className="flex h-10 items-center justify-center rounded-md bg-[#AFC7FF] text-center">
              <span className={`w-[40px] text-[1.1rem]`}>{initials}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#5D5E5E]">
                {user.firstname} {user.lastname}
              </p>
              <div
                style={{ backgroundColor: `${statusColors[status]}20` }}
                className="flex flex-row items-center gap-1 rounded-full px-1 py-0.5"
              >
                <span
                  style={{ backgroundColor: statusColors[status] }}
                  className="h-2 w-2 rounded-full"
                />
                <span className="text-[10px] capitalize">
                  {status.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <p>{userError?.message}</p>;
  };

  return (
    <div className="relative my-5 grid w-fit grid-flow-row grid-cols-3 gap-4 rounded-lg border p-3 pt-6">
      <p className="absolute -left-1 -top-2 bg-white px-1 text-xs text-gray-600">
        Your outgoing{" "}
        <span
          style={{ color: "#344457", backgroundColor: role.color }}
          className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase"
        >
          {role.name}
        </span>{" "}
        invites will appear here.
      </p>
      <Invite
        invite={{
          status: "PENDING",
          createdAt: "2020-06-01T00:00:00.000Z",
          user: { firstname: "John", lastname: "Doe" },
        }}
      />
      <Invite
        invite={{
          status: "DECLINED",
          createdAt: "2020-06-01T00:00:00.000Z",
          user: { firstname: "John", lastname: "Doe" },
        }}
      />
      <Invite
        invite={{
          status: "ACCEPTED",
          createdAt: "2020-06-01T00:00:00.000Z",
          user: { firstname: "John", lastname: "Doe" },
        }}
      />
      {/* <div className="p-2">
        <span className="text-sm">No outgoing {role.name} invites.</span>
      </div> */}
      {/* no invites ^ */}
      {/* make the widths even when there are no invites */}
    </div>
  );
};

const InviteMember = ({ type, label }) => {
  const [user, setUser] = useState(null);
  const [getUser, { loading: userLoading, error: userError }] = useLazyQuery(
    GET_USER,
    {
      onCompleted: (data) => {
        if (!data) {
          return setUser(data);
        }
        return setUser(data.getUser);
      },
      onError: (error) => {
        console.log(error);
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const UserPreview = () => {
    if (userLoading)
      return (
        <div className="flex flex-row items-center gap-2">
          <CgSpinner className="animate-spin" size={18} />
          <span className="font-medium">Searching for user...</span>
        </div>
      );
    if (user) {
      const initials = (user.firstname[0] + user.lastname[0]).toUpperCase();
      return (
        <div className="flex flex-row items-center gap-3">
          <div className="w-fit rounded-lg border border-[#E6E6E6] bg-white p-2 shadow-md  shadow-gray-200/50">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#AFC7FF] text-center">
                <span className="text-sm">{initials}</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#5D5E5E]">
                  {user.firstname} {user.lastname}
                </p>
                {/* <span className="bg-cc-light px-1 py-0.5 font-medium text-cc">
                  send invite
                </span> */}
              </div>
            </div>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-md bg-cc px-2 py-1 text-white">
            <span className="text-sm">Send Invite</span>
            <IoIosSend size={15} />
          </button>
        </div>
      );
    }
    return <p className="text-sm text-red-500">{userError?.message}</p>;
  };

  const inviteSchema = Yup.object().shape({
    ccid: Yup.string()
      .required("Required")
      .min(6, "CCID cannot be less than 6 characters")
      .max(6, "CCID cannot exceed 6 characters")
      .test("is-alpha", "CCID cannot contain numbers.", (value) =>
        /^[a-zA-Z]+$/.test(value)
      ),
  });

  return (
    <div className="flex flex-col gap-2">
      <Formik
        initialValues={{ ccid: "" }}
        onSubmit={async (values, { setFieldError, setSubmitting }) => {
          try {
            await getUser({
              variables: {
                identifier: { ccid: values.ccid },
                type: type,
              },
            });
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={inviteSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className="relative grid h-auto min-h-full grid-cols-4 gap-4">
            <Field
              name="ccid"
              label={label}
              maxLength={6}
              value={values["ccid"]}
              onChange={(e) =>
                setFieldValue("ccid", e.target.value.toUpperCase())
              }
              component={CustomField}
            />
            <FieldButton primary icon={<MdPersonSearch />} />
            {/* this component also accepts label prop if you don't want to use icon */}
          </Form>
        )}
      </Formik>

      <UserPreview />
    </div>
  );
};

const InviteSectionContainer = ({
  content: { header, description, max },
  children,
}) => (
  <div className="flex flex-col gap-3">
    <div>
      <h3 className="font-bold">{header}</h3>
      {/* shouldn't be h3? */}
      <p className="text-sm text-[#5D5E5E]">{description}</p>
    </div>
    <div>{children}</div>
  </div>
);
