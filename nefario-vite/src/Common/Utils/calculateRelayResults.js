import { relayPoints } from './scoringRules';

export const calculateRelayResults = (relays, opponents, onScoreUpdate) => {
  const yourRelayTotals = relays.map((relay, i) => ({
    name: `Your Relay ${i + 1}`,
    time: relay.reduce((acc, swimmer) => acc + (typeof swimmer === 'object' ? swimmer.time : parseFloat(swimmer)), 0),
    team: "Your Team",
  }));

  const opponentRelayTotals = opponents.map((relay, i) => ({
    name: `Opponent Relay ${i + 1}`,
    time: relay.reduce((acc, time) => acc + parseFloat(time), 0),
    team: "Opponent",
  }));

  const combined = [...yourRelayTotals, ...opponentRelayTotals]
    .filter((r) => !isNaN(r.time))
    .sort((a, b) => a.time - b.time);

  // Award points
  let tempTeamScore = 0;
  let tempOpponentScore = 0;
  combined.forEach((r, idx) => {
    const points = relayPoints[idx] || 0;
    if (r.team === "Your Team") tempTeamScore += points;
    else tempOpponentScore += points;
  });

  if (onScoreUpdate) {
    onScoreUpdate(tempTeamScore, tempOpponentScore);
  }

  return combined;
};
