export interface CreateProjectDto {
  projectId: number | '';
  projectName: string;
  projectDescription: string | '';
  userName: string | '';
  userId: number;
}
