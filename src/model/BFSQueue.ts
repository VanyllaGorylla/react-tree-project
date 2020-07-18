import { ILeaf } from '../interfaces';
import { BFSQueueNode } from './BFSQueueNode';
import isNil from 'lodash/isNil';

export class BFSQueue {
  first?: BFSQueueNode;
  last?: BFSQueueNode;
  size: number = 0;

  enqueue(newValue: ILeaf) {
    const newNode = new BFSQueueNode(newValue);

    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      // @ts-ignore
      this.last?.next = newNode;
      this.last = newNode;
    }

    ++this.size;

    return this;
  }

  dequeue() {
    if (this.size === 0) {
      return false;
    }

    const dequeuedNode = this.first;
    const newFirst = this.first?.next;

    if (isNil(newFirst)) {
      this.last = newFirst;
    }

    this.first = newFirst;

    // @ts-ignore
    dequeuedNode?.next = undefined;
    --this.size;

    return dequeuedNode;
  }

  destroy() {
    this.first = undefined;
    this.last = undefined;
    this.size = 0;
  }
}
