export interface ILeaf {
    id: number | string;
    title: string;
    items: Array<ILeaf>;
    isExpanded: boolean;
    parentId?: number | string;
}
export interface ITree {
    root: ILeaf;
}
