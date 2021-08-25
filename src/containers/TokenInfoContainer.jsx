import { connect } from 'react-redux';
import TokenInfo from '../components/TokenInfo/index';

const mapStateToProps = (store) => ({
  tokenInfo: store.home.tokenInfo,
});

const TokenInfoContainer = connect(mapStateToProps)(TokenInfo);

export default TokenInfoContainer;
