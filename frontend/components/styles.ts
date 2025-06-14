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
    minWidth: 250,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  preferenceButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: 250,
  },
  foodItem: {
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: -2,
    fontSize: 18,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 2
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
  listContainer: {
    paddingBottom: 20,
  },
  itemText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10, 
    alignSelf: 'flex-end',

  },

  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },


  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
    flexGrow: 1, // Allow the table to grow
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  tableHeaderText: {
    // flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 228,
    padding: 10
  },
  tableValueHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    // textAlign: 'right',
    padding: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    flexWrap: 'wrap', // Allow wrapping of content
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    minWidth: 100, // Set a minimum width for cells
  },
  productNameButton: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 40,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    width: 228

  },
  productDetailsView: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 40,
    // backgroundColor: 'lightgreen',
    // borderRadius: 10,
    // width: 228

  },
  productCellText: {
    padding: 5,
    paddingLeft: 10,
    //flex: 1,
    //textAlign: 'center',
    minWidth: 100, 
  },
  valueCellText: {
    // flex: 1,
    // textAlign: 'right',
    padding: 5,
    minWidth: 100, 
    textAlign: 'center',
    // justifyContent: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
});

export default styles;

