import React, {Component} from 'react';
import {graphql} from 'react-apollo';
// import { compose } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries/query";


class AddBook extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }

    displayAuthors() {
        let data = this.props.getAuthorsQuery;

        if(data.loading) {
            return(<option disabled>Laoding Authors...</option>);
        } else {
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>;
            })
        }
    }

    submitForm(e) {
        e.preventDefault();
        // console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId,
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Name" 
                        onChange={e => {this.setState({name: e.target.value})}}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Genre</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Genre" 
                        onChange={e => {this.setState({genre: e.target.value})}}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Author</label>
                    <div className="control">
                        <div className="select">
                        <select onChange={e => {this.setState({authorId: e.target.value})}}>
                            {this.displayAuthors()}
                        </select>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Add</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
