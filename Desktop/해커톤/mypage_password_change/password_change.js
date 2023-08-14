document.addEventListener('DOMContentLoaded', function () {
    var updateBtn = document.querySelector('.update_btn');
    updateBtn.addEventListener('click', changePassword);

    var cancelBtn = document.querySelector('.cancel_btn');
    cancelBtn.addEventListener('click', cancelPasswordChange);
});

function changePassword() {
    var nowPasswordInput = document.getElementById('password1');
    var newPasswordInput = document.getElementById('password2');
    var newPasswordCheckInput = document.getElementById('password3');

    if (nowPasswordInput.value.trim() === "") {
        alert("비밀번호를 입력해야 변경이 가능합니다.");
        return;
    }

    var newPassword = newPasswordInput.value;
    var confirmNewPassword = newPasswordCheckInput.value;

    if (newPassword === nowPasswordInput.value) {
        alert("현재 비밀번호와 새 비밀번호가 동일합니다. 다른 비밀번호를 입력하세요.");
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert("새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
        return;
    }

    alert("비밀번호가 성공적으로 변경되었습니다.");
    resetPasswordFields();
}

function cancelPasswordChange() {
    alert("비밀번호 변경이 취소되었습니다.");
    resetPasswordFields();
}

function resetPasswordFields() {
    var nowPasswordInput = document.getElementById('password1');
    var newPasswordInput = document.getElementById('password2');
    var newPasswordCheckInput = document.getElementById('password3');

    if (nowPasswordInput && newPasswordInput && newPasswordCheckInput) {
        nowPasswordInput.value = '';
        newPasswordInput.value = '';
        newPasswordCheckInput.value = '';
    } else {
        console.error("Some password input elements are missing.");
    }
}
