import {
  ToolbarContainer as Container,
  ToolbarSort as Sort,
  ToolbarFilter as Filter,
  ToolbarSearch as Search,
} from ".";

export const Toolbar = ({ children }) => <>{children}</>;

Toolbar.Container = Container;
Toolbar.Sort = Sort;
Toolbar.Filter = Filter;
Toolbar.Search = Search;
