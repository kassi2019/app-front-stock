
import React, { useEffect, useState } from "react";
// import
// messageErreur,
// messageSucces
// "../../globalComponents/Notification.js";
import {
    listeProduitInventaire,
    updateLotsGlobal,
    //mettreAJourQuantiteTheorique,
} from "../../Service/produit.js";
import {
    afficherQteDisponible,
    AfficherQuantiteEnAttente,
    AfficherQuantiteExpirer,
} from "../../Service/tableauBord.js";
import { useSocketProduit } from "../../Service/useSocketProduit.js";
import { useDispatch, useSelector } from "react-redux";

function ProduitEnVente() {
    const [expandedRows, setExpandedRows] = useState({});
    const [stockTheorique, setStockTheorique] = useState({});
    //const [commentaires, setCommentaires] = useState({});
    const handleEtatLot = (lotId, value) => {
        setEtatProduits((prev) => ({
            ...prev,
            [lotId]: value,
        }));
    };
    const handleCommentChange = (lotId, systemStock, value) => {
        const val = value === "" ? 0 : Number(value); // gère le cas champ vide
        console.log(val);
        setStockTheorique((prev) => ({
            ...prev,
            [lotId]: {
                theorique: val,
                ecart: systemStock - val,
            },
        }));
    };
    const toggleRow = (idProduit) => {
        setExpandedRows((prev) => ({
            ...prev,
            [idProduit]: !prev[idProduit],
        }));
    };
    const handleSaveGlobal = async () => {
        const lotsData = stateProduitInventaire.flatMap((item) =>
            item.lots.map((lot) => {
                const statut = etatProduits[lot.id];
                const quantiteTheo =
                    statut === "pasbon" || statut === "valider"
                        ? Number(stockTheorique[lot.id]?.theorique)
                        : "";
                const statutprovisoire =
                    statut === "bon" ? 5 : statut === "pasbon" ? 6 : statut === "valider" ? 7 : 0;
                return {
                    lotId: lot.id,
                    valeurRadio: statutprovisoire,
                    quantiteTheorique: quantiteTheo,
                };
            })
        );

        await dispatch(updateLotsGlobal(lotsData));
        await dispatch(AfficherQuantiteEnAttente());
        await dispatch(AfficherQuantiteExpirer());
        await dispatch(afficherQteDisponible());
    };

    const { stateProduitInventaire } = useSelector((state) => state.produits);
    //const [data] = useState(inventaireData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listeProduitInventaire());
    }, [dispatch]);

    let globalSysteme = 0;
    let globalTheorique = 0;
    let globalEcart = 0;
    stateProduitInventaire.forEach((item) => {
        item.lots.forEach((lot) => {
            const theorique = stockTheorique[lot.id]?.theorique || 0;
            const ecart = stockTheorique[lot.id]?.ecart ?? 0 - lot.quantite;
            globalSysteme += lot.quantite;
            globalTheorique += theorique;
            globalEcart += ecart;
        });
    });
    const [etatProduits, setEtatProduits] = useState({});
    const allLotsOkGlobal = globalEcart === 0;

    useSocketProduit();
    return (
        <div style={{ overflowX: "auto" }}>
            <h5>Sélectionner les produits à vendre</h5>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th
                            style={{
                                border: "1px solid #000",
                                padding: 8,
                                textAlign: "center",
                            }}
                        >
                            N°
                        </th>
                        <th
                            style={{
                                border: "1px solid #000",
                                padding: 8,
                                textAlign: "center",
                            }}
                        >
                            Produit
                        </th>
                        
                        <th
                            style={{
                                border: "1px solid #000",
                                padding: 8,
                                textAlign: "center",
                            }}
                        >
                            Date d'expiration
                        </th>

                        <th
                            style={{
                                border: "1px solid #000",
                                padding: 8,
                                textAlign: "center",
                            }}
                        >
                            Action
                        </th>
                    </tr>
                </thead>

            </table>
        </div>
    );
}

export default ProduitEnVente;
