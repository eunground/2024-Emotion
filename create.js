// 감정 구슬 저장하기
document.getElementById('emotionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const emotion = document.getElementById('emotion').value;
    const description = document.getElementById('description').value;
    
    // 구슬 정보 객체
    const ball = {
        emotion: emotion,
        description: description,
        timestamp: new Date().toISOString()
    };
    
    // localStorage에 저장
    let balls = JSON.parse(localStorage.getItem('balls')) || [];
    balls.push(ball);
    localStorage.setItem('balls', JSON.stringify(balls));
    
    alert('감정 구슬이 생성되었습니다!');
});
