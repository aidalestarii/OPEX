export class ShowMGLAccountDTO {
    idGlAccount: number;
    uniqueId: string;
    group: string;
    groupDetail: string;
    glAccount: number;
    sap: boolean;
    description: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
}