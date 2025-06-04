// __tests__/camera_styles.test.js
import { styles } from '../camera_styles';

describe('camera_styles', () => {
  test('container style has flex 1 and justifyContent center', () => {
    expect(styles.container).toBeDefined();
    expect(styles.container.flex).toBe(1);
    expect(styles.container.justifyContent).toBe('center');
  });

  test('flipButton style has correct backgroundColor and borderRadius', () => {
    expect(styles.flipButton).toBeDefined();
    expect(styles.flipButton.backgroundColor).toBe('rgba(0,0,0,0.5)');
    expect(styles.flipButton.borderRadius).toBe(10);
  });

  test('flipButtonText style has white color and bold fontWeight', () => {
    expect(styles.flipButtonText).toBeDefined();
    expect(styles.flipButtonText.color).toBe('white');
    expect(styles.flipButtonText.fontWeight).toBe('bold');
  });

  test('scanAgainButton style has red background color', () => {
    expect(styles.scanAgainButton).toBeDefined();
    expect(styles.scanAgainButton.backgroundColor).toBe('red');
  });

  test('saveInfoButton style has green background color', () => {
    expect(styles.saveInfoButton).toBeDefined();
    expect(styles.saveInfoButton.backgroundColor).toBe('#4CAF50');
  });
});