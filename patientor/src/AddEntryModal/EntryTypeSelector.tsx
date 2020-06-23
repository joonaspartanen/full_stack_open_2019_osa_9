import React from "react";
import { Button } from "semantic-ui-react";
import { Entry } from "../types";

interface Props {
  entryType: Entry["type"];
  setEntryType: (entryType: Entry["type"]) => void;
}

const EntryTypeSelector: React.FC<Props> = ({ entryType, setEntryType }) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <h4>Select entry type</h4>
      <Button
        className={entryType === "HealthCheck" ? "primary" : ""}
        onClick={() => setEntryType("HealthCheck")}>
        Health Check
      </Button>
      <Button
        className={entryType === "Hospital" ? "primary" : ""}
        onClick={() => setEntryType("Hospital")}>
        Hospital
      </Button>
      <Button
        className={entryType === "OccupationalHealthcare" ? "primary" : ""}
        onClick={() => setEntryType("OccupationalHealthcare")}>
        Occupational Healthcare
      </Button>
    </div>
  );
};

export default EntryTypeSelector;
