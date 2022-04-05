import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { createClubSchema } from "../../../../../server/utils/validation/schemas/club/createClubSchema";
import { usePaginationContext } from "../components";
import { GET_TAGS, CREATE_CLUB } from "../../../../../lib/docs";
import { useManagementContext } from "../context";
import {
  DashboardField as CustomField,
  DashboardRadio as CustomRadio,
} from "../components";
import type { Club } from "../context";

export const DashboardNewBase = () => {
  const { next } = usePaginationContext();
  const { clubId, club, saveClubAsDraft, editClub } = useManagementContext();

  const handleSubmitAsDraft = async ({
    name,
    description,
    availability,
    location,
    meetingDate,
  }: // tags,
  Club) => {
    if (clubId) {
      await editClub({
        variables: {
          clubId,
          data: {
            ...(availability && { availability }),
            ...(description && { description }),
            ...(location && { location }),
            ...(meetingDate && { meetingDate }),
            // ...(tags && { tags }),
          },
        },
      });
      return next();
    }

    await saveClubAsDraft({
      variables: {
        data: {
          name: name,
          ...(availability && { availability }),
          ...(description && { description }),
          ...(location && { location }),
          ...(meetingDate && { meetingDate }),
          // ...(tags && { tags }),
        },
      },
    });
    return next();
  };

  return (
    <div className="flex flex-col gap-6">
      <Formik
        initialValues={{
          name: club?.name || "",
          description: club?.description || "",
          email: club?.email || "",
          availability: club?.availability || "OPEN",
          location: club?.location || "",
          meetingDate: club?.meetingDate || "",
          // tags: [],
        }}
        onSubmit={async (values: Club, { setFieldError }) => {
          await handleSubmitAsDraft(values);
        }}
        validationSchema={createClubSchema}
      >
        <Form className="grid w-full grid-cols-2 gap-6">
          <Field
            name="name"
            label="Club Name"
            description="Make it clear, but not too long."
            placeholder="Robotics"
            span={1}
            required
            component={CustomField}
          />
          <Field
            name="description"
            label="Description"
            description="This is how members learn more about your club. Make sure you
              provide enough detail for people to understand what your club is
              all about."
            placeholder="Robotics is a club that teaches students how to build robots."
            span={2}
            textarea
            component={CustomField}
          />
          <Field
            component={CustomRadio}
            name="availability"
            label="Availability"
            description="Open: Anyone can join. Invite Only: Users must request to join
              your club. Closed: Members must be invited by the club to join."
            direction="column"
            options={[
              { label: "Open", value: "OPEN" },
              { label: "Invite Only", value: "INVITE_ONLY" },
              { label: "Closed", value: "CLOSED" },
            ]}
            span={2}
          />
          <Field
            name="location"
            label="Meeting Location"
            description="A room number works best. If it is outside of school, put where meetings are hosted at."
            placeholder="A101"
            span={1}
            component={CustomField}
          />
          <Field
            name="meetingDate"
            label="Meeting Date and Time"
            description="The shorter the better."
            placeholder="Every other Monday at 3:00pm"
            span={1}
            component={CustomField}
          />
          <div className="mt-3 grid w-[380px] grid-cols-2 items-center gap-3">
            <Link href="/dashboard">
              <a className="rounded-md bg-gray-100 px-9 py-2 text-center duration-100 hover:bg-gray-200">
                Dashboard
              </a>
            </Link>
            <button
              className="rounded-md bg-cc px-9 py-2 text-white duration-100 hover:bg-ccDark"
              type="submit"
            >
              Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
