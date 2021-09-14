import { AppDispatch } from './../store';

export type SortConfigType = {
  key: string;
  direction?: string;
  type: string;
};

export type CheckTypes = {
  name: string;
  value: string;
  isChecked: boolean;
};

export type CheckArray = {
  fields: CheckTypes[];
};

export type Props = {
  dispatch: AppDispatch;
  favourite: boolean;
  tableData: DataTypes[];
};

export type DataTypes = {
  checked: boolean;
  id: string;
  metrics: { market_data: { price_usd: number } };
  slug: string;
  symbol: string;
};
