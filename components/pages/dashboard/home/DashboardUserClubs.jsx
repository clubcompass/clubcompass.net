import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GoMailRead } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { GET_USER_CLUBS, SEND_VERIFICATION_EMAIL } from "../../../../lib/docs";
import { useAuthContext } from "../../../../context";
import { Loading } from "../../../general/Loading";
import { DashboardHeader } from "./DashboardHeader";
import { Clubs } from "../../clubs/Clubs";
import { CCIcon } from "../../../custom/cc";
import { CgSpinner } from "react-icons/cg";
import { MdPendingActions } from "react-icons/md";
import Cookies from "js-cookie";

export const DashboardUserClubs = () => {
  const { user } = useAuthContext();
  const { data: { getUserClubs: clubs } = {}, loading: loadingClubs } =
    useQuery(GET_USER_CLUBS, {
      context: {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      },
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e);
      },
      notifyOnNetworkStatusChange: true,
    });

  if (!clubs && loadingClubs) return <Loading />;

  const isException =
    !user?.emailVerified || !user?.active || clubs?.length === 0; // check this?

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader name={user?.firstname} ccid={user?.ccid} />
      {isException ? (
        <Exceptions
          emailVerified={user?.emailVerified}
          active={user?.active}
          clubs={clubs?.length !== 0}
          email={user?.email}
        />
      ) : (
        <Clubs clubs={clubs} />
      )}

      {/* {!clubs && (
        <div className="flex mt-4 justify-center">
          <Link href="/clubs">
            <a className="text-cc">Discover more &rarr;</a>
          </Link>
        </div>
      )} */}
    </div>
  );
};

const EmailNotVerifiedException = ({ email }) => {
  const [initialSent, setInitialSent] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [sendEmailVerification, { loading }] = useLazyQuery(
    SEND_VERIFICATION_EMAIL,
    {
      onCompleted: () => {
        setInitialSent(true);
        setSent(true);
        return setCooldown(60);
      },
      onError: (error) => {
        // handle this
        return console.log(error);
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (cooldown === 0) {
      setCooldown(0);
    }
    if (!cooldown) return;
    const intervalId = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [cooldown]);

  useEffect(() => {
    setTimeout(() => {
      setSent(false);
    }, 5000);
  }, [sent]);

  return (
    <div className="align-center mt-[15vh] flex flex-col items-center justify-center text-center">
      <GoMailRead size={75} className="mb-2 text-cc" />
      <h2 className="text-2xl font-bold">
        Your email address is not verified.
      </h2>
      <p className="text-lg text-[#686868]">
        Please check your email for a verification link.
      </p>
      <div
        onClick={() => sendEmailVerification({ variables: { email } })}
        role="button"
        className={`${
          loading || cooldown !== 0 ? "pointer-events-none bg-cc/40" : "bg-cc"
        } mt-2 flex flex-row items-center gap-2 rounded-lg px-3 py-1  text-sm text-white`}
      >
        {loading ? (
          <>
            <CgSpinner size={13} className="animate-spin" />
            <span className="font-medium">Sending Verification Email...</span>
          </>
        ) : (
          <>
            <span className="font-medium">
              {sent
                ? "Sent Verification Email!"
                : initialSent
                ? "Resend Verification Email"
                : "Send Verification Email"}
            </span>
            {cooldown === 0 ? (
              <IoSend size={13} />
            ) : (
              <p className="font-medium">{cooldown}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const AccountNotActiveException = () => (
  <div className="align-center mt-[15vh] flex flex-col items-center justify-center text-center">
    <MdPendingActions size={75} className="mb-2 text-cc" />
    <h2 className="text-2xl font-bold">Your account has not been activated.</h2>
    <p className="w-3/4 text-lg text-[#686868]">
      Your email has been verified but ASB needs to approve your account before
      you can access Club Compass features. This process usually takes less than
      24 hours.
    </p>
  </div>
);

const NoClubsException = () => (
  <div className="align-center mt-[15vh] flex flex-col items-center gap-4">
    <div className="h-[65px] w-[65px]">
      <CCIcon color="cc" />
    </div>
    <div className="flex flex-col items-center gap-1 text-center">
      <p className="text-2xl font-bold">
        Looks like you haven&apos;t signed up for any clubs yet!
      </p>
      <p className="text-lg">Once you sign up, your clubs will appear here</p>
      <Link href="/clubs">
        <a className="mt-2 text-xl font-bold text-cc">Discover some &rarr;</a>
      </Link>
    </div>
  </div>
);

const Exceptions = ({ emailVerified, active, clubs, email }) => {
  if (!emailVerified) {
    return <EmailNotVerifiedException email={email} />;
  }
  if (!active) {
    return <AccountNotActiveException />;
  }
  if (!clubs) return <NoClubsException />;
  return null;
};
