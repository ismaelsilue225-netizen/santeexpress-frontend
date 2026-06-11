export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #00B85C 0%, #006B35 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
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
              fontSize: "48px",
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
            }}
          >
            🏥 Espace Pharmacie
          </button>
        </div>

        {/* Hero */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div style={{ flex: 1, minWidth: "320px" }}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "25px",
              }}
            >
              <span style={{background:"rgba(255,255,255,.15)",padding:"10px 15px",borderRadius:"25px"}}>
                🌙 Garde 24h/24
              </span>

              <span style={{background:"rgba(255,255,255,.15)",padding:"10px 15px",borderRadius:"25px"}}>
                🛵 Livraison rapide
              </span>

              <span style={{background:"rgba(255,255,255,.15)",padding:"10px 15px",borderRadius:"25px"}}>
                💳 Mobile Money
              </span>
            </div>

            <h2
              style={{
                fontSize: "64px",
                lineHeight: "1.1",
                marginBottom: "20px",
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
                marginBottom: "30px",
              }}
            >
              Trouvez une pharmacie de garde à Abidjan et commandez en quelques secondes.
            </p>

            <input
              type="text"
              placeholder="Rechercher un médicament..."
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                marginBottom: "20px",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: "#00D26A",
                  color: "white",
                  border: "none",
                  padding: "18px 30px",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  fontSize: "18px",
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
                }}
              >
                📱 WhatsApp
              </a>
            </div>
        

         
         {/* Illustration */}
<div
  style={{
    flex: 1,
    minWidth: "250px",
    textAlign: "center",
  }}
>
  <img
  src="/1000494918.png"
  alt="Pharmacien"
  style={{
    width: "550px",
    maxWidth: "100%",
    borderRadius: "20px"
  }}
/>

</div>
</div>
<h3>📋 Pharmacies partenaires</h3>

          <p>• Pharmacie Saint Jean</p>
          <p>• Pharmacie des Deux Plateaux</p>
          <p>• Pharmacie Cocody Centre</p>
        

        {/* Footer */}
        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,.2)",
            paddingTop: "20px",
          }}
        >
          <p>📞 0777926219</p>
          <p>📍 Abidjan, Côte d'Ivoire</p>
          <p>© 2026 Santé Express</p>
        </div>
      </div>
    </div>
  );
}
