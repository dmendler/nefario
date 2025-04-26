import React, { useState, useEffect } from "react";

const ScoreCalculator = () => {
  const [selections, setSelections] = useState({});
  const [teamScores, setTeamScores] = useState({ teamA: 0, teamB: 0 });

  const events = [
    { id: 1, name: "200 Medley Relay", type: "relay" },
    { id: 2, name: "200 Free", type: "individual" },
    { id: 3, name: "200 IM", type: "individual" },
    { id: 4, name: "50 Free", type: "individual" },
    { id: 6, name: "100 Fly", type: "individual" },
    { id: 7, name: "100 Free", type: "individual" },
    { id: 8, name: "500 Free", type: "individual" },
    { id: 9, name: "200 Free Relay", type: "relay" },
    { id: 10, name: "100 Back", type: "individual" },
    { id: 11, name: "100 Breast", type: "individual" },
    { id: 12, name: "400 Free Relay", type: "relay" },
  ];

  const handleInputChange = (eventId, team, relayIndex, swimmerIndex, value) => {
    setSelections(prev => {
      const eventSelection = prev[eventId] || { teamA: [], teamB: [] };
      const teamSelection = [...(eventSelection[team] || [])];
      while (teamSelection.length <= relayIndex) teamSelection.push([]);
      const relay = [...teamSelection[relayIndex]];
      while (relay.length <= swimmerIndex) relay.push("");
      relay[swimmerIndex] = value;
      teamSelection[relayIndex] = relay;
      return {
        ...prev,
        [eventId]: {
          ...eventSelection,
          [team]: teamSelection,
        },
      };
    });
  };

  const isValidTime = (input) => {
    return input !== "" && input.toUpperCase() !== "NT";
  };

  const handleCalculate = () => {
    // Validation: Check for missing times (individuals allow NT, relays require complete)
    for (const event of events) {
      const eventSelections = selections[event.id] || { teamA: [], teamB: [] };

      if (event.type === "individual") {
        const allInputs = [...(eventSelections.teamA || []), ...(eventSelections.teamB || [])];
        if (allInputs.some(input => input === "")) {
          alert(`Please fill out all swimmer times for ${event.name} before calculating.`);
          return;
        }
      } else if (event.type === "relay") {
        const allRelays = [...(eventSelections.teamA || []), ...(eventSelections.teamB || [])];
        for (let relay of allRelays) {
          if (relay.length !== 4 || relay.some(input => input === "")) {
            alert(`Each relay in ${event.name} must have 4 swimmer times (or "NT") entered.`);
            return;
          }
        }
      }
    }

    let teamAPoints = 0;
    let teamBPoints = 0;

    events.forEach(event => {
      const eventSelections = selections[event.id] || { teamA: [], teamB: [] };

      if (event.type === "individual") {
        const teamATimes = (eventSelections.teamA || []).filter(isValidTime).map(Number);
        const teamBTimes = (eventSelections.teamB || []).filter(isValidTime).map(Number);

        const allSwimmers = [
          ...teamATimes.map(time => ({ team: "A", time })),
          ...teamBTimes.map(time => ({ team: "B", time })),
        ];

        allSwimmers.sort((a, b) => a.time - b.time);

        const points = [9, 4, 3, 2, 1];
        let teamACount = 0;
        let teamBCount = 0;

        for (let i = 0; i < Math.min(points.length, allSwimmers.length); i++) {
          const swimmer = allSwimmers[i];
          if (swimmer.team === "A" && teamACount < 3) {
            teamAPoints += points[i];
            teamACount++;
          } else if (swimmer.team === "B" && teamBCount < 3) {
            teamBPoints += points[i];
            teamBCount++;
          }
        }
      } else if (event.type === "relay") {
        const teamARelays = (eventSelections.teamA || []).filter(relay => relay.every(isValidTime)).map(relay => relay.map(Number));
        const teamBRelays = (eventSelections.teamB || []).filter(relay => relay.every(isValidTime)).map(relay => relay.map(Number));

        const relays = [
          ...teamARelays.map(times => ({ team: "A", time: times.reduce((acc, t) => acc + t, 0) })),
          ...teamBRelays.map(times => ({ team: "B", time: times.reduce((acc, t) => acc + t, 0) })),
        ];

        relays.sort((a, b) => a.time - b.time);

        const relayPoints = [11, 4, 2];
        const validRelays = [];
        const teamCounts = { A: 0, B: 0 };

        for (let relay of relays) {
          if (teamCounts[relay.team] < 2) {
            validRelays.push(relay);
            teamCounts[relay.team]++;
          }
        }

        while (validRelays.length < 3 && validRelays.length < relays.length) {
          const nextRelay = relays[validRelays.length];
          if (teamCounts[nextRelay.team] < 2) {
            validRelays.push(nextRelay);
            teamCounts[nextRelay.team]++;
          }
        }

        for (let i = 0; i < validRelays.length; i++) {
          const relay = validRelays[i];
          if (relay.team === "A") {
            teamAPoints += relayPoints[i];
          } else {
            teamBPoints += relayPoints[i];
          }
        }
      }
    });

    setTeamScores({ teamA: teamAPoints, teamB: teamBPoints });
  };

  return (
    <div>
      <h2 class="indent">Meet Scoring Calculator</h2>
      <p class="indent">Fill out swimmers' times for each event, then calculate the score.</p>
      <table class="table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Event</th>
            <th>Team A</th>
            <th>Team B</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ verticalAlign: 'middle' }}>{event.name}</td>
              <td>
                {event.type === "relay" ? (
                  [...Array(3)].map((_, relayIndex) => (
                    <div key={`a-relay-${relayIndex}`} style={{ marginBottom: '10px' }}>
                      {[...Array(4)].map((_, swimmerIndex) => (
                        <input
                          key={`a-${relayIndex}-${swimmerIndex}`}
                          type="text"
                          placeholder={`Swimmer ${swimmerIndex + 1}`}
                          value={selections[event.id]?.teamA?.[relayIndex]?.[swimmerIndex] || ""}
                          onChange={(e) => handleInputChange(event.id, "teamA", relayIndex, swimmerIndex, e.target.value)}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  [...Array(3)].map((_, i) => (
                    <input
                      key={`a-${i}`}
                      type="text"
                      placeholder={`Time ${i + 1}`}
                      value={selections[event.id]?.teamA?.[i] || ""}
                      onChange={(e) => handleInputChange(event.id, "teamA", i, 0, e.target.value)}
                    />
                  ))
                )}
              </td>
              <td>
                {event.type === "relay" ? (
                  [...Array(3)].map((_, relayIndex) => (
                    <div key={`b-relay-${relayIndex}`} style={{ marginBottom: '10px' }}>
                      {[...Array(4)].map((_, swimmerIndex) => (
                        <input
                          key={`b-${relayIndex}-${swimmerIndex}`}
                          type="text"
                          placeholder={`Swimmer ${swimmerIndex + 1}`}
                          value={selections[event.id]?.teamB?.[relayIndex]?.[swimmerIndex] || ""}
                          onChange={(e) => handleInputChange(event.id, "teamB", relayIndex, swimmerIndex, e.target.value)}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  [...Array(3)].map((_, i) => (
                    <input
                      key={`b-${i}`}
                      type="text"
                      placeholder={`Time ${i + 1}`}
                      value={selections[event.id]?.teamB?.[i] || ""}
                      onChange={(e) => handleInputChange(event.id, "teamB", i, 0, e.target.value)}
                    />
                  ))
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
      class="btn btn-success ms-2"
      onClick={handleCalculate}
      style={{ marginTop: '20px' }}>
        Calculate Score
      </button>

      <div>
        <h3 class="indent">Results:</h3>
        <p class="indent">Team A: {teamScores.teamA}</p>
        <p class="indent">Team B: {teamScores.teamB}</p>
      </div>
    </div>
  );
};

export default ScoreCalculator;
