import { connect } from 'react-redux';
import Metrics from '../components/Metrics/index';

const mapStateToProps = (store: any) => ({
  metricsData: store.table.metricsData,
});

const MetricsContainer = connect(mapStateToProps)(Metrics);

export default MetricsContainer;
