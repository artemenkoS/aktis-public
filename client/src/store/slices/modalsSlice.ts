import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { patientApi } from '../../api/patient/patientApi';
import { Visit } from '../../api/visit/types';
import { RootState } from '../store';

interface ModalState {
  newPatientModal: { isOpen: boolean };
  deleteVisitModal: { isOpen: boolean; visit: Visit | null };
  editVisitModal: { isOpen: boolean; editableVisit: Visit | null; submitText: string };
  newVisitModal: { isOpen: boolean };
  patientProfileModal: { isOpen: boolean; patientId: number | null };
}

const initialState: ModalState = {
  newPatientModal: { isOpen: false },
  deleteVisitModal: { isOpen: false, visit: null },
  editVisitModal: { isOpen: false, editableVisit: null, submitText: 'Создать запись' },
  newVisitModal: { isOpen: false },
  patientProfileModal: { isOpen: false, patientId: null },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setNewPatientModalOpened(state, action: PayloadAction<boolean>) {
      state.newPatientModal.isOpen = action.payload;
    },
    setNewVisitModalOpened(state, action: PayloadAction<boolean>) {
      state.newVisitModal.isOpen = action.payload;
    },
    setEditVisitModalOpened(state, action: PayloadAction<boolean>) {
      state.editVisitModal.isOpen = action.payload;
    },
    setEditVisitModalSubmitText(state, action: PayloadAction<string>) {
      state.editVisitModal.submitText = action.payload;
    },
    setEditableVisit(state, action: PayloadAction<Visit | null>) {
      state.editVisitModal.editableVisit = action.payload;
    },
    setDeleteVisitModalOpened(state, action: PayloadAction<boolean>) {
      state.deleteVisitModal.isOpen = action.payload;
    },
    setDeleteVisitId(state, action: PayloadAction<Visit | null>) {
      state.deleteVisitModal.visit = action.payload;
    },
    setPatientProfileModalOpened(state, action: PayloadAction<boolean>) {
      state.patientProfileModal.isOpen = action.payload;
    },
    setPatientProfile(state, action: PayloadAction<number | null>) {
      state.patientProfileModal.patientId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(patientApi.endpoints.updatePatient.matchFulfilled, (state) => {
      state.newPatientModal.isOpen = false;
    });
  },
});

export const {
  setNewPatientModalOpened,
  setDeleteVisitModalOpened,
  setDeleteVisitId,
  setNewVisitModalOpened,
  setEditVisitModalOpened,
  setEditableVisit,
  setEditVisitModalSubmitText,
  setPatientProfileModalOpened,
  setPatientProfile,
} = modalsSlice.actions;

export const newPatientModalSelector = (state: RootState) => state.modalsReducer.newPatientModal;
export const patientProfileModalSelector = (state: RootState) => state.modalsReducer.patientProfileModal;
export const editVisitModalSelector = (state: RootState) => state.modalsReducer.editVisitModal;
export const newVisitModalSelector = (state: RootState) => state.modalsReducer.newVisitModal;
export const deleteVisitModalSelector = (state: RootState) => state.modalsReducer.deleteVisitModal;
export default modalsSlice.reducer;
