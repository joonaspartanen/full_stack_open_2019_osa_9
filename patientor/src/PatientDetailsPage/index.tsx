import React from "react";
import axios from "axios";
import { Container, Icon, Item, Button } from "semantic-ui-react";
import EntryDetails from "../components/EntryDetails";
import { Patient, Entry, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { setCurrentPatient, addEntry } from "../state/reducer";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";

const PatientDetailsPage: React.FC = () => {
  const [{ currentPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const patientId = currentPatient?.id;
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      closeModal();
      dispatch(addEntry(newEntry));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchCurrentPatient = async () => {
      try {
        const { data: currentPatientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setCurrentPatient(currentPatientFromApi));
      } catch (e) {
        console.log(e);
      }
    };
    if (!(currentPatient?.id === id)) {
      console.log(`Fetching patient with id ${id} from api`);
      fetchCurrentPatient();
    }
  }, [dispatch, currentPatient, id]);

  if (currentPatient === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Container>
        <h3>
          {currentPatient.name}
          <Icon className={currentPatient.gender === "male" ? "mars" : "venus"}></Icon>
        </h3>
        <div>Social Security Number: {currentPatient.ssn}</div>
        <div>Date of birth: {currentPatient.dateOfBirth}</div>
        <div>Occupation: {currentPatient.occupation}</div>
        {currentPatient.entries.length > 0 && (
          <>
            <h4>Entries</h4>
            <Item.Group divided>
              {currentPatient.entries.map((entry: Entry) => {
                return <EntryDetails key={entry.id} entry={entry}></EntryDetails>;
              })}
            </Item.Group>
          </>
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={""}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add new entry</Button>
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
