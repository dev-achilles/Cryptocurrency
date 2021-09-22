import { connect } from 'react-redux';
import Home from '../components/Home/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState) => ({
  user: store.user,
  homeData: store.home.homeData,
});

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
