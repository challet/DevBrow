import React from 'react';
import ReactDOM from 'react-dom';
import DevBrow from '../DevBrow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DevBrow />, div);
  ReactDOM.unmountComponentAtNode(div);
});
