export interface StepsDemoUpload {
  fileData: File | null;
  imagePath: string | null;
  status: UploadStatus;
  error: string | null;
  progress: number | null;
}


export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}
