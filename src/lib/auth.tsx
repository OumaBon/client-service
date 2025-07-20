
export const setAuthToken = (token: string): void =>{
localStorage.setItem('access_token', token );
}


export const getAuthToken=(): string | null =>{
    return localStorage.getItem('access_token');
};


export const removeAuthToken =(): void =>{
    localStorage.removeItem("access_token");
};