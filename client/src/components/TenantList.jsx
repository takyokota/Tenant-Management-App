import React, { Fragment, useEffect, useState } from 'react';
import apiCall from '../apis/axios';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const TenantList = (props) => {
  const [tenants, setTenants] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [open, setOpen] = useState(false);
  const [tempData, setTempData] = useState([]);

  const handleOpen = (temp) => {
    setOpen(true);
    setTempData(temp);
  };
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

  const navigate = useNavigate();
  let selected = [];

  // Get all tenants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall.get('/tenants');
        setTenants(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setTenants]);

  // Unselect all checkboxes when 'Selections' changed
  useEffect(() => {
    setIsChecked([]);
    setIsCheckedAll(false);
  }, [props.selection]);

  // Set selected tenants
  useEffect(() => {
    props.setSelectedTenants(tenants.filter(tenant => isChecked.includes(tenant.id.toString())));
  }, [isChecked]);

  // Sorting by keyword
  if (props.searchWord) {
    selected = tenants.filter(item => {
      let lResult = item.lname.toLowerCase();
      let fResult = item.fname.toLowerCase();
      return lResult.includes(props.searchWord) || fResult.includes(props.searchWord);
    });
  } else {
    switch (props.selection) {
      case "All":
        selected = tenants.sort((a, b) => a.lname.toUpperCase() > b.lname.toUpperCase() ? 1 : b.lname.toUpperCase() > a.lname.toUpperCase() ? -1 : 0);
        break;
      default:
        selected = tenants.filter(item => item.aptno.toUpperCase().includes(props.selection));
        selected.sort((a, b) =>
          parseInt(a.aptno.toUpperCase().replace(props.selection, "")) > parseInt(b.aptno.toUpperCase().replace(props.selection, "")) ?
            1 : parseInt(b.aptno.toUpperCase().replace(props.selection, "")) > parseInt(a.aptno.toUpperCase().replace(props.selection, "")) ?
              -1 : 0);
    }
  }

  // Checkbox handlers
  const handleSelectAll = (e) => {
    setIsCheckedAll(!isCheckedAll);
    setIsChecked(selected.map(item => item.id.toString()));
    if (isCheckedAll) {
      setIsChecked([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (!checked) {
      setIsChecked(isChecked.filter(item => item !== id));
    } else {
      setIsChecked([...isChecked, id]);
    }
  };

  // Navigates to update
  const handleUpdate = (id, e) => {
    e.preventDefault();

    navigate(`/update/${id}`);
  };

  // Deletes the item
  const handleDelete = async (id, e) => {
    e.preventDefault();

    // console.log(id);

    try {
      await apiCall.delete(`/tenants/${id}`);

      setTenants(tenants.filter((tenant) => tenant.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // to show this while fetching data from database
  if (tenants.length === 0) {
    return (<div className='text-center'>Loading...</div>);
  }

  return (
    <Fragment>
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  value="all"
                  onChange={handleSelectAll}
                  checked={isCheckedAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Apt No</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tenants && selected.map((tenant) => {
              return (
                <tr key={tenant.id} className='odd:bg-white even:bg-slate-100'>
                  <td>
                    <input
                      type="checkbox"
                      id={tenant.id}
                      onChange={handleClick}
                      checked={isChecked.includes(tenant.id.toString())}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  </td>
                  <td>{tenant.lname}</td>
                  <td>{tenant.fname}</td>
                  <td>{tenant.email}</td>
                  <td>{tenant.aptno}</td>
                  <td>
                    <button
                      className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full'
                      onClick={(e) => handleUpdate(tenant.id, e)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
                      onClick={() => handleOpen(tenant)}
                    // onClick={(e) => handleDelete(tenant.id, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Modal for delete confirmation */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
        >
          <Box sx={style}>
            <h2 className='text-red-600 text-center text-xl mb-3'>Confirmation</h2>
            <form>
              <div className="text-center">
                <p>Are you sure you want to delete "{tempData.lname}"?</p>
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded-full'
                  onClick={(e) => { handleDelete(tempData.id, e); handleClose(e); }}
                >
                  OK
                </button>
                <button
                  className='bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 mt-5 ms-3 rounded-full'
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </Fragment >
  );
};

export default TenantList;