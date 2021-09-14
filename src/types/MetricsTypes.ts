import { AppDispatch } from '../store';

export type Props = {
  dispatch: AppDispatch;
  metricsData: {
    alert_messages: null;
    all_time_high: {
      at: string;
      breakeven_multiple: number;
      days_since: number;
      percent_down: number;
      price: number;
    };
    blockchain_stats_24_hours: {
      adjusted_nvt: number;
      adjusted_transaction_volume: number;
      average_difficulty: number;
      count_of_active_addresses: number;
      count_of_blocks_added: number;
      count_of_payments: number;
      count_of_tx: number;
      kilobytes_added: number;
      median_tx_fee: number;
      median_tx_value: number;
      new_issuance: number;
      transaction_volume: number;
    };
    contract_addresses: Array<any>;
    cycle_low: {
      at: string;
      days_since: number;
      percent_up: number;
      price: number;
    };
    developer_activity: {
      commits_last_1_year: number;
      commits_last_3_months: number;
      lines_added_last_1_year: number;
      lines_added_last_3_months: number;
      lines_deleted_last_1_year: number;
      lines_deleted_last_3_months: number;
      stars: number;
      watchers: number;
    };
  };
};
