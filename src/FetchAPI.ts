import { getDate } from "./Date";

export interface Skill {
    id: number;
    name: string;
    category: string;
};

export interface DiaryEntry {
    entry_date: Date;
    skill_ids: number[];
};

export interface DiaryEntrySkills {
    diary_entry_id: number;
    skills_id: number;
    created_at: Date;
}

export interface DiaryEntryRecord {
    id: number;
    entry_date: Date;
    created_at: Date;
};

export async function getSkills(route: string): Promise<Skill[]> {
    const response = await fetch('http://localhost:8000'.concat(route), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export async function submitDiaryEntry(data: DiaryEntry) {
    const response = await fetch ('http://localhost:8000/diary_entries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function retreiveDiaryEntry(date: string) {
    let response = await fetch ('http://localhost:8000/diary_entries/' + date , {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 404) {
           submitDiaryEntry(
            {
                "entry_date": new Date(date),
                "skill_ids": []
            }
        );
    } else {
        return response.json;
    }
}

export async function getDiaryEntrySkills(date: string): Promise<DiaryEntrySkills[]> {
    const response = await fetch ('http://localhost:8000/diary_entries/' + date + "/skills", {
       headers: {
           'Content-Type': 'application/json'
       }
    });

    return response.json();
}


// .catch((err) => {
//         if (err.status === 404) {
//         submitDiaryEntry(
//             {
//                 "entry_date": date,
//                 "skill_ids": []
//             }
//         );
//             retreiveDiaryEntry(date);
//         }
//     })
