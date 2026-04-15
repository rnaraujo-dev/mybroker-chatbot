import ChatWidget from "./components/ChatWidget"

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef4fb 0%, #dbe7f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
          color: "#1e3a8a",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
          My Broker Search Lead Assistant
        </h1>
        <p style={{ fontSize: "18px", color: "#475569", maxWidth: "700px" }}>
          A guided lead capture experience for real estate professionals looking
          for help with marketing, websites, ads, and automation.
        </p>
      </div>

      <ChatWidget />
    </div>
  )
}

export default App