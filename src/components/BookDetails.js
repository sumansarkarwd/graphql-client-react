import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from "../queries/query";

class BookDetails extends Component{
    displayBookDetails() {
        const {book} = this.props.data;

        if(book) {
            return (
                <div>
                    <h2 className="is-size-6">{book.name}</h2>
                    <p>Genre: {book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <h2 className="is-size-6">Ohter books by Author</h2>
                    <ul>
                        {
                            book.author.books.map(book => {
                                return <li key={book.id}>{book.name}</li>;
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <h2 className="is-size-6">No Book Selected!</h2>
                </div>
            )
        }
    }

    render() {        
        return (
            <div id="book-details">
                <p className="is-size-5">Book Details</p>
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        };
    }
})(BookDetails)