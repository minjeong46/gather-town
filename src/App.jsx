import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import "./App.css";
import { database } from "../firebase";

function App() {
    const SPRITE_WIDTH = 140;
    const SPRITE_HEIGHT = 200;
    const FRAME_COUNT = 4;
    const FRAME_DURATION = 100;

    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [frame, setFrame] = useState(0);
    const [direction, setDirection] = useState(0); // 0 아래, 1 위, 2 왼, 3오
    const bgPositionX = -(frame * SPRITE_WIDTH);
    const bgPositionY = -(direction * SPRITE_HEIGHT);
    const [isMoving, setIsMoving] = useState(false);

    function movePosition(x, y) {
        const getRef = ref(database, "/");
        set(getRef, {
            x: x,
            y: y,
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            let move = false;
            setPosition((prev) => {
                const next = { ...prev };
                if (e.key === "ArrowDown") {
                    next.y += 10;
                    setDirection(0);
                    move = true;
                } else if (e.key === "ArrowUp") {
                    next.y -= 10;
                    setDirection(1);
                    move = true;
                } else if (e.key === "ArrowLeft") {
                    next.x -= 10;
                    setDirection(2);
                    move = true;
                } else if (e.key === "ArrowRight") {
                    next.x += 10;
                    setDirection(3);
                    move = true;
                }
                if (move) {
                    movePosition(next.x, next.y);
                    setIsMoving(true);
                    setFrame(0);
                }
                return next;
            });
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const getRef = ref(database, "/");
        onValue(getRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPosition(data);
            }
        });
    }, []);

    useEffect(() => {
        if (!isMoving) return;
        let currentFrame = 0;
        const interval = setInterval(() => {
            currentFrame++;
            setFrame(currentFrame);

            if (currentFrame >= FRAME_COUNT - 1) {
                clearInterval(interval);
                setIsMoving(false);
                setFrame(0);
            }
        }, FRAME_DURATION);

        return () => clearInterval(interval);
    }, [isMoving]);

    return (
        position && (
            <div className="container">
                <div
                    className="character"
                    style={{
                        left: position.x + "px",
                        top: position.y + "px",
                        backgroundPosition: `${bgPositionX}px ${bgPositionY}px`,
                    }}
                ></div>
            </div>
        )

        // 이미지는 <a href="/kr">Freeimages.com</a>에서 가져왔습니다.
    );
}

export default App;
