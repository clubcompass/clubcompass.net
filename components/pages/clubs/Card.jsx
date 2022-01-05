import {
  CardContainer as Container,
  CardHeader as Header,
  CardContent as Content,
  CardFooter as Footer,
} from ".";

export const Card = ({ children }) => <>{children}</>;

Card.Container = Container;
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
