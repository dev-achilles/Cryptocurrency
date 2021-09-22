import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../components/Home';
import db from '../../db';

it('renders correctly', () => {
  const props = {
    user: {
      token: null,
      name: 'Yevhenii',
      isLoggedIn: true,
      role: 'admin',
      error: false,
    },
    homeData: db.cryptocurrency,
  };
  const tree = renderer.create(<Home user={props.user} homeData={props.homeData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
