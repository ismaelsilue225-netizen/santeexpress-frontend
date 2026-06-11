import { useState } from "react";

export default function App() {
  return (
    <div style={{background:"#00A859",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1 style={{color:"white",fontSize:36,fontWeight:900,margin:0}}>
        SANTÉ<span style={{color:"#C8FFDF"}}>EXPRESS</span>
      </h1>
      <p style={{color:"white",marginTop:16}}>
        Medicaments livrés chez vous
      </p>
    </div>
  );
}
