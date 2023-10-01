import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from '../styles/DropdownMenu.module.css'
import { useNavigate } from 'react-router-dom';

const Meatball = React.forwardRef(({ onClick }, ref) => (
  <i
  className={`${styles.Ellipsis} fa-solid fa-ellipsis-vertical`}
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
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip>Edit</Tooltip>}
        >
          <Dropdown.Item
            className={`${styles.DropdownItem}`}
            onClick={handleEdit}
            aria-label='edit'
          >
            <i className="fa-solid fa-pencil" />
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip>Delete</Tooltip>}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label='delete'
          >
            <i className="fa-solid fa-trash-can" />
          </Dropdown.Item>
        </OverlayTrigger>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export function ProfileEditDropdown({ id }) {
  const navigate = useNavigate()

  return (
    <Dropdown className='float-end' drop='start'>
      <Dropdown.Toggle as={Meatball} />
      <Dropdown.Menu
        className='text-center'
        popperConfig={{ strategy: 'absolute' }}
      >
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip>Edit profile</Tooltip>}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => navigate(`/profiles/${id}/edit`)}
            aria-label='edit-profile'
          >
            <i className="fa-solid fa-pen" />
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip>Change password</Tooltip>}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => navigate(`/profiles/${id}/edit/password`)}
            aria-label='change-password'
          >
            <i className="fas fa-key" />
          </Dropdown.Item>
        </OverlayTrigger>
      </Dropdown.Menu>
    </Dropdown>
  );
}