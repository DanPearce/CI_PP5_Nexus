import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Meatball = React.forwardRef(({ onClick }, ref) => (
  <i
  className="fa-solid fa-ellipsis-vertical"
  ref={ref}
  onClick={(event) => {
    event.preventDefault()
    onClick(event)
  }}
  ></i>
))

export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className='ms-auto' drop='left'>
      <Dropdown.Toggle as={Meatball} />
      <Dropdown.Menu
        className='text-center'
        popperConfig={{ strategy: 'fixed' }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label='edit'
        >
          <i class="fa-solid fa-pencil"></i>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label='delete'
        >
          <i class="fa-solid fa-trash-can"></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}