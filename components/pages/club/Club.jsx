import {
  ClubWrapper as Wrapper,
  ClubHeader as Header,
  ClubContact as Contact,
  ClubContent as Content,
  ClubMeeting as Meeting,
  ClubMembers as Members,
  ClubSimilarClubs as SimilarClubs,
} from ".";

export const Club = ({ children }) => <>{children}</>;

Club.Wrapper = Wrapper;
Club.Header = Header;
Club.Contact = Contact;
Club.Content = Content;
Club.Meeting = Meeting;
Club.Members = Members;
Club.SimilarClubs = SimilarClubs;
