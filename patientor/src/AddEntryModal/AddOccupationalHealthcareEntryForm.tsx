import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "This field is required";
        const dateFormatError = "Malformatted date";
        const errors: { [field: string]: string | {} } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = dateFormatError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave) {
          if (!Date.parse(values.sickLeave.startDate)) {
            errors.sickLeave = {
              startDate: dateFormatError,
            };
          }
          if (!Date.parse(values.sickLeave.endDate)) {
            errors.sickLeave = {
              endDate: dateFormatError,
            };
          }
        }
        return errors;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field label="Date" placeholder="Date" name="date" component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave from"
              placeholder="Sick leave from"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave to"
              placeholder="Sick leave to"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}></DiagnosisSelection>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthcareEntryForm;
