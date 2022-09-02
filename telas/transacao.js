import React ,{Component} from "react"
import { StyleSheet, Text, View, TouchableOpacity,TextInput,Image,ImageBackground } from 'react-native';
import * as Permissions from "expo-permissions"
import db from "../config"
import firebase from "firebase";
const appIcon=require("../assets/appIcon.png")
const fundo=require("../assets/background2.png")
export default class Transacao extends Component{
  constructor () {
super()
this.state={
  hascamerapermition:null,
  bookId:"",
studantsId:"",
donstate:"normal",
studentName:"",
bookName:"",
}
  }
  solicitarP=async(estado)=>{
const {start}= await Permissions.askAsync(Permissions.CAMERA)
  }
  //procurar=async()=>
  //{alert("o livro está sendo procurado")}

  procurar = async () => {
    var { bookId, studantsId } = this.state;
    await this.getBookDetails(bookId);
    await this.getStudentDetails(studantsId);

    db.collection("books")
      .doc(bookId)
      .get()
      .then(doc => {
        var book = doc.data();
        if (book.is_book_available) {
          var { bookName, studentName } = this.state;
          this.initiateBookIssue(bookId, studantsId, bookName, studentName);
          alert("o livro foi emprestado")
        } else {
          var { bookName, studentName } = this.state;
          this.initiateBookReturn(bookId, studantsId, bookName, studentName);
          alert("o livro foi devolvido")
        }
      });
  };

  getBookDetails = bookId => {
    bookId = bookId.trim();
    db.collection("books")
      .where("book_id", "==", bookId)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({
            bookName: doc.data().book_name
          });
        });
      });
  };

 getStudentDetails = studentId => {
    studentId = studentId.trim();
    db.collection("students")
      .where("student_id", "==", studentId)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({
            studentName: doc.data().student_name
          });
        });
      });
  };

  initiateBookIssue = async (bookId, studentId, bookName, studentName) => {
    // adicionar uma transação
    db.collection("transactions").add({
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaction_type: "issue"
    });
    // alterar status do livro
    db.collection("books")
      .doc(bookId)
      .update({
        is_book_available: false
      });
    // alterar o número de livros retirados pelo aluno
    db.collection("students")
      .doc(studentId)
      .update({
        number_of_books: firebase.firestore.FieldValue.increment(1)
      });

    // atualizando estado local
    this.setState({
      bookId: "",
      studantsId: ""
    });
  };

  initiateBookReturn = async (bookId, studentId, bookName, studentName) => {
    // adicionar uma transação
    db.collection("transactions").add({
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaction_type: "return"
    });
    // alterar status do livro
    db.collection("books")
      .doc(bookId)
      .update({
        is_book_available: true
      });
    // alterar o número de livros retirados pelo aluno
    db.collection("students")
      .doc(studentId)
      .update({
        number_of_books: firebase.firestore.FieldValue.increment(-1)
      });

    // atualizando estado local
    this.setState({
      bookId: "",
      studantsId: ""
    });
  };

  render(){
    return (
    <View style={styles.container}>
      <ImageBackground source={fundo} style={styles.bgImage}>
      <View style={styles.upperContainer}>
      <Image source={appIcon} style={styles.appIcon}/>
      </View>
      <View style={styles.lowerContainer}>
      <View style={styles.textinputContainer}>
      <TextInput style={styles.textinput}/>
      <TouchableOpacity style={styles.button} onPress={()=>{this.solicitarP("scanner")}}>
        <text>digitalizar</text>
      </TouchableOpacity>
      </View>
      <View style={styles.textinputContainer}>
      <TextInput style={styles.textinput} placeholder={"id do aluno"}/>
      <TouchableOpacity style={styles.button} onPress={()=>{this.solicitarP("scanner")}}>
        <text>digitalizar</text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={this.procurar}>
        <text>GO</text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   backgroundColor: "#5653D4"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:{
    width: 100,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#F48D20",
    borderRadius: 15,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText:{
    fontSize: 20,
    color: "#FFFFFF"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 180,
    resizeMode: "contain"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
});