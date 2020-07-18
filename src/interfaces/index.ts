export interface IInputLeaf {
  id: number | string;
  title: string;
  parentId?: number | string;
}

export interface ILeaf extends IInputLeaf {
  items: Array<ILeaf>;
  isExpanded: boolean;
}

export interface ITree {
  root: ILeaf;
}
