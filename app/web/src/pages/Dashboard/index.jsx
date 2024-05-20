import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Table from "../../components/Table";
import Button from "../../components/Button";

import api from "../../services/cloudAPI";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const genders = ["Nam", "Nữ", "Không rõ"];
  const [newTrainee, setNewTrainee] = useState({
    name: "",
    email: "",
    gender: "",
    school: "",
  });

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainees = await api.getAllTrainees();
        setData(trainees.data);
      } catch (error) {
        setError("Failed to fetch trainees");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loading]);

  const refetch = () => {
    setLoading(true);
  }
  
  const handleAddTrainee = async () => {
    try {
      const response = await api.createTrainee(newTrainee);
      const updatedData = [...data, response.data];
      setData(updatedData);
      setNewTrainee({ name: "", email: "", gender: "", school: "" });
      setOpenAddDialog(false);
      setLoading(true);
    } catch (error) {
      console.error("Error adding trainee:", error.message);
    }
  };

  const handleInputChange = (event) => {
    setNewTrainee({ ...newTrainee, [event.target.name]: event.target.value });
  };

  const handleGenderChange = (event) => {
    setNewTrainee({ ...newTrainee, gender: event.target.value });
  };

  const renderTable = (refetch) => {
    if (loading) {
      return (
        <p className="flex items-center justify-center">
          <CircularProgress />
        </p>
      );
    }
    if (error) {
      return <p className="flex items-center justify-center">{error}</p>;
    }
    return <Table data={data} setData={setData} refetch={refetch}/>;
  };

  return (
    <>
      <div className="flex items-center justify-center py-5 mb-5">
        <div style={{ width: "90%", display: "flex" }}>
          <h1 className="flex-1 text-2xl font-medium">
            Welcome to VDT Cloud Trainee Manager!
          </h1>
          <div className="flex space-x-4">
            <Button
              label="Add"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            />
          </div>
        </div>
      </div>
      {renderTable(refetch)}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newTrainee.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newTrainee.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={newTrainee.gender}
              onChange={handleGenderChange}
              fullWidth
            >
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="School"
            name="school"
            value={newTrainee.school}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTrainee} color="success">
            Add Trainee
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}