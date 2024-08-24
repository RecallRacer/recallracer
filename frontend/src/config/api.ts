const backendUrl = 'http://localhost:5000';

export const apiEndpoints = {
  generateMaterial: `${backendUrl}/api/materials`,
  getMaterial: `${backendUrl}/api/materials`,
  addPlayer: `${backendUrl}/api/races`,
  getPlayers: `${backendUrl}/api/races`,
  toggleRace: `${backendUrl}/api/races`,
  getRace: `${backendUrl}/api/races`,
  createRace: `${backendUrl}/api/races`,
  initLeaderboard: `${backendUrl}/api/leaderboards`,
  incrementScore: `${backendUrl}/api/leaderboards`,
  getLeaderboard: `${backendUrl}/api/leaderboards`,
  progressions: `${backendUrl}/api/progressions`
};
