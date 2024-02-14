import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import MainPage from "./Components/MainPage";
import Schedule from "./Components/Schedule";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FAQ from "./Components/FAQ";
import Navigation from "./Components/Navigation";
import Title from "./Components/Title";
import axios from "axios";
import { User } from "./Components/User";



function App() {
  const [users, setUsers] = useState<User[]>([]);

  const GET_FILE = "https://michaelvarnell.com/dogparkserver/get_users.php";
  const POST_FILE = "https://michaelvarnell.com/dogparkserver/add_dog.php";
  const DELETE_FILE = "https://michaelvarnell.com/dogparkserver/delete_user.php";
  
  //NOTE: The following are for local testing
  //const GET_FILE = "http://localhost:3000/users/";
  //const POST_FILE = "http://localhost:3000/users/";
  //const DELETE_FILE = "http://localhost:3000/users/";

useEffect(() => {
  getUsers();
}, []);

  async function fetchUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(
        GET_FILE
      );
    
      return response.data.map((user) => ({
        ...user,
        friendly: Number(user.friendly) === 1,
        puppy: Number(user.puppy) === 1,
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const getUsers = async () => {
    const usersFromServer = await fetchUsers();
    setUsers(usersFromServer);
  };

  function createUser(data: User) {
    axios
      .post(POST_FILE, data)
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function deleteUser(userId: any) {
    console.log("userId passed for Delete:", userId);
    axios
      .delete(DELETE_FILE + userId)
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
        console.log("User Deleted");
      })
      .catch((error: any) => {
        console.log(error);
      });
  }


  return (
    <>
      <div className='row'>
        <Title />
        <Navigation />
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <MainPage
              users={users}
              createUser={createUser}
              deleteUser={deleteUser}
              getUsers={getUsers}
              setUsers={setUsers}
            />
          }
        />
        <Route path='/faq' element={<FAQ />} />
        <Route
          path='/schedule'
          element={
            <Schedule
              users={users}
              deleteUser={deleteUser}
              getUsers={getUsers}
            />
          }
        />
        <Route
          path='*'
          element={
            <MainPage
              users={users}
              createUser={createUser}
              deleteUser={deleteUser}
              getUsers={getUsers}
              setUsers={setUsers}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
