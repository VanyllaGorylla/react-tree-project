import { ILeaf } from '../../interfaces';

export const fillChildren: (
  desiredLeaf: ILeaf,
  allLeafs: Array<ILeaf>
) => void = (desiredLeaf, allLeafs) => {
  const desiredLeafs = allLeafs.filter(
    (cl: ILeaf) => cl.parentId === desiredLeaf.id
  );

  desiredLeafs.forEach((l: ILeaf) => {
    fillChildren(l, allLeafs);
  });

  Array.prototype.push.apply(desiredLeaf.items, desiredLeafs);
};

export const parseItems: (
  rootId: number | string,
  items: Array<ILeaf>
) => Array<ILeaf> = (rootId, items) => {
  const resultArray: Array<ILeaf> = items.filter(
    (l) => typeof l.parentId === 'undefined' || l.parentId === null
  );

  resultArray.forEach((l: ILeaf) => {
    l.parentId = rootId;
    fillChildren(l, items);
  });

  return resultArray;
};
