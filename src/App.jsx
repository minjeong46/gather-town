import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import "./App.css";
import { database } from "../firebase";

function App() {
    const [position, setPosition] = useState({ x: 100, y: 100 });

    function movePosition(x, y) {
        const getRef = ref(database, "/");
        set(getRef, {
            x: x,
            y: y,
        }).catch((err)=>{
            console.log(err);
        });
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            setPosition((prev) => {
                const next = { ...prev };
                if (e.key === "ArrowUp") next.y -= 10;
                else if (e.key === "ArrowDown") next.y += 10;
                else if (e.key === "ArrowLeft") next.x -= 10;
                else if (e.key === "ArrowRight") next.x += 10;
                movePosition(next.x, next.y);
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

    return (
        position && (
            <div className="container">
                <div
                    className="character"
                    style={{ left: position.x + "px", top: position.y + "px", }}
                ></div>
            </div>
        )

        // 이미지는 <a href="/kr">Freeimages.com</a>에서 가져왔습니다.
    );
}

export default App;
