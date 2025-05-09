// Mock useColorScheme module
jest.mock('../../components/useColorScheme', () => {
  return () => 'light';
});

import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from '../Themed'; // Adjust path if needed

describe('Themed.Text', () => {
  it('renders correctly with default theme colors', () => {
    let tree;
    act(() => {
      tree = renderer
        .create(<Text>This is themed text</Text>)
        .toJSON();
    });

    expect(tree).toMatchSnapshot();
  });

  it('applies custom light and dark colors when provided', () => {
    let tree;
    act(() => {
      tree = renderer
        .create(
          <Text lightColor="#000000" darkColor="#ffffff">
            Custom colored text
          </Text>
        )
        .toJSON();
    });

    expect(tree).toMatchSnapshot();
  });
});