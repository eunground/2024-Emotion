// 페이지 로드 시 기억할 기억에 추가된 구슬 표시하기
window.onload = function() {
    const favoriteBallsContainer = document.getElementById('favoriteBallsContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // 각 구슬에 대한 UI 생성
    favorites.forEach(ball => {
        const ballDiv = document.createElement('div');
        ballDiv.className = 'ball';
        ballDiv.innerHTML = `
            <p>${ball.emotion}</p>
            <p>${ball.description}</p>
            <p>${new Date(ball.timestamp).toLocaleDateString()}</p>
        `;
        favoriteBallsContainer.appendChild(ballDiv);
    });
};
