import {
  ToolbarContainer as Container,
  ToolbarSort as Sort,
  ToolbarSearch as Search,
  ToolbarFilter as Filter,
} from ".";

const Toolbar = ({ children }) => <>{children}</>;

Toolbar.Container = Container;
Toolbar.Sort = Sort;
Toolbar.Search = Search;
Toolbar.Filter = Filter;

export default Toolbar;
