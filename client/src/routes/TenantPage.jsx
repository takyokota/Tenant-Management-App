import React, { Fragment, useEffect, useState } from 'react';
import TenantList from '../components/TenantList';
import { useNavigate } from 'react-router-dom';
import Settings from '../components/Settings';
import Search from '../components/Search';
import SelectionDropdown from '../components/SelectionDropdown';
import apiCall from '../apis/axios';
import CopyEmails from '../components/CopyEmails';
import BackToTop from '../components/BackToTop';

const TenantPage = () => {
  const [options, setOptions] = useState('');
  const [selection, setSelection] = useState('All');
  const [searchWord, setSearchWord] = useState('');
  const [selectedTenants, setSelectedTenants] = useState([]);
  const navigate = useNavigate();

  // Get options
  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await apiCall.get('/options');
        // console.log(response.data);
        setOptions(response.data.soption);
      } catch (err) {
        console.log(err);
      }
    };

    getOptions();
  }, [setOptions]);

  // Navigates to add item
  const handleAdd = (e) => {
    e.preventDefault();

    navigate('/add');
  };

  return (
    <Fragment>
      {/* <div className="flex-col justify-between"> */}
      <div className='relative'>
        <div className="absolute -top-10 right-8">
          <Search setSearchWord={setSearchWord} />
        </div>

        <div className='absolute -top-11 right-0 mt-2 cursor-pointer'>
          {options && <Settings options={options} setOptions={setOptions} />}
        </div>

        <h1 className='text-center mt-14 mb-20 text-4xl'>Tenant Management</h1>

        <button
          className='absolute top-20 end-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded-full'
          onClick={(e) => handleAdd(e)}
        >
          Add A New Tenant
        </button>

        <div className="absolute top-24 end-1">
          <SelectionDropdown options={options} setSelection={setSelection} />
        </div>

        <div
          className="absolute top-20 start-0"
        >
          <CopyEmails selectedTenants={selectedTenants} />
        </div>
      </div>

      <div className="w-full pt-2 mb-5">
        {selection &&
          <TenantList
            selection={selection}
            searchWord={searchWord}
            setSelectedTenants={setSelectedTenants} />}
      </div>
      {/* </div> */}

      <div className='fixed top-[85vh] right-5'>
        <BackToTop />
      </div>
    </Fragment>
  );
};

export default TenantPage;