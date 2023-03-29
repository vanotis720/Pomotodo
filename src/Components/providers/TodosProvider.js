import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Todo } from "../../../schemas";
import { useAuth } from "./AuthProvider";

const TodosContext = React.createContext(null);

const TodosProvider = ( props ) => {
  const [todos, setTodos] = useState([]);
  const { user } = useAuth;

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    if (user == null) {
      console.error("Null user? Needs to log in!");
      return;
    }

    // Enables offline-first: opens a local realm immediately without waiting 
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      schema: [Todo.schema],
      sync: {
        user: user,
        partitionValue: `${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // open a realm for this particular project and get all todos
    Realm.open(config).then((realm) => {
      realmRef.current = realm;

      const syncTodos = realm.objects("Todo");
      let sortedTodos = syncTodos.sorted("rank");
      setTodos([...sortedTodos]);

      // we observe changes on the todos, in case Sync informs us of changes
      // started in other devices (or the cloud)
      sortedTodos.addListener(() => {
        console.log("Got new data!");
        setTodos([...sortedTodos]);
      });
    });

    return () => {
      // cleanup function
      closeRealm();
    };
  }, [user]);

  const createTodo = (newTitle, newRank, newPriority) => {
    const realm = realmRef.current;
    realm.write(() => {
      // Create a new todo in the same partition -- that is, using the same user id.
      realm.create(
        "Todo",
        new Todo({
          title: newTitle || "New Todo",
          priority: newPriority || "low",
          rank: newRank || 1,
          isFinished: false,
          partition: user.id,
        })
      );
    });
  };

  // Define the function for deleting a link.
  const deleteTodo = (todo) => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.delete(todo);
      // after deleting, we get the todos again and update them
      setTodos([...realm.objects("Todo").sorted("rank")]);
    });
  };

  const closeRealm = () => {
    const realm = realmRef.current;
      if (realm) {
        realm.close();
        realmRef.current = null;
        setTodos([]);
      }
  };

  // Render the children within the todosContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TodosContext.Provider
      value={{
        createTodo,
        deleteTodo,
        closeRealm,
        todos,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTodos = () => {
  const todos = useContext(TodosContext);
  if (todos == null) {
    throw new Error("useTodos() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return todos;
};

export { TodosProvider, useTodos };