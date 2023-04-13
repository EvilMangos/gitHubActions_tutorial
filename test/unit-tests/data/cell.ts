import { ICell } from "../../../src/interfaces/map.interface";

export const cellWithMine: ICell = {
  value: 0,
  isMine: true,
  isOpen: true,
};

export const cellWithoutMine: ICell = {
  value: 0,
  isMine: false,
  isOpen: false,
};
