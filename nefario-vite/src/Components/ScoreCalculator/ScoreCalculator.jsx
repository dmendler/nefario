import React, { useState } from "react";
import { parseTimeInput, handleInputChange, isValidTime, handleCalculate } from "../../Common/Services/ScoreService";

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
                          onChange={(e) => handleInputChange(event.id, "teamA", relayIndex, swimmerIndex, e.target.value, setSelections, events)}
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
                      onChange={(e) => handleInputChange(event.id, "teamA", i, 0, e.target.value, setSelections, events)}
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
                          onChange={(e) => handleInputChange(event.id, "teamB", relayIndex, swimmerIndex, e.target.value, setSelections, events)}
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
                      onChange={(e) => handleInputChange(event.id, "teamB", i, 0, e.target.value, setSelections, events)}
                    />
                  ))
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        className="btn btn-success ms-2" 
        onClick={() => handleCalculate(selections, setTeamScores, events)} 
        style={{ marginTop: '20px' }}
        >
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