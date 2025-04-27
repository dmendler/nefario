import React, { useState } from "react";
import ScoreList from "./ScoreList";

const ScoreModule = () => {
  const [selections, setSelections] = useState({});
  const [teamScores, setTeamScores] = useState({ teamA: 0, teamB: 0 });

  return (
    <section>
      <h2 className="indent">Meet Scoring Calculator</h2>
      <p className="indent">Fill out swimmers' times for each event, then calculate the score.</p>
      <ScoreList 
        selections={selections} 
        setSelections={setSelections} 
        teamScores={teamScores} 
        setTeamScores={setTeamScores} 
      />
    </section>
  );
};

export default ScoreModule;
