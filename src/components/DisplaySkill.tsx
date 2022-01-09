import { ChangeEvent } from 'react';
import { Skill } from '../FetchAPI';

interface ToggleSkillProps {
    skill: Skill,
    onChecked: (id: number) => void,
    checked: boolean
}


interface SkillsGroupProps {
    categorized_skills: {
        [key: string]: Skill[];
    },
    category: string,
    update_checked: (id: number) => void,
    checkedSkills: {
        [key: number]: boolean
    }
}

export function ToggleSkill(props: ToggleSkillProps) {
    let { skill, onChecked, checked } = props;
    let onChange = (_event: ChangeEvent<HTMLInputElement>) => {
        onChecked(skill.id);
    }
    
    return (
        <div>
            <div className='ui toggle checkbox'>
                <h3 className='ui header' style={{ paddingTop: 2 }}>
                    <input type='checkbox' id={skill.name} name={skill.name} onChange={onChange} checked={!!checked} />
                    <label>
                        {skill.name}
                    </label>
                </h3>
            </div>
        </div >
    );
}


export function SkillsGroup(props: SkillsGroupProps) {
    let { category, categorized_skills, update_checked, checkedSkills } = props;
    let skills_group;
    if (!categorized_skills[category]) {
        skills_group = (
            <div className="ui placeholder">
                <div className="line"></div>
                <div className="line"></div>
            </div>)
    } else {
        skills_group = (
            categorized_skills[category].map((skill: Skill) => {
                return <ToggleSkill skill={skill} onChecked={update_checked} checked={checkedSkills[skill.id]} key={skill.id} />
            }))
    }
    return (
        <div>
            <div className="ui section divider"></div>
            <div>
                <h2>{category}</h2>
                {skills_group}
            </div>
        </div>
    );
};



