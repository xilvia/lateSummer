export interface EditProjectDto {
  id: number;
  projectId: number | '';
  projectName: string;
  projectDescription: string | '';
  userName: string | '';
  userId: number;
}
