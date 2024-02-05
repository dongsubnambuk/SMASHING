import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Message } from 'react-native-gifted-chat';

import { firebaseConfig, chattingRoom, userUID, userName } from '../firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Firebase 초기화
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore 인스턴스 가져오기
const firestore = firebase.firestore();

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    const onSend = async (newMessages = []) => {
        try {
            const chatRef = firestore.collection('/Chatting/' + chattingRoom + '/chat');
            const newMessage = {
                sendUserUID: userUID,
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
          </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: userUID,
                }}
                renderUsernameOnMessage
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    roomHeader: {
      paddingLeft: 10,
      justifyContent: 'center',
      backgroundColor: '#3D4AE7',
      height: windowHeight * 0.06,
    },
    roomHeaderText: {
      fontSize: 20,
      color: 'white',
      fontWeight: '600',
    }
});

export default ChatScreen;
