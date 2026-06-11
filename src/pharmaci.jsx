export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #00B85C 0%, #006B35 100%)",
        color: "white",
        padding: "25px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: "900",
            fontStyle: "italic",
          }}
        >
          SANTÉ EXPRESS
        </h1>

        <button
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "12px 20px",
            borderRadius: "15px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🏥 Espace Pharmacie
        </button>
      </div>

      {/* Badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "12px 18px",
            borderRadius: "30px",
          }}
        >
          🌙 Garde 24h/24
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "12px 18px",
            borderRadius: "30px",
          }}
        >
          🛵 Livraison rapide
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "12px 18px",
            borderRadius: "30px",
          }}
        >
          💊 Mobile Money
        </div>
      </div>

      {/* Hero */}
      <h2
        style={{
          fontSize: "58px",
          lineHeight: "1.1",
          marginBottom: "20px",
          fontWeight: "900",
        }}
      >
        Vos médicaments
        <br />
        livrés chez vous.
      </h2>

      <p
        style={{
          fontSize: "24px",
          color: "#D9FEE6",
          maxWidth: "700px",
          marginBottom: "40px",
        }}
      >
        Trouvez une pharmacie de garde à Abidjan et commandez en quelques secondes.
      </p>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher un médicament..."
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "16px",
          borderRadius: "15px",
          border: "none",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* Boutons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <button
          style={{
            background: "#00D26A",
            color: "white",
            border: "none",
            padding: "18px 30px",
            borderRadius: "50px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Commander mes médicaments →
        </button>

        <a
          href="https://wa.me/2250777926219?text=Bonjour%20Santé%20Express,%20je%20souhaite%20commander%20un%20médicament."
          target="_blank"
          rel="noreferrer"
          style={{
            background: "white",
            color: "#00A859",
            padding: "18px 30px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          📱 WhatsApp
        </a>
      </div>
    </div>
  );
}
