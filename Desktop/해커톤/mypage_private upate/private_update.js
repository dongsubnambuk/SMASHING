document.addEventListener('DOMContentLoaded', function () {
    // 버튼 클릭 시 수정 기능 실행
    var updateBtn = document.querySelector('.update_btn');
    updateBtn.addEventListener('click', updateUserInfo);

    // 취소 버튼 클릭 시 초기화 기능 실행
    var cancelBtn = document.querySelector('.cancel_btn');
    cancelBtn.addEventListener('click', resetUserInfo);

    var logoutBtn = document.querySelector('.logout_btn');
    logoutBtn.addEventListener('click', function () {
        var welcomeMessage = document.querySelector('.welcome_message');
        welcomeMessage.textContent = "";
        //logout();
        alert("로그아웃되었습니다.");
    });
});



function updateUserInfo() {
    // 입력된 정보 가져오기
    var name = document.getElementById('name').value;
    var nickname = document.getElementById('nickname').value;
    var number = document.getElementById('number').value;

    // 실제로는 서버와 통신하여 데이터 업데이트 수행
    // 예를 들면 AJAX를 사용하여 서버로 데이터 전송 가능

    // 결과 출력
    alert("회원 정보가 업데이트되었습니다:\n이름: " + name + "\n닉네임: " + nickname + "\n연락처: " + number);
}

function resetUserInfo() {
    // 입력 필드 초기화
    document.getElementById('name').value = '';
    document.getElementById('nickname').value = '';
    document.getElementById('number').value = '';

    // 취소 알림 표시
    alert("취소되었습니다");
}
