import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, TextField, Typography, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { toast } from "@/components/ui/use-toast";
import '@/styles/accountManagement/ModalBox.css';
import { ListTaskType, UpdateTaskType } from '@/schemaValidations/listTask/listTask.schema';
import listTaskApiRequest from '@/apiRequests/listTask/listTask';
import { Task } from './ListTable';
import { Member } from './CreateTaskModal';
import { useAppContext } from "@/app/app-provider";

interface EditTaskModalProps {
    onClose: () => void;
    task: Task | null;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ onClose, task }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<UpdateTaskType>({
        "assigned-to": task?.['assigned-to'] ?? "",
        description: task?.description ?? "",
        "estimated-effort": task?.['estimated-effort'] ?? "",
        "is-approved": task ? task['is-approved'] === "true" : false,
        name: task?.name ?? "",
        taskId: task?.id ?? "",
    });

    const { project } = useAppContext()

    // List Member
    const [member, setMember] = useState<Member[]>([]);

    // Get list member in project
    useEffect(() => {
        listTaskApiRequest.getMemberInProject(project?.id)
            .then(({ payload }) => {
                setMember(payload.data);
            })
            .catch(error => {
                console.error("Failed to fetch projects", error);
            });
    }, [project?.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFormData({ ...formData, "assigned-to": e.target.value });
    };
    
    const handleSelectApprove = (e: SelectChangeEvent<string>) => {
        setFormData({ ...formData, "is-approved": e.target.value === "true" });
    };

    async function handleSubmit(e: FormEvent) {
        if (loading) return;
        setLoading(true);
        e.preventDefault();
        console.log(formData)
        try {
            const result = await listTaskApiRequest.updateTask(project?.id, formData);
            toast({
                title: `${result.payload.message}`,
                duration: 2000,
                variant: "success",
            });
            onClose();

        } catch (error: any) {
            toast({
                title: `${error}`,
                duration: 2000,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box className="modal-edit-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Cập nhật Task
            </Typography>

            {formData && (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Tên task"
                                    placeholder="Tên task"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Mô tả công việc"
                                    placeholder="Mô tả công việc"
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-label">Người được giao</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name="assigned-to"
                                    label="Người được giao"
                                    value={formData['assigned-to']}
                                    onChange={handleSelectChange}
                                >
                                    {member.map((member) => (
                                        <MenuItem key={member.id} value={member.id}>{member['user-name']}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Thời gian dự tính hoàn thành"
                                    placeholder="Thời gian dự tính hoàn thành"
                                    name='estimated-effort'
                                    value={formData['estimated-effort']}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="is-approved-label">Xác nhận</InputLabel>
                                <Select
                                    name="is-approved"
                                    labelId="is-approved-label"
                                    label="Xác nhận"
                                    value={formData['is-approved'] ? "true" : "false"}
                                    onChange={handleSelectApprove}
                                >
                                    <MenuItem value="true">Approve</MenuItem>
                                    <MenuItem value="false">Not approve</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    name="status"
                                    labelId="status-label"
                                    value={formData.status}
                                    onChange={handleSelectChange}
                                    required
                                >
                                    <MenuItem value={"pending"}>Pending</MenuItem>
                                    <MenuItem value={"in-progress"}>In Progress</MenuItem>
                                    <MenuItem value={"completed"}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            color="primary"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>

                        <Button
                            variant="contained"
                            color="warning"
                            type="submit"
                        >
                            Cập nhật
                        </Button>
                    </Box>
                </form>
            )}
        </Box>
    )
}
export default EditTaskModal;
