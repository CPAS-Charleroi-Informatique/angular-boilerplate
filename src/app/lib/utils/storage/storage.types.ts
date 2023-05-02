type StorageObjectMap = {
  'App/session': {
    token: string;
  };
};

export type StorageObjectType = 'App/session';

export type StorageObjectData<T extends StorageObjectType> = {
  type: T;
  data: StorageObjectMap[T];
};
