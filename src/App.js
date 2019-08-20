import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo client setup
const apolloClient = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={apolloClient} >
      <div className="App">
        <h1 className="is-size-3">Ninja reading the list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
