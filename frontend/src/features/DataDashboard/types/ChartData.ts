// used for SeverityBarChart
export interface SeverityData {
    facilityOwner: string;
    severityLevel: string;
    severityScore: number;
}

// used for SeverityOverTimeChart
export interface SeverityOverTimeData extends SeverityData {
    date: string;
}

// one instance of ranking
export interface FacilityExceedanceData {
    facilityOwner: string;
    noOfExceedances: number;
}
