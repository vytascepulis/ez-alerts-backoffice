import { ReactNode } from 'react';

export interface Column {
  id: string;
  title?: string;
}
export interface Rows {
  uniqueId: string;
  data: { [key: string]: ReactNode }[];
}
