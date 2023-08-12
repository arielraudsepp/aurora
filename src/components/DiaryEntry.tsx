import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { Skill, getSkills, DiaryEntry, getDiaryEntrySkills, DiaryEntrySkills, retreiveDiaryEntry, updateDiaryEntry, Rating, DiaryEntryRecord, RatingValue } from "../FetchAPI";
import { SkillsGroup } from "./DisplaySkill";
import { SetRating } from "./Rating";
import { Accordion, AccordionTitleProps, Button, Grid, GridColumn, Header } from "semantic-ui-react";

type CheckedSkills = {
    [key: number]: boolean;
};

type CategorizedSkills = {
    [key: string]: Skill[];
};

function Diary() {
    let { entryDate } = useParams<string>();
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [diaryEntryId, setDiaryEntryId] = useState<number>(0);
    const [notes, setNotes] = useState<string>("");
    const [checked, setChecked] = useState<CheckedSkills>({});
    const [activeIndex, setActiveIndex] = useState<number>(0);

    let navigate = useNavigate();
    let date = entryDate!;

    useEffect(() => {
        retreiveDiaryEntry(date).then((result) => {
            setDiaryEntryId(result.id);
            setNotes(result.notes);
            initRatings(result);
        });
    }, []);

    useEffect(() => {
        getDiaryEntrySkills(date).then(initChecked)
    }, []);

    useEffect(() => {
        getSkills().then(setSkills);
    }, []);

    let updateNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    }

    // create initRatings function
    function initRatings(entry: DiaryEntryRecord) {
        const ratings: Rating[] = [];

        ratings.push({ name: 'pain', value: entry.pain });
        ratings.push({ name: 'sadness', value: entry.sadness });
        ratings.push({ name: 'joy', value: entry.joy });
        ratings.push({ name: 'shame', value: entry.shame });
        ratings.push({ name: 'anger', value: entry.anger });
        ratings.push({ name: 'fear', value: entry.fear });
        ratings.push({ name: 'drug_use', value: entry.drug_use });
        ratings.push({ name: 'suicide', value: entry.suicide });
        ratings.push({ name: 'self_harm', value: entry.self_harm });

        setRatings(ratings);
    }


    let categorized_skills = skills.reduce(
        (init: CategorizedSkills, skill: Skill) => {
            if (!init[skill.category]) {
                init[skill.category] = [];
            }
            init[skill.category].push(skill);
            return init;
        },
        {}
    );

    let initChecked = (diaryEntrySkills: DiaryEntrySkills[]) => {
        let skillIDs = diaryEntrySkills.map(item => item['skills_id']);
        let checked = skillIDs.reduce(
            (init: CheckedSkills, skillID) => (
                { ...init, [skillID]: true }),
            {}
        );
        setChecked(checked);
    };

    let updateChecked = (id: number) => {
        setChecked({ ...checked, [id]: !checked[id] });
    };

    let checkSkills = Object.entries(checked).reduce(
        (init: number[], [key, value]) => {
            if (value === true) {
                init.push(parseInt(key));
            }
            return init;
        },
        []
    );

    let toggleAccordion = (
        event: MouseEvent<HTMLDivElement>,
        data: AccordionTitleProps
    ) => {
        const { index } = data;
        if (typeof index === "undefined") {
            return setActiveIndex(-1);
        } else if (typeof index === "string") {
            return setActiveIndex(-1);
        }

        const newIndex: number = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };
    function getDiaryEntry() {
        let pain = ratings.find((rating) => rating.name === "pain")!.value;
        let sadness = ratings.find((rating) => rating.name === "sadness")!.value;
        let joy = ratings.find((rating) => rating.name === "joy")!.value;
        let shame = ratings.find((rating) => rating.name === "shame")!.value;
        let anger = ratings.find((rating) => rating.name === "anger")!.value;
        let fear = ratings.find((rating) => rating.name === "fear")!.value;
        let drug_use = ratings.find((rating) => rating.name === "drug_use")!.value;
        let suicide = ratings.find((rating) => rating.name === "suicide")!.value;
        let self_harm = ratings.find((rating) => rating.name === "self_harm")!.value;
      const diaryentry: DiaryEntry = {
        entry_form: {
                entry_date: date,
                notes: notes,
                pain: pain,
                sadness: sadness,
                joy: joy,
                shame: shame,
                anger: anger,
                fear: fear,
                drug_use: drug_use,
                suicide: suicide,
                self_harm: self_harm
            },
            skill_ids: checkSkills
        };

        return diaryentry;
    }


    const entry_id = diaryEntryId;

    let submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        updateDiaryEntry(entry_id, getDiaryEntry());
        navigate("/calendar");
    };

    return (
        <div className="App">
            <Grid centered columns={3}>
                <Grid.Column>
                    <Header as='h1'>Skills</Header>
                    <Header.Subheader>
                        Check off each skill you used
                    </Header.Subheader>
                    <Accordion>
                        <SkillsGroup
                            category={"mindfulness"}
                            categorized_skills={categorized_skills}
                            category_index={0}
                            update_checked={updateChecked}
                            checkedSkills={checked}
                            active_index={activeIndex}
                            handle_click={toggleAccordion}
                        />
                        <SkillsGroup
                            category={"emotion_regulation"}
                            categorized_skills={categorized_skills}
                            category_index={1}
                            update_checked={updateChecked}
                            checkedSkills={checked}
                            active_index={activeIndex}
                            handle_click={toggleAccordion}
                        />
                        <SkillsGroup
                            category={"distress_tolerance"}
                            categorized_skills={categorized_skills}
                            category_index={2}
                            update_checked={updateChecked}
                            checkedSkills={checked}
                            active_index={activeIndex}
                            handle_click={toggleAccordion}
                        />
                    </Accordion>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h1'>Ratings</Header>
                    <Header.Subheader>
                        Rate each emotion or urge (0-5)
                    </Header.Subheader>
                    <Grid columns={3}>
                        {ratings.map((rating) => (
                            <Grid.Column key={rating.name}>
                                <div>
                                    <SetRating
                                        name={rating.name}
                                        val={rating.value}
                                    />
                                </div>
                            </Grid.Column>
                        ))}
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <div>
                        <Header as='h1'>Notes</Header>
                        <textarea rows={7} cols={25} value={notes} onChange={updateNotes} name="notes" placeholder="Enter notes about your day!" />
                    </div>
                    <Grid.Row>
                        <Button content="Cancel" onClick={() => navigate("/calendar")} />
                        <Button primary={true} content="Submit" onClick={submitForm} />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </div >
    );
}

export default Diary;
