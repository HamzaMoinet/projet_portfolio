// Gestionnaire d'erreur générique pour les appels API
export function handleApiError(error: any): string {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "Une erreur est survenue.";
}
