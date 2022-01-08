import React, { useEffect, useState } from 'react';
import logo from './rustacean.svg';
import './App.css';
import { Skill, getSkills, DiaryEntry, submitDiaryEntry } from './FetchAPI';
import { DisplaySkill } from './components/DisplaySkill';

type CheckedSkills = {
    [key: number]: boolean;
}

type CatSkills = {
    [key: string]: Skill[];
}

function App() {

  const [skills, setSkills] = useState<Skill[]>([]);
  const [checked, setChecked] = useState<CheckedSkills>({});

  useEffect(() => {
    getSkills('/skills').then(setSkills);
  }, []);

  let cat_skills = skills.reduce((init: CatSkills, skill: Skill) => {
      if (!init[skill.category]) {
     init[skill.category] = [];
   }
   init[skill.category].push(skill);
    return init
  }, {});

  let updateChecked = (id: number) => {
    setChecked({ ...checked, [id]: !checked[id] });
  }

  let checkSkills = Object.entries(checked).reduce((init: number[], [key, value]) => {
    if (value === true) {
        init.push(parseInt(key))
    };
    return init
  }, []);

function displayedSkills(cat: string) {
    if (!cat_skills[cat]) {
        return
    };
   return cat_skills[cat].map((skill: Skill) => {
      return <DisplaySkill skill={skill} onChecked={updateChecked} checked={checked[skill.id]} key={skill.id} />
    })
  };

  const diaryentry: DiaryEntry = {
      entry_date: new Date(),
      skill_ids: checkSkills
  };

  let handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    submitDiaryEntry('/diary_entries', diaryentry);
  }

  return (
    <div className="App">
      <h2 className="ui header"><img src={logo} className="ui circular image" />DBT Skills </h2>
      <div className="ui section divider"></div>
      <div>
        <h2>Mindfulness</h2>
        {displayedSkills('mindfulness')}
      </div>
      <div className="ui section divider"></div>
      <div>
        <h2>Emotion Regulation</h2>
        {displayedSkills('emotion_regulation')}
      </div>
      <div className="ui section divider"></div>
      <div>
        <h2>Distress Tolerance</h2>
        {displayedSkills('distress_tolerance')}
      </div>
      <button className="ui primary button" type="submit" onClick={handleClick}>Submit</button>
    </div >
  );
}

export default App;
