import React, { Fragment, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import apiCall from '../apis/axios';

const Settings = (props) => {
  const [options, setOptions] = useState(props.options);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };

  // Change handler
  const handleChange = (e) => {
    // console.log(e.target.value);
    setOptions(e.target.value);
  };

  // Submit handler to add an option
  const handleSubmit = async (e) => {
    e.preventDefault();

    props.setOptions(options);
    const inputs = { soption: options };
    // console.log(inputs);
    try {
      await apiCall.put('/options', inputs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {/* Settings icon triggers modal */}
      <SettingsIcon onClick={handleOpen} />

      {/* Modal for setting up options */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={style}>
          <h2 className='text-center text-xl mb-3'>Configuration</h2>
          <form>
            <label htmlFor="options">Filter Options (separated by comma):</label><br />
            <input
              type="text"
              id='option'
              name='option'
              value={options}
              onChange={handleChange}
              autoComplete='off'
              autoFocus
            />
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded-full'
              onClick={(e) => { handleSubmit(e); handleClose(e); }}
            >
              Update
            </button>
            <button
              className='bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 mt-3 ms-3 rounded-full'
              onClick={handleClose}
            >
              Cancel
            </button>
          </form>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Settings;