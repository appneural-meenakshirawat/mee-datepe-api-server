export declare class UserRegisterDto {
    name: string;
    uname: string;
    mobileNo: string;
    email: string;
    dob: string;
    address: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    stage: number;
}
