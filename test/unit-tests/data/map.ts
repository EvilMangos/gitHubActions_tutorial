import { IMap } from "../../../src/interfaces/map.interface";

export const winMap: IMap = [
  [
    {
      value: 0,
      isMine: true,
      isOpen: false,
    },
    {
      value: 0,
      isMine: true,
      isOpen: false,
    },
    {
      value: 0,
      isMine: true,
      isOpen: false,
    },
    {
      value: 1,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
  ],
  [
    {
      value: 2,
      isMine: false,
      isOpen: true,
    },
    {
      value: 3,
      isMine: false,
      isOpen: true,
    },
    {
      value: 2,
      isMine: false,
      isOpen: true,
    },
    {
      value: 1,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
  ],
  [
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
  ],
  [
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
  ],
];

export const notWinMap: IMap = [
  [
    {
      value: 0,
      isMine: true,
      isOpen: false,
    },
    {
      value: 0,
      isMine: true,
      isOpen: false,
    },
    {
      value: 0,
      isMine: true,
      isOpen: false,
    },
    {
      value: 1,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: true,
    },
  ],
  [
    {
      value: 2,
      isMine: false,
      isOpen: true,
    },
    {
      value: 3,
      isMine: false,
      isOpen: true,
    },
    {
      value: 2,
      isMine: false,
      isOpen: true,
    },
    {
      value: 1,
      isMine: false,
      isOpen: true,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
  ],
  [
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
  ],
  [
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
    {
      value: 0,
      isMine: false,
      isOpen: false,
    },
  ],
];
