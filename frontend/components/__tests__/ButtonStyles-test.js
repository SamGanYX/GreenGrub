// __tests__/styles.test.js
import styles from '../styles';

describe('styles object', () => {
  it('has a container style with flex: 1', () => {
    expect(styles.container).toBeDefined();
    expect(styles.container.flex).toBe(1);
  });

  it('has a button style with backgroundColor #4CAF50', () => {
    expect(styles.button).toBeDefined();
    expect(styles.button.backgroundColor).toBe('#4CAF50');
  });

  it('has errorText style with color red', () => {
    expect(styles.errorText).toBeDefined();
    expect(styles.errorText.color).toBe('red');
  });

  it('has input style with height 40 and borderColor gray', () => {
    expect(styles.input).toBeDefined();
    expect(styles.input.height).toBe(40);
    expect(styles.input.borderColor).toBe('gray');
  });

  it('has deleteButton style with backgroundColor red', () => {
    expect(styles.deleteButton).toBeDefined();
    expect(styles.deleteButton.backgroundColor).toBe('red');
  });
});
