import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '../Themed'; // Adjust path if needed

describe('Themed.Text', () => {
  it('renders correctly with default theme colors', () => {
    const { toJSON } = render(<Text>This is themed text</Text>);

    expect(toJSON()).toMatchSnapshot();
  });

  it('applies custom light and dark colors when provided', () => {
    const { toJSON } = render(
      <Text lightColor="#000000" darkColor="#ffffff">
        Custom colored text
      </Text>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

function FormDataMock() {
  this.append = jest.fn();
}

global.FormData = FormDataMock