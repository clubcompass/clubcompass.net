import { useState, Fragment, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Listbox, Transition } from "@headlessui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FiChevronDown } from "react-icons/fi";
import _ from "lodash";
import {
  GET_CLUB_ROLES,
  ISSUE_INVITE,
  ISSUE_TEACHER_INVITE,
  VALIDATE_USER,
} from "../../../../../../lib/docs";
import {
  GetClubInvitesPayload,
  GetClubRolesArgs,
  GetClubRolesPayload,
} from "../../../../../../server/graphql/club/types";
import {
  ValidateUserArgs,
  ValidateUserPayload,
} from "../../../../../../server/graphql/user/types";
import { CgLock, CgSpinner } from "react-icons/cg";
import {
  IssueInviteArgs,
  IssueInvitePayload,
  IssueTeacherInviteArgs,
  IssueTeacherInvitePayload,
} from "../../../../../../server/graphql/invite/types";
import { useAuthContext, useToastContext } from "../../../../../../context";
import { IoMdLock } from "react-icons/io";

type NewUser = ValidateUserPayload & { roles: { id: string }[] };

export const InviteUsers = () => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const [newUser, setNewUser] = useState<NewUser | null>(null);
  const [searchUser, { loading: userSearchLoading }] = useLazyQuery<
    { validateUser: ValidateUserPayload },
    ValidateUserArgs
  >(VALIDATE_USER, {
    onCompleted: (data) => {
      setNewUser({ ...data?.validateUser, roles: [] } ?? null);
    },
    onError: (error) => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: { getClubRoles: allRoles } = {}, loading } = useQuery<
    { getClubRoles: GetClubRolesPayload },
    GetClubRolesArgs
  >(GET_CLUB_ROLES, {
    variables: {
      clubId: "cl12yw8sj0026x9pck6j4zgoe",
    },
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },

    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "Error fetching club roles.",
        message:
          "There was an error fetching your club roles, please try again later.",
      });
    },
  });

  const setNewUserRoles = ({ roles }: { roles: NewUser["roles"] }): void => {
    if (!newUser) return;
    setNewUser({ ...newUser, roles });
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
    <div className="flex flex-col gap-3">
      <Formik
        initialValues={{ ccid: "" }}
        onSubmit={async ({ ccid }, { setFieldError }) => {
          setNewUser(null);
          try {
            await searchUser({ variables: { ccid } });
          } catch (error) {
            setFieldError("ccid", "CCID not found");
          }
        }}
        validationSchema={inviteSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex w-full flex-col items-start">
            <label htmlFor="ccid">
              <span className="text-sm">User CCID</span>
            </label>
            <div className="flex h-12 w-full flex-row items-center gap-2">
              <Field
                name="ccid"
                type="text"
                placeholder="HJCVFE"
                className={`${
                  errors.ccid && touched.ccid
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-cc focus:ring-cc-light"
                } form-input block h-full w-full rounded-md py-2 text-sm font-medium uppercase shadow-sm focus:ring  focus:ring-opacity-50`}
                maxLength={6}
              />

              <button
                disabled={userSearchLoading}
                className={`${
                  userSearchLoading && "cursor-not-allowed bg-[#201C27]/20"
                } flex h-full w-32 items-center justify-center rounded-lg bg-[#201C27] text-sm font-medium text-white`}
                type="submit"
              >
                {userSearchLoading ? (
                  <CgSpinner className="animate-spin text-white" size={15} />
                ) : (
                  "Search"
                )}
              </button>
            </div>
            {errors.ccid && touched.ccid && (
              <div className="mt-2 text-xs text-red-500">{errors.ccid}</div>
            )}
          </Form>
        )}
      </Formik>

      <User {...newUser} roles={allRoles} setNewUserRoles={setNewUserRoles} />
      <InviteButton
        clubId="cl12yw8tf0126x9pc314sbfw7"
        roles={newUser?.roles}
        type={newUser?.type}
        ccid={newUser?.ccid}
      />
    </div>
  );
};

export const User = ({
  id,
  firstname,
  lastname,
  ccid,
  email,
  type,
  roles,
  setNewUserRoles,
}: NewUser & { roles: GetClubRolesPayload } & {
  setNewUserRoles: ({ roles }: { roles: NewUser["roles"] }) => void;
}) => {
  return (
    <div className="font-regular flex w-full flex-row items-center justify-between rounded-lg border px-4 py-3">
      {id ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="font-medium">
                {firstname} {lastname}
              </span>
              <span className="text-[#D6D6D6]">#{ccid}</span>
            </div>
            <div>
              <span className="text-[#848484]">{email}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-right text-sm font-medium text-[#848484]">
              {type}
            </span>
            <MemberDropDown
              type={type}
              roles={roles}
              setNewUserRoles={setNewUserRoles}
            />
          </div>
        </>
      ) : (
        <div className="flex h-12 w-full items-center justify-center">
          <span className="text-center text-sm">
            Please enter a CCID to search for a user
          </span>
        </div>
      )}
    </div>
  );
};

const MemberDropDown = ({
  roles,
  type,
  setNewUserRoles,
}: { roles: GetClubRolesPayload } & { type: NewUser["type"] } & {
  setNewUserRoles: ({ roles }: { roles: NewUser["roles"] }) => void;
}) => {
  const advisor: GetClubRolesPayload[number] = {
    id: "",
    name: "Advisor",
    type: "LEADER",
    color: "#8f8f8f",
  };

  const [selected, setSelected] = useState<GetClubRolesPayload[number]>(
    type === "TEACHER" ? advisor : roles[0]
  );

  const handleSelection = (role: GetClubRolesPayload[number]) => {
    setSelected(role);
    setNewUserRoles({ roles: [{ id: role.id }] }); // doesn't even need to be an array rn
  };
  return (
    <div className="relative flex w-fit flex-row items-center gap-1">
      <Listbox
        value={selected}
        onChange={handleSelection}
        disabled={type === "TEACHER"}
      >
        <div className="relative mt-1">
          <Listbox.Button
            // disabled={type !== "STUDENT"}
            disabled={true}
            className={`${
              type === "TEACHER" ? "cursor-not-allowed" : "cursor-pointer"
            } relative w-full min-w-[10rem] rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-black/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-black/10 sm:text-sm`}
          >
            <div className="flex flex-row items-center gap-2">
              <span
                style={{ backgroundColor: selected.color }}
                className="h-2 w-2 rounded-full"
              />
              <span className="block truncate capitalize">{selected.name}</span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {type === "TEACHER" ? (
                <IoMdLock
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <FiChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {roles.map((role, i) => (
                <Listbox.Option
                  key={i}
                  style={{
                    backgroundColor: _.isEqual(selected, role) && role.color,
                  }}
                  className={({ active }) =>
                    `relative mx-1 cursor-pointer select-none rounded-md py-2 px-3 capitalize ${
                      _.isEqual(selected, role) && "bg-gray-50 font-semibold"
                    } ${active ? "bg-gray-100" : "text-gray-900"}`
                  }
                  value={role}
                >
                  <span>{role.name}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const InviteButton = ({
  clubId,
  ccid,
  type,
  roles,
}: {
  clubId: string;
  ccid: string;
  type: NewUser["type"];
  roles: { id: string }[];
}) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();

  const [issueInvite, { loading: inviteLoading }] = useMutation<
    IssueInvitePayload,
    IssueInviteArgs
  >(ISSUE_INVITE, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      return addToast({
        type: "error",
        title: "An error occurred.",
        message:
          "There was a problem sending your invite. Please try again later.",
      });
    },
  });

  const [issueTeacherInvite, { loading: teacherInviteLoading }] = useMutation<
    IssueTeacherInvitePayload,
    IssueTeacherInviteArgs
  >(ISSUE_TEACHER_INVITE, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "An error occurred.",
        message:
          "There was a problem sending your invite. Please try again later.",
      });
    },
  });

  const handleInvitation = async () => {
    if (type === "STUDENT") {
      return await issueInvite({
        variables: {
          clubId,
          recipientCCID: ccid,
          inviteRoles: roles,
        },
      });
    } else if (type === "TEACHER") {
      return await issueTeacherInvite({
        variables: {
          clubId,
          recipientCCID: ccid,
        },
      });
    }
    return addToast({
      type: "error",
      title: "Invalid User Type",
      message: `Recipient user type is invalid. (${type})`,
    });
  };

  const isLoading = inviteLoading || teacherInviteLoading;

  return (
    <button
      disabled={!ccid || isLoading}
      onClick={async () => await handleInvitation()}
      className={`${
        (!ccid || isLoading) && "cursor-not-allowed bg-[#201C27]/20"
      } flex h-10 w-40 items-center justify-center rounded-lg bg-[#201C27] text-sm font-medium text-white`}
    >
      {isLoading ? (
        <CgSpinner className="animate-spin text-white" size={15} />
      ) : (
        "Invite"
      )}
    </button>
  );
};
