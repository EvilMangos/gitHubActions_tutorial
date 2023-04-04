export interface ICell {
  value: number;
  isOpen: boolean;
  isMine: boolean;
}

export type IMap = Array<Array<ICell>>;

export interface ISize {
  width: number;
  height: number;
}
