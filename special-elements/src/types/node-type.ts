export interface NodeType {
  isParent: boolean;
  name: string;
  nthChild?: number;
  children?: NodeType[];
}
