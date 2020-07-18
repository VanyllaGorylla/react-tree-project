import React from 'react';

import Tree, { ITreeRootProps, ILeaf } from './index';

import './style/index.scss';

export default { title: 'Tree' };

export const withTree = () => {
  const items: Array<ILeaf> = [
    {
      id: '1',
      title: 'master item 1',
      isExpanded: false,
      items: []
    },
    {
      id: '11',
      title: 'item 11',
      isExpanded: false,
      items: [],
      parentId: '1'
    },
    {
      id: '12',
      title: 'item 12',
      isExpanded: false,
      items: [],
      parentId: '1'
    },
    { id: '2', title: 'master item 2', isExpanded: false, items: [] },
    { id: '3', title: 'master item 3', isExpanded: false, items: [] }
  ];

  const treeProps: ITreeRootProps = {
    items
  };

  return <Tree {...treeProps} />;
};
