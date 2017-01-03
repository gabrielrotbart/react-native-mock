import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { buildComponentHTML } from '../test-utils';
import sinon from 'sinon';

const COMPONENTS = [
  'Image',
  'Text',
  'TextInput',
  'Modal',
  'View',
  'ScrollView',
  'RefreshControl'
];

describe('Components', function () {
  const ReactNative = require('react-native');

  COMPONENTS.forEach(function (component) { // Render loads fast!
    it(`should render ${component}`, function () {
      const Component = ReactNative[component];
      const instance = shallow(<Component />);
      expect(instance.html()).to.equal(buildComponentHTML(component));
    });
  });

  it('should render ActivityIndicator', function () {
    const { ActivityIndicator } = ReactNative;
    const instance = shallow(<ActivityIndicator />);
    expect(instance.html()).to.include('ActivityIndicator');
  });

  it('should render Button', function () {
    const { Button } = ReactNative;
    const instance = shallow(<Button title="Title" />);
    expect(instance.html()).to.include('Title');
  });

  it('should render DatePickerIOS', function () {
    const { DatePickerIOS } = ReactNative;
    const instance = shallow(<DatePickerIOS date={new Date()} />);
    expect(instance.html()).to.include('DatePicker');
  });

  it('should render DrawerLayoutAndroid', function () {
    const { DrawerLayoutAndroid } = ReactNative;
    const handleRenderNavigationView = sinon.spy();
    const instance = shallow(<DrawerLayoutAndroid renderNavigationView={handleRenderNavigationView} />);
    expect(instance.html()).to.include('AndroidDrawerLayout');
    expect(handleRenderNavigationView).to.have.been.calledOnce;
  });

  it('should render ListView', function () {
    const { ListView } = ReactNative;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows([]);
    const instance = shallow(<ListView dataSource={dataSource} />);
    expect(instance.html()).to.include('<ScrollView');
    expect(instance.html()).to.include('<View');
  });

  it('should render KeyboardAvoidingView', function () {
    const { KeyboardAvoidingView } = ReactNative;
    const instance = shallow(<KeyboardAvoidingView />);
    expect(instance.html()).to.equal(buildComponentHTML('View'));
  });
});