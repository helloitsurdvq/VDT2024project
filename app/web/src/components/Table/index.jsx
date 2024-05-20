/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Button from "../Button";
import api from "../../services/cloudAPI";

export default function Table(props) {
  const { data, setData, refetch } = props;
  const genders = ["Nam", "Nữ", "Không rõ"];
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [Trainee, setTrainee] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedTrainee, setEditedTrainee] = useState(null);

  const handleClickOpen = (data) => {
    if (data.message) {
      setTrainee(data);
    } else {
      setTrainee(data);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTrainee(null);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
    // setTrainee(null);
  };

  const renderActions = (params) => {
    const handleDelete = () => {
      setOpenDel(true);
      setTrainee(params.row);
    };

    return (
      <>
        <InfoOutlinedIcon
          style={{ cursor: "pointer", marginRight: 8 }}
          onClick={() => handleClickOpen(params.row)}
        />
        <EditOutlinedIcon
          style={{ cursor: "pointer", marginRight: 8 }}
          onClick={() => handleEditClick(params.row)}
        />
        <DeleteOutlineIcon
          style={{ cursor: "pointer", marginRight: 8 }}
          onClick={handleDelete}
        />
      </>
    );
  };

  const handleDeleteTrainee = async (id) => {
    const response = await api.removeTrainee(id);

    if (response.error) {
      console.error("Error deleting trainee:", response.error);
    } else {
      setOpenDel(false);
      const updatedData = data.filter((trainee) => trainee._id !== id);
      setData(updatedData);
      refetch();
    }
  };

  const handleEditClick = (trainee) => {
    setEditedTrainee(trainee);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditedTrainee(null);
    setEditOpen(false);
  };

  const handleEditSave = async () => {
    try {
      await api.updateTrainee(editedTrainee._id, editedTrainee);
      console.log("Trainee updated successfully");
      handleEditClose();
      refetch();
    } catch (error) {
      console.error("Failed to update trainee:", error.message);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 150,
    },
    {
      field: "school",
      headerName: "School",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      renderCell: renderActions,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div style={{ height: 600, width: "90%", display: "flex" }}>
        <DataGrid
          rows={data}
          getRowId={(r) => r._id}
          columns={columns}
          autoPageSize
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Trainee Information</DialogTitle>
        <DialogContent>
          {Trainee && (
            <DialogContentText>
              <div>
                <strong>Name:</strong> {Trainee.name}
              </div>
              <div>
                <strong>Email:</strong> {Trainee.email}
              </div>
              <div>
                <strong>Gender:</strong> {Trainee.gender}
              </div>
              <div>
                <strong>School:</strong> {Trainee.school}
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDel} onClose={handleCloseDel}>
        {Trainee && (
          <>
            {Trainee.message ? (
              <DialogTitle>Success!</DialogTitle>
            ) : (
              <DialogTitle>Delete Trainee Confirmation</DialogTitle>
            )}
            <DialogContent>
              <DialogContentText>
                {Trainee.message
                  ? Trainee.message
                  : `Are you sure you want to delete trainee: ${Trainee.name}? This action cannot be undone.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDel} color="primary">
                Cancel
              </Button>
              {Trainee.message ? null : (
                <Button
                  onClick={() => handleDeleteTrainee(Trainee._id)}
                  color="error"
                >
                  Delete
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Trainee</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editedTrainee ? editedTrainee.name : ""}
            onChange={(e) =>
              setEditedTrainee({ ...editedTrainee, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={editedTrainee ? editedTrainee.email : ""}
            onChange={(e) =>
              setEditedTrainee({ ...editedTrainee, email: e.target.value })
            }
            margin="normal"
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={editedTrainee ? editedTrainee.gender : ""}
              onChange={(e) =>
                setEditedTrainee({ ...editedTrainee, gender: e.target.value })
              }
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
            fullWidth
            value={editedTrainee ? editedTrainee.school : ""}
            onChange={(e) =>
              setEditedTrainee({ ...editedTrainee, school: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}