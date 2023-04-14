export interface ICell {
  value: number;
  isOpen: boolean;
  isMine: boolean;
}

export type IMap = Array<Array<ICell>>;

export interface ICellCoordinates {
  row: number;
  column: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IResult {
  map: IMap;
  isWin: boolean;
  isLoose: boolean;
}
