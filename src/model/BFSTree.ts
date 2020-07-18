import isNil from 'lodash/isNil';

import { ITree, ILeaf } from '../interfaces';
import { BFSQueue } from './BFSQueue';

export class BFSTree implements ITree {
  constructor(public root: ILeaf) {}

  traverseBFS() {
    if (isNil(this.root)) {
      return false;
    }

    const queue = new BFSQueue();
    const treeValues = [];

    queue.enqueue(this.root);

    while (queue.size !== 0) {
      if (queue.first?.value.items?.length !== 0) {
        queue.first?.value.items?.forEach((child: ILeaf) => {
          queue.enqueue(child);
        });
      }

      treeValues.push(queue.first?.value);

      queue.dequeue();
    }

    return treeValues;
  }

  findLeafById(leafId: number | string): ILeaf | undefined {
    let desiredValue: ILeaf | undefined;
    let queue: BFSQueue;

    if (isNil(this.root)) {
      return;
    }

    if (leafId === this.root.id) {
      return this.root;
    }

    queue = new BFSQueue();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      if (queue.first?.value.items?.length !== 0) {
        for (const iterationNode of queue.first?.value.items!) {
          if (iterationNode.id === leafId) {
            desiredValue = iterationNode;
            break;
          } else {
            queue.enqueue(iterationNode);
          }
        }
      }

      queue.dequeue();
      if (!isNil(desiredValue)) {
        break;
      }
    }

    queue.destroy();

    return desiredValue;
  }
}
