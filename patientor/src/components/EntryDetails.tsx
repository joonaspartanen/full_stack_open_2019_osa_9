import React from "react";
import { useStateValue } from "../state";

import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Diagnosis,
} from "../types";
import { Item, Rating, Icon } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const findDiagnosisByCode = (
  code: Diagnosis["code"],
  allDiagnoses: Diagnosis[]
): Diagnosis | undefined => {
  return allDiagnoses.find((d: Diagnosis) => d.code === code);
};

const BaseEntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <>
      <Item.Header>{entry.date}</Item.Header>
      <Item.Meta>Specialist: {entry.specialist}</Item.Meta>
      <Item.Description style={{ marginBottom: "1em" }}>{entry.description}</Item.Description>
    </>
  );
};

const DiagnosesList: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (!entry.diagnosisCodes) {
    return null;
  }

  return (
    <Item.Extra>
      <h5 style={{ marginTop: "0.5em" }}>Diagnoses:</h5>
      {entry.diagnosisCodes?.map((code: Diagnosis["code"], index: number) => (
        <div key={index} className="item">
          {code}: {findDiagnosisByCode(code, diagnoses)?.name}
        </div>
      ))}
    </Item.Extra>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Item>
      <Item.Content>
        <Icon name="hospital" size="big"></Icon>
        <BaseEntryDetails entry={entry}></BaseEntryDetails>
        <div>
          Discharge from {entry.discharge.date} until: {entry.discharge.criteria}
        </div>
        <DiagnosesList entry={entry}></DiagnosesList>
      </Item.Content>
    </Item>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Item>
      <Item.Content>
        <Icon name="doctor" size="big"></Icon>
        <BaseEntryDetails entry={entry}></BaseEntryDetails>
        <div>Employer: {entry.employerName}</div>
        {entry.sickLeave ? (
          <div>
            Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
          </div>
        ) : null}
        <DiagnosesList entry={entry}></DiagnosesList>
      </Item.Content>
    </Item>
  );
};

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  return (
    <Item>
      <Item.Content>
        <Icon name="calendar check" size="big"></Icon>
        <BaseEntryDetails entry={entry}></BaseEntryDetails>
        <Rating
          icon="heart"
          defaultRating={4 - entry.healthCheckRating}
          maxRating={4}
          disabled></Rating>
        <DiagnosesList entry={entry}></DiagnosesList>
      </Item.Content>
    </Item>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry}></HospitalEntryDetails>;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails entry={entry}></OccupationalHealthcareEntryDetails>
      );
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry}></HealthCheckEntryDetails>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
