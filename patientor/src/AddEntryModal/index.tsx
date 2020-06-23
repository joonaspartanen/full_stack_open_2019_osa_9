import React, { useState } from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import EntryTypeSelector from "./EntryTypeSelector";
import { Entry, EntryFormValues } from "../types";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, error }) => {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <EntryTypeSelector entryType={entryType} setEntryType={setEntryType}></EntryTypeSelector>
        {entryType === "HealthCheck" && (
          <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose}></AddHealthCheckEntryForm>
        )}
        {entryType === "Hospital" && (
          <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose}></AddHospitalEntryForm>
        )}
        {entryType === "OccupationalHealthcare" && (
          <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose}></AddOccupationalHealthcareEntryForm>
        )}

      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
