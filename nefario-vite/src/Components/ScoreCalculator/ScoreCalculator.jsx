import React, { useState } from "react";

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

  const parseTimeInput = (input) => {
    if (typeof input !== "string") return NaN;
    input = input.trim();
    if (input.includes(":")) {
      const [minutes, seconds] = input.split(":");
      return parseInt(minutes, 10) * 60 + parseFloat(seconds);
    } else {
      return parseFloat(input);
    }
  };

  const handleInputChange = (eventId, team, relayIndex, swimmerIndex, value) => {
    setSelections(prev => {
      const eventSelection = prev[eventId] || { teamA: [], teamB: [] };
      const teamSelection = [...(eventSelection[team] || [])];
      const eventType = events.find(e => e.id === eventId)?.type;

      if (eventType === "relay") {
        while (teamSelection.length <= relayIndex) teamSelection.push([]);
        const relay = [...teamSelection[relayIndex]];
        while (relay.length <= swimmerIndex) relay.push("");
        relay[swimmerIndex] = value.toUpperCase() === "NT" ? "NT" : value;
        teamSelection[relayIndex] = relay;
      } else {
        while (teamSelection.length <= relayIndex) teamSelection.push("");
        teamSelection[relayIndex] = value.toUpperCase() === "NT" ? "NT" : value;
      }

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
    if (typeof input === "string") {
      input = input.trim();
      if (input.toUpperCase() === "NT") return false;
      const parsed = parseTimeInput(input);
      return !isNaN(parsed);
    }
    return typeof input === "number" && !isNaN(input);
  };

  const handleCalculate = () => {
    let teamAPoints = 0;
    let teamBPoints = 0;

    for (const event of events) {
      const eventSelections = selections[event.id] || { teamA: [], teamB: [] };

      if (event.type === "relay") {
        const allRelays = [...(eventSelections.teamA || []), ...(eventSelections.teamB || [])];
        for (let relay of allRelays) {
          if (relay.length !== 4 || relay.some(time => time === "")) {
            alert(`Error: Incomplete relay entries in ${event.name}. Each relay must have 4 swimmer times.`);
            return;
          }
        }
      }
    }

    events.forEach(event => {
      const eventSelections = selections[event.id] || { teamA: [], teamB: [] };

      if (event.type === "individual") {
        const teamATimes = (eventSelections.teamA || []).filter(isValidTime).map(time => ({
          team: 'A',
          time: parseTimeInput(time),
        }));
        const teamBTimes = (eventSelections.teamB || []).filter(isValidTime).map(time => ({
          team: 'B',
          time: parseTimeInput(time),
        }));

        const allSwimmers = [...teamATimes, ...teamBTimes];
        allSwimmers.sort((a, b) => a.time - b.time);

        const points = [9, 4, 3, 2, 1];
        let place = 1;
        let prevTime = null;

        allSwimmers.forEach((swimmer, index) => {
          if (index > 0 && swimmer.time !== prevTime) {
            place = index + 1;
          }
          if (place <= points.length) {
            if (swimmer.team === 'A') {
              teamAPoints += points[place - 1];
            } else {
              teamBPoints += points[place - 1];
            }
          }
          prevTime = swimmer.time;
        });
      } else if (event.type === "relay") {
        const teamARelays = (eventSelections.teamA || [])
          .filter(relay => relay.every(isValidTime))
          .map(relay => ({
            team: 'A',
            time: relay.map(time => parseTimeInput(time)).reduce((acc, t) => acc + t, 0),
          }));
        const teamBRelays = (eventSelections.teamB || [])
          .filter(relay => relay.every(isValidTime))
          .map(relay => ({
            team: 'B',
            time: relay.map(time => parseTimeInput(time)).reduce((acc, t) => acc + t, 0),
          }));

        const relays = [...teamARelays, ...teamBRelays];
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

        let place = 1;
        let prevTime = null;

        for (let i = 0; i < validRelays.length; i++) {
          const relay = validRelays[i];
          if (i > 0 && relay.time !== prevTime) {
            place = i + 1;
          }
          if (place <= relayPoints.length) {
            if (relay.team === 'A') {
              teamAPoints += relayPoints[place - 1];
            } else {
              teamBPoints += relayPoints[place - 1];
            }
          }
          prevTime = relay.time;
        }
      }
    });

    setTeamScores({ teamA: teamAPoints, teamB: teamBPoints });
  };

  return (
    <div>
      <h2 className="indent">Meet Scoring Calculator</h2>
      <p className="indent">Fill out swimmers' times for each event, then calculate the score.</p>
      <table className="table">
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

      <button className="btn btn-success ms-2" onClick={handleCalculate} style={{ marginTop: '20px' }}>
        Calculate Score
      </button>
      <div>
        <h3 className="indent">Results:</h3>
        <p className="indent">Team A: {teamScores.teamA}</p>
        <p className="indent">Team B: {teamScores.teamB}</p>
      </div>
    </div>
  );
};

export default ScoreCalculator;