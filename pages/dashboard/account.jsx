import { useAuthContext } from "../../context";
import {
  DashboardAccountInformation as Information,
  DashboardAccountActions as Actions,
} from "../../components/pages/dashboard/account";
import { Loading } from "../../components/general/Loading";
const Account = () => {
  const { user, loading } = useAuthContext();

  if (!user && !loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="font-bold uppercase text-[#626262]">Settings</h1>
      <div className="flex flex-col gap-4">
        <Information />
        <Actions />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
      protected: true,
    },
  };
};

export default Account;
