document.addEventListener('DOMContentLoaded', function () {
  const requestBtn = document.querySelector('.request_btn');
  const popup = document.getElementById('popup');
  const requestForm = document.getElementById('requestForm');
  const submitButton = document.getElementById('submitButton'); // 수정된 부분
  const cancelButton = document.getElementById('cancelButton');
  const popupMessage = document.getElementById('popupMessage');

  requestBtn.addEventListener('click', () => {
    popup.style.display = 'block';
  });

  cancelButton.addEventListener('click', () => {
    closePopup();
  });

  requestForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // 파일 첨부와 제출 로직을 여기에 추가합니다.

    // 성공 메시지 표시 및 팝업 닫기
    popupMessage.textContent = '감사합니다';
    setTimeout(() => {
      popupMessage.textContent = '';
      closePopup();
    }, 1000);
  });

  function closePopup() {
    popup.style.display = 'none';
  }
});
