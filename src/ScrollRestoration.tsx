import { useEffect, useState } from "react";

const ScrollRestoration = () => {
  const [savedPosition, setSavedPosition] = useState<number | null>(null);

  useEffect(() => {
    // ページ読み込み時にスクロール位置を復元
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    // スクロール時に位置を保存
    const handleScroll = () => {
      localStorage.setItem("scrollPosition", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // **手動でスクロール位置を保存**
  const handleSavePosition = () => {
    const currentPosition = window.scrollY;
    localStorage.setItem("scrollPosition", String(currentPosition));
    setSavedPosition(currentPosition);
  };

  // **手動でスクロール位置を復元**
  const handleRestorePosition = () => {
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <button onClick={handleSavePosition} style={{ marginRight: "10px" }}>
        スクロール位置を保存
      </button>
      <button onClick={handleRestorePosition}>スクロール位置を復元</button>
      {savedPosition !== null && <p>保存位置: {savedPosition}px</p>}
    </div>
  );
};

export default ScrollRestoration;
