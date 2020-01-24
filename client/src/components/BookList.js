import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList(props) {
  const [selected, setSelected] = useState(null);
  const data = props.data;

  console.log("DATA", data);

  if (data.loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <ul id="book-list">
          {data.books.map(book => {
            return <li key={ book.id } onClick={() => setSelected(book.id)}>{ book.name }</li>;
          })}
        </ul>
        <BookDetails bookId={selected} />
      </>
    )
  }
}

export default graphql(getBooksQuery)(BookList);