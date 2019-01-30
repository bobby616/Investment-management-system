import { Role } from 'src/app/models/roles';
import { Client } from 'src/app/managerOverview/client/models/client.model';

export class ManagerDTO {
    id: string;

    role: Role;

    clients: Promise<Client[]>;

    fullname: string;

    dateregistered: Date;
    
    email: string;
}