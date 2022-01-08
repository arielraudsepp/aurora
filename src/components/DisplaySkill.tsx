import { ChangeEvent } from 'react';
import { Skill } from '../FetchAPI';

interface DisplaySkillProps {
    skill: Skill,
    onChecked: (id: number) => void,
    checked: boolean
}


export function DisplaySkill(props: DisplaySkillProps) {
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


