import React, { Fragment } from 'react';
import TenantForm from '../components/TenantForm';

const TenantAddPage = () => {
  return (
    <Fragment>
      <h1 className='text-center my-14 text-4xl'>Add a Tenant</h1>
      <TenantForm />
    </Fragment>
  );
};

export default TenantAddPage;