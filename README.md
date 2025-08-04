# Gather-town
GatherTown 같이 실시간으로 캐릭터 이동 반영하는 사이트

# 🖥️ 개발환경
 - React
 - vite 7.0.4
 - fireBase
 - fireBase Realtime DB

# ✅ 주요 구성 포인트
1. 키보드 방향키를 누를 시 캐릭터 이미지가 이동
    - 전체적으로 브라우저에서 이벤트 발생 시 동작시키기 위해 document 활용
      
      ```document.addEventListener("keydown", handleKeyDown);```
   
    - useEffect hook 을 이용하여 이벤트 발생 시 posistion 위치 저장
   
      ```
      setPosition((prev) => {
         const next = { ...prev };
         if (e.key === "ArrowDown") {
             next.y += 10;
      ```
    - 이동시 isMove state 상태 업데이트
    - 이동하면 position state 상태 업데이트

2. firebase Realtime DB 저장
    - set 움직임 저장
    - onValue 실시간으로 DB에 저장된 위치를 가져와 position state 반영
3. 스프라이트 이미지를 활용하여 애니메이션
    - 가로(움직임)

      ```const [frame, setFrame] = useState(0);```

    - 세로(위치별 이동 모션)
  
      ```const [direction, setDirection] = useState(0);```

    - 애니메이션 변수

      ```
      const SPRITE_WIDTH = 140;
      const SPRITE_HEIGHT = 200;
      const FRAME_COUNT = 4;
      const FRAME_DURATION = 80;
      ```
   - bg-position 설정

     ```
      const bgPositionX = -(frame * SPRITE_WIDTH);
      const bgPositionY = -(direction * SPRITE_HEIGHT);
     ```
     
4. 애니메이션 동작
   - setInterval 를 활용하여 비동기 반영
     currentFram 가 일정 이상 넘어기면 다시 frame 을 초기화하고 모션이 움직일 수 있도록 초기화(반복하여 모션 구현)
     
     ```
      const interval = setInterval(() => {
            currentFrame++;
            setFrame(currentFrame);

            if (currentFrame >= FRAME_COUNT - 1) {
                clearInterval(interval);
                setIsMoving(false);
                setFrame(0);
            }
     ```
