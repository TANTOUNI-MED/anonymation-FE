import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button'; // Add this import statement
import Iconify from 'src/components/iconify';
import axios from 'axios';
// ----------------------------------------------------------------------

// ... (imports and other code)

export default function AnalyticsTasks({ title, subheader, list, onSendData, ...other }) {
  const [selected, setSelected] = useState([]);

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  const handleSendData = async () => {
    try {
      // Get the referencing_tables, person_id, and source_table from the first task
      const { referencing_tables, person_id, source_table } = list[0];
      console.log(selected);
      console.log(referencing_tables);
      // Ensure that referencing_tables is an array before using map
          // Englob the referencing_tables of the selected tables in an array
      const selectedTablesData = referencing_tables.filter((selectedTable) =>
            selected.includes(selectedTable.constraint_name)
        );
        console.log("selectedTablesData: ",selectedTablesData);
    
        // Make a POST request to your Python API endpoint
        const response = await axios.post('http://localhost:5000/anonymize', {
          source_table: source_table,
          person_id: person_id,
          referencing_tables: selectedTablesData, // Pass only constraint names
        });
  
        console.log('API Response:', response.data);
  

        // Send data to the backend
        onSendData({
          personId: person_id,
          sourceTable: source_table,
          referencingTables: selectedTablesData,
        });
      
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };
  
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)}
          onChange={() => handleClickComplete(task.id)}
        />
      ))}

      <Stack direction="row" justifyContent="flex-end" p={2}>
        <Button variant="contained" onClick={handleSendData}>
           Anonymize
        </Button>
      </Stack>
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  onSendData: PropTypes.func,
};

function TaskItem({ task, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.info('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.info('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.info('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.info('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.name}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};