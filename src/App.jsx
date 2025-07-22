import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [position, setPosition] = useState({ x: 100, y: 100 });

    useEffect(() => {
        const handleKeyDown = (e) => {
            console.log(e.key);
            setPosition((prev) => {
                const next = { ...prev };
                if (e.key === "ArrowUp") next.y -= 10;
                else if (e.key === "ArrowDown") next.y += 10;
                else if (e.key === "ArrowLeft") next.x -= 10;
                else if (e.key === "ArrowRight") next.x += 10;
                return next
            });
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
     position && (<div className="container">
            <div
                className="character"
                style={{ left: position.x + "px", top: position.y + "px" }}
            ></div>
        </div>
        )

        // 이미지는 <a href="/kr">Freeimages.com</a>에서 가져왔습니다.
    );
}

export default App;
