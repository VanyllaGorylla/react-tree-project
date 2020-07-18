import { ILeaf } from '../interfaces';

export class BFSQueueNode {
  value: ILeaf;
  next?: BFSQueueNode;

  constructor(value: ILeaf) {
    this.value = value;
  }
}
