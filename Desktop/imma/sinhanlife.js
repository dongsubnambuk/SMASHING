    // 페이지 초기화
    var groups = document.querySelectorAll('.Insurance_type_explain .group');
    for (var i = 0; i < groups.length; i++) {
        groups[i].style.display = 'none';
    }

    // 이전에 선택한 페이지 ID를 가져옴
    var savedPageId = localStorage.getItem('selectedPage');

    // 이전에 저장된 페이지가 있다면 해당 페이지를 보이도록 설정
    if (savedPageId) {
        showPage(savedPageId);
    } else {
        // 초기로드 시 "page1"을 보이게 함
        showPage('page1');
    }

    function showPage(pageId) {
        // 모든 페이지 숨기기
        for (var i = 0; i < groups.length; i++) {
            groups[i].style.display = 'none';
        }

        // 선택한 페이지 보이기
        var selectedGroup = document.getElementById(pageId);
        if (selectedGroup) {
            selectedGroup.style.display = 'block';
        }

        // 선택한 페이지 ID를 저장
        localStorage.setItem('selectedPage', pageId);
    }

    // 검색 버튼 요소를 가져오기
    const searchButton = document.getElementById("searchButton1");



    // 결과를 나타낼 요소 가져오기
    const resultDiv = document.querySelector(".result");

    // 검색 버튼에 클릭 이벤트 리스너 추가
    searchButton.addEventListener("click", function () {
        // 여기에서 실제 검색 로직을 수행하고 결과를 resultDiv에 표시하는 코드를 작성합니다.
        // 예를 들어, 간단한 텍스트 결과를 표시하는 경우:
        resultDiv.textContent = "검색 결과가 여기에 표시됩니다.";
        // 결과 화면을 보이도록 스타일을 변경합니다.
        resultDiv.style.display = "block";
    });

    // JavaScript
    document.addEventListener("DOMContentLoaded", function () {
        // 검색 버튼 클릭 시 이벤트 처리
        document.getElementById("searchButton2").addEventListener("click", function () {
            // 검색 결과를 보이도록 변경
            document.querySelector(".result").style.display = "block";

            // 검색 결과를 여기에 표시 (이 부분은 실제 검색 결과를 나타내는 코드로 대체해야 함)
            document.querySelector(".result").innerHTML = "검색 결과가 여기에 나타납니다.";
        });
    });