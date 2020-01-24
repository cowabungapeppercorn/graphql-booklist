import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
  const { book } = props.data;

  if (book) {
    return (
      <div id="book-details">
        <h2>{ book.name }</h2>
        <p>Genre: { book.genre }</p>
        <p>Author: { book.author.name }</p>
        <p>Other works:</p>
        <ul className="other-books">
          { book.author.books.map(item => {
            return <li key={ item.id }>{ item.name }</li>
          }) }
        </ul>
      </div>
    );
  } else {
    return <div id="book-details">
      <h2>Select a Book</h2>
    </div>
  }

}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);