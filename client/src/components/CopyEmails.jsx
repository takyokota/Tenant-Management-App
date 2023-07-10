import React, { Fragment, useState } from 'react';

const CopyEmails = (props) => {
  const [showMsg, setShowMsg] = useState('');

  // Copies emails of selected tenants
  const handleCopy = (e) => {
    e.preventDefault();

    const emailsArray = props.selectedTenants.map(tenant => tenant.email);
    const emailsStr = emailsArray.toString();

    // Copy emails to clipboard
    if (!emailsStr) {
      setShowMsg('Select a tenant to copy an email');
    } else {
      navigator.clipboard.writeText(emailsStr)
        .then(() => {
          setShowMsg('Email(s) Copied');
        })
        .catch(err => {
          setShowMsg('Failed to copy emails: ', err);
        });
    }
  };

  return (
    <Fragment>
      <button
        data-tooltip-target="tooltip-click"
        data-tooltip-trigger="click"
        data-tooltip-placement="top"
        data-tooltip-style="light"
        type="button"
        className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
        onClick={(e) => handleCopy(e)}
      >
        Copy Emails
      </button>
      <div id="tooltip-click" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip whitespace-nowrap transition delay-150">
        {showMsg}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </Fragment>
  );
};

export default CopyEmails;