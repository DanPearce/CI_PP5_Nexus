/* Imports */
import React, { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/CommentEditForm.module.css';

function CommentEditForm(props) {
  const { id, body, setShowEditForm, setComments } = props;
  const [formBody, setFormBody] = useState(body);

  /*
    Handles changes made to inputs
  */
  const handleChange = (event) => {
    setFormBody(event.target.value);
  };

  /*
    Handles the form submisson
    Updates comment, including date
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}`, {
        body: formBody.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                body: formBody.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
    //  console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formBody}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          <i className="fa-solid fa-arrow-left"></i>
          &nbsp; Go Back
        </button>
        <button
          className={styles.Button}
          disabled={!body.trim()}
          type="submit"
        >
          Update
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;