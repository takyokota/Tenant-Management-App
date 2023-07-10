import React, { Fragment } from 'react';
import { Dropdown } from 'flowbite-react';

const SelectionDropdown = (props) => {
  let selArray = props.options.split(',');
  selArray = selArray.map(item => item.trim().toUpperCase());
  selArray.sort();
  // console.log(selArray);

  return (
    <Fragment>
      <Dropdown
        inline
        trigger='hover'
        dismissOnClick={false}
        label='Filter By'
      >
        <Dropdown.Item onClick={() => props.setSelection('All')}>
          All
        </Dropdown.Item>
        <Dropdown.Divider />
        {selArray.map(item => {
          return (
            <Dropdown.Item key={item} onClick={() => props.setSelection(item)}>
              {item}
            </Dropdown.Item>
          );
        })}
      </Dropdown>

      {/*
      // after navigating to main page, dropdown hover not working until refreshing a page
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        // data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
        type="button"
      >
        Selections <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <div className="py-2">
          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" onClick={() => props.setSelection('All')}>All</a>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
          {selArray.map(item => {
            return (
              <li key={item}>
                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" onClick={() => props.setSelection(item)}>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
        */}
    </Fragment>
  );
};

export default SelectionDropdown;