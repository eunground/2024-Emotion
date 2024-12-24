window.onload = function() {
    const ballsContainer = document.getElementById('ballsContainer');
    const balls = JSON.parse(localStorage.getItem('balls')) || [];

    balls.forEach((ball, index) => {
        const ballDiv = document.createElement('div');
        ballDiv.className = `ball ${getClassByEmotion(ball.emotion)}`;
        ballDiv.innerHTML = `
            <p>${ball.emotion}</p>
            <p>${ball.description}</p>
            <p>${new Date(ball.timestamp).toLocaleDateString()}</p>
            <button class="delete-btn" data-index="${index}">X</button>
        `;
        ballsContainer.appendChild(ballDiv);

        ballDiv.addEventListener('click', function() {
            const confirmMove = confirm("구슬을 기억할 기억으로 이동하겠습니까?");
            if (confirmMove) {
                addToFavorites(ball);
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeBall(index);
        });
    });
};

function removeBall(index) {
    const balls = JSON.parse(localStorage.getItem('balls')) || [];
    balls.splice(index, 1);
    localStorage.setItem('balls', JSON.stringify(balls));
    window.location.reload();
}

function addToFavorites(ball) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(fav => fav.timestamp === ball.timestamp);
    if (!isAlreadyFavorite) {
        favorites.push(ball);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("기억할 기억에 추가되었습니다!");
    } else {
        alert("이 구슬은 이미 기억할 기억에 있습니다.");
    }
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