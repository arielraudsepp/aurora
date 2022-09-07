export interface Skill {
    id: number;
    name: string;
    category: string;
};

export interface DiaryEntry {
    entry_date: Date;
    skill_ids: number[];
    notes: string;
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
    notes: string;
};


const get = async <TResponse> (url: string): Promise<TResponse> => {
    const response = await fetch('http://localhost:8000' + url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

const post = async <TBody, TResponse> (url: string, data: TBody): Promise<TResponse> => {
    const response = await fetch('http://localhost:8000' + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const patch = async <TBody, TResponse> (url: string, data: TBody): Promise<TResponse> => {
    const response = await fetch ('http://localhost:8000' + url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export function getSkills(): Promise<Skill[]> {
    return get('/skills');
}

export async function getDiaryEntrySkills(date: string): Promise<DiaryEntrySkills[]> {
    return get('/diary_entries/' + date + '/skills');
}

export async function getUsername(): Promise<string> {
    return get('/session_username');
}

export async function submitDiaryEntry(data: DiaryEntry): Promise<DiaryEntrySkills> {
    return post('/diary_entries', data);
}

export async function updateDiaryEntry(entry_id: number, data: DiaryEntry): Promise<DiaryEntryRecord> {
    console.log(data.notes);
    return patch('/diary_entries/' + entry_id, data);
}

export async function login(loginData: string): Promise<Response> {
    const response = await fetch ('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // loginData has already been stringified
        body: loginData,
        credentials: 'include'
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

export async function retreiveDiaryEntry(date: string): Promise<DiaryEntryRecord> {
    let response = await fetch ('http://localhost:8000/diary_entries/' + date , {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    let value;
    if (response.status === 404) {
       let entry = await submitDiaryEntry(
            {
                "entry_date": new Date(date),
                "skill_ids": [],
                "notes": '',
            }
        )
        value = entry;
    } else {
        value = response.json();
    }
    return value;
}
