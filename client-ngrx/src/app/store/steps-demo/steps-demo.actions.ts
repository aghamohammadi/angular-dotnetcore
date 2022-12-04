import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { StepsDemoForm } from '@shared/models/steps-demo-form';
import { StepsDemoUpload } from '@shared/models/steps-demo-upload';
import { createAction, props } from '@ngrx/store';


export const uploadRequestAction = createAction(
  "[Upload Page] Upload Request Action",
  props<{ file: File }>()
);
export const uploadResetAction = createAction(
  "[Upload Page] Upload Reset Action"
);
export const uploadStartedAction = createAction(
  "[Upload Page] Upload Started Action"
);
export const uploadCompletedAction = createAction(
  "[Upload Page] Upload Completed Action ",
  props<{ imagePath: string }>()
);
export const uploadFailureAction = createAction(
  "[Upload Page] Upload Failure Action",
  props<{  error :string}>()
);
export const uploadProgressAction = createAction(
  "[Upload Page] Upload Progress Action",
  props<{progress: number  }>()
);
export const uploadCancelAction = createAction(
  "[Upload Page] Upload Cancel Action "
);





export const patchForm = createAction(
  "[Form Page] Patch Form Value",
  props<{ payload: StepsDemoForm }>()
);
export const patchSelectedUsers = createAction(
  "[Users Page] Patch Users",
  props<{ payload: number[] }>()
);
