import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  buttonsContainer: {
    width: '100%',
    gap: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    marginTop: 30,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  swapModeButton: {
    position: 'absolute',
    top: 40,         // adjust based on status bar height
    left: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  bottomLogin: {
    position: 'absolute',   // allows free placement
    top: 100,               // adjust Y position
    left: 50,               // adjust X position
    width: '80%',           // optional: control width
    alignSelf: 'center',    // center if needed
  },
  dropdownButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default styles;