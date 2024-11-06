// 저장된 감정 구슬 표시 및 더블 클릭 이벤트로 기억할 기억에 추가 기능
window.onload = function() {
    const ballsContainer = document.getElementById('ballsContainer');
    const balls = JSON.parse(localStorage.getItem('balls')) || [];

    // 각 구슬에 대한 UI 생성
    balls.forEach((ball, index) => {
        const ballDiv = document.createElement('div');
        ballDiv.className = 'ball';
        ballDiv.innerHTML = `
            <p>${ball.emotion}</p>
            <p>${ball.description}</p>
            <p>${new Date(ball.timestamp).toLocaleDateString()}</p>
            <button class="delete-btn" data-index="${index}">X</button>
        `;
        ballsContainer.appendChild(ballDiv);

        // 더블 클릭 이벤트로 기억할 기억에 추가
        ballDiv.addEventListener('dblclick', function() {
            const confirmMove = confirm("구슬을 기억할 기억으로 이동하겠습니까?");
            if (confirmMove) {
                addToFavorites(ball);
            }
        });
    });

    // 삭제 버튼 이벤트 설정
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeBall(index);
        });
    });
};

// 구슬 삭제
function removeBall(index) {
    const balls = JSON.parse(localStorage.getItem('balls')) || [];
    balls.splice(index, 1);
    localStorage.setItem('balls', JSON.stringify(balls));
    window.location.reload();
}

// 기억할 기억에 구슬 추가
function addToFavorites(ball) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // 중복 방지를 위해 해당 구슬이 이미 있는지 확인
    const isAlreadyFavorite = favorites.some(fav => fav.timestamp === ball.timestamp);
    if (!isAlreadyFavorite) {
        favorites.push(ball);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("기억할 기억에 추가되었습니다!");
    } else {
        alert("이 구슬은 이미 기억할 기억에 있습니다.");
    }
}
