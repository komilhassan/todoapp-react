import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const GetTasksHistory = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData = [];
            querySnapshot.forEach((doc) => {
                const task = { ...doc.data(), id: doc.id };
                tasksData.push(task);
            });
            setTasks(tasksData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Container maxWidth='xl' sx={{ my: 6 }}>
            <Typography variant="h4" gutterBottom>
                Tasks History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default GetTasksHistory;
