import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Tab,
  Tabs,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

const TimelineTables = () => {
  const [timelineStart, setTimelineStart] = useState('');
  const [timelineEnd, setTimelineEnd] = useState('');
  const [selectedTable, setSelectedTable] = useState('business');
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (type, start, end) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5001/timeline/${type}?start_date=${start}&end_date=${end}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timelineStart && timelineEnd) {
      fetchData(selectedTable, timelineStart, timelineEnd);
    }
  }, [timelineStart, timelineEnd, selectedTable]);

  const timelineOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const handleTimelineChange = (event) => {
    const value = event.target.value;
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (value) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week':
        start.setDate(today.getDate() - today.getDay());
        end.setDate(start.getDate() + 6);
        break;
      case 'month':
        start.setDate(1);
        end.setMonth(start.getMonth() + 1, 0);
        break;
      case 'year':
        start.setMonth(0, 1);
        end.setMonth(12, 0);
        break;
      default:
        break;
    }
    
    setTimelineStart(start.toISOString().split('T')[0]);
    setTimelineEnd(end.toISOString().split('T')[0]);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTable(newValue);
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'branch', label: 'Branch' },
    { id: 'joined', label: 'Joined' },
    { id: 'contactNumber', label: 'Contact Number' }
  ];

  const renderTable = () => {
    if (isLoading) {
      return <Typography sx={{ p: 2 }}>Loading...</Typography>;
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      );
    }

    if (!tableData.length) {
      return (
        <Alert severity="info" sx={{ m: 2 }}>
          No data found for the selected time period
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Card sx={{ maxWidth: 'lg', margin: 'auto' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {selectedTable === 'business' ? 'Business Management' : 'Customer Management'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CalendarToday />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Select Timeline</InputLabel>
                <Select
                  label="Select Timeline"
                  onChange={handleTimelineChange}
                >
                  {timelineOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={selectedTable}
              onChange={handleTabChange}
              aria-label="management tables tabs"
            >
              <Tab label="Business" value="business" />
              <Tab label="Customer" value="customer" />
            </Tabs>
          </Box>
          <Box sx={{ overflow: 'auto' }}>
            {renderTable()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimelineTables;