import React, { useEffect, useState } from 'react';
import logo from './rustacean.svg';
import './App.css';
import { Skill, getSkills, DiaryEntry, submitDiaryEntry } from './FetchAPI';
import { SkillsGroup } from './components/DisplaySkill';

type CheckedSkills = {
    [key: number]: boolean;
}

type CategorizedSkills = {
    [key: string]: Skill[];
}

function App() {

  const [skills, setSkills] = useState<Skill[]>([]);
  const [checked, setChecked] = useState<CheckedSkills>({});

  useEffect(() => {
    getSkills('/skills').then(setSkills);
  }, []);

  let categorized_skills = skills.reduce((init: CategorizedSkills, skill: Skill) => {
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
      <h1 className="ui header"><img src={logo} className="ui circular image" />DBT Skills </h1>
      <SkillsGroup category={'mindfulness'} categorized_skills={categorized_skills} update_checked={updateChecked} checkedSkills={checked} />
      <SkillsGroup category={'emotion_regulation'} categorized_skills={categorized_skills} update_checked={updateChecked} checkedSkills={checked} />
      <SkillsGroup category={'distress_tolerance'} categorized_skills={categorized_skills} update_checked={updateChecked} checkedSkills={checked} />
      <button className="ui primary button" type="submit" onClick={handleClick}>Submit</button>
    </div >
  );
}

export default App;
