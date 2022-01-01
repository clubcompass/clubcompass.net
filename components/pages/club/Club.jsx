import {
  ClubWrapper as Wrapper,
  ClubHeader as Header,
  ClubCarousel as Carousel,
  ClubContent as Content,
  ClubMembers as Members,
  ClubSimilarClubs as SimilarClubs,
} from ".";

export const Club = ({ children }) => <>{children}</>;

Club.Wrapper = Wrapper;
Club.Header = Header;
Club.Carousel = Carousel;
Club.Content = Content;
Club.Members = Members;
Club.SimilarClubs = SimilarClubs;
