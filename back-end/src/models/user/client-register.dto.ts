import { IsString, IsNumber } from 'class-validator';

export class ClientRegisterDTO {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsNumber()
    amount: number;

    @IsNumber()
    age: number;

    @IsString()
    address: string;

    @IsString()
    managerEmail: string;
}