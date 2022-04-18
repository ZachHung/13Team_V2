export default function Dialog({ message, onDialog, nameDelete }) {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "1",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
        onClick={() => onDialog(false)}
        
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "52%",
            transform: "translate(-50%,-50%)",
            background: "red",
            padding: "25px",
            borderRadius: "15px"
          }}
        >
          <h3 style={{ color: "#111", fontSize: "medium" }}>{message}</h3>
          <h1 style={{ color: "blue", fontSize: "medium" }}>{nameDelete}</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => onDialog(true)}
              style={{
                background: "white",
                color: "red",
                padding: "10px",
                marginRight: "4px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Đồng ý
            </button>
            <button
              onClick={() => onDialog(false)}
              style={{
                background: "green",
                color: "white",
                padding: "10px",
                marginLeft: "4px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Không
            </button>
          </div>
        </div>
      </div>
    );
  };
  export function DialogOK({ message, onDialog }) {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "1",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
        onClick={() => onDialog(false)}
        
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "52%",
            transform: "translate(-50%,-50%)",
            background: "white",
            padding: "25px",
            borderRadius: "15px"
          }}
        >
          <h3 style={{ color: "#111", fontSize: "medium" }}>{message}</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => onDialog(true)}
              style={{
                background: "lightblue",
                color: "black",
                padding: "10px",
                marginLeft: "4px",
                marginTop: "10px",
                border: "none",
                cursor: "pointer"
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };