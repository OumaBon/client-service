
const API_URL = process.env.NEXT_PUBLIC_API_URL

type User ={
    id: number;
    email: string;
    username: string;
};

type LoginResponse = {
    access_token: string;
    refresh_token: string;
    user: User;
};


type LoginPayload = {
    email: string;
    password: string;

};

type RegisterPayload = {
    username: string;
    email: string;
    password: string;
};


type RegisterResponse = {
  message: string;
  user: User;
};



export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> =>{
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to Login user')
    }

    return res.json() as Promise<LoginResponse>;
}



export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> =>{
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    
    if (!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register user");
    }
    return res.json() as Promise<RegisterResponse>;
};





export const fetchProfile = async(token: string)=>{
    const res = await fetch(`${API_URL}/me`,{
       headers: {Authorization: `Bearer ${token}`}
    });
    if (!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to Fetch user")
    }
    return res.json();
}

