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
    let value;
    if (response.status === 404) {
       let entry = submitDiaryEntry(
            {
                "entry_date": new Date(date),
                "skill_ids": []
            }
        ).then((response) => {
            return response
        })
        value = entry;
    } else {
        value = response;
    }
    return value;
}

export async function updateDiaryEntry(entry_id: number, data: DiaryEntry) {
    const response = await fetch ('http://localhost:8000/diary_entries/' + entry_id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function getDiaryEntrySkills(date: string): Promise<DiaryEntrySkills[]> {
    const response = await fetch ('http://localhost:8000/diary_entries/' + date + "/skills", {
       headers: {
           'Content-Type': 'application/json'
       }
    });

    return response.json();
}

export async function login(loginData: string) {
    const response = await fetch ('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: loginData
    });
    return response;
}

export async function signup(signupData: string) {
    const response = await fetch ('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: signupData
    });
    return response.status;
}

//export async function dashboard();
