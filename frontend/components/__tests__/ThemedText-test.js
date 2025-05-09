import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from '../Themed'; // Adjust path if needed

describe('Themed.Text', () => {
  it('renders correctly with default theme colors', () => {
    const tree = renderer
      .create(<Text>This is themed text</Text>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('applies custom light and dark colors when provided', () => {
    const tree = renderer
      .create(
        <Text lightColor="#000000" darkColor="#ffffff">
          Custom colored text
        </Text>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});