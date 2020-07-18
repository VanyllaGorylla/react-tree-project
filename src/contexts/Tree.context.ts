import { createContext, MouseEvent, SyntheticEvent } from 'react';

import { ILeaf } from '../interfaces';

export interface ITreeContext {
  items: Array<ILeaf>;
  toggleIsExpanded(leafId: number | string): void;
  onChangeLeafPositionByIds(
    leafId?: number | string,
    destinationLeafId?: number | string
  ): Promise<any>;
  onLeafClick(e: SyntheticEvent): void;
}

export const TreeContext = createContext<ITreeContext>({
  items: [],
  toggleIsExpanded: () => {},
  onChangeLeafPositionByIds: (leafId, destinationLeafId) => Promise.resolve(),
  onLeafClick: () => {}
});
