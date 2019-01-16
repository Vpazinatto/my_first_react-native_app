import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 10,
  },
  inputArea: {
    height: 60,
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    borderColor: '#282c32',
    borderWidth: 1.2,
    borderRadius: 28,
    fontSize: 18,
    paddingHorizontal: 23,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 30,
    marginRight: 20,
  },
  textInput: {
    height: 40,
    marginTop: 10,
    fontSize: 19,
    width: 290,
  },
  searchIcon: {
    width: 38, 
    height: 38, 
    marginVertical: 8,
  },
  reposList: {
    margin: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 15,
    textAlign: 'left',
    fontWeight: "500",
  },
  emptyList: {
    textAlign: 'center',
    fontSize: 20,
    color: '#282c32',
  }, 
  usersList: {
    flex: 2,
  },
  userDescription: {
    flexDirection: 'row',
    paddingBottom: 30,
    paddingLeft: 20
  },
  reposDescription: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#cecaca',
    padding: 20,
    marginBottom: 10, 
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 10,
  },
  loginS: {
    fontSize: 20,
    marginBottom: 3.7,
    fontWeight: "bold",
  }, 
  reposS: {
    fontSize: 16.5,
    color: '#bc2121',
  },
  loginB: {
    fontSize: 25,
    fontWeight: "bold",
  },
  reposN: {
    fontSize: 20,
    marginBottom: 3.7,
    fontWeight: "bold",
  },
  reposD: {
    fontSize: 17,
    marginBottom: 5,
  },  
  reposL: {
    fontSize: 18
  },
  point: {
    borderRadius: 50,
    marginTop: 5,
    marginRight: 5,
    width: 15,
    height: 15,
  },
  flexRow: {
    flexDirection: 'row'
  }
});