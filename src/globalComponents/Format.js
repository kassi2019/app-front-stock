export const capitalizeWords = (str) => {
  return (
    str
      .toLowerCase()
      // autorise lettres, chiffres, espaces, apostrophes et tirets
      .replace(/[^a-zA-ZÀ-ÿ0-9 '-]/g, "")
      .split("")
      .filter(Boolean) // enlève les doubles espaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
  );
};

export function separateurChiffre(value) {
  if (!value && value !== 0) return "";
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
export function formatMontant(value, devise = "XOF") {
  if (!value && value !== 0) return "";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: devise,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
export function formatMontantDevise(value, devise = "XOF") {
  if (!value && value !== 0) return "";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: devise,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Fonction pour formater une date en AAAA-MM-JJ
export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Exemple : formater en JJ/MM/AAAA
export function formatDateFR(date) {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
