import React ,{Component} from "react"
import { StyleSheet, Text, View } from 'react-native';
import Barra from "./componenentes/bara";

export default class App extends Component{
  render(){
    return (
<Barra/>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
