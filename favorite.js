window.onload = function() {
    const favoriteBallsContainer = document.getElementById('favoriteBallsContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(ball => {
        const ballDiv = document.createElement('div');
        ballDiv.className = `ball ${getClassByEmotion(ball.emotion)}`;
        ballDiv.innerHTML = `
            <p>${ball.emotion}</p>
            <p>${ball.description}</p>
            <p>${new Date(ball.timestamp).toLocaleDateString()}</p>
        `;
        favoriteBallsContainer.appendChild(ballDiv);
    });
};

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
