const API_URL = process.env.NEXT_PUBLIC_API_URL



export interface RegisterRequest{
    username: string;
    email: string;
    password: string;
};


export interface RegisterResponse{
    message: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
};


interface ApiError {
    message?: string;
    errors?: Record<string, string[]>
}

type RegisterError = ApiError;


export const registerUser = async(payload: RegisterRequest): Promise<RegisterResponse> =>{
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    const data = await res.json();
    if(!res.ok) throw  data as RegisterError;
    return data as RegisterResponse

}