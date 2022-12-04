import { StepsDemoState } from './steps-demo.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './steps-demo.reducers';
import { UploadStatus } from '@app/shared/models/steps-demo-upload';



const stepsDemoSelector = createFeatureSelector<StepsDemoState>(fromStore.stepsDemoFeatureKey);





export const uploadError = createSelector(stepsDemoSelector, fromStore.selectUploadError);
export const uploadStarted = createSelector(stepsDemoSelector, fromStore.selectUploadStarted);
export const uploadRequested = createSelector(stepsDemoSelector, fromStore.selectUploadRequested);
export const uploadReady = createSelector(stepsDemoSelector, fromStore.selectUploadReady);
export const uploadProgress = createSelector(stepsDemoSelector, fromStore.selectUploadProgress);
export const uploadInProgress = createSelector(stepsDemoSelector, fromStore.selectUploadInProgress);
export const uploadFailed = createSelector(stepsDemoSelector, fromStore.selectUploadFailed);
export const uploadCompleted = createSelector(stepsDemoSelector, fromStore.selectUploadCompleted);



export const uploadFilePath = createSelector(stepsDemoSelector, fromStore.selectUploadedFilePath);
export const formData = createSelector(stepsDemoSelector, fromStore.selectFormData);
export const usersData = createSelector(stepsDemoSelector, fromStore.selectUsersData);
export const selectedUsersData = createSelector(stepsDemoSelector, fromStore.selectedUsersData);
export const stateData = createSelector(stepsDemoSelector, fromStore.stateData);
