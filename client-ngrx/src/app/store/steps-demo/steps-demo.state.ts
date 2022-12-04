import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { StepsDemoForm } from '@shared/models/steps-demo-form';
import { StepsDemoUpload, UploadStatus } from '@shared/models/steps-demo-upload';

export interface StepsDemoState {
  upload: StepsDemoUpload | null;
  form: StepsDemoForm | null;
  users: StepsDemoUser[];
  selectedUsers: number[];
}


export const initialStepsDemoState: StepsDemoState = {
  upload: {
    fileData: null,
    imagePath: null,
    status: UploadStatus.Ready,
    error: null,
    progress: null,
  },
  form: {
    amount: 0,
    date: null,
    status: null,
    source: null
  },
  users: [
        { id: 1, firstname: 'Ahmad', lastname: 'Aghamohammadi', age :31},
        { id: 2, firstname: 'Lionel', lastname: 'Messi', age :35},
        { id: 3, firstname: 'Cristiano', lastname: 'Ronaldo', age :38},
        { id: 4, firstname: 'Neymar', lastname: 'JR', age :30},
        { id: 5, firstname: 'Andres', lastname: 'Iniesta', age :38},
      ],
  selectedUsers:[]
};
