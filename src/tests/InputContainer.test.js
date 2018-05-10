import React from 'react';
import InputContainer from '../containers/InputContainer'
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

it('should render without crashing', () => {
 shallow(<InputContainer />);
})

xit('should render input box', () => {
 const wrapper = shallow(<InputContainer />);
 const input = wrapper.find('.input-box');
 expect(input.exists()).toEqual(true);
})

it('should match the snapshot', () => {
 const component = renderer.create(
  <InputContainer />
 );
 let tree = component.toJSON();
 expect(tree).toMatchSnapshot();
})