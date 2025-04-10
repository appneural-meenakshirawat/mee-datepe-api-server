export interface IResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: IData;
    error: any;
}
export interface IData {
    length: number;
    items: any[];
    page: number;
}
