import React, { useState, useEffect } from "react";
import { getAllSwimmersByRank } from "/src/Common/Services/PullDBService";

const OptimalLineup = () => {
  const [teamSwimmers, setTeamSwimmers] = useState([]);
  const [opponentTimes, setOpponentTimes] = useState({});
  const [optimalLineup, setOptimalLineup] = useState(null);
  const [warning, setWarning] = useState("");
  const [highlightMissing, setHighlightMissing] = useState(false);

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
        const swimmers = await getAllSwimmersByRank("1");
        setTeamSwimmers(swimmers);
      } catch (error) {
        console.error("Error fetching swimmers:", error);
      }
    }
    fetchSwimmers();
  }, []);

  const handleOpponentIndividualChange = (eventId, index, value) => {
    setOpponentTimes(prev => {
      const updated = { ...(prev[eventId] || []) };
      updated[index] = value;
      return { ...prev, [eventId]: updated };
    });
  };

  const handleOpponentRelayChange = (eventId, relayIndex, swimmerIndex, value) => {
    setOpponentTimes(prev => {
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

    for (const event of events) {
      if (event.type === "individual") {
        const entries = opponentTimes[event.id] || [];
        if (entries.length < 3 || entries.some(time => !time)) {
          setWarning(`Please enter 3 valid opponent swimmer times for ${event.name}.`);
          setHighlightMissing(true);
          return;
        }
      } else if (event.type === "relay") {
        const entries = opponentTimes[event.id] || [];
        if (entries.length < 3 || entries.some(relay => relay.length < 4 || relay.some(time => !time))) {
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

    events.forEach(event => {
      if (event.type === "individual") {
        const eligibleSwimmers = teamSwimmers
          .filter(swimmer => swimmer.get(event.field) !== undefined && swimmer.get(event.field) !== null)
          .map(swimmer => ({
            name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
            time: parseFloat(swimmer.get(event.field))
          }))
          .filter(swimmer => !isNaN(swimmer.time));

        eligibleSwimmers.sort((a, b) => a.time - b.time);

        lineup[event.name] = eligibleSwimmers.slice(0, 3);
      } else if (event.type === "relay") {
        if (event.name.includes("Medley")) {
          const strokes = ["back_50_time", "breast_50_time", "fly_50_time", "free_50_time"];
          lineup[event.name] = strokes.map(stroke => {
            const swimmer = teamSwimmers
              .filter(swimmer => swimmer.get(stroke) !== undefined && swimmer.get(stroke) !== null)
              .map(swimmer => ({
                name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
                time: parseFloat(swimmer.get(stroke))
              }))
              .filter(swimmer => !isNaN(swimmer.time))
              .sort((a, b) => a.time - b.time)[0];
            return swimmer;
          });
        } else if (event.name.includes("400")) {
          const eligibleSwimmers = teamSwimmers
            .filter(swimmer => swimmer.get("free_100_time") !== undefined && swimmer.get("free_100_time") !== null)
            .map(swimmer => ({
              name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
              time: parseFloat(swimmer.get("free_100_time"))
            }))
            .filter(swimmer => !isNaN(swimmer.time))
            .sort((a, b) => a.time - b.time)
            .slice(0, 4);

          lineup[event.name] = eligibleSwimmers;
        } else {
          const eligibleSwimmers = teamSwimmers
            .filter(swimmer => swimmer.get("free_50_time") !== undefined && swimmer.get("free_50_time") !== null)
            .map(swimmer => ({
              name: swimmer.get("first_name") + " " + swimmer.get("last_name"),
              time: parseFloat(swimmer.get("free_50_time"))
            }))
            .filter(swimmer => !isNaN(swimmer.time))
            .sort((a, b) => a.time - b.time)
            .slice(0, 4);

          lineup[event.name] = eligibleSwimmers;
        }
      }
    });

    setOptimalLineup(lineup);
  };

  return (
    <div>
      <h2>Optimal Lineup Builder</h2>
      <p>Input opponent times below, then calculate your best possible lineup.</p>

      {warning && (
        <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          {warning}
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Event</th>
            <th>Opponent Times</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} style={{ borderBottom: '1px solid #ccc' }}>
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
                      style={highlightMissing && (!opponentTimes[event.id]?.[i]) ? { borderColor: 'red' } : {}}
                    />
                  ))
                ) : (
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {[...Array(3)].map((_, relayIdx) => (
                      <div key={`relay-${event.id}-${relayIdx}`} style={{ display: 'flex', flexDirection: 'column' }}>
                        {[...Array(4)].map((_, swimmerIdx) => (
                          <input
                            key={`relay-${event.id}-${relayIdx}-${swimmerIdx}`}
                            type="text"
                            placeholder={`Relay ${relayIdx + 1} Swimmer ${swimmerIdx + 1}`}
                            value={opponentTimes[event.id]?.[relayIdx]?.[swimmerIdx] || ""}
                            onChange={(e) => handleOpponentRelayChange(event.id, relayIdx, swimmerIdx, e.target.value)}
                            style={highlightMissing && (!opponentTimes[event.id]?.[relayIdx]?.[swimmerIdx]) ? { borderColor: 'red' } : {}}
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

      <button onClick={findOptimalLineup} style={{ marginTop: '20px' }}>
        Find Optimal Lineup
      </button>

      {optimalLineup && (
        <div>
          <h3>Recommended Lineup</h3>
          {Object.keys(optimalLineup).map(eventName => (
            <div key={eventName} style={{ marginBottom: '10px' }}>
              <strong>{eventName}</strong>
              <ul>
                {optimalLineup[eventName].map((swimmer, idx) => (
                  <li key={idx}>{swimmer.name} - {swimmer.time.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptimalLineup;