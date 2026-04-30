export interface ApiError{
    timestamp: string;
    status: number;
    error:string;
    message:string;
    path: string;

    resource?:string | null;
    field?:string | null;
    value?: string | null;

    fieldErrors?: Record<string, string> | null;
}