import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import { GiftedChat, Message } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { firebaseConfig } from '../firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Firebase 초기화
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore 인스턴스 가져오기
const firestore = firebase.firestore();
const auth = getAuth();

const chattingRoom = '1'; // 채팅방 ID
const userName = 'king'; // 유저 닉네임

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => { // 유저UID 가져오기
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
        });

        // 컴포넌트가 언마운트될 때 감지 중지
        return () => unsubscribe();
    }, []);

    const onSend = async (newMessages = []) => {
        try {
            const chatRef = firestore.collection('/Chatting/' + chattingRoom + '/chat');
            const newMessage = {
                sendUserUID: currentUser.uid,
                sendUserName: userName,
                text: newMessages[0].text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            await chatRef.add(newMessage);
            getMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const getMessages = async () => {
        try {
            const messagesCollection = await firestore.collection('/Chatting/' + chattingRoom + '/chat').orderBy('createdAt', 'desc').get();
            const messagesData = messagesCollection.docs.map(doc => ({
                _id: doc.id,
                text: doc.data().text,
                createdAt: doc.data().createdAt.toDate(),
                user: {
                    _id: doc.data().sendUserUID,
                    name: doc.data().sendUserName, // 사용 가능한 경우 실제 사용자 이름을 사용할 수 있습니다
                },
            }));
            setMessages(messagesData);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <View style={styles.container}>
          <View style={styles.roomHeader}>
          
            <Text style={styles.roomHeaderText}>
              우당탕탕 프로젝트 채팅방 1
            </Text>
            <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
          </View>
                {currentUser && (
                <GiftedChat
                    messages={messages}
                    onSend={newMessages => onSend(newMessages)}
                    user={{
                        _id: currentUser.uid,
                    }}
                    renderUsernameOnMessage
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    roomHeader: {
    flexDirection: 'row',
      paddingLeft: 10,
      alignItems: 'center', // 요소를 수직 방향으로 가운데 정렬
      justifyContent: 'space-between', 
      backgroundColor: '#3D4AE7',
      height: windowHeight * 0.06,
    },
    roomHeaderText: {
      fontSize: 20,
      color: 'white',
      fontWeight: '600',
    },
    backButton: {
   
   marginRight:"5%"
      },
});

export default ChatScreen;
