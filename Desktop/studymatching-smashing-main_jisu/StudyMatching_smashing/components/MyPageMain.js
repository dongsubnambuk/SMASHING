import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyPageMain = () => {
  const navigation = useNavigation();

  const navigateToActivityHistory = () => {
    navigation.navigate("MyPageActivity"); // "ActivityHistory"에 해당하는 화면으로 이동
  };

  const navigateToAppSettings = () => {
    navigation.navigate("MyPageAppSetting"); // "AppSettings"에 해당하는 화면으로 이동
  };

  const navigateToAlarmSettings = () => {
    navigation.navigate("MyPageNotificationSettings"); // "AlarmSettings"에 해당하는 화면으로 이동
  };

  const navigateToOthers = () => {
    navigation.navigate("MyPageOthers"); // "Others"에 해당하는 화면으로 이동
  };

  const navigateToAppVersion = () => {
    navigation.navigate("MyPageAppVersion"); // "AppVersion"에 해당하는 화면으로 이동
  };

  const navigateToWithdrawal = () => {
    navigation.navigate("WithdrawPage"); // "Withdrawal"에 해당하는 화면으로 이동
  };

  const navigateToLogout = () => {
    navigation.navigate("LogoutPage"); // "Logout"에 해당하는 화면으로 이동
  };

  return (
    <View
      style={{
        boxSizing: "border-box",
        position: "relative",
        width: 360,
        height: 640,
        background: "#FFFFFF",
        border: "1px solid #000000",
      }}
    >
      <Text
        style={{
          position: "absolute",
          width: 92,
          height: 24,
          left: 16,
          top: 63,
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: 20,
          lineHeight: 24,
          textAlign: "center",
          color: "#000000",
        }}
      >
        마이페이지
      </Text>

      {/* 첫 번째 칸 - 활동내역 */}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          left: 16,
          top: 100,
          backgroundColor: "#3d4ae7",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={navigateToActivityHistory}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>활동내역</Text>
      </TouchableOpacity>

      {/* 두 번째 칸 - 앱 설정 */}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          left: 184,
          top: 100,
          backgroundColor: "#3d4ae7",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={navigateToAppSettings}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>앱 설정</Text>
      </TouchableOpacity>

      {/* 세 번째 칸 - 알람 설정 */}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          left: 16,
          top: 280,
          backgroundColor: "#3d4ae7",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={navigateToAlarmSettings}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>알람 설정</Text>
      </TouchableOpacity>

      {/* 네 번째 칸 - 기타, 앱 버전, 회원탈퇴, 로그아웃 */}
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          left: 184,
          top: 280,
          backgroundColor: "#3d4ae7",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={navigateToOthers}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>기타</Text>
      </TouchableOpacity>

      {/* 나머지 UI 컴포넌트들도 이어서 추가해주세요 */}
    </View>
  );
};

export default MyPageMain;
