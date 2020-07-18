import React, {
  FC,
  MouseEvent,
  useContext,
  DragEvent,
  SyntheticEvent
} from 'react';
import map from 'lodash/map';

import { ILeaf } from '../../interfaces';
import { TreeContext } from '../../contexts/Tree.context';

export interface ITreeLeafProps {
  leaf: ILeaf;
}

const baseClassName = 'react-tree-project__leaf';

export const TreeLeaf: FC<ITreeLeafProps> = ({ leaf }) => {
  const {
    toggleIsExpanded,
    onChangeLeafPositionByIds,
    onLeafClick
  } = useContext(TreeContext);
  const isExpandable = leaf.items.length > 0;
  const desiredClassName = `${baseClassName} ${
    leaf.items.length > 0 ? `${baseClassName}-expandable` : ''
  }`;

  const handleExpand = (event: MouseEvent) => {
    event.preventDefault();
    toggleIsExpanded(leaf.id);
  };

  const items = leaf.isExpanded
    ? map(leaf.items, (l: ILeaf) => <TreeLeaf key={l.id} leaf={l} />)
    : [];

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const { target } = e;
    const { dataset } = target as HTMLDivElement;

    e.dataTransfer.setData('text/plain', dataset.leafid!);
    e.dataTransfer.dropEffect = 'move';
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const dropLeafId = target.dataset.leafid;
    const draggedElementLeafId = e.dataTransfer.getData('text');

    e.preventDefault();
    e.stopPropagation();

    try {
      await onChangeLeafPositionByIds(draggedElementLeafId, dropLeafId!);
    } catch (ex) {
      console.error(ex);
    }
  };

  // allow drop over element
  const handleOnDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleOnDragEnter = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={desiredClassName}
      data-id={leaf.id}
      onDragEnter={handleOnDragEnter}
      onDragOver={handleOnDragOver}
      onDrop={handleDrop}
    >
      <div className={`${baseClassName}__header`}>
        {isExpandable ? (
          <div
            className={`${baseClassName}__header__expand ${baseClassName}__header__expand--expandable`}
            onClick={handleExpand}
          >
            {leaf.isExpanded ? '-' : '+'}
          </div>
        ) : (
          <div className={`${baseClassName}__header__expand`} />
        )}
        <div
          className={`${baseClassName}__header__title`}
          data-leafid={leaf.id}
          draggable
          onDragStart={handleDragStart}
          onClick={onLeafClick}
        >
          {leaf.title}
        </div>
      </div>
      <div className={`${baseClassName}__items`}>{items}</div>
    </div>
  );
};
