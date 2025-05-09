import { render } from '@testing-library/react-native';
import { MonoText } from '../StyledText';

test('renders correctly', () => {
  const { toJSON } = render(<MonoText>Snapshot test!</MonoText>);
  
  expect(toJSON()).toMatchSnapshot();
});
