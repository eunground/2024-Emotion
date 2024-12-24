window.onload = function() {
    const favoriteBallsContainer = document.getElementById('favoriteBallsContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach((ball, index) => {
        const ballDiv = document.createElement('div');
        ballDiv.className = `ball ${getClassByEmotion(ball.emotion)}`;
        ballDiv.innerHTML = `
            <p>${ball.emotion}</p>
            <p>${ball.description}</p>
            <p>${new Date(ball.timestamp).toLocaleDateString()}</p>
            <button class="delete-btn" data-index="${index}">X</button>
        `;
        favoriteBallsContainer.appendChild(ballDiv);

        // 삭제 버튼 클릭 이벤트
        ballDiv.querySelector('.delete-btn').addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트 전파 방지
            const confirmDelete = confirm("기억을 삭제하시겠습니까?");
            if (confirmDelete) {
                removeFavorite(index);
            }
        });
    });
};

function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.location.reload();
}

function getClassByEmotion(emotion) {
    switch (emotion) {
        case '기쁨': return 'joy';
        case '슬픔': return 'sadness';
        case '화남': return 'anger';
        case '놀람': return 'surprise';
        case '불안': return 'anxiety';
        default: return '';
    }
}
