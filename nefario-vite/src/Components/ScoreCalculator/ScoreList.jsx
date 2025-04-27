import React from "react";
import ScoreForm from "./ScoreForm";
import { handleInputChange, handleCalculate } from "../../Common/Services/ScoreService";

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

const ScoreList = ({ selections, setSelections, teamScores, setTeamScores }) => {
  return (
    <div>
      <ScoreForm 
        events={events} 
        selections={selections} 
        onInputChange={(...args) => handleInputChange(...args, setSelections, events)}
      />

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

export default ScoreList;
