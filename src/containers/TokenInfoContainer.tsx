import { connect } from 'react-redux';
import TokenInfo from '../components/TokenInfo/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState) => ({
  tokenInfo: store.home.tokenInfo,
});

const TokenInfoContainer = connect(mapStateToProps)(TokenInfo);

export default TokenInfoContainer;
