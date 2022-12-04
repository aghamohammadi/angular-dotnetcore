import { initialStepsDemoState, StepsDemoState } from './steps-demo.state';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';

import * as StepsDemoActions from './steps-demo.actions';
import { UploadStatus } from '@app/shared/models/steps-demo-upload';

export const stepsDemoFeatureKey = 'steps-demo';

export const stepsDemoReducers = createReducer(
  initialStepsDemoState,
  on(StepsDemoActions.uploadRequestAction, (state, action) => {
    return {
      ...state,
      upload:{
        fileData: null,
        imagePath: null,
        status: UploadStatus.Requested,
        progress: null,
        error: null,

      }

    }
  }),
  on(StepsDemoActions.uploadCancelAction, (state, action) => {
    return {
      ...state,
      upload: {
        fileData: null,
        imagePath: null,
        status: UploadStatus.Ready,
        progress: null,
        error: null
      }

    }
  }),
  on(StepsDemoActions.uploadResetAction, (state, action) => {
    return {
      ...state,
      upload: {
        fileData: null,
        imagePath: null,
        status: UploadStatus.Ready,
        progress: null,
        error: null
      }

    }
  }),
  on(StepsDemoActions.uploadFailureAction, (state, action) => {
    return {
      ...state,
      upload: {
        fileData: null,
        imagePath: null,
        status: UploadStatus.Failed,
        error: action.error,
        progress: null
      }

    }
  }),
  on(StepsDemoActions.uploadStartedAction, (state, action) => {
    return {
      ...state,
      upload: {
        fileData: null,
        imagePath: null,
        error: null,
        status: UploadStatus.Started,
        progress: 0
      }

    }
  }),
  on(StepsDemoActions.uploadProgressAction, (state, action) => {
    return {
      ...state,
      upload: {
        fileData: null,
        imagePath: null,
        error: null,
        status: UploadStatus.Started,
        progress: action.progress
      }


    }
  }),
  on(StepsDemoActions.uploadCompletedAction, (state, action) => {
    return {
      ...state,
      upload: {
        status: UploadStatus.Completed,
        progress: 100,
        imagePath: action.imagePath,
        fileData: null,
        error: null
      }

    }
  }),

  on(StepsDemoActions.patchForm, (state, action) => {
    return {
      ...state,
      form: {...action.payload }
    }
  }),
  on(StepsDemoActions.patchSelectedUsers, (state, action) => {
    return {
      ...state,
      selectedUsers: action.payload
    }
  }),



);


export const selectUploadError = (state: StepsDemoState): string => state.upload?.error || '';

export const selectUploadStarted = (state: StepsDemoState): boolean =>
  state.upload?.status === UploadStatus.Started;

export const selectUploadRequested = (state: StepsDemoState): boolean =>
  state.upload?.status === UploadStatus.Requested;

export const selectUploadReady = (state: StepsDemoState): boolean => state.upload?.status === UploadStatus.Ready;

export const selectUploadProgress = (state: StepsDemoState): number => state.upload?.progress || 0;

export const selectUploadInProgress = (state: StepsDemoState): boolean =>
  state.upload?.status === UploadStatus.Started && (state.upload.progress || -1) >= 0;

export const selectUploadFailed = (state: StepsDemoState): boolean =>
  state.upload?.status === UploadStatus.Failed;

export const selectUploadCompleted = (state: StepsDemoState): boolean =>
  state.upload?.status === UploadStatus.Completed;
export const selectUploadedFilePath = (state: StepsDemoState): string => state.upload?.imagePath || '';



export const selectFormData = (state: StepsDemoState) => state.form;
export const selectUsersData = (state: StepsDemoState) => state.users;
export const selectedUsersData = (state: StepsDemoState) => state.selectedUsers;
export const stateData = (state: StepsDemoState) => state;
