import React, { useState } from "react";
import {
  View, Text, TextInput, Button, StyleSheet, Modal, Alert,
} from "react-native";

const WithdrawPage = ({ isVisible, onClose, onConfirm, handleWithdrawal }) => {
  const [password, setPassword] = useState("");

  const handleConfirmWithdrawal = () => {
    onConfirm(password);
    setPassword("");
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>회원 탈퇴</Text>
          <Text>비밀번호를 입력하세요:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.buttons}>
            <Button title="취소" onPress={onClose} />
            <Button title="확인" onPress={handleConfirmWithdrawal} />
          </View>
          {/* 추가된 부분: 회원 탈퇴 버튼 */}
          <Button title="회원 탈퇴" onPress={handleWithdrawal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});

export default WithdrawPage;