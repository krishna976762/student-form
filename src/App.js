import React, { useState } from "react";
import {
  Container, TextField, Button, Radio, RadioGroup,
  FormControlLabel, Autocomplete, Table, TableBody, TableCell, TableHead,
  TableRow, IconButton, Typography, Box, Alert, Checkbox
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';    

function App() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
    subjects: [],
    country: "",
  });

  const [students, setStudents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});  
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);  
  const countries = ["India", "USA", "Canada", "Australia", "UK"];
  const subjectsList = ["Math", "Science", "History", "Geography"];

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubjectsChange = (event, value) => {
    setStudent({ ...student, subjects: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!student.name) newErrors.name = "Name is required";
    if (!student.age) newErrors.age = "Age is required";
    if (!student.gender) newErrors.gender = "Gender is required";
    if (student.subjects.length === 0) newErrors.subjects = "At least one subject is required";
    if (!student.country) newErrors.country = "Country is required";
    if (!isTermsAccepted) newErrors.terms = "You must accept the terms and conditions"; 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = () => {
    if (!validateForm()) return; 

    if (isEditMode) {
      const updatedStudents = students.map((s, index) =>
        index === editIndex ? student : s
      );
      setStudents(updatedStudents);
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      setStudents([...students, student]);
    }

 
    setStudent({
      name: "",
      age: "",
      gender: "",
      subjects: [],
      country: "",
    });
    setErrors({});
    setIsTermsAccepted(false);  
  };

  const handleEdit = (index) => {
    setStudent(students[index]);
    setIsEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };



  return (
    <Container>
      <h2>Student Details Form</h2>
 
      {Object.keys(errors).length > 0 && (
        <Box>
          {Object.values(errors).map((error, index) => (
            <Alert key={index} severity="error">
              {error}
            </Alert>
          ))}
        </Box>
      )}

      <TextField
        label="Name"
        name="name"
        value={student.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal" 
      />
      <TextField
        label="Age"
        name="age"
        value={student.age}
        onChange={handleInputChange}
        fullWidth
        margin="normal" 
      />
      <RadioGroup
        name="gender"
        value={student.gender}
        onChange={handleInputChange}
        row 
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>

      <Autocomplete
      style={{marginTop:"20px"}}
        multiple
        options={subjectsList}
        getOptionLabel={(option) => option}
        value={student.subjects}
        onChange={handleSubjectsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Subjects"
            placeholder="Select subjects" 
          />
        )}
      />

      <Autocomplete
        options={countries}
        style={{marginTop:"20px"}}
        getOptionLabel={(option) => option}
        value={student.country}
        onChange={(event, newValue) =>
          setStudent({ ...student, country: newValue })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            placeholder="Select country" 
          />
        )}
      />
 
      <FormControlLabel
       sx={{ mt: 2 }}
        control={
          <Checkbox
            checked={isTermsAccepted}
            onChange={(e) => setIsTermsAccepted(e.target.checked)}
            color="primary"
          />
        }
        label="I accept the terms and conditions"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
       style={{display:"block",mt:4}}
      >
        {isEditMode ? "Update Student" : "Submit"}
      </Button>
 
      <h2>Student List</h2>
      {students.length === 0 ? (
        <Box className="no-students-message">
          <Typography variant="h6" color="textSecondary">
            No students available. Please add a student.
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Country</TableCell> 
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s, index) => (
              <TableRow key={index}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.age}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.subjects.join(", ")}</TableCell>
                <TableCell>{s.country}</TableCell> 
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell> 
                <TableCell>
                  <IconButton onClick={() => handleDelete(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default App;
