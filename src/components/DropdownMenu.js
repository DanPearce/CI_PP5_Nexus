import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/DropdownMenu.module.css'
// import 'bootstrap/dist/js/bootstrap.bundle';

const Meatball = React.forwardRef(({ onClick }, ref) => (
  <i
  className="fa-solid fa-ellipsis-vertical"
  ref={ref}
  onClick={(event) => {
    event.preventDefault()
    onClick(event)
  }}
  />
))

export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className='float-end' drop='start'>
      <Dropdown.Toggle as={Meatball} />
      <Dropdown.Menu
        className='text-center'
        popperConfig={{ strategy: 'absolute' }}
      >
        <Dropdown.Item
          className={`${styles.DropdownItem}`}
          onClick={handleEdit}
          aria-label='edit'
        >
          <i className="fa-solid fa-pencil"></i>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label='delete'
        >
          <i className="fa-solid fa-trash-can"></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}