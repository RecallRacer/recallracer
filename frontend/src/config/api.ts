const backendUrl = 'http://localhost:5000';

export const apiEndpoints = {
  generateMaterial: `${backendUrl}/api/materials`,
  getMaterial: `${backendUrl}/api/materials`,
  addPlayer: `${backendUrl}/api/races`,
  getPlayers: `${backendUrl}/api/races`,
  toggleRace: `${backendUrl}/api/races`,
};
