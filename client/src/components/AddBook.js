import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook(props) {
  const [formName, setFormName] = useState("");
  const [formGenre, setFormGenre] = useState("");
  const [formAuthorId, setFormAuthorId] = useState("");

  const authorsData = props.getAuthorsQuery;
  let authorOptions;

  if (authorsData.loading) {
    authorOptions = <option disabled>Loading Authors...</option>
  } else {
    authorOptions = authorsData.authors.map(author => (
      <option key={ author.id } value={ author.id }>{ author.name }</option>
    ));
  }

  const submitForm = (e) => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name: formName,
        genre: formGenre,
        authorId: formAuthorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  return (
    <form id="add-book" onSubmit={() => submitForm()}>
      <div className="field">
        <label>Book name</label>
        <input type="text" onChange={(e) => setFormName(e.target.value)}/>
      </div>

      <div className="field">
        <label>Genre</label>
        <input type="text" onChange={(e) => setFormGenre(e.target.value)}/>
      </div>

      <div className="field">
        <label>Author</label>
        <select onChange={(e) => setFormAuthorId(e.target.value)}>
          <option disabled>Select Author</option>
          { authorOptions }
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
