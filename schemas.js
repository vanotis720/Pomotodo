import {ObjectId} from 'bson';

class Todo {
  constructor({
    title,
    priority,
    rank,
    isFinished,
    partition,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.title = title;
    this.priority= priority;
    this.rank= rank;
    this.isFinished= isFinished;
  }

  static schema = {
    name: 'Todo',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      title: 'string',
      priority: 'string',
      rank: 'integer',
      isFinished: 'boolean'
    },
    primaryKey: '_id',
  };
}

export {Todo};