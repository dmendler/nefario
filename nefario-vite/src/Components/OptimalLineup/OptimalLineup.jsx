import React, { useState, useEffect } from "react";
import { getAllSwimmers } from "/src/Common/Services/PullDBService";
import { parseTimeInput } from "/src/Common/Utils/parseTimeInput";
import { isValidTime } from "/src/Common/Utils/isValidTime";
import { individualPoints } from "/src/Common/Utils/scoringRules";
import { calculateRelayResults } from "/src/Common/Utils/calculateRelayResults";

const OptimalLineup = () => {
  const [teamSwimmers, setTeamSwimmers] = useState([]);
  const [opponentTimes, setOpponentTimes] = useState({});
  const [optimalLineup, setOptimalLineup] = useState(null);
  const [warning, setWarning] = useState("");
  const [highlightMissing, setHighlightMissing] = useState(false);
  const [meetScore, setMeetScore] = useState({ team: 0, opponent: 0 });

  const events = [
    { id: 1, name: "200 Medley Relay", type: "relay" },
    { id: 2, name: "200 Free", type: "individual", field: "free_200_time" },
    { id: 3, name: "200 IM", type: "individual", field: "im_200_time" },
    { id: 4, name: "50 Free", type: "individual", field: "free_50_time" },
    { id: 5, name: "Diving", type: "individual", field: "diving_score" },
    { id: 6, name: "100 Fly", type: "individual", field: "fly_100_time" },
    { id: 7, name: "100 Free", type: "individual", field: "free_100_time" },
    { id: 8, name: "500 Free", type: "individual", field: "free_500_time" },
    { id: 9, name: "200 Free Relay", type: "relay" },
    { id: 10, name: "100 Back", type: "individual", field: "back_100_time" },
    { id: 11, name: "100 Breast", type: "individual", field: "breast_100_time" },
    { id: 12, name: "400 Free Relay", type: "relay" },
  ];

  useEffect(() => {
    async function fetchSwimmers() {
      try {
        const swimmers = await getAllSwimmers("1");
        setTeamSwimmers(swimmers);
      } catch (error) {
        console.error("Error fetching swimmers:", error);
      }
    }
    fetchSwimmers();
  }, []);

  const handleOpponentIndividualChange = (eventId, index, value) => {
    setOpponentTimes((prev) => {
      const updated = [...(prev[eventId] || [])];
      updated[index] = value;
      return { ...prev, [eventId]: updated };
    });
  };

  const handleOpponentRelayChange = (eventId, relayIndex, swimmerIndex, value) => {
    setOpponentTimes((prev) => {
      const eventRelays = prev[eventId] || [];
      const updatedRelays = [...eventRelays];
      while (updatedRelays.length <= relayIndex) updatedRelays.push([]);
      const relay = [...(updatedRelays[relayIndex] || [])];
      while (relay.length <= swimmerIndex) relay.push("");
      relay[swimmerIndex] = value;
      updatedRelays[relayIndex] = relay;
      return { ...prev, [eventId]: updatedRelays };
    });
  };

  const findOptimalLineup = () => {
    setWarning("");
    setHighlightMissing(false);
    setMeetScore({ team: 0, opponent: 0 });

    for (const event of events) {
      if (event.type === "individual") {
        const entries = opponentTimes[event.id] || [];
        if (entries.length < 3 || entries.some((time) => !time)) {
          setWarning(`Please enter 3 valid opponent swimmer times for ${event.name}.`);
          setHighlightMissing(true);
          return;
        }
      } else if (event.type === "relay") {
        const entries = opponentTimes[event.id] || [];
        if (entries.length < 3 || entries.some((relay) => relay.length < 4 || relay.some((time) => !time))) {
          setWarning(`Please enter 3 full relay teams (4 swimmers each) for ${event.name}.`);
          setHighlightMissing(true);
          return;
        }
      }
    }

    if (teamSwimmers.length < 12) {
      setWarning("Not enough swimmers in your database to form a full lineup.");
      return;
    }

    const lineup = {};
    const usedRelaySwimmers = new Set();

    events.forEach((event) => {
      if (event.type === "individual") {
        const eligibleSwimmers = teamSwimmers
          .filter(swimmer => swimmer.get(event.field) !== undefined && swimmer.get(event.field) !== null && parseFloat(swimmer.get(event.field)) !== 0)
          .map(swimmer => ({
            name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
            time: parseFloat(swimmer.get(event.field)),
          }))
          .filter(swimmer => !isNaN(swimmer.time))
          .sort((a, b) => a.time - b.time);

        lineup[event.name] = eligibleSwimmers.slice(0, 3);
      } else if (event.type === "relay") {
        if (event.name.includes("Medley")) {
          const strokes = ["back_50_time", "breast_50_time", "fly_50_time", "free_50_time"];
          const medleyRelay = strokes.map(stroke => {
            const swimmer = teamSwimmers
              .filter(swimmer => swimmer.get(stroke) !== undefined && swimmer.get(stroke) !== null && parseFloat(swimmer.get(stroke)) !== 0)
              .map(swimmer => ({
                name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
                time: parseFloat(swimmer.get(stroke)),
              }))
              .filter(swimmer => !isNaN(swimmer.time))
              .sort((a, b) => a.time - b.time)
              .find(swimmer => !usedRelaySwimmers.has(swimmer.name));
            if (swimmer) usedRelaySwimmers.add(swimmer.name);
            return swimmer;
          });
          lineup[event.name] = [medleyRelay];
        } else {
          const distanceField = event.name.includes("400") ? "free_100_time" : "free_50_time";
          const eligibleSwimmers = teamSwimmers
            .filter(swimmer => swimmer.get(distanceField) !== undefined && swimmer.get(distanceField) !== null && parseFloat(swimmer.get(distanceField)) !== 0)
            .map(swimmer => ({
              name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
              time: parseFloat(swimmer.get(distanceField)),
            }))
            .filter(swimmer => !isNaN(swimmer.time))
            .sort((a, b) => a.time - b.time);

          const threeRelays = [];
          let idx = 0;
          for (let i = 0; i < 3; i++) {
            const relayTeam = [];
            for (let j = 0; j < 4; j++) {
              if (idx < eligibleSwimmers.length) {
                relayTeam.push(eligibleSwimmers[idx]);
                idx++;
              }
            }
            threeRelays.push(relayTeam);
          }
          lineup[event.name] = threeRelays;
        }
      }
    });

    setOptimalLineup(lineup);
    scoreMeet(lineup);
  };

  const scoreMeet = (lineup) => {
    let teamPoints = 0;
    let opponentPoints = 0;

    events.forEach(event => {
      const eventName = event.name;
      const opponents = opponentTimes[event.id];

      if (!opponents || !lineup) return;

      if (event.type === "individual") {
        const swimmers = lineup[eventName];
        const combined = [
          ...swimmers.map(s => ({ ...s, team: "Your Team" })),
          ...opponents.map((time, i) => ({
            name: `Opponent ${i + 1}`,
            time: parseTimeInput(time),
            team: "Opponent",
          })),
        ].filter(s => !isNaN(s.time)).sort((a, b) => a.time - b.time);

        combined.forEach((s, idx) => {
          const points = individualPoints[idx] || 0;
          if (s.team === "Your Team") teamPoints += points;
          else opponentPoints += points;
        });
      } else if (event.type === "relay") {
        const relayResults = calculateRelayResults(lineup[eventName], opponents, null);
        relayResults.forEach((relay, idx) => {
          const points = [11, 4, 2][idx] || 0;
          if (relay.team === "Your Team") teamPoints += points;
          else opponentPoints += points;
        });
      }
    });

    setMeetScore({ team: teamPoints, opponent: opponentPoints });
  };
  const renderEventResults = (swimmers, opponents, type) => {
    const pointsTable = type === "individual" ? [9, 4, 3, 2, 1, 0] : [11, 4, 2];
  
    const combined = [
      ...swimmers.map((s) => ({
        name: type === "relay"
          ? s.members.map(m => m.name).join(", ")  // relay names from 4 swimmers
          : s.name,
        time: s.time,
        team: "Your Team",
      })),
      ...(type === "individual"
        ? opponents.map((time, idx) => ({
            name: `Opponent ${idx + 1}`,
            time: parseTimeInput(time),
            team: "Opponent",
          }))
        : opponents.map((relay, idx) => ({
            name: `Opponent Relay ${idx + 1}`,
            time: relay.reduce((acc, t) => acc + parseTimeInput(t), 0),
            team: "Opponent",
          }))
      ),
    ]
      .filter((s) => !isNaN(s.time))
      .sort((a, b) => a.time - b.time);
  
    return (
      <ul>
        {combined.map((s, idx) => (
          <li key={idx}>
            {idx + 1}. {s.name} ({s.team}) - {s.time.toFixed(2)} - {pointsTable[idx] || 0} points
          </li>
        ))}
      </ul>
    );
  };
  
  

  return (
    <div>
      <h2>Optimal Lineup Builder</h2>
      <p>Input opponent times below, then calculate your best possible lineup.</p>

      {warning && (
        <div style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
          {warning}
        </div>
      )}

      {/* Opponent Input Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Event</th>
            <th>Opponent Times</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{event.name}</td>
              <td>
                {event.type === "individual" ? (
                  [...Array(3)].map((_, i) => (
                    <input
                      key={`indiv-${event.id}-${i}`}
                      type="text"
                      placeholder={`Swimmer ${i + 1} Time`}
                      value={opponentTimes[event.id]?.[i] || ""}
                      onChange={(e) => handleOpponentIndividualChange(event.id, i, e.target.value)}
                      style={highlightMissing && !opponentTimes[event.id]?.[i] ? { borderColor: "red" } : {}}
                    />
                  ))
                ) : (
                  <div style={{ display: "flex", gap: "20px" }}>
                    {[...Array(3)].map((_, relayIdx) => (
                      <div key={`relay-${event.id}-${relayIdx}`} style={{ display: "flex", flexDirection: "column" }}>
                        {[...Array(4)].map((_, swimmerIdx) => (
                          <input
                            key={`relay-${event.id}-${relayIdx}-${swimmerIdx}`}
                            type="text"
                            placeholder={`Relay ${relayIdx + 1} Swimmer ${swimmerIdx + 1}`}
                            value={opponentTimes[event.id]?.[relayIdx]?.[swimmerIdx] || ""}
                            onChange={(e) => handleOpponentRelayChange(event.id, relayIdx, swimmerIdx, e.target.value)}
                            style={highlightMissing && !opponentTimes[event.id]?.[relayIdx]?.[swimmerIdx] ? { borderColor: "red" } : {}}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={findOptimalLineup} style={{ marginBottom: "20px" }}>
        Find Optimal Lineup
      </button>

      {/* Output */}
      {optimalLineup && (
        <div>
          <h3>Recommended Lineup</h3>
          {Object.keys(optimalLineup).map(eventName => (
  <div key={eventName} style={{ marginBottom: "20px" }}>
    <strong>{eventName}</strong>

    {Array.isArray(optimalLineup[eventName][0]) ? (
  renderEventResults(
    optimalLineup[eventName].map((relay) => ({
      name: "",  // placeholder — actual names will come from members field
      members: relay,  //  Pass full array of swimmer objects
      time: relay.reduce((acc, swimmer) => acc + swimmer.time, 0),
    })),
    opponentTimes[events.find(e => e.name === eventName).id] || [],
    "relay"
  )
) : (
  renderEventResults(
    optimalLineup[eventName],
    opponentTimes[events.find(e => e.name === eventName).id] || [],
    "individual"
  )
)}

  </div>
))}

          <h3>Final Meet Score</h3>
          <p>Your Team: {meetScore.team}</p>
          <p>Opponent: {meetScore.opponent}</p>
        </div>
      )}
    </div>
  );
};

export default OptimalLineup;