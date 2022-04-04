import { useAuthContext } from "../../context";
import {
  DashboardAccountInformation as Information,
  DashboardAccountActions as Actions,
} from "../../components/pages/dashboard/account";
import { CustomTitle } from "../../components/general/CustomTitle";
import { Loading } from "../../components/general/Loading";
const Account = () => {
  const { user, loading } = useAuthContext();

  if (!user && !loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <CustomTitle
        title="Your Profile"
        subtitle="View and edit your account information."
      />
      <div className="flex flex-col justify-center gap-4">
        <Information />
        {/* <Actions /> */}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default Account;
