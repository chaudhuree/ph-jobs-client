import { Document, Page, Text,View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 6,
  },
  table: {
    display: "table",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#2A68FF",
    color: "#fff",
    padding: 10,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "normal",
    fontSize: 14,
  },
  tableCell: {
    padding: 5,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 12,
  },
});

export default function PdfFile({ jobsData }) {
  return (
    <Document>
    <Page style={styles.page}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Job Title</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Salary Range</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Applied On</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Deadline</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Status</Text>
          </View>
         
        </View>
        {jobsData.map((job) => (
          <View style={styles.tableRow} key={job._id}>
            <View style={styles.tableCell}>
              <Text>{job.job.jobTitle}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{job.job.salaryRange}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{moment(job.appliedDate).format("MMM Do YY")}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{moment(job.job.deadline).fromNow()}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{job.status}</Text>
            </View>
           
          </View>
        ))}
      </View>
    </Page>
  </Document>
  );
}
