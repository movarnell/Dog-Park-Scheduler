import { render, fireEvent, waitFor } from "@testing-library/react";
import TodaysSchedule from "./TodaysSchedule";
import { User } from "./User";
import { findAllByTestId } from "@testing-library/react";

describe("TodaysSchedule", () => {
  const mockDeleteUser = jest.fn();
  const mockGetUsers = jest.fn();

  const users: User[] = [
    {
      id: 1,
      name: "Michael",
      dogName: "Buddy",
      date: new Date(),
      friendly: true,
      puppy: true,
    },
    {
      id: 2,
      name: "John",
      dogName: "Rex",
      date: new Date(),
      friendly: true,
      puppy: true,
    },
  ];

  it("renders without crashing", () => {
    render(
      <TodaysSchedule
        users={users}
        deleteUser={mockDeleteUser}
        getUsers={mockGetUsers}
      />
    );
  });

  it("displays the correct number of users", async () => {
    // console.log(users);
    const { findAllByTestId } = render(
      <TodaysSchedule
        users={users}
        deleteUser={mockDeleteUser}
        getUsers={mockGetUsers}
      />
    );
    const userCards = await findAllByTestId("user-card");
    console.log(userCards.length, users.length);
    expect(userCards.length).toBe(users.length);
  });

  it("calls deleteUser when the delete button is clicked", async () => {
    const { findAllByTestId } = render(
        <TodaysSchedule
            users={users}
            deleteUser={mockDeleteUser}
            getUsers={mockGetUsers}
        />
    );
    const deleteButtons = await findAllByTestId("Button");
    console.log("This is how many Delete Buttons: " + deleteButtons);
    if (deleteButtons && deleteButtons.length > 0) {
        fireEvent.click(deleteButtons[0]);
        expect(mockDeleteUser).toHaveBeenCalledWith(users[0].id);
    } else {
        expect(mockDeleteUser).not.toHaveBeenCalled();
    }
  });

  it("calls getUsers when the component mounts", () => {
    render(
      <TodaysSchedule
        users={users}
        deleteUser={mockDeleteUser}
        getUsers={mockGetUsers}
      />
    );
    expect(mockGetUsers).toHaveBeenCalled();
  });
});
