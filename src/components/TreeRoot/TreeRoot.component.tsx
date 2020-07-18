import React, {
  FC,
  useEffect,
  useState,
  Component,
  SyntheticEvent
} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';
import remove from 'lodash/remove';

import { ILeaf, IInputLeaf } from '../../interfaces';
import { TreeLeaf } from '../TreeLeaf/TreeLeaf.component';
import { TreeContext } from '../../contexts/Tree.context';
import { BFSTree } from '../../model/BFSTree';
import { parseItems } from './helpers';

const ROOT_LEAF_ID = 'root-tree-id';

export interface ITreeRootProps {
  onChangeLeafPosition?(leaf: ILeaf, destinationLeaf: ILeaf): Promise<any>;
  renderLeaf?(leaf: ILeaf): FC | Component;
  items: Array<IInputLeaf>;
  rootLabel?: string;
  rootId?: string;
  onLeafClick?(e: SyntheticEvent): void;
}

export const TreeRoot: FC<ITreeRootProps> = ({
  items,
  onChangeLeafPosition,
  rootId,
  rootLabel,
  onLeafClick
}) => {
  const [tree, setTree] = useState<BFSTree | null>(null);

  const toggleExpandItemsHandler = (leafId: number | string) => {
    const newTree: BFSTree = cloneDeep(tree!);
    const desiredTreeItem = newTree.findLeafById(leafId);
    // @ts-ignore
    desiredTreeItem?.isExpanded = !desiredTreeItem?.isExpanded;

    setTree(newTree);
  };

  const onChangeLeafPositionByIds = async (
    leafId: number | string,
    destinationLeafId: number | string
  ) => {
    const newTree: BFSTree = cloneDeep(tree!);
    const baseLeaf = newTree.findLeafById(leafId);
    const parentLeaf = !isNil(baseLeaf?.parentId)
      ? newTree.findLeafById(baseLeaf?.parentId!)
      : undefined;
    const targetLeaf = newTree.findLeafById(destinationLeafId);

    // do async operations regarding to changeLeafs
    try {
      await onChangeLeafPosition!(baseLeaf!, targetLeaf!);
    } catch (ex) {
      console.error(ex);
      return;
    }

    // do operation on exsting tree in the component memory
    if (!isNil(parentLeaf)) {
      remove(parentLeaf.items, { id: leafId });
    }

    // @ts-ignore
    baseLeaf?.parentId = targetLeaf?.id;
    targetLeaf?.items.push(baseLeaf!);
    setTree(newTree);
  };

  useEffect(() => {
    const newItems = parseItems(
      ROOT_LEAF_ID,
      // enrich items from input props to make it work properly
      items.map(
        (l: IInputLeaf): ILeaf => ({
          ...l,
          isExpanded: false,
          items: []
        })
      )
    );
    const tree = new BFSTree({
      id: rootId!,
      title: rootLabel!,
      items: newItems,
      isExpanded: false
    });

    setTree(tree);
  }, [items]);

  return (
    <div className="react-tree-project">
      <TreeContext.Provider
        value={{
          items: tree?.root?.items || [],
          toggleIsExpanded: toggleExpandItemsHandler,
          onChangeLeafPositionByIds: onChangeLeafPositionByIds,
          onLeafClick: onLeafClick!
        }}
      >
        {!isNil(tree?.root) && <TreeLeaf leaf={tree?.root!} />}
      </TreeContext.Provider>
    </div>
  );
};

TreeRoot.defaultProps = {
  onChangeLeafPosition: (leaf?: ILeaf, destinationLeaf?: ILeaf) =>
    Promise.resolve(),
  rootLabel: `title for leaf master-root`,
  rootId: ROOT_LEAF_ID,
  onLeafClick: (e: SyntheticEvent) => {
    e.preventDefault();
  }
};
