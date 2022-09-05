import { useState, useEffect } from 'react';
import './App.css';
import { getDiaryEntrySkills, getSkills, Skill, DiaryEntrySkills} from "./FetchAPI";

type CheckedSkills = {
  [key: number]: boolean;
};

    // create a jsx component of all the key, value pairs for a particular day
export default function Chart(){

    const [diaryEntry, setDiaryEntry] = useState<DiaryEntrySkills[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);

    let date = "2022-03-06";

    // gets the diaryentryskills (entry_id and skill_id) for a specfic date
    useEffect(() => {
        getDiaryEntrySkills(date).then(setDiaryEntry);
    }, []);

    // gets the set of all skill ids, names, and categories
    useEffect(() => {
        getSkills().then(setSkills);
    }, []);

    // gets the skill ids from the diary entry skills
    let entrySkillIDs = diaryEntry.map(item => item['skills_id']);


    // filter the entireskills list to only include skills that are also on the entry skills list
    let completedSkills = skills.filter(skill => entrySkillIDs.includes(skill.id)).map(skill => skill['id']);

    // create object of type CheckedSkills, where key is skill id and value to boolean (true if skills is checked)
    let checked: CheckedSkills = {};
    let checkedSkillIds = skills.map(item => item['id']);
    for (let i = 0; i < checkedSkillIds.length; i++) {
        if (completedSkills.includes(checkedSkillIds[i])) {
            checked[checkedSkillIds[i]] = true
        } else {
            checked[checkedSkillIds[i]] = false
        }
    };

    // creates array of jsx elements of all the skill ids and
    // if they were completed
    let TableData =
        Object.entries(checked).map(([key, value]) => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value.toString()}</td>
                </tr>
            )
        });

    return (
        <div>
            {date}
            <table>
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {TableData}
                </tbody>
            </table>
        </div>
    )
}

