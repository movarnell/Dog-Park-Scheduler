import {addHours } from "date-fns";
import { useEffect } from "react";
import { User } from "./User";
import InfoIcon from "./Icons/InfoIcon";
import WarningIcon from "./Icons/WarningIcon";
import { sortUsers, formatTime, userNxtHrTime, todaysUsers } from "./utils";


// Main component for displaying today's schedule
export default function TodaysSchedule({
  users,
  deleteUser,
  getUsers,
}: {
  users: User[];
  deleteUser: (userId: any) => void;
  getUsers: () => void;
}) {
  
  useEffect(() => {
    getUsers();
  }, []);

  // Getting today's schedule and the users for the next hour
  const todaySchedule = todaysUsers(users);
  const nextHrUsers: User[] = [];
  const nxtHr = addHours(new Date(), 1);

  todaySchedule.forEach((user) => {
    const userTime = new Date(user.date);
    if (userTime < nxtHr && userTime > new Date()) {
      nextHrUsers.push(user);
    }
  });

  const usersNxtHrCt = nextHrUsers.length;
  const filteredUsers = sortUsers(todaySchedule);
  const usersNxtHr = sortUsers(nextHrUsers);
 

  return (
    <>
      <div className='row ms-2 me-2'>
        <div className='currentUsers'>
          <h2 className='title2 text-center'>Today's Dogs</h2>
          <h5 className='title2 text-center'>
            Dogs in Next Hour: {usersNxtHrCt}
          </h5>
          {todaysUsers(users).length === 0 ? (
            <div
              key={0}
              data-testid='user-card'
              className='alert alert-secondary title2 shadow border border-1 border-secondary rounded-3 m-1 p-1 text-center'
            >
              No dogs scheduled for today yet, You should bring your dog!
            </div>
          ) : (
            ""
          )}
        </div>
        {filteredUsers.map((user) => (
          <div className='col-sm-12 title2' key={user.id + "dog"}>
            <div className='card shadow mt-2 rounded-3' key={user.id}>
              <div className='card-body' data-testid='user-card'>
                <button
                  data-testid='Button'
                  type='button'
                  className='btn-close float-end'
                  onClick={() => deleteUser(user.id)}
                ></button>
                <h5 className='card-title fw-bold'>{user.name} is bringing</h5>
                <h5 className='mb-2 fw-bold'>{user.dogName}</h5>
                <h6 className='card-text'>Today at {formatTime(user.date)}</h6>

                {userNxtHrTime(user) ? (
                  <h6 className='alert alert-info title2 border border-2 border-info fw-bold m-1 p-1 text-center'>
                    {<InfoIcon />} Scheduled for now. If you hurry you can still
                    make it!
                  </h6>
                ) : (
                  ""
                )}

                {user.friendly ? (
                  <h6 className='alert alert-danger fw-bolder border border-2 border-secondary m-1 p-1'>
                    {<WarningIcon />}
                    This dog is not friendly with either other dogs or people.
                  </h6>
                ) : (
                  ""
                )}

                {usersNxtHr.some((usersNxtHr) => usersNxtHr.id === user.id) ? (
                  <p className='alert alert-info border border-2 border-secondary m-1 p-1'>
                    {<InfoIcon />} This dog arrives within the next hour.
                  </p>
                ) : (
                  ""
                )}
                {user.puppy ? (
                  <p className='alert alert-success border border-2 border-secondary m-1 p-1'>
                    {<InfoIcon />} This dog is a puppy. Please be gentle.
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
