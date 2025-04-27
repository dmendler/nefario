import React from "react";

const ScoreForm = ({ events, selections, onInputChange }) => {
  return (
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
                        onChange={(e) => onInputChange(event.id, "teamA", relayIndex, swimmerIndex, e.target.value)}
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
                    onChange={(e) => onInputChange(event.id, "teamA", i, 0, e.target.value)}
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
                        onChange={(e) => onInputChange(event.id, "teamB", relayIndex, swimmerIndex, e.target.value)}
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
                    onChange={(e) => onInputChange(event.id, "teamB", i, 0, e.target.value)}
                  />
                ))
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreForm;
