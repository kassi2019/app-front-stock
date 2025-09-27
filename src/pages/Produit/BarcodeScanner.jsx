import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useDispatch } from "react-redux";
import { ajouterProduit } from "../../Service/produit.js";

function BarcodeScanner() {
  const videoRef = useRef(null);
  const [codeBarre, setCodeBarre] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result) => {
      if (result) {
        setCodeBarre(result.getText());
      }
    });

    return () => codeReader.reset();
  }, []);

  const handleSave = () => {
    const produit = {
      libelle: "Produit Exemple",
      code: "P001",
      code_barre: codeBarre,
      prix_unitaire: 1000,
    };
    dispatch(ajouterProduit(produit));
  };

  return (
    <div>
      <h2>Veuillez scanné le code-barres du produit Svp</h2>
      {codeBarre && (
        <div>
          <p>Code scanné : {codeBarre}</p>
          <button onClick={handleSave}>Enregistrer le produit</button>
        </div>
      )}
      <video
        ref={videoRef}
        style={{ width: "1350px", border: "1px solid gray",height:"200px" }}
      />
    </div>
  );
}

export default BarcodeScanner;
