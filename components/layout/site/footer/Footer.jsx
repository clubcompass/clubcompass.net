import { FooterLogo as Logo, FooterNavigation as Navigation } from ".";
export const Footer = () => {
  return (
    <div className="w-full border-t-[1px] border-[#E3E7EB] mt-4">
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between mx-12 py-6 md:gap-0 gap-4">
        <Logo />
        <Navigation />
      </div>
    </div>
  );
};
