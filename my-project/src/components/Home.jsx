import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { Box, Typography, Card, CardContent, IconButton, MenuItem, Select, FormControl, InputLabel, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../Modals/DeleteModal';
import SuccessModal from '../Modals/SuccessModal';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task)
      );
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleAddTask = async () => {
    if (taskName) {
      try {
        await addDoc(collection(db, "tasks"), {
          name: taskName,
          status: taskStatus,
        });
        setSuccessOpen(true);
        setTaskName("");
        setTaskStatus("To Do");
      } catch (error) {
        console.error("Error adding task to Firestore: ", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setIsDeleteModalOpen(true);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseSuccessModal = () => setSuccessOpen(false);

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom align="center">Tasks</Typography>
      <Box component="form" sx={{ mb: 2 }}>
        <TextField
          margin="dense"
          label="Task Name"
          type="text"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleAddTask} variant="contained" color="primary" sx={{ mt: 2 }}>Add Task</Button>
      </Box>
      {tasks.map(task => (
        <Card key={task.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.name}</Typography>
            <Typography color="textSecondary">{task.status}</Typography>
            <FormControl sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                label="Status"
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => handleDeleteTask(task.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
      <DeleteModal open={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
      <SuccessModal open={successOpen} onClose={handleCloseSuccessModal} />
    </Box>
  );
};

export default Home;
