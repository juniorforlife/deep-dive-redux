import { createStore, combineReducers } from '../lib-src/redux';

const todoReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    // hint: remove default and see what store.getState returns
    default:
      return state;
  }
};

// hint: remove the default state to see what happens
const userReducer = (state = { username: null, fullname: null }, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};


export default function() {
  // experiment 1: set preloadedState and see what store.getState returns
  {
    const store = createStore(todoReducer);
    console.log(store.getState());
  }

  // experiment 2: comment out ensureCanMutateNextListeners in createStore.js and see the difference with subscribe()
  {
    const store = createStore(todoReducer);
    store.subscribe(() => {
      console.log('subscription 1');
      subscription2();
    });
    const subscription2 = store.subscribe(() => {
      console.log('subscription 2');
    });
    store.dispatch({ type: 'ADD_TODO', action: '' });
  }

  // experiment 3: set preloadedState with keys not in object passed to combineReducers and see what happens
  {
    const store = createStore(
      combineReducers({ todos: todoReducer, user: userReducer }),
    );

    store.dispatch({ type: 'ADD_TODO', payload: 'take out the trash' });
  }

}