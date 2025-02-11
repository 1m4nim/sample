import { useEffect, useState } from "react";

const ScrollRestoration = () => {
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    const handleScroll = () => {
      localStorage.setItem("scrollPosition", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

const JsonFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("jsonData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const intervalId = setInterval(async () => {
      await fetchJsonData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchJsonData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/data.json");
      if (!response.ok) throw new Error("データの取得に失敗しました");
      const json = await response.json();

      if (JSON.stringify(json) !== JSON.stringify(data)) {
        setData(json);
        localStorage.setItem("jsonData", JSON.stringify(json));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchJsonData} disabled={loading}>
        {loading ? "読み込み中..." : "手動でJSONを読み込む"}
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ScrollRestoration />
      <h1>スクロール位置の保持 + JSON 読み込み</h1>
      <JsonFetcher />
      <div style={{ height: "2000px" }} />
    </div>
  );
};

export default App;
